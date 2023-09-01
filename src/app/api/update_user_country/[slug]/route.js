import prisma from "@/app/lib/prisma";


import { countries } from "@/app/lib/helpers"



function getRandomCountry() {
    const randomIndex = Math.floor(Math.random() * countries.length);
    return countries[randomIndex];
}


export async function GET(request ){
    try {
   
        const users = await prisma.user.findMany(); // Fetch all users from the database
        for (const user of users) {
            let  newRandomCountry = getRandomCountry(); // Get a random country code
            await prisma.user.update({
              where: { id: user.id }, // Update the user with its unique ID
              data: {
                    country: newRandomCountry.code // Set the new random country code for the user
              }
            });
            // console.log(`Updated user ${user.id} with the random country: ${newRandomCountry.code}`);
        }
        const encryptedData = ({status : true});
        return new Response(JSON.stringify({ encryptedData }))
    } catch (error) {
        console.debug(error)
        const encryptedData = ({status : false, error : `Sorry! There is an error while fetching teams. Please try again after some time`});
        return new Response(JSON.stringify({encryptedData}))

    }
}


