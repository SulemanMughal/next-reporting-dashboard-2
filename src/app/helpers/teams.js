import prisma from "@/app/lib/prisma";

export async function getTotalTeam() {
    const totalTeams = await prisma.team.count()
    console.debug(totalTeams)
}

// // Get All Teams
// export async function getAllTeams() {
//     const teams = await prisma.team.findMany({})
//     return teams
// }