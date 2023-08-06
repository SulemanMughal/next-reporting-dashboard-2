

import prisma from "@/app/lib/prisma";



export async function getTotalTeam() {
    const totalTeams = await prisma.team.count()
    // console.debug(totalTeams)
    // return totalTeams


    // return 
    
}
