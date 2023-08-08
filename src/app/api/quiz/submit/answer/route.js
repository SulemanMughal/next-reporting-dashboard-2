import prisma from "@/app/lib/prisma";


export async function POST(request ){
    const body = await request.json()
    const { question  , answer , team , quiz , user} = body
    try{
        const checkExisingAnswer  = await prisma.question.findUnique({
            where : {
                id : parseInt(question)
            }, select : {
                answers : {
                    where : {
                        teamId : parseInt(team)
                    }
                }
            }
        })

        // console.debug(checkExisingAnswer)

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
                    submissionStatus  : true,
                    checkStatus : rightStatus,
                    obtainedPoints : points,
                    question : {
                        connect : {
                            id : parseInt(question)
                        }
                    },
                    team : {
                        connect : {
                            id : parseInt(team)
                        }
                    },
                    user : {
                        connect : {
                            id : parseInt(user)
                        }
                    }
                }, select : {
                    submissionStatus : true,
                    checkStatus : true
                }
            })
        } else{
             result = await prisma.answer.create({
                data:{
                    submitAnswer : answer,
                    submissionStatus  : true,
                    checkStatus : rightStatus,
                    obtainedPoints : points,
                    question : {
                        connect : {
                            id : parseInt(question)
                        }
                    },
                    team : {
                        connect : {
                            id : parseInt(team)
                        }
                    },
                    user : {
                        connect : {
                            id : parseInt(user)
                        }
                    }
                }, select : {
                    submissionStatus : true,
                    checkStatus : true
                }
            })


            
        }

        // let cQuestion = await prisma.quiz.findUnique({
        //     where : {
        //         id : parseInt(quiz)
        //     }, select : {
        //         activeIndex : true
        //     }
        // })
        // await prisma.quiz.update({
        //     where : {
        //         id : parseInt(quiz)
        //     }, data : {
        //         activeIndex : cQuestion.activeIndex + 1
        //     }
        // })
        return new Response(JSON.stringify({status : true , result}))

        
    }
    catch (err){
        console.error(err)
        return new Response(JSON.stringify({status : false}))
    }
}   