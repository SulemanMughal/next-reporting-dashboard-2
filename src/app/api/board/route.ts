import prisma from "@/app/lib/prisma";
import encrypt from "@/app/lib/encrypt"

async function getTopHighScoringUsers(){
    try {
        const results = await prisma.$queryRaw`SELECT user.id, user.name , Sum(Answer.obtainedPoints) As total_points from User JOIN Answer on user.id = Answer.userId Group By user.id  Order By total_points DESC  LIMIT 12;`


        // 
        // const usersWithAnswers = await prisma.user.findMany({
        //     include: {
        //       answers: true,
        //     },
        //   });
      
        //   // Calculate total points for each user
        //   const usersWithTotalPoints = usersWithAnswers.map((user) => ({
        //     id: user.id,
        //     name: user.name,
        //     totalPoints: user.answers.reduce((total, answer) => total + answer.obtainedPoints, 0),
        //   }));
      
        //   // Sort users based on total points
        //   const sortedUsers = usersWithTotalPoints.sort((a, b) => b.totalPoints - a.totalPoints);
      
        //   // Select the top 12 users
        //   const topUsers = sortedUsers.slice(0, 12);

        //   console.debug(topUsers, results)

        return results   
    } catch (error) {
        console.debug(error)
        return []
    }
}


async function getUserByRanking(){
    try {
        const results = await prisma.$queryRaw`SELECT user.id, user.name As user_name ,  team.name As team_name,Sum(Answer.obtainedPoints) As total_points, Count(Answer.id) As total_submissions from User JOIN Answer on user.id = Answer.userId JOIN Team On user.teamId = team.id  Group By user.id  Order By total_points DESC;`
        return results   
    } catch (error) {
        console.debug(error)
        return []
    }
}




export async function GET(request: Request){
    let top_users = [];
    let users = [];
    // console.debug(params)
    // console.debug(request.url)
    // const { query } = request;
    // const queryParams = query.paramName;
    const url = new URL(request.url)

    // const skip = url.searchParams.get("skip")
    // console.debug( url.searchParams.get("page"))
    try {
        // const results = await prisma.user.findMany({
        //     where : {
        //         role : {
        //             not : 'admin'
        //         }
        //     },
        //     select : {
        //         id : true,
        //         name : true,
        //         country : true,
        //         team  : {
        //             select : {
        //                 name : true
        //             }
        //         },
        //         answers : {
        //             where : {
        //                 submissionStatus : true,
        //             },
        //             select : {
        //                 obtainedPoints : true,
        //                 submittedAt  : true,
        //                 question : {
        //                     select :{
        //                         scenario : {
        //                             select : {
        //                                 category : true
        //                             }
        //                         }
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // })
        
        await getTopHighScoringUsers().then((res: any) => {
            try {
                (res as Array<any>).map((item) => {
                    if(item['total_points'] &&  item['total_points'] !== null){
                        top_users.push({
                            name : item['name']?.toString() || "",
                            total_points : item['total_points']?.toString() || ""
                        })
                    }
                })
            } catch (error) {
                console.debug(error)
            }
        })

        
        // ==================================
        // Get Users By Ranking 

        await getUserByRanking().then((res: any) => {
            // console.debug(res)
            try {
                (res as Array<any>).map((item) => {
                    if(item['total_points'] &&  item['total_points'] !== null){
                        users.push({
                            id : item['id']?.toString() || "",
                            user_name : item['user_name']?.toString() || "",
                            team_name : item['team_name']?.toString() || "",
                            total_points : item['total_points']?.toString() || "",
                            total_submissions : item['total_submissions']?.toString() || "",
                        })
                    }
                })
            } catch (error) {
                console.debug(error)
            }
        })

        // ==================================

        // ============
        // Total number of users (OverAll)
        const total_users = await prisma.user.count({})
        // console.debug(total_users)
        // ============

        // ====================
        // Pagination
        const total_number_of_users_per_page = parseInt(url.searchParams.get("recordsPerPrage") || "50");
        const totalResults = users.length;
        const totalPages = Math.ceil(totalResults / total_number_of_users_per_page);
        // const totalPages = 10;
        // console.debug(total_pages)
        let currentPage =  parseInt(url.searchParams.get("page") || "1");
        // const nextPage = (currentPage) + 1;
        // const prevPage = (currentPage) - 1;
        if (currentPage > totalPages){
            currentPage = totalPages
        }
        const startIndex = (((currentPage) - 1) * total_number_of_users_per_page) + 1;
        const endIndex = (currentPage) * total_number_of_users_per_page;
        const usersPerPage = users.slice(startIndex - 1, endIndex);
        // console.debug(usersPerPage)
        
        // console.debug(total_results)
        // console.debug(current_page, nextPage, prevPage)
        // console.debug(startIndex, endIndex)


        const paginationData = {
            startIndex,
            endIndex,
            totalResults,
            currentPage,
            usersPerPage,
            totalPages,
            total_number_of_users_per_page

        }
        // ====================

        
        


        // console.debug(users)
        const encryptedData = encrypt({status : true ,  top_users , users, total_users, paginationData   })
        return new Response(JSON.stringify({ encryptedData }))
    } catch (error) {
        console.debug(error)
        const encryptedData = encrypt({status : false, error : "Sorry! There is an error while fetching data.Please try again later"})
        return new Response(JSON.stringify({ encryptedData }))
    }
}