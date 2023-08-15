import prisma from "@/app/lib/prisma";


// import encrypt from "@/app/lib/encrypt"


import decrypt from "@/app/lib/decrypt"

import encrypt from "@/app/lib/encrypt"


interface RequestBody{
    // id : string;
    encryptedData : string
}



export async function POST(request: Request){


    try {
        const body : RequestBody = await request.json()

        // console.debug( decrypt( body.encryptedData    ))
        const member = decrypt( body.encryptedData)

        const team = await prisma.team.update({
            where: { 
                id: member.id 
            },
            data : {
                users : {
                    connect : [
                        {
                            id : member.user_id
                        }
                    ]
                }

            },
            include : {
                users : {
                    select  : {
                        email : true,
                        id : true
                    }
                }
            }
        })

        const {...result} = team;
        
        const encryptedData = encrypt({status : true, result});
        return new Response(JSON.stringify({ encryptedData }))
        // return new Response(JSON.stringify({status : true, result}))
        
    } catch (error) {
        console.debug(error)
        const encryptedData = encrypt({status : false, error : `Sorry! There is an error while adding member. Please try again after some time`});
        return new Response(JSON.stringify({ encryptedData }))
        // return new Response(JSON.stringify({status : false, error : `Sorry! There is an error while adding member. Please try again after some time`}))
    }
}


