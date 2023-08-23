import prisma from "@/app/lib/prisma";


import encrypt from "@/app/lib/encrypt"
import decrypt from "@/app/lib/decrypt"


export async function POST(request ){
    const body = await request.json()
    const { user, quiz, team, qIndex, cIndex } = body
    if(cIndex){
        try {
            const results = await prisma.user.findUnique({
                where : {
                    id : user
                }, select : {
                    team :  {
                        where : {
                            id : team
                        }, select : {
                            quiz : {
                                where : {
                                    id : quiz,
                                    activeIndex : cIndex
                                }, select : {
                                    questions : {
                                        where : {
                                            question_index : cIndex,
                                            status : "publish",
                                        }, select : {
                                            id: true,
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
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            })
            // console.debug(results)
            return new Response(JSON.stringify({status : true , results}))
        } catch (error) {
            console.debug(error)
            return new Response(JSON.stringify({status : false}))
        }
    }
    else if(qIndex){
        console.debug("Any Index Question")
        try {
            return new Response(JSON.stringify({status : true}))
        } catch (error) {
            console.debug(error)
            return new Response(JSON.stringify({status : false}))
        }
    }
    else{
        console.debug("No Index Question")
        return new Response(JSON.stringify({status : false}))
    }

    
}


// admin get all quizes

export async function GET(request ){
    try {
        const results = await prisma.quiz.findMany({
            select : {
                id : true,
                title : true,
                startAt : true,
                endAt : true,
                questions : {
                    select : {
                        points : true,
                        scenario  : {
                            select : {
                                name : true,
                            }
                        } 
                    }
                },
                _count: {
                    select: { 
                        questions: true 
                    },
                },
                teams : {
                    select : {
                        name : true,
                        users : {
                            select : {
                                email : true
                            }
                        },
                        answers  : {
                            select : {
                                obtainedPoints : true
                            }
                        }
                    }
                }
            }
        })
        
        const encryptedData = encrypt({status : true , results:results})
        return new Response(JSON.stringify({ encryptedData }))

        // return new Response(JSON.stringify({status : true , results:results}))
    } catch (error) {
        console.debug(error)
        const encryptedData = encrypt({status : false})
        return new Response(JSON.stringify({ encryptedData }))
        // return new Response(JSON.stringify({status : false}))
    }
}