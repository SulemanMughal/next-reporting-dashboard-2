// import prisma from "@/app/lib/prisma";


// // get all teams


// async function getAllTeams(){
//     return prisma.teams.findMany()
// }




// export async function GET(request){
//     const teams = await getAllTeams()
//     // console.debug(teams)

//     return new Response(JSON.stringify({ teams }))

// }



export async function GET(request){
    return new Response(JSON.stringify({"status" : true}))
}