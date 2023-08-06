import prisma from "@/app/lib/prisma";


export async function PUT(request , {params}){

    
    

    const quiz_id = parseInt(params.id)
    const body =   await request.json()

    try{
        const result = await prisma.quiz.update({
            where: {
              id: quiz_id,
            },
            data: {
                questions: {
                    create: {
                        title : body.title,
                        option_1: body.option_1,
                        option_2: body.option_2,
                        option_3: body.option_3,
                        option_4:  body.option_4,
                        option_5: body.option_5,
                        option_6: body.option_6 ,
                        original_answer: body.original_answer,
                        points: body.points,
                        Description: body.Description,
                        status : body.status,
                        question_index : body.question_index
                    },
              },
            },
            // include: {
            //     questions: true,
            //   },
        })

        // console.debug(result)

        return new Response(JSON.stringify({status : true}))
    }
    catch (err){
        console.error(err)
        return new Response(JSON.stringify({status : false}))
    }

}
