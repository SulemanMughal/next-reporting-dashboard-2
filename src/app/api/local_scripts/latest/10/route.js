
import prisma from "@/app/lib/prisma";



export async function GET(request ){
    try {
        const scripts = await prisma.attackScript.findMany({
            orderBy : [
                {
                    id : 'desc'
                }
            ],
            take : 10
        })
        return new Response(JSON.stringify(scripts))
    } catch (error) {
        console.debug(error)
        return new Response(JSON.stringify({status : false}))
        
    }
}