
import prisma from "@/app/lib/prisma";


export async function GET(request){
    try {
    const total_scripts = await prisma.attackScript.count({})
        // console.debug(total_scripts)
        return new Response(JSON.stringify({status : true, total_scripts }))
    } catch (error) {
        console.debug(error)
        return new Response(JSON.stringify({status : false}))
    }
    
}