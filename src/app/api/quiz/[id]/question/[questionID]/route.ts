import prisma from "@/app/lib/prisma";


import encrypt from "@/app/lib/encrypt"
import decrypt from "@/app/lib/decrypt"


export async function PUT(request: Request, params : {params : {id : string, questionID : string}}){
    
    try {

        // await prisma.quiz.update({
        //     where : {
        //         id : 
        //     }
        // })

        // console.debug(params)

        // console.debug(params.params.questionID)

        const record = await prisma.quiz.update({
            where : {
                id : params.params.id
            },
            data: {
                questions: {
                    disconnect : [
                        {
                            id : params.params.questionID
                        }
                    ]
                }
            },
        })

        // console.debug(record)

        // console.debug(params.params.id)
        
        // return new Response(JSON.stringify({status : true}))
        
        const encryptedData = encrypt({status : true})
        return new Response(JSON.stringify({ encryptedData }))
    } catch (error) {
        console.debug(error)
        const encryptedData = encrypt({status : false, error : error.message})
        return new Response(JSON.stringify({ encryptedData }))
        // return new Response(JSON.stringify({status : false, error : error.message}))
    }


}
