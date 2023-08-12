// GEt team information by team-id

import prisma from "@/app/lib/prisma";


export async function GET(request, {params}){
    try {
        // console.debug(params.teamId)
        const team = await prisma.team.findUnique({
            where: {
                id: (params.teamId),
            }, select : {
                id : true,
                name : true,
                quizId : true,
                users : {
                    select : { 
                        email : true
                    }
                }
            }
        })
        return new Response(JSON.stringify({status : true, team}))
    } catch (error) {
        console.debug(error)
        return new Response(JSON.stringify({status : false, error : "Sorry! There is an error while fetching team details. Please try again after some time"}))
    }
}


export async function DELETE(request , {params}){
    try {
        await prisma.team.delete({
            where : {
                id : (params.teamId)
            }
        })
        return new Response(JSON.stringify({status : true}))
    } catch (error) {
        console.debug(error)
        return new Response(JSON.stringify({status : false}))
    }
}