


import {teams_per_attack} from "@/app/lib/read_db"


export async function GET(request){
    try {
        const teams_per_attack_logs = await teams_per_attack()
        // console.debug(teams_per_attack_logs)
        return new Response(JSON.stringify({status : true , teams_per_attack_logs}))
    } catch (error) {
        console.debug(error)
        return new Response(JSON.stringify({status : false}))
    }
    
}