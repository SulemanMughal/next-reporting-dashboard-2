

import prisma from "@/app/lib/prisma";


interface RequestBody{
    name : string;
    desc : string;
    difficulty : string;
    tags : string;

}


export async function POST(request: Request){
    const body : RequestBody = await request.json()

    // console.debug(body)

    try {
        const scenario = await prisma.scenario.create({
            data : {
                name : body.name,
                desc : body.desc,
                difficulty  : body.difficulty,
                tags : body.tags
    
            }
        })
        return new Response(JSON.stringify({status : true}))

    } catch (error) {
        console.debug(error)
        return new Response(JSON.stringify({status : false, error : "Sorry! There is an error while creating scenario.Please try again later"}))
    }
}



export async function GET(request: Request){
    try {

        const scenarios = await prisma.scenario.findMany({
            select : {
                id : true,
                name : true
            }
        })
        
        return new Response(JSON.stringify({status : true , scenarios}))
    } catch (error) {
        console.debug(error)
        return new Response(JSON.stringify({status : false, error : error.message}))
    }
}