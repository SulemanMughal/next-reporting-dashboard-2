
// import prisma from "@/app/lib/prisma";

import {logs_by_hour_count} from "@/app/lib/read_db"


export async function GET(request){
    try {
        const logs_by_hour = await logs_by_hour_count()
        return new Response(JSON.stringify({status : true , logs_by_hour}))
    } catch (error) {
        console.debug(error)
        return new Response(JSON.stringify({status : false}))
    }
    
}