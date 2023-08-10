

import prisma from "@/app/lib/prisma";



export async function GET(request: Request){
    try {

        const scenarios = await prisma.scenario.findMany({
            select : {
                id : true,
                name : true
            }
        })
        
        return new Response(JSON.stringify({status : true , scenarios}))
    } catch (error) {
        console.debug(error)
        return new Response(JSON.stringify({status : false, error : error.message}))
    }
}