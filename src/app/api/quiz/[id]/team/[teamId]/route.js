



import prisma from "@/app/lib/prisma";


export async function PUT(request , {params}){

    const quiz_id = parseInt(params.id)
    const team_id = parseInt(params.teamId)

    // console.debug(params)
    try{

        const result = await prisma.quiz.update({
            where: {
              id: quiz_id,
            },
            data: {
                teams: {
                connect: {
                  id: team_id,
                },
              },
            },
            include: {
                teams: true,
            },
          })
        
        //   console.debug(result)

        return new Response(JSON.stringify({status : true}))
    }
    catch(err){
        console.error(err)
        return new Response(JSON.stringify({status : false}))
    }

}


// GET publish quiz by quiz-id and team-id
// quiz-start-time
// quiz-end-time
// quiz title
// published-questions {title, description, points, option_1, option_2, option_3, option_4, option_5, option_6, type}
// answers submitted by team-id

export async function GET(request , {params}){
  const quiz_id = parseInt(params.id)
  const team_id = parseInt(params.teamId)
  try {
    const result  = await prisma.quiz.findUnique({
      where: {
        id: quiz_id,
        status : "publish"
      },
      select : {
        startAt : true,
        endAt : true,
        title : true,
        questions : {
          where:{
            status : "publish"
          },
          select:{
            title: true,
            Description: true,
            points: true,
            option_1: true,
            option_2: true,
            option_3: true,
            option_4: true,
            option_5: true,
            option_6: true,
            type: true,
            answers : {
              where : {
                teamId : team_id,
              }
            }
          }
        }
      }
    })
    return new Response(JSON.stringify({status : true , result }))
  } catch (error) {
    console.debug(error)
    return new Response(JSON.stringify({status : false}))
  }
}