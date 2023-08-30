
import prisma from "@/app/lib/prisma";

import {total_records} from "@/app/lib/read_db"


import encrypt from "@/app/lib/encrypt"
import decrypt from "@/app/lib/decrypt"


export async function GET(request){
    try {
        // const total_teams = await prisma.team.count({})
        // console.debug()
        const total_logs = await total_records()
        // console.debug(total_logs[0].length ? total_logs[0][0] : 0)
        
        const encryptedData = encrypt({status : true , total_logs : total_logs[0].length ? total_logs[0][0] : 0 })
        return new Response(JSON.stringify({ encryptedData }))

        // return new Response(JSON.stringify({status : true , total_logs : total_logs[0].length ? total_logs[0][0] : 0 }))
    } catch (error) {
        console.debug(error)
        const encryptedData = encrypt({ status : false })
        return new Response(JSON.stringify({ encryptedData }))
        // return new Response(JSON.stringify({status : false}))
    }
    
}