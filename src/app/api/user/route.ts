// register new user


import prisma from "@/app/lib/prisma";
import * as bcrypt from "bcrypt"



interface RequestBody{
    name : string;
    email : string;
    password : string;
}

export async function POST(request: Request){
    try {
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
    } catch (error) {
        console.debug(error)
        return new Response(JSON.stringify({status : false, error : 'Sorry! There is an error while registrating a new user. Please try again after some time'}))

    }
}


export async function GET(request: Request){
    try {
        const users = await prisma.user.findMany({
            where : {
                role : {
                    not : 'admin'
                }
            },
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
        return new Response(JSON.stringify({status : false, error : 'Sorry! There is an error while fetching users. Please try again after some time'}))
    }
}