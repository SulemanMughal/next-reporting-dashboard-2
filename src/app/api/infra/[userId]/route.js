import prisma from "@/app/lib/prisma";


import encrypt from "@/app/lib/encrypt"
// import decrypt from "@/app/lib/decrypt"


function getCurrentUserTeam(userId){
    return prisma.user.findUnique({
        where : {
            id : userId
        }, select : {
            team : true
        }
    })
}

export async function GET(request,params){
    // console.debug(params?.params?.userId)
    try{

        const user = await getCurrentUserTeam(params?.params?.userId)
        // console.debug(user)

        const results = await prisma.teamInfra.findMany({
            where:{
                teamId : user.team.id
            },
        })
        // console.debug(results)
        const encryptedData = encrypt({status : true , results:results})
        return new Response(JSON.stringify({ encryptedData }))
    } catch (error) {
        // console.debug(error)
        const encryptedData = encrypt({status : false , error : `There is an error while fetching machines details. Please try again after some time.`})
        return new Response(JSON.stringify({ encryptedData }))
        // return new Response(JSON.stringify({status : false}))
    }
}