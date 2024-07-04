import prisma from "@/app/lib/prisma";




export async function GET(request ){

    try{
        // const response = await prisma.user.findMany();

        const waves = await prisma.wave.findMany();
        // const encryptedData = waves.map(wave => {
        //     // Perform encryption logic here
        //     return wave;
        // });

        console.debug(waves)
        return new Response(JSON.stringify({ waves : waves, status : true}))
        // return response;
    } catch(error){
        console.debug(error)
        return new Response(JSON.stringify({error : error, status : false}))
    }

}