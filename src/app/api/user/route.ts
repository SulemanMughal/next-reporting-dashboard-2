// register new user


import prisma from "@/app/lib/prisma";
import * as bcrypt from "bcrypt"


import encrypt from "@/app/lib/encrypt"
import decrypt from "@/app/lib/decrypt"
import { INFO_LEVEL } from "@/app/helpers/constants";



interface RequestBody{
    encryptedData : string;
}


// Register new user
// Usage : Register Page, User Management Page
export async function POST(request: Request){
    try {
        const body : RequestBody = await request.json()
        
        const {...data } = decrypt(body.encryptedData)

        const user = await prisma.user.create({
            data : {
                name : data.name,
                email : data.email,
                password : await bcrypt.hash(data.password, 10) ,
                country : data?.country || "PK",
                role : data?.role || "user",
            }
        })
        const {password, ...result} = user;
        const encryptedData = encrypt(result);
        const log_entry = await prisma.logEntry.create({
            data : {
                action_name : "UserRegistration",
                action_by : "Admin",
                message : `A New Account ${data.email} has been registered`,
                level : INFO_LEVEL
            }
        })
        return new Response(JSON.stringify({ encryptedData }))
    } catch (error) {
        console.debug(error)
        const encryptedData = encrypt({status : false, error : 'Sorry! There is an error while registrating a new user. Please try again after some time'});
        return new Response(JSON.stringify({ encryptedData }))

    }
}

// Get All users
// Usage : User Management Page
export async function GET(request: Request){
    const url = new URL(request.url)
    if((url.searchParams.get("role") || "user") === "both"){
        try {
            const users = await prisma.user.findMany({
                select : {
                    id : true,
                    name : true,
                    email : true, 
                    role : true,
                    country : true,
                    joinedDate:true,
                    lastLogin : true,
                    active : true,
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
            const encryptedData = encrypt({status : true, users})
            return new Response(JSON.stringify({ encryptedData }))
            
        } catch (error) {
            console.debug(error)
            const encryptedData = encrypt({status : false, error : 'Sorry! There is an error while fetching users. Please try again after some time'})
            return new Response(JSON.stringify({ encryptedData }))
        }    
    } else{
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
                    role : true,
                    country : true,
                    joinedDate:true,
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
            const encryptedData = encrypt({status : true, users})
            return new Response(JSON.stringify({ encryptedData }))
            
        } catch (error) {
            console.debug(error)
            const encryptedData = encrypt({status : false, error : 'Sorry! There is an error while fetching users. Please try again after some time'})
            return new Response(JSON.stringify({ encryptedData }))
        }
    }
    
}

