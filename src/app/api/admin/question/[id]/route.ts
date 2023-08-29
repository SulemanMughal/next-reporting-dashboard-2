import prisma from "@/app/lib/prisma";
import encrypt from "@/app/lib/encrypt"
import decrypt from "@/app/lib/decrypt"
import { calcFileSize } from "@/app/lib/helpers";

interface RequestBody{
    encryptedData : string;
}




export async function PUT(request: Request , params : {params : {id : string}}){
    try {
        // console.debug(params.params.id)
        const {...body} = await request.json() as RequestBody
        const {...data} = decrypt(body.encryptedData)
        // console.debug(data)
        const updatedAnswer = await prisma.question.update({
            where : {
                id : params.params.id
            },
            data : {
                
                original_answer : data.answer,
                Description : data.desc
            }
        })
        // const result = await prisma.scenario.findUnique({
        //     where : {
        //         id : params.params.id
        //     }, select : {
        //         name : true,
        //         desc : true,
        //         tags : true, 
        //         difficulty : true,
        //         os_type : true,
        //         files : true,
        //         questions : {
        //             where: {
        //                 scenario: {
        //                     id :params.params.id,   
        //                 }
        //             },select : {
        //                 id : true,
        //                 points : true,
        //                 Description  : true,
        //                 original_answer : true,
        //             }
        //         }
        //     }
        // })
        // const fileSizes = result.files.map((file) => (
        //     calcFileSize(file.filepath)
        // ))  

        
        // console.debug(files)
        const encryptedData = encrypt({status : true })
        return new Response(JSON.stringify({ encryptedData }))
    } catch (error) {
        console.debug(error)
        const encryptedData = encrypt({status : false, error : "Sorry! There is an error while updating. Please try again later"})
        return new Response(JSON.stringify({ encryptedData }))
    }
}