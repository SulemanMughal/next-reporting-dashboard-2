
import prisma from "@/app/lib/prisma";


import encrypt from "@/app/lib/encrypt"


export async function GET(request){
    try {
    const total_scripts = await prisma.attackScript.count({})
        // console.debug(total_scripts)
        
        const encryptedData = encrypt({status : true, total_scripts})
        return new Response(JSON.stringify({ encryptedData }))
        // return new Response(JSON.stringify({status : true, total_scripts }))
    } catch (error) {
        console.debug(error)
        const encryptedData = encrypt({status : false})
        return new Response(JSON.stringify({ encryptedData }))
        // return new Response(JSON.stringify({status : false}))
    }
    
}