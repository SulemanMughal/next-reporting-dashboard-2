

import axios from 'axios';



export async function GET(request ){
   try{
    const response = await axios.get(`${process.env.API_KEY_URL}/jobs`, {
        headers: {
            'X-API-Key': process.env.API_KEY
        }
        });
        // console.debug(response.data.jobs)
        return new Response(JSON.stringify(response.data.jobs.slice(0, 10)))
   } catch(error){
    console.debug(error)
    return new Response(JSON.stringify({status : false}))
   }
}