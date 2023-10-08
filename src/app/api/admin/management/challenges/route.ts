import prisma from "@/app/lib/prisma";
import encrypt from "@/app/lib/encrypt";


// Get All Challenges
export async function GET(request : Request){
    try {
        const challenges = await prisma.scenario.findMany({
            select : {
                name : true,
                addedAt : true,
                os_type : true,
                difficulty : true,
                status : true,
                tags : true,
                category : true,
                files : {
                    select : {
                        filename : true,
                    }
                },
                _count: {
                    select: { 
                        questions: true 
                    },
                },
            }
        })
        // console.debug(challenges)
        const encryptedData = encrypt({status : true, challenges});
        return new Response(JSON.stringify({ encryptedData }))
    } catch (error) {
        console.debug(error)
        const encryptedData = encrypt({status : false, error : `Sorry! There is an error while fetching challenges. Please try again after some time`});
        return new Response(JSON.stringify({encryptedData}))

    }
}