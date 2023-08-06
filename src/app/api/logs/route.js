


import axios from 'axios';

export async function GET(request){
    
    // console.debug("User Logs")
    
   try{
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

    return new Response(JSON.stringify(logs))
   }  catch (error){
    console.debug(error)
    // const logs = []
    return new Response(JSON.stringify({status : false}))
   }

}
