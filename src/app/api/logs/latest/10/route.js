import prisma from "@/app/lib/prisma";

import axios from 'axios';




export async function GET(request){

    
try {
    const response = await axios.get(
        `${process.env.API_KEY_URL}/getUsrLogs`,
        {
            headers: {
            'X-API-Key': process.env.API_KEY
            }
        }
        );

    // console.debug(response.data)

    const logs = response.data

    // console.debug(logs.user_logs.slice(0, 10))

    return new Response(JSON.stringify(logs.user_logs.slice(0, 10)))
} catch (error) {
    console.debug(error)
    return new Response(JSON.stringify({status : false}))
}

}
