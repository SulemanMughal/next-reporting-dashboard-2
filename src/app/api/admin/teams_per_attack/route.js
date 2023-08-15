


import {teams_per_attack} from "@/app/lib/read_db"




import encrypt from "@/app/lib/encrypt"
import decrypt from "@/app/lib/decrypt"


export async function GET(request){
    try {
        const teams_per_attack_logs = await teams_per_attack()
        // console.debug(teams_per_attack_logs)
        
        const encryptedData = encrypt({status : true , teams_per_attack_logs})
        return new Response(JSON.stringify({ encryptedData }))

        // return new Response(JSON.stringify({status : true , teams_per_attack_logs}))
    } catch (error) {
        console.debug(error)
        const encryptedData = encrypt({status : false})
        return new Response(JSON.stringify({ encryptedData }))
        // return new Response(JSON.stringify({status : false}))
    }
    
}