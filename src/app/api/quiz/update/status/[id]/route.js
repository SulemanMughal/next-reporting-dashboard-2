import prisma from "@/app/lib/prisma";


export async function PUT(request , {params}){    
    const {status}  = await request.json()
    const quiz_id = parseInt(params.id)
    try{
      const updateQuiz = await prisma.quiz.update({
        where: {
          id: quiz_id,
        },
        data: {
          status: status,
        },
      })
      return new Response(JSON.stringify({status : true}))
    }
    catch (err){
        console.error(err)
        return new Response(JSON.stringify({status : false}))
    }

}
