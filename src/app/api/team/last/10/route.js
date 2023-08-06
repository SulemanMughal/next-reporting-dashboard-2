
import prisma from "@/app/lib/prisma";





export async function GET(request ){
    
    const teams = await prisma.team.findMany({
        orderBy : [
            {
                id : 'desc'
            }
        ],
        take : 10
    })

    // console.debug(teams)

    return new Response(JSON.stringify(teams))

}