
import prisma from "@/app/lib/prisma";


export async function GET(request){
    try {
        const total_quizes = await prisma.quiz.count({})
        return new Response(JSON.stringify({status : true , total_quizes }))
    } catch (error) {
        console.debug(error)
        return new Response(JSON.stringify({status : false}))
    }
    
}