import prisma from "@/app/lib/prisma";


import encrypt from "@/app/lib/encrypt"
import decrypt from "@/app/lib/decrypt"


function commaSeparatedStringToArray(str) {
    return str.split(',');
}


function arraysHaveElements(array1, array2) {
    return array1.length > 0 && array2.length > 0;
}


function getConfigurations(){
    return prisma.config.findMany({})

}


function getAllAnswersSubmitted(question_id){
    return prisma.answer.findMany({
        where : {
            questionId : question_id,
            submissionStatus: true,
        }
    })
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
    // console.debug(question)
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

        let all_answers = await getAllAnswersSubmitted(question);

        // console.debug(all_answers)

        let configurations = await getConfigurations().then((data) => data);



        

        let first_attempt = configurations.find((element) => element.key === 'first_attempt').value;
        let second_attempt = configurations.find((element) => element.key === 'second_attempt').value;
        let third_attempt = configurations.find((element) => element.key === 'third_attempt').value;

        
        // points = all_answers.length == 0 ? points + parseInt(first_attempt) : all_answers.length == 1 ? points + parseInt(second_attempt) : all_answers.length == 2 ? points + parseInt(third_attempt) : points + 0;
        if(all_answers.length == 0){
            points = points + parseInt(first_attempt);
        } else if (all_answers.length == 1){
            points = points + parseInt(second_attempt);
        } else if (all_answers.length == 2){
            points = points + parseInt(third_attempt);
        } else{
            points = points + 0;
        }

        // console.debug(first_attempt, second_attempt, third_attempt);


        // console.debug(points)

        let result ;

        // check if user try to submit answer
        if(checkExisingAnswer.answers.length) {

            // console.debug("Submission")
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