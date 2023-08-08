// Get user details by user-id


import prisma from "@/app/lib/prisma";

export async function GET(request: Request, {params} : {params : {id : string}}){
    try {
        const team_id = await prisma.user.findFirst({
            where : {
                id  : parseInt(params.id)
            }, select : {
                teamId : true,
            }
        })
        const quiz_id = await prisma.team.findFirst({
            where : {
                id : team_id?.teamId    
            }, select : {   
                quizId : true
            }
        })
        const user = await prisma.user.findUnique({
            where : {
                id : parseInt(params.id)
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
                                                checkStatus : true  
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
        return new Response(JSON.stringify({status : true, user}))
    } catch (error) {
        console.debug(error)
        return new Response(JSON.stringify({status : false, error : "Sorry! There is an error while fetching user data.Please try again later"}))
    }
}