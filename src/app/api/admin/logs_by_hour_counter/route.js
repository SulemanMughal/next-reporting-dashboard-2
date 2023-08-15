
// import prisma from "@/app/lib/prisma";

import {logs_by_hour_count} from "@/app/lib/read_db"



import encrypt from "@/app/lib/encrypt"
import decrypt from "@/app/lib/decrypt"





export async function GET(request){
    try {
        const logs_by_hour = await logs_by_hour_count()
        
        const encryptedData = encrypt({status : true , logs_by_hour})
        return new Response(JSON.stringify({ encryptedData }))

        // return new Response(JSON.stringify({status : true , logs_by_hour}))
    } catch (error) {
        console.debug(error)
        const encryptedData = encrypt({status : false})
        return new Response(JSON.stringify({ encryptedData }))
        // return new Response(JSON.stringify({status : false}))
    }
    
}