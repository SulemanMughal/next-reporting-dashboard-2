import prisma from "@/app/lib/prisma";


export async function PUT(request , {params}){
    try{
        
        const quiz_id = (params.id)
        const body =   await request.json()
        const result = await prisma.quiz.update({
            where: {
              id: quiz_id,
            },
            data: {
                questions: {
                    create: {
                        title : body.title,
                        original_answer: body.original_answer,
                        points: parseInt(body.points),
                        Description: body.Description,
                    },
              },
            },
            include: {
                questions: true,
            },
        })

        // console.debug(result)

        return new Response(JSON.stringify({status : true, result}))
    }
    catch (err){
        console.error(err)
        return new Response(JSON.stringify({status : false}))
    }

}
