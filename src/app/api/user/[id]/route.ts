// Get user details by user-id


import prisma from "@/app/lib/prisma";
import encrypt from "@/app/lib/encrypt"
// import decrypt from "@/app/lib/decrypt"


export async function GET(request: Request, {params} : {params : {id : string}}){
    try {
        const team_id = await prisma.user.findFirst({
            where : {
                id  : params.id
            }, select : {
                teamId : true,
            }
        })
        if(team_id.teamId === null){
            const encryptedData = encrypt({status : false, error : "Sorry! You're not part of any team. Please contact admin."})
            return new Response(JSON.stringify({ encryptedData }))

        } else {
            const quiz_id = await prisma.team.findFirst({
                where : {
                    id : team_id?.teamId    
                }, select : {   
                    quizId : true
                }
            })
            const user = await prisma.user.findUnique({
                where : {
                    id : params.id
                },
                select : {
                    id : true,
                    name : true,
                    email : true,
                    team : {
                        select : {
                            id : true,
                            name : true,
                            quiz : {
                                select : {
                                    questions : {
                                        select : {
                                            scenario : {
                                                select  :{
                                                    id : true,
                                                    name : true,
                                                    status : true,
                                                    category : true,
                                                    desc : true,
                                                    difficulty : true,
                                                    questions : {
                                                        where : {
                                                            quizId : (quiz_id?.quizId !== undefined) ? quiz_id?.quizId : null
                                                        }, select : {
                                                            id : true,
                                                            points: true,
                                                        }
                                                    }
                                                }
                                            },
                                            answers : {
                                                where : {
                                                    teamId : (team_id?.teamId !== undefined) ? team_id?.teamId : null
                                                }, select : {
                                                    id : true,
                                                    submissionStatus : true,
                                                    obtainedPoints : true,
                                                    user : {
                                                        select : {
                                                            id : true,
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            })
            const total_teams = await prisma.team.count({})
            const teamRecords:any = await prisma.$queryRaw`SELECT t.id AS team_id, t.name AS team_name, SUM(a.obtainedPoints) AS total_obtained_points FROM Team AS t LEFT JOIN Answer AS a ON t.id = a.teamId GROUP BY t.id, t.name ORDER BY total_obtained_points DESC`
            const team_position = teamRecords.findIndex(record => record.team_id === team_id.teamId);
            const encryptedData = encrypt({status : true, user , total_teams: total_teams , team_position : (team_position+1)})
            // const encryptedData = {status : true, user , total_teams: total_teams , team_position : (team_position+1)}
            return new Response(JSON.stringify({ encryptedData }))
        }
        
    } catch (error) {
        console.debug(error)
        const encryptedData = encrypt({status : false, error : "Sorry! There is an error while fetching user data.Please try again later"})
        return new Response(JSON.stringify({ encryptedData }))
    }
}