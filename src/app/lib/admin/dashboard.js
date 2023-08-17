import prisma from "@/app/lib/prisma";
import { total_records , logs_by_hour_count , teams_per_attack, logs_per_protocol , ips_per_protocol , selectRows } from "@/app/lib/read_db"

export async function getTotalTeam() {
    const total_teams = await prisma.team.count()
    return total_teams
}



export async function getTotalScripts(){
    const total_scripts = await prisma.attackScript.count()
    return total_scripts
}

export async function getTotalLogs(){
    const total_logs = await total_records()
    return total_logs
}

export async function getTotalQuizes(){
    const total_quizes = await prisma.quiz.count()
    return total_quizes
}


export async function getLogsPerHour(){
    const logs_by_hour = await logs_by_hour_count()
    return logs_by_hour
}

export  async function getTeamsPerAttack(){
    const teams_per_attack_logs = await teams_per_attack()
    return teams_per_attack_logs
}

export async function getLogsPerProtocol(){
    const logs_per_protocol_logs = await logs_per_protocol()
    return logs_per_protocol_logs
}

export async function getIPsPerProtocol(){
    const ips_per_protocol_logs = await ips_per_protocol()
    return ips_per_protocol_logs
}


export async function getTopTeams(){
    const results = await prisma.$queryRaw`SELECT SUM(obtainedPoints), COALESCE(sum(CASE WHEN submissionStatus THEN 1 ELSE 0 END),0), teamId, name  FROM Answer FULL JOIN Team ON Answer.teamId = Team.id  GROUP BY teamId  ORDER BY SUM(obtainedPoints) DESC LIMIT 15`
    let records = [];
    try {
        results.map((item) => {
            if(item['SUM(obtainedPoints)'] &&  item['SUM(obtainedPoints)'] !== null){
                records.push({
                    obtainedPoints:   item['SUM(obtainedPoints)']?.toString() || "",
                    teamId: item['teamId']?.toString() || "",
                    submission : item['COALESCE(sum(CASE WHEN submissionStatus THEN 1 ELSE 0 END),0)']?.toString() ||"" ,
                    name : item['name'] || ""
                })
            }
        })
    } catch (error) {
        console.debug(error)
    }

    return records
}


export async function getLatestScripts(){
    const scripts = await prisma.attackScript.findMany({
        orderBy : [
            {
                id : 'desc'
            }
        ],
        take : 10
    })
    return scripts
}


export async function getAttackHistoryLogs(){
    
    const logs = await selectRows()
    return logs
    
}