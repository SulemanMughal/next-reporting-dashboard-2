// import prisma from "@/app/lib/prisma";



const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// get all teams


async function getAllTeams(){
    return prisma.team.findMany()
}


async function getAllScenarios(){
    return await prisma.scenarios.findMany()
}

// const teams = await getAllTeams().then((data) => data)
// const scenarios =  getAllScenarios((data) => data)

console.debug(teams)

// export async function GET(request){
//     const teams = await getAllTeams()
//     // console.debug(teams)

//     return new Response(JSON.stringify({ teams }))

// }