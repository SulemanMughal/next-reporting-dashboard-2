// Get user details by user-id


import prisma from "@/app/lib/prisma";
import encrypt from "@/app/lib/encrypt"
// import decrypt from "@/app/lib/decrypt"





export async function GET(request: Request, {params} : {params : {id : string}}){
    try {
        // console.debug({params})

        // { params: { id: '4325ed5c-3c9c-4cf4-af8f-73ca09e071eb' } }
        const result = await prisma.user.findUnique({
            where : {
                id : params.id
            },
            select : {
                id : true,
                name : true,
                country : true,
                team : {
                    select : {
                        name : true,
                        // answers : {
                        //     select : {
                        //         obtainedPoints : true,
                        //     }
                        // }
                    }
                },
                answers : {
                    where : {
                        submissionStatus : true,
                    },
                    select : {
                        obtainedPoints : true,
                        submittedAt  : true,
                        question : {
                            select :{
                                scenario : {
                                    select : {
                                        category : true
                                    }
                                }
                            }
                        }
                    }
                }
               
            }
        })

        // const result = await prisma.user.findUnique({
        //     where : {
        //         id : params.id
        //     },
        //     select : {
        //         id : true,
        //         name : true,
        //         email : true,
        //         country : true,
        //         team : {
        //             select : {
        //                 id : true,
        //                 quiz : {
        //                     select:{
        //                         id : true,
        //                         questions : {
        //                             select : {
        //                                 id : true,
        //                                 points : true,
        //                                 scenario : {
        //                                     select : {
        //                                         name : true,
        //                                         category : true,
        //                                         questions : {
        //                                             select : {
        //                                                 points: true,
        //                                             }
        //                                         }
        //                                     }
        //                                 },
        //                                 answers : {
        //                                     where : {
        //                                         userId : params.id,
        //                                         submissionStatus : true
        //                                     }, select : {
        //                                         submissionStatus : true,
        //                                         obtainedPoints : true,
        //                                         user : {
        //                                             select : {
        //                                                 id : true,
        //                                             }
        //                                         }
        //                                     }
        //                                 }
        //                             }
        //                         }
        //                     }
        //                 }
        //             }
        //         }
        //     },
            
        // })
        // console.debug({result})

        // find out team by this user
        
        const encryptedData = encrypt({status : true , result })
        return new Response(JSON.stringify({ encryptedData }))
    } catch (error) {
        console.debug(error)
        const encryptedData = encrypt({status : false, error : "Sorry! There is an error while fetching data.Please try again later"})
        return new Response(JSON.stringify({ encryptedData }))
    }
}