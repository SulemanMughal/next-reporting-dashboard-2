import prisma from "@/app/lib/prisma";
export async function POST(request ){
    const body = await request.json()
    try {
        const results = await prisma.user.findUnique({
            where: {
                id: body.user,
            },
            select: {
                team: {
                    select : {
                        id : true,
                        name : true,
                        quiz : {
                            where : {
                                status : "publish"
                            },
                            select:{
                                id : true,
                                title : true,
                                startAt : true,
                                endAt : true,
                                activeIndex : true,
                                questions : {
                                    where : {
                                        status : "publish"
                                    },
                                    select : {
                                        id : true,
                                        
                                        answers : {
                                            select : {
                                                checkStatus : true
                                            }
                                        }
                                    }
                                },
                                // select : {
                                //     questions : {
                                //         where : {
                                //             status : "publish"
                                //         }
                                //         // select : {
                                //         //     id : true
                                //         // }
                                //     }
                                // },
                                // _count : {
                                //     select : {
                                //         questions : {
                                //             where : {
                                //                 status : "publish"
                                //             }
                                //         }
                                //     }
                                // }
                            }
                        }
                    }
                },
            },
        })
        return new Response(JSON.stringify({status : true , results }))
    } catch (error) {
        console.debug(error)
        return new Response(JSON.stringify({status : false}))
    }
}