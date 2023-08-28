import prisma from "@/app/lib/prisma";
import encrypt from "@/app/lib/encrypt"
import { calcFileSize } from "@/app/lib/helpers";

interface RequestBody{
    encryptedData : string;
}




export async function GET(request: Request , params : {params : {id : string}}){
    try {
        // console.debug(params.params.id)
        const result = await prisma.scenario.findUnique({
            where : {
                id : params.params.id
            }, select : {
                name : true,
                desc : true,
                tags : true, 
                difficulty : true,
                os_type : true,
                files : true,
                questions : {
                    where: {
                        scenario: {
                            id :params.params.id,   
                        }
                    },select : {
                        points : true,
                        Description  : true,
                        original_answer : true,
                    }
                }
            }
        })
        const fileSizes = result.files.map((file) => (
            calcFileSize(file.filepath)
        ))  

        
        // console.debug(files)
        const encryptedData = encrypt({status : true , result , fileSizes})
        return new Response(JSON.stringify({ encryptedData }))
    } catch (error) {
        console.debug(error)
        const encryptedData = encrypt({status : false, error : "Sorry! There is an error while fetching challenge.Please try again later"})
        return new Response(JSON.stringify({ encryptedData }))
    }
}