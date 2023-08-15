import prisma from "@/app/lib/prisma";


import encrypt from "@/app/lib/encrypt"
import decrypt from "@/app/lib/decrypt"

export async function POST(request ){
    const body = await request.json()

    const {...data } = decrypt(body.encryptedData)

    const { question  , answer , team , quiz , user} = data
    try{
        const checkExisingAnswer  = await prisma.question.findUnique({
            where : {
                id : (question)
            }, select : {
                answers : {
                    where : {
                        teamId : (team)
                    }
                }
            }
        })
        const correct_answer = await prisma.question.findUnique({
            where : {
                id : question
            }, select : {
                original_answer : true,
                points : true
            }
        })
        
        let rightStatus = correct_answer.original_answer.trim() === answer.trim()
        let points = 0;
        rightStatus ? (points = correct_answer.points) : (points = 0) ;


        let result ;
        if(checkExisingAnswer.answers.length) {
            result = await prisma.answer.update({
                where : {
                    questionId : question,
                    teamId : team,
                    id : checkExisingAnswer.answers[0].id
                },
                data:{
                    submitAnswer : answer,
                    submissionStatus  : rightStatus,
                    obtainedPoints : points,
                    question : {
                        connect : {
                            id : (question)
                        }
                    },
                    team : {
                        connect : {
                            id : (team)
                        }
                    },
                    user : {
                        connect : {
                            id : (user)
                        }
                    }
                }, select : {
                    submissionStatus : true,
                }
            })
        } else{
             result = await prisma.answer.create({
                data:{
                    submitAnswer : answer,
                    submissionStatus  : rightStatus,
                    obtainedPoints : points,
                    question : {
                        connect : {
                            id : (question)
                        }
                    },
                    team : {
                        connect : {
                            id : (team)
                        }
                    },
                    user : {
                        connect : {
                            id : (user)
                        }
                    }
                }, select : {
                    submissionStatus : true,
                }
            })
        }
        
        const encryptedData = encrypt({status : true , result})
        return new Response(JSON.stringify({ encryptedData }))

        // return new Response(JSON.stringify({status : true , result}))

        
    }
    catch (err){
        console.error(err)
        const encryptedData = encrypt({status : false})
        return new Response(JSON.stringify({ encryptedData }))
        // return new Response(JSON.stringify({status : false}))
    }
}   