// Get user details by user-id


import prisma from "@/app/lib/prisma";
import encrypt from "@/app/lib/encrypt"
// import decrypt from "@/app/lib/decrypt"





export async function GET(request: Request){
    try {
        const results = await prisma.user.findMany({
            where : {
                role : {
                    not : 'admin'
                }
            },
            select : {
                id : true,
                name : true,
                country : true,
                team  : {
                    select : {
                        name : true
                    }
                }
            }
        })
        const encryptedData = encrypt({status : true , results })
        return new Response(JSON.stringify({ encryptedData }))
    } catch (error) {
        console.debug(error)
        const encryptedData = encrypt({status : false, error : "Sorry! There is an error while fetching data.Please try again later"})
        return new Response(JSON.stringify({ encryptedData }))
    }
}