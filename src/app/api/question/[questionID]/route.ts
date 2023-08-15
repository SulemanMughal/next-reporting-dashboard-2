

import prisma from "@/app/lib/prisma";

import encrypt from "@/app/lib/encrypt"
import decrypt from "@/app/lib/decrypt"


interface RequestBody{
    encryptedData : string

}



export async function PUT(request: Request, {params}: {params : {questionID : string}}){
    try {
        const body : RequestBody = await request.json()
        const {...data} = decrypt(body.encryptedData)
        console.debug(data)
        const result = await prisma.question.update({
            where : {
                id : params.questionID
            }, data : {
                title : data.title,
                Description : data.Description,
                original_answer : data.original_answer,
                points : parseInt(data.points.toString()),
                scenarioId : data.scenario_id || null
            }
        })

            
        const encryptedData = encrypt({status : true})
        return new Response(JSON.stringify({ encryptedData }))
        // return new Response(JSON.stringify({status : true}))
    } catch (error) {
        console.debug(error)
        const encryptedData = encrypt({status : false, error : "Sorry! There is an error while updaing question.Please try again later"})
        return new Response(JSON.stringify({ encryptedData }))
        // return new Response(JSON.stringify({status : false, error : "Sorry! There is an error while updaing question.Please try again later"}))
    }

}