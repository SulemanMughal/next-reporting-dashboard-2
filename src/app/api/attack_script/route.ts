import prisma from "@/app/lib/prisma";

import axios from 'axios';


import encrypt from "@/app/lib/encrypt"
import decrypt from "@/app/lib/decrypt"


import { scripts } from "@/app/data/data"

interface RequestBody{
    name : string;
    script_id : number;
}





// export async function POST(request: Request){
//     const body : RequestBody = await request.json()

//     const attack_script = await prisma.attackScript.create({
//         data : {
//             name : body.name,
//             script_id : body.script_id

//         }
//     })

//     const {...result} = attack_script;

//     return new Response(JSON.stringify(result))
// }




// Get All Scripts from attacker-machine
export async function GET(request : Request){
    
    // -----------------------
    // uncomment for productions
    // const response = await axios.get(`${process.env.API_KEY_URL}/scripts`, {
    // headers: {
    //     'X-API-Key': process.env.API_KEY
    // }
    // });
    // const scripts = response.data
    // return new Response(JSON.stringify(scripts))
    // ------------------------------

//    const scripts = [
//     " HTTP Authentication Bruteforce",
//     "SSH Bruteforce",
//     "FTP Bruteforce",
//     "MySQL Bruteforce",
//     "Directory Fuzzing",
//     "Parameter Fuzzing",
//     "Log4J",
//     "Apache Struts",
//     " RCE via file upload",
//     " Shellshock",
//     "File Inclusion"
//    ]

    const encryptedData = encrypt({scripts : scripts})
    return new Response(JSON.stringify({ encryptedData }))
//    return new Response(JSON.stringify(scripts))
}