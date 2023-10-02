import prisma from "@/app/lib/prisma";

// const crypto = require('crypto');
// const secretKey = 'your-secret-key';


import encrypt from "@/app/lib/encrypt";

import decrypt from "@/app/lib/decrypt"



interface RequestBody{
    // name : string;
    // api_key : string;
    // team_number : number;
    data : string

}







export async function POST(request: Request){
    const body : RequestBody = await request.json()
    // console.debug(body)
    const {...data } = decrypt(body.data)
    // console.debug(data.name)
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

            // await prisma.log.create({
            //     data : {
            //         action_by
            //     }
            // })
            
            const encryptedData = encrypt({status : true, team});
            // return new Response(JSON.stringify({status : true, team}))
            return new Response(JSON.stringify({ encryptedData }))
        } catch (error) {
            console.debug(error)
            const encryptedData = encrypt({status : false});
            return new Response(JSON.stringify({ encryptedData }))
            // return new Response(JSON.stringify({status : false}))
        }

    }
    else{
        const encryptedData = encrypt({status : false});
        return new Response(JSON.stringify({ encryptedData }))
        // return new Response(JSON.stringify({status : false}))
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
                    // where : {
                    //     team :{
                    //         is: {}
                    //     }
                    // },
                    select : {
                        // id : true,
                        email  : true,
                        // name  : true,
                        // role : true
                        // answers : {
                        //     where : {
                        //         team :{
                        //             isNot: null
                        //         }
                        //     },
                        //     select : {
                        //         obtainedPoints : true,
                        //         teamId : true,
                        //         team : {
                        //             select : {
                        //                 name  : true
                        //             }
                        //         }

                        //     }
                        // }
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
        // console.debug(encryptedData)
        // console.debug(decrypt(encryptedData))
        // return new Response(JSON.stringify({status : true, teams  }))
        // asdas
        return new Response(JSON.stringify({ encryptedData }))
    } catch (error) {
        console.debug(error)
        const encryptedData = encrypt({status : false, error : `Sorry! There is an error while fetching teams. Please try again after some time`});
        return new Response(JSON.stringify({encryptedData}))

    }
}


