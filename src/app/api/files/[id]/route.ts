
import prisma from "@/app/lib/prisma";
import encrypt from "@/app/lib/encrypt"



import { calcFileSize } from "@/app/lib/helpers"

export async function GET(request: Request, {params} : {params : {id : string}}){
    try {
        // console.debug(params)
        const file = await prisma.file.findUnique({
            where : {
                id : params.id
            },
            select : {
                filepath : true,
            }
        })
        // console.debug(file)
        // console.debug(calcFileSize(file?.filepath))
        // console.debug(calcFileSize(file?.filepath))
        // const data = {}
        const encryptedData = encrypt({status : true, size : calcFileSize(file?.filepath)})
        return new Response(JSON.stringify({ encryptedData }))

    } catch (error) {
        console.debug(error)
        const encryptedData = encrypt({status : false, error : "Sorry! There is an error while fetching file info.Please try again later"})
        return new Response(JSON.stringify({ encryptedData }))
    }
}