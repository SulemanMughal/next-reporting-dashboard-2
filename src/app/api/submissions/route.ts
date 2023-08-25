
import prisma from "@/app/lib/prisma";

import encrypt from "@/app/lib/encrypt"


export async function GET(request: Request){
    try {
        // console.debug("Get All Submissions")
        const submissions = await prisma.answer.findMany({
            select : {
                user : {
                    select : {
                        name : true
                    }
                },
                obtainedPoints : true,
                team : {
                    select : {
                        name : true,
                        answers : {
                            select : {
                                obtainedPoints : true,
                            }
                        }
                    }
                },
                question : {
                    select : {
                        scenario : {
                            select : {
                                name : true,
                                category : true
                            }
                        }
                    }
                }
            }
        })
        // console.debug(submissions)

        const encryptedData = encrypt({status : true , submissions})
        return new Response(JSON.stringify({ encryptedData }))
    } catch (error) {
        console.debug(error)
        const encryptedData = encrypt({status : false, error : 'Sorry! There is an error while fetching data. Please try again after some time.'})
        return new Response(JSON.stringify({ encryptedData }))
    }

}