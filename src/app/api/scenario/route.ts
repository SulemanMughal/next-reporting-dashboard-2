

import prisma from "@/app/lib/prisma";




import encrypt from "@/app/lib/encrypt"
import decrypt from "@/app/lib/decrypt"


interface RequestBody{
    encryptedData : string;

}


export async function POST(request: Request){
    const body : RequestBody = await request.json()
    const {...data} = decrypt(body.encryptedData)
    try {
        const scenario = await prisma.scenario.create({
            data : {
                name : data.name,
                desc : data.desc,
                difficulty  : data.difficulty,
                tags : data.tags
    
            }
        })
        
        const encryptedData = encrypt({status : true})
        return new Response(JSON.stringify({ encryptedData }))
        // return new Response(JSON.stringify({status : true}))

    } catch (error) {
        console.debug(error)
        const encryptedData = encrypt({status : false, error : "Sorry! There is an error while creating scenario.Please try again later"})
        return new Response(JSON.stringify({ encryptedData }))
        // return new Response(JSON.stringify({status : false, error : "Sorry! There is an error while creating scenario.Please try again later"}))
    }
}



export async function GET(request: Request){
    try {
        const scenarios = await prisma.scenario.findMany({
            select : {
                id : true,
                name : true,
                tags : true,
                category : true,
                difficulty : true,
                desc : true,
                status : true,
                questions  : {
                    select : {
                        points : true
                    }
                },
                files : true
            }
        })
        const encryptedData = encrypt({status : true , scenarios})
        return new Response(JSON.stringify({ encryptedData }))
    } catch (error) {
        console.debug(error)
        const encryptedData = encrypt({status : false, error : "Sorry! There is an error while fethcing challenges.Please try again later"})
        return new Response(JSON.stringify({ encryptedData }))
    }
}