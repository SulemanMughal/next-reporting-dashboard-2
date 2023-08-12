import prisma from "@/app/lib/prisma";



interface RequestBody{
    id : string;
    user_id : string
}



export async function POST(request: Request){
    try {
        const body : RequestBody = await request.json()

        const team = await prisma.team.update({
            where: { 
                id: body.id 
            },
            data : {
                users : {
                    connect : [
                        {
                            id : body.user_id
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

        return new Response(JSON.stringify({status : true, result}))
        
    } catch (error) {
        console.debug(error)
        return new Response(JSON.stringify({status : false, error : `Sorry! There is an error while adding member. Please try again after some time`}))
    }
}


