
// import prisma from "@/app/lib/prisma";

import {ips_per_protocol} from "@/app/lib/read_db"


export async function GET(request){
    try {
        const ips_per_protocol_logs = await ips_per_protocol()
        return new Response(JSON.stringify({status : true , ips_per_protocol_logs}))
    } catch (error) {
        console.debug(error)
        return new Response(JSON.stringify({status : false}))
    }
    
}