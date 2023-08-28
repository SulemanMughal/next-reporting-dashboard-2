import prisma from "@/app/lib/prisma";


import encrypt from "@/app/lib/encrypt"
import decrypt from "@/app/lib/decrypt"





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
            // orderBy: [
            //     {
            //       id: 'desc',
            //     }
            //   ],
            where : {
                id : (params.id)
            }, select : {
                title : true,
                questions : {
                    // orderBy : {
                    //     question_index : 'asc'
                    // },
                    // orderBy: {
                    //     id: 'desc',
                    // },
                    select : {
                        
                        id     : true,
                        title : true,
                        Description : true,
                        points  : true,
                        // option_1 : true,
                        // option_2 : true,
                        // option_3 : true,
                        // option_4 : true,
                        // option_5 : true, 
                        // option_6 : true,
                        original_answer : true,
                        scenario : true,
                        // question_index  : true,
                        // type  : true,
                        // status : true,
                        answers : {
                            select : {
                                submitAnswer : true
                            }
                        },
                        scenario : {
                            select : {
                                id  : true,
                                name : true,
                                desc : true,
                                difficulty : true,
                                category : true,
                                questions  : {
                                    select : {
                                        points : true
                                    }
                                }
                            }
                        },
                    } 
                },
                teams : {
                    select : {
                        name : true
                    }
                }
            }
        })
        
        const encryptedData = encrypt({status : true , results})
        return new Response(JSON.stringify({ encryptedData }))
        // return new Response(JSON.stringify({status : true , results }))
    } catch (error) {
        console.debug(error)
        const encryptedData = encrypt({status : false})
        return new Response(JSON.stringify({ encryptedData }))
        // return new Response(JSON.stringify({status : false}))
    }
}