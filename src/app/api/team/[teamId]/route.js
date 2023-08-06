// GEt team information by team-id

import prisma from "@/app/lib/prisma";


export async function GET(request, {params}){
    const team = await prisma.team.findUnique({
        where: {
            id: parseInt(params.teamId),
        }
    })
    return new Response(JSON.stringify(team))
}


export async function DELETE(request , {params}){
    try {
        // console.debug(params.teamId)
        await prisma.team.delete({
            where : {
                id : parseInt(params.teamId)
            }
        })
        return new Response(JSON.stringify({status : true}))
    } catch (error) {
        console.debug(error)
        return new Response(JSON.stringify({status : false}))
    }
}