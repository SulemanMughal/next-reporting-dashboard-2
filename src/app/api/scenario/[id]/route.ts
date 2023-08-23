import prisma from "@/app/lib/prisma";

import encrypt from "@/app/lib/encrypt"
import decrypt from "@/app/lib/decrypt"

interface RequestBody{
    encryptedData : string;
}




export async function PUT(request: Request , params : {params : {id : string}}){
    
    try {
        const body : RequestBody = await request.json()

        // console.debug(params.params.id)

        const {...data} = decrypt(body.encryptedData)
        // console.debug(data)
        const scenario = await prisma.scenario.update({
            where : {
                id : params.params.id
            },
            data : {
                name : data.name,
                desc : data.desc,
                difficulty  : data.difficulty,
                tags : data.tags
    
            }
        })
        
        const encryptedData = encrypt({status : true})
        return new Response(JSON.stringify({ encryptedData }))
    } catch (error) {
        console.debug(error)
        const encryptedData = encrypt({status : false, error : "Sorry! There is an error while creating scenario.Please try again later"})
        return new Response(JSON.stringify({ encryptedData }))
    }
}