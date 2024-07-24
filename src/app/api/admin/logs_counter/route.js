import {total_records} from "@/app/lib/read_db"

import encrypt from "@/app/lib/encrypt"


export async function GET(request){
    try {
        const encryptedData = encrypt({status : true })
        return new Response(JSON.stringify({ encryptedData }))
    } catch (error) {
        console.debug(error)
        const encryptedData = encrypt({ status : false })
        return new Response(JSON.stringify({ encryptedData }))
    }
    
}