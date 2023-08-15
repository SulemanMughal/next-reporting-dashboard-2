import prisma from "@/app/lib/prisma";



import encrypt from "@/app/lib/encrypt"
import decrypt from "@/app/lib/decrypt"


export async function POST(request){
    
    try{
        const body  = await request.json()
        const {...data } = decrypt(body.encryptedData)
        const quiz = await prisma.quiz.create({
            data : {
                title : data.title,
                startAt : new Date(data.startAt),
                endAt  : new Date(data.endAt)
    
            }
        })
        
        const encryptedData = encrypt({status : true, quiz})
        return new Response(JSON.stringify({ encryptedData }))
    }
    catch (err){
        console.error(err)
        const encryptedData = encrypt({status : false})
        return new Response(JSON.stringify({ encryptedData }))
        // return new Response(JSON.stringify({status : false}))
    }

}
