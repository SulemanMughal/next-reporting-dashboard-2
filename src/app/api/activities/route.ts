import prisma from "@/app/lib/prisma";
import encrypt from "@/app/lib/encrypt"


const NORMAL_LEVEL = "Normal";
const MEDIUM_LEVEL = "medium";
const HIGH_LEVEL = "High";


export async function GET(request: Request){
    try {
        const activitiesList = await prisma.logEntry.findMany({})
        const normalLevelLogs = activitiesList.filter((item) => item.level === NORMAL_LEVEL).length
        const mediumLevelLogs = activitiesList.filter((item) => item.level === MEDIUM_LEVEL).length
        const highLevelLogs = activitiesList.filter((item) => item.level === HIGH_LEVEL).length
        const encryptedData = encrypt({status : true , activitiesList , normalLevelLogs , mediumLevelLogs , highLevelLogs })
        return new Response(JSON.stringify({ encryptedData }))
    } catch (error) {
        console.debug(error)
        const encryptedData = encrypt({status : false, error : "Sorry! There is an error while fetching data.Please try again later"})
        return new Response(JSON.stringify({ encryptedData }))
    }
}