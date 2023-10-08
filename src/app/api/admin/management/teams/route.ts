import prisma from "@/app/lib/prisma";
import encrypt from "@/app/lib/encrypt";
// import decrypt from "@/app/lib/decrypt"




// Get All Teams
export async function GET(request : Request){
    try {
        const teams = await prisma.team.findMany({
            select : {
                id : true,
                name : true,
                createdAt : true,
                // users : true,
                _count: {
                    select: { users: true },
                },
            }
        })
        // const encryptedData = ({status : true, teams});
        // console.debug(encryptedData)
        const encryptedData = encrypt({status : true, teams});
        return new Response(JSON.stringify({ encryptedData }))
    } catch (error) {
        console.debug(error)
        const encryptedData = encrypt({status : false, error : `Sorry! There is an error while fetching teams. Please try again after some time`});
        return new Response(JSON.stringify({encryptedData}))

    }
}