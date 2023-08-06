import prisma from "@/app/lib/prisma";


export async function POST(request){
    const {title, startAt, endAt}  = await request.json()
    try{
        const quiz = await prisma.quiz.create({
            data : {
                title : title,
                startAt : new Date(startAt),
                endAt  : new Date(endAt)
    
            }
        })
        return new Response(JSON.stringify({status : true, quiz}))
    }
    catch (err){
        console.error(err)
        return new Response(JSON.stringify({status : false}))
    }

}
