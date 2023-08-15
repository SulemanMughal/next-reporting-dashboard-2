
import prisma from "@/app/lib/prisma";

import encrypt from "@/app/lib/encrypt"

export async function GET(request){
    try {
        const total_teams = await prisma.team.count({})
        // console.debug(total_teams)
        
        const encryptedData = encrypt({status : true , total_teams})
        return new Response(JSON.stringify({ encryptedData }))
        // return new Response(JSON.stringify({status : true , total_teams}))
    } catch (error) {
        console.debug(error)
        const encryptedData = encrypt({status : false})
        return new Response(JSON.stringify({ encryptedData }))
        // return new Response(JSON.stringify({status : false}))
    }
    
}