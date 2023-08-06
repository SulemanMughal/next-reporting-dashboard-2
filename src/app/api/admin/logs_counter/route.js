
import prisma from "@/app/lib/prisma";

import {total_records} from "@/app/lib/read_db"


export async function GET(request){
    try {
        // const total_teams = await prisma.team.count({})
        // console.debug()
        const total_logs = await total_records()
        // console.debug(total_logs[0].length ? total_logs[0][0] : 0)
        return new Response(JSON.stringify({status : true , total_logs : total_logs[0].length ? total_logs[0][0] : 0 }))
    } catch (error) {
        console.debug(error)
        return new Response(JSON.stringify({status : false}))
    }
    
}