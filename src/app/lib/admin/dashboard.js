

import prisma from "@/app/lib/prisma";


import { total_records } from "@/app/lib/read_db"


export async function getTotalTeam() {
    const total_teams = await prisma.team.count()
    // console.debug(totalTeams)    
    return total_teams
}



export async function getTotalScripts(){
    const total_scripts = await prisma.attackScript.count()
    return total_scripts
    // console.debug(total_scripts)
}

export async function getTotalLogs(){
    const total_logs = await total_records()
    return total_logs
    // console.debug(total_logs)
}

export async function getTotalQuizes(){
    const total_quizes = await prisma.quiz.count()
    return total_quizes
    // console.debug(total_quizes)
}

