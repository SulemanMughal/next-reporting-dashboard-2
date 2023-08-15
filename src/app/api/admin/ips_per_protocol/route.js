
// import prisma from "@/app/lib/prisma";

import {ips_per_protocol} from "@/app/lib/read_db"


import encrypt from "@/app/lib/encrypt"
import decrypt from "@/app/lib/decrypt"



export async function GET(request){
    try {
        const ips_per_protocol_logs = await ips_per_protocol()
        
        const encryptedData = encrypt({status : true , ips_per_protocol_logs})
        return new Response(JSON.stringify({ encryptedData }))
        // return new Response(JSON.stringify({status : true , ips_per_protocol_logs}))
    } catch (error) {
        console.debug(error)
        const encryptedData = encrypt({status : false})
        return new Response(JSON.stringify({ encryptedData }))
        // return new Response(JSON.stringify({status : false}))
    }
    
}