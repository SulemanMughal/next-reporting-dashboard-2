// get scenario details based on user id and scenario id

import prisma from "@/app/lib/prisma";



import encrypt from "@/app/lib/encrypt"
import decrypt from "@/app/lib/decrypt"








export async function GET(request: Request, {params} : {params : {id : string, scenarioId : string}}){
    
    try {
        const teamId = await prisma.user.findFirst({
            where : {
                id : params.id
            },
            select : {
                teamId : true,
                // team : true
            }

        })

        // console.debug(teamId)

        if(teamId.teamId && teamId.teamId !== null){
            const questions = await prisma.user.findFirst({
                where : {
                    id  : params.id,
                    // teamId : teamId.teamId
                }, select : {
                    team : {
                        select : {
                            id : true,
                            name : true,
                            users : {
                                select : { 
                                    name : true,
                                }
                            },
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
                                                where : {
                                                    teamId : teamId.teamId
                                                },
                                                select :{
                                                    submissionStatus : true,
                                                    submitAnswer : true,
                                                    obtainedPoints : true,
                                                    submittedAt : true,
                                                    user : {
                                                        select : { 
                                                            name : true,
                                                        }
                                                    }
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
                                                    files : true,
                                                    os_type : true,
                                                    first_blood_points : true,
                                                    first_blood : true
                                                    
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
            const encryptedData = encrypt({status : true , questions})
            return new Response(JSON.stringify({ encryptedData }))
        } else{
            const encryptedData = encrypt({status : false, error : "Sorry! There is no challenges related to respective user .Please try again later"})
            return new Response(JSON.stringify({ encryptedData }))
        }
    } catch (error) {
        console.debug(error)
        const encryptedData = encrypt({status : false, error : "Sorry! There is an error while fetching user data.Please try again later"})
        return new Response(JSON.stringify({ encryptedData }))
    }
}