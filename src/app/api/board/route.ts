// Get user details by user-id


import prisma from "@/app/lib/prisma";
import encrypt from "@/app/lib/encrypt"
// import decrypt from "@/app/lib/decrypt"





export async function GET(request: Request){
    try {
        const results = await prisma.user.findMany({
            where : {
                role : {
                    not : 'admin'
                }
            },
            select : {
                id : true,
                name : true,
                country : true,
                team  : {
                    select : {
                        name : true
                    }
                },
                answers : {
                    where : {
                        submissionStatus : true,
                    },
                    select : {
                        obtainedPoints : true,
                        submittedAt  : true,
                        question : {
                            select :{
                                scenario : {
                                    select : {
                                        category : true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })
        // const usersGroupedByCountry = await prisma.user.groupBy({
        //     by: ['country'],
        //     _count: {
        //         email: true,
        //     },
            
        // });
        const usersGroupedByCountry = await prisma.user.groupBy({
            by: ['country'],
            where : {
                country : {
                    not: {
                        equals: null
                    }
                }
            },
            _count: {
              email: true,
            },
            orderBy: {
              _count: {
                email: 'desc', // Order by _count of emails in descending order
              },
            },
            
            take: 12, // Limit the results to the top ten
        });
        // console.debug(usersGroupedByCountry)
        const encryptedData = encrypt({status : true , results  , usersGroupedByCountry})
        return new Response(JSON.stringify({ encryptedData }))
    } catch (error) {
        console.debug(error)
        const encryptedData = encrypt({status : false, error : "Sorry! There is an error while fetching data.Please try again later"})
        return new Response(JSON.stringify({ encryptedData }))
    }
}