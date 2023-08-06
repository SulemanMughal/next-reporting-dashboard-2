import prisma from "@/app/lib/prisma";
import axios from 'axios';

interface RequestBody{
    team_name : string;
    script_name : string;
    team_number : string
}




export async function POST(request: Request){
    const body : RequestBody = await request.json()
    const response = await axios.post(
    `${process.env.API_KEY_URL}/run`,'',
    {
        params: {
            'scripts_to_run': `${body.script_name}`
        },
        headers: {
        'X-API-Key': process.env.API_KEY
        }
    }
    );
    return new Response(JSON.stringify({status : true}))
}





// export async function GET(request : Request){
//     const response = await axios.get(`${process.env.API_KEY_URL}/jobs`, {
//         headers: {
//             'X-API-Key': process.env.API_KEY
//         }
//     });
//     const scripts = []
//     return new Response(JSON.stringify(scripts))

// }