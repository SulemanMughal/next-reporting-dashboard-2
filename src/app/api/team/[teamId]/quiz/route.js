

import axios from 'axios';

export async function GET(request ,{params}){
    try {
        const quizId = await axios.get(`${process.env.LOCAL_API}/api/team/${params.teamId}`);
        if(quizId.data.quizId === null){
            return new Response(JSON.stringify({status : false}))
        }
        else{
            const quizInfo = await axios.get(`${process.env.LOCAL_API}/api/quiz/${quizId.data.quizId}/team/${params.teamId}`);
            return new Response(JSON.stringify({status : true , questions : quizInfo.data.result.questions , count : quizInfo.data.result.questions.length, startAt : quizInfo.data.result.startAt, endAt : quizInfo.data.result.endAt, quizId : quizId.data.quizId }))
        }
    } catch (error) {
        console.debug(error)
        return new Response(JSON.stringify({status : false}))
    }
}