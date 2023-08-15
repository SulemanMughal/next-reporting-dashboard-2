


import {logs_per_protocol} from "@/app/lib/read_db"



import encrypt from "@/app/lib/encrypt"
import decrypt from "@/app/lib/decrypt"

export async function GET(request){
    try {
        const logs_per_protocol_logs = await logs_per_protocol()
        // console.debug(teams_per_attack_logs)
        

        const encryptedData = encrypt({status : true , logs_per_protocol_logs})
        return new Response(JSON.stringify({ encryptedData }))
        // return new Response(JSON.stringify({status : true , logs_per_protocol_logs}))
    } catch (error) {
        console.debug(error)
        const encryptedData = encrypt({status : false})
        return new Response(JSON.stringify({ encryptedData }))
        // return new Response(JSON.stringify({status : false}))
    }
    
}