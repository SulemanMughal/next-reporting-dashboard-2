// GEt team information by team-id

import prisma from "@/app/lib/prisma";

import encrypt from "@/app/lib/encrypt"
import decrypt from "@/app/lib/decrypt"

export async function GET(request, {params}){
    try {
        const team = await prisma.team.findUnique({
            where: {
                id: (params.teamId),
            }, select : {
                id : true,
                name : true,
                quizId : true,
                users : {
                    
                    select : { 
                        email : true, 
                        answers : {
                            where : {
                                teamId : (params.teamId)
                            }, select : {
                                obtainedPoints : true,
                            }
                        }
                    }
                }, answers : {
                    select : {
                        user : {
                            where : {
                                teamId : (params.teamId)
                            } ,select : {
                                email : true
                            }
                        },
                        obtainedPoints : true,
                    }
                }
            }
        })
        const encryptedData = encrypt({status : true, team});
        return new Response(JSON.stringify({ encryptedData }))
        // return new Response(JSON.stringify({status : true, team}))
    } catch (error) {
        console.debug(error)
        const encryptedData = encrypt({status : false, error : "Sorry! There is an error while fetching team details. Please try again after some time"});
        return new Response(JSON.stringify({ encryptedData }))
        // return new Response(JSON.stringify({status : false, error : "Sorry! There is an error while fetching team details. Please try again after some time"}))
    }
}


export async function DELETE(request , {params}){
    try {
        await prisma.team.delete({
            where : {
                id : (params.teamId)
            }
        })
        // return new Response(JSON.stringify({status : true}))
        const encryptedData = encrypt({status : true});
        return new Response(JSON.stringify({ encryptedData }))
    } catch (error) {
        console.debug(error)
        const encryptedData = encrypt({status : false});
        return new Response(JSON.stringify({ encryptedData }))
        // return new Response(JSON.stringify({status : false}))
    }
}