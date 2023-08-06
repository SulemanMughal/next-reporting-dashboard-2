
import axios from 'axios';




export async function GET(request, {params}){
    try {
        const response = await axios.get(`${process.env.API_KEY_URL}/jobs/${params.id}`, {
            headers: {
                'X-API-Key': process.env.API_KEY
            }
            });
            return new Response(JSON.stringify({status : response.data.status}))
    } catch (error) {
        console.debug(error)
    }
}
