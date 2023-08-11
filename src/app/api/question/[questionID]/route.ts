

import prisma from "@/app/lib/prisma";


interface RequestBody{
    title : string;
    Description : string;
    original_answer : string;
    points : number;
    scenario_id : string;

}



export async function PUT(request: Request, {params}: {params : {questionID : string}}){
    try {
        const body : RequestBody = await request.json()
        const result = await prisma.question.update({
            where : {
                id : params.questionID
            }, data : {
                title : body.title,
                Description : body.Description,
                original_answer : body.original_answer,
                points : parseInt(body.points.toString()),
                scenarioId : body.scenario_id || null
            }
        })

        return new Response(JSON.stringify({status : true}))
    } catch (error) {
        console.debug(error)
        return new Response(JSON.stringify({status : false, error : "Sorry! There is an error while updaing question.Please try again later"}))
    }

}