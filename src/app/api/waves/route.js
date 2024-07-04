import prisma from "@/app/lib/prisma";




export async function GET(request ){
    try{
        const waves = await prisma.wave.findMany();
        return new Response(JSON.stringify({ waves : waves, status : true}))
    } catch(error){
        console.debug(error)
        return new Response(JSON.stringify({error : error, status : false}))
    }
}



export async function POST(request ){
    try{
        const body = await request.json();
        console.debug(body)
        const waves = await prisma.wave.findMany();
        return new Response(JSON.stringify({ waves : waves, status : true}))
    } catch(error){
        console.debug(error)
        return new Response(JSON.stringify({error : error, status : false}))
    }
}