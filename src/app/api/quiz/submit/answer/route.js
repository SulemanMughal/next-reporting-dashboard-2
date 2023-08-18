import prisma from "@/app/lib/prisma";


import encrypt from "@/app/lib/encrypt"
import decrypt from "@/app/lib/decrypt"


function commaSeparatedStringToArray(str) {
    return str.split(',');
}


function arraysHaveElements(array1, array2) {
    return array1.length > 0 && array2.length > 0;
}


function arraysHaveSameElementsIgnoreCaseAndTrim(array1, array2) {
    const trimLowerCaseArray1 = array1.map(element => element.trim().toLowerCase());
    const trimLowerCaseArray2 = array2.map(element => element.trim().toLowerCase());
  
    const sortedTrimLowerCaseArray1 = trimLowerCaseArray1.slice().sort();
    const sortedTrimLowerCaseArray2 = trimLowerCaseArray2.slice().sort();
  
    return JSON.stringify(sortedTrimLowerCaseArray1) === JSON.stringify(sortedTrimLowerCaseArray2);
}

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

        const arrOriginalAnswer = commaSeparatedStringToArray(correct_answer.original_answer);
        const arrSubmitAnswer = commaSeparatedStringToArray(answer)
        let rightStatus = arraysHaveSameElementsIgnoreCaseAndTrim(arrOriginalAnswer, arrSubmitAnswer)
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
    }
    catch (err){
        console.error(err)
        const encryptedData = encrypt({status : false})
        return new Response(JSON.stringify({ encryptedData }))
    }
}   