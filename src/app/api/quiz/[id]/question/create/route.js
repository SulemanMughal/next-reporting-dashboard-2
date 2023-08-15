import prisma from "@/app/lib/prisma";




import encrypt from "@/app/lib/encrypt"
import decrypt from "@/app/lib/decrypt"

export async function PUT(request , {params}){
    
    
    try{
        
        const quiz_id = (params.id)
        const body =   await request.json()
        const {...data } = decrypt(body.encryptedData)
        const result = await prisma.quiz.update({
            where: {
              id: quiz_id,
            },
            data: {
                questions: {
                    create: {
                        title : data.title,
                        original_answer: data.original_answer,
                        points: parseInt(data.points),
                        Description: data.Description,
                        scenario :{
                            connect : {
                                id : data.scenario_id
                            }
                        }
                    },    
              },
            },
            include: {
                questions: true,
            },
        })


        const encryptedData = encrypt({status : true, result})
        return new Response(JSON.stringify({ encryptedData }))
        
        // return new Response(JSON.stringify({status : true, result}))
    }
    catch (err){
        console.error(err)
        
        const encryptedData = encrypt({status : false})
        return new Response(JSON.stringify({ encryptedData }))

        // return new Response(JSON.stringify({status : false}))
    }

}
