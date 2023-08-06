


import {logs_per_protocol} from "@/app/lib/read_db"


export async function GET(request){
    try {
        const logs_per_protocol_logs = await logs_per_protocol()
        // console.debug(teams_per_attack_logs)
        return new Response(JSON.stringify({status : true , logs_per_protocol_logs}))
    } catch (error) {
        console.debug(error)
        return new Response(JSON.stringify({status : false}))
    }
    
}