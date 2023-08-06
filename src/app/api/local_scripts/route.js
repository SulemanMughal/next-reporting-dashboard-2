
import prisma from "@/app/lib/prisma";


export async function POST(request){
    const body  = await request.json()
    try {
        const result = await prisma.attackScript.create({
            data : {
                name : body.name,
                script_category : body.script_id,
                desc : body.desc
            }
        })
        return new Response(JSON.stringify({status : true, result}))
    } catch (error) {
        console.debug(error)
        return new Response(JSON.stringify({status : false}))
    }

}


export async function GET(request ){
    try {
        const scripts = await prisma.attackScript.findMany({})
        return new Response(JSON.stringify(scripts))
    } catch (error) {
        console.debug(error)
        return new Response(JSON.stringify({status : false}))
    }
}