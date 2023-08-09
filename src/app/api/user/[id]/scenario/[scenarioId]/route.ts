// get scenario details based on user id and scenario id

import prisma from "@/app/lib/prisma";


export async function GET(request: Request, {params} : {params : {id : string, scenarioId : string}}){
    try {
        // console.debug(params)

        const questions = await prisma.user.findFirst({
            where : {
                id  : params.id
            }, select : {
                // id : true,
                team : {
                    
                    select : {
                        id : true,
                        quiz : {
                            select : {
                                id : true,
                                questions : {
                                    where: {
                                        scenario: {
                                            id :params.scenarioId,   
                                        }
                                    },
                                    select : {
                                        answers : {
                                            
                                            select :{
                                                submissionStatus : true,
                                                submitAnswer : true,
                                                obtainedPoints : true
                                            }
                                        },
                                        title : true, 
                                        points : true,
                                        Description : true,
                                        id : true,
                                        scenario : {
                                            select : {
                                                id : true,
                                                name : true,
                                                status : true,
                                                desc : true,
                                                category : true,
                                                difficulty : true,
                                                tags : true,
                                                
                                            }
                                        }
                                    }
                                    // select : {
                                    //     scenario : {
                                    //         where : {
                                    //             id : params.scenarioId
                                    //         }, select : {
                                    //             questions : true
                                    //         }
                                    //     }
                                    // }
                                }
                            }
                        }
                    }
                }
            }
        })

        // const questions = await prisma.team.findMany({
        //     select : {
        //         users : {
        //             where : {
        //                 id : parseInt(params.id)
        //             }
        //         }
        //     }
        // })

        // console.debug(questions)
    

        return new Response(JSON.stringify({status : true , questions}))
    } catch (error) {
        console.debug(error)
        return new Response(JSON.stringify({status : false, error : "Sorry! There is an error while fetching user data.Please try again later"}))
    }
}