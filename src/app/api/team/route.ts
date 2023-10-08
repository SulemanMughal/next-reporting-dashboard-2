import prisma from "@/app/lib/prisma";
import encrypt from "@/app/lib/encrypt";
import decrypt from "@/app/lib/decrypt"
import { ADMIN_USER_TYPE , INFO_LEVEL } from "@/app/helpers/constants"

// import { getSession } from "next-auth/client";
// import { Session } from 'next-auth';
// import { getServerSession } from "next-auth/next"
// import { authOptions } from "@/app/api/auth/[...nextauth]/route"





interface RequestBody{
    data : string
}


export async function POST(request: Request){

    // console.debug(request)
    // const session = await getSession({ request });
    // const session = await getSession({ req: request });

    // console.d

    // console.debug(Session)
    // const session = await getServerSession(req: request, res:response, authOptions)

    // const session = await getServerSession(authOptions);
    // console.log(session);


    const body : RequestBody = await request.json()
    const {...data } = decrypt(body.data)
    const team = await prisma.team.findUnique({
        where: {
          name: data.name,
        },
      })
    if(!team){
        try {
            const team = await prisma.team.create({
                data : {
                    name : data.name
    
                }
            })
            
            await prisma.logEntry.create({
                data : {
                    action_name : "TeamRegistration",
                    action_by : ADMIN_USER_TYPE,
                    message : `Acccount ${ADMIN_USER_TYPE} has registered a new "${data.name}" Team.`,
                    level : INFO_LEVEL
                  }
            })
            const encryptedData = encrypt({status : true, team});
            return new Response(JSON.stringify({ encryptedData }))
        } catch (error) {
            console.debug(error)
            const encryptedData = encrypt({status : false});
            return new Response(JSON.stringify({ encryptedData }))
        }
    }
    else{
        const encryptedData = encrypt({status : false});
        return new Response(JSON.stringify({ encryptedData }))
    }    
}




export async function GET(request : Request){
    try {
        const teams = await prisma.team.findMany({
            select : {
                id : true,
                name : true,
                quiz : {
                    select : {
                        id : true,
                        title : true
                    }
                },
                users : {
                    select : {
                        email  : true,
                    }
                },
                answers : {
                    select : {
                        obtainedPoints : true,
                        user : {
                            select : {
                                email : true
                            }
                        },
                        team : {
                            select : { 
                                id :true
                            }
                        }
                    }
                },
            }
        })
        const encryptedData = encrypt({status : true, teams});
        return new Response(JSON.stringify({ encryptedData }))
    } catch (error) {
        console.debug(error)
        const encryptedData = encrypt({status : false, error : `Sorry! There is an error while fetching teams. Please try again after some time`});
        return new Response(JSON.stringify({encryptedData}))

    }
}