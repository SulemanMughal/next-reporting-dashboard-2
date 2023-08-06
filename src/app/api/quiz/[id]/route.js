import prisma from "@/app/lib/prisma";




export async function GET(request , {params}){

    // const body = await request.par


    // console.debug(params.id)

    try {
        // const results = await prisma.quiz.findMany({
        //     select : {
        //         id : true,
        //         title : true,
        //         status : true,
        //         startAt : true,
        //         endAt : true,
        //         _count: {
        //             select: { 
        //                 questions: true 
        //             },
        //         },
        //         teams : {
        //             select : {
        //                 name : true
        //             }
        //         }
        //     }
        // })
        const results = await prisma.quiz.findUnique({
            where : {
                id : parseInt(params.id)
            }, select : {
                title : true,
                questions : {
                    orderBy : {
                        question_index : 'asc'
                    }, select : {
                        id     : true,
                        title : true,
                        Description : true,
                        points  : true,
                        option_1 : true,
                        option_2 : true,
                        option_3 : true,
                        option_4 : true,
                        option_5 : true, 
                        option_6 : true,
                        original_answer : true,
                        question_index  : true,
                        type  : true,
                        status : true,
                        answers : {
                            select : {
                                submitAnswer : true
                            }
                        }
                    }
                },
                teams : {
                    select : {
                        name : true
                    }
                }
            }
        })
        return new Response(JSON.stringify({status : true , results }))
    } catch (error) {
        console.debug(error)
        return new Response(JSON.stringify({status : false}))
    }
}