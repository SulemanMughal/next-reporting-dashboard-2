import prisma from "@/app/lib/prisma";
import encrypt from "@/app/lib/encrypt";






// Get All Submissions
export async function GET(request : Request){
    try {
        const submissions = await prisma.answer.findMany({
            select : {
                id : true,
                team : {
                    select : {
                        name : true,
                    }
                },
                user : {
                    select : {
                        name : true,
                    }
                },
                submittedAt : true,
                submissionStatus : true,
                obtainedPoints : true,
            }
        })
        // const encryptedData = ({status : true, teams});
        // console.debug(encryptedData)
        const encryptedData = encrypt({status : true, submissions});
        return new Response(JSON.stringify({ encryptedData }))
    } catch (error) {
        console.debug(error)
        const encryptedData = encrypt({status : false, error : `Sorry! There is an error while fetching teams. Please try again after some time`});
        return new Response(JSON.stringify({encryptedData}))

    }
}