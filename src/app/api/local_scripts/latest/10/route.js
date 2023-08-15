
import prisma from "@/app/lib/prisma";


import encrypt from "@/app/lib/encrypt"
import decrypt from "@/app/lib/decrypt"


export async function GET(request ){
    try {
        const scripts = await prisma.attackScript.findMany({
            orderBy : [
                {
                    id : 'desc'
                }
            ],
            take : 10
        })
        
        const encryptedData = encrypt({scripts : scripts})
        return new Response(JSON.stringify({ encryptedData }))
        // return new Response(JSON.stringify(scripts))
    } catch (error) {
        console.debug(error)
        const encryptedData = encrypt({status : false})
        return new Response(JSON.stringify({ encryptedData }))
        // return new Response(JSON.stringify({status : false}))
        
    }
}