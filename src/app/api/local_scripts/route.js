
import prisma from "@/app/lib/prisma";




import encrypt from "@/app/lib/encrypt"
import decrypt from "@/app/lib/decrypt"


export async function POST(request){
    const body  = await request.json()
    // console.debug(body)
    const data = decrypt(body.encryptedData)
    try {
        const result = await prisma.attackScript.create({
            data : {
                name : data.name,
                script_category : data.script_id,
                desc : data.desc
            }
        })
        
        const encryptedData = encrypt({status : true, result})
        return new Response(JSON.stringify({ encryptedData }))
        // return new Response(JSON.stringify({status : true, result}))
    } catch (error) {
        console.debug(error)
        const encryptedData = encrypt({status : false})
        return new Response(JSON.stringify({ encryptedData }))
        // return new Response(JSON.stringify({status : false}))
    }

}


export async function GET(request ){
    try {
        const scripts = await prisma.attackScript.findMany({})
        const encryptedData = encrypt({scripts : scripts})
        return new Response(JSON.stringify({encryptedData}))
        // return new Response(JSON.stringify(scripts))
    } catch (error) {
        console.debug(error)
        const encryptedData = encrypt({status : false})
        return new Response(JSON.stringify({encryptedData}))
        // return new Response(JSON.stringify({status : false}))
    }
}