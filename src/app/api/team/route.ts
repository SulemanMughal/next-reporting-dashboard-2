import prisma from "@/app/lib/prisma";
import encrypt from "@/app/lib/encrypt";
import decrypt from "@/app/lib/decrypt"


interface RequestBody{
    data : string
}


export async function POST(request: Request){
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