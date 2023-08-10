import prisma from "@/app/lib/prisma";


export async function PUT(request: Request, params : {params : {id : string, questionID : string}}){
    
    try {

        // await prisma.quiz.update({
        //     where : {
        //         id : 
        //     }
        // })

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
        
        return new Response(JSON.stringify({status : true}))
    } catch (error) {
        console.debug(error)
        return new Response(JSON.stringify({status : false, error : error.message}))
    }


}
