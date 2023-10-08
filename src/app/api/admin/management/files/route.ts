import prisma from "@/app/lib/prisma";
import encrypt from "@/app/lib/encrypt";
// import decrypt from "@/app/lib/decrypt"




// Get All Files
export async function GET(request : Request){
    try {
        const files = await prisma.file.findMany({
            select : {
                id : true,
                filename : true,
                filepath : true,
                password : true,
                createdAt : true,
                scenario  : {
                    select : {
                        name : true,
                    }
                }
            }
        })
        // const encryptedData = ({status : true, teams});
        // console.debug(encryptedData)
        const encryptedData = encrypt({status : true, files});
        return new Response(JSON.stringify({ encryptedData }))
    } catch (error) {
        console.debug(error)
        const encryptedData = encrypt({status : false, error : `Sorry! There is an error while fetching teams. Please try again after some time`});
        return new Response(JSON.stringify({encryptedData}))

    }
}