
import prisma from "@/app/lib/prisma";

import encrypt from "@/app/lib/encrypt"
import decrypt from "@/app/lib/decrypt"


export async function GET(request){
    try {
        const total_quizes = await prisma.quiz.count({})
        
        const encryptedData = encrypt({status : true , total_quizes})
        return new Response(JSON.stringify({ encryptedData }))
        // return new Response(JSON.stringify({status : true , total_quizes }))
    } catch (error) {
        console.debug(error)
        const encryptedData = encrypt({status : false})
        return new Response(JSON.stringify({ encryptedData }))
        // return new Response(JSON.stringify({status : false}))
    }
    
}