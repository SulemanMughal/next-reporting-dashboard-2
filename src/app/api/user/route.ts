// register new user


import prisma from "@/app/lib/prisma";
import * as bcrypt from "bcrypt"



interface RequestBody{
    name : string;
    email : string;
    password : string;
}

export async function POST(request: Request){
    const body : RequestBody = await request.json()

    const user = await prisma.user.create({
        data : {
            name : body.name,
            email : body.email,
            password : await bcrypt.hash(body.password, 10) 
        }
    })

    const {password, ...result} = user;

    return new Response(JSON.stringify(result))
}


export async function GET(request: Request){
    try {

        // get team id 
        // const team_id = await prisma.team.findFirst({
        //     where : {
        //         id
        //     }
        // })

        const users = await prisma.user.findMany({
            select : {
                id : true,
                name : true,
                email : true, 
                team : {
                    select : {
                        id : true,
                        name : true,
                        quiz : {
                            select : {
                                questions : {
                                    select : {
                                        answers : true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })
    
        return new Response(JSON.stringify({status : true, users}))
    } catch (error) {
        console.debug(error)
        return new Response(JSON.stringify({status : false, error : error.message}))
    }
}