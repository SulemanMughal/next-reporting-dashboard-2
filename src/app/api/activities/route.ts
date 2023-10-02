import prisma from "@/app/lib/prisma";
import encrypt from "@/app/lib/encrypt"


const NORMAL_LEVEL = "Normal";
const MEDIUM_LEVEL = "medium";
const HIGH_LEVEL = "High";


export async function GET(request: Request){
    try {
        const activitiesList = await prisma.logEntry.findMany({})

        // ==================================================================================================================
        // Pagination Block
        const url = new URL(request.url)
        const total_number_records_per_page = parseInt(url.searchParams.get("recordsPerPrage") || "50");
        const totalResults = activitiesList.length;
        const totalPages = Math.ceil(totalResults / total_number_records_per_page);
        let currentPage =  parseInt(url.searchParams.get("page") || "1");
        if (currentPage > totalPages){
            currentPage = totalPages
        }
        const startIndex = (((currentPage) - 1) * total_number_records_per_page) + 1;
        const endIndex = (currentPage) * total_number_records_per_page;
        const activitiesPerPage = activitiesList.slice(startIndex - 1, endIndex);
        const paginationData = {
            startIndex,
            endIndex,
            totalResults,
            currentPage,
            totalPages,
            total_number_records_per_page,
            activitiesPerPage,

        }
        // console.debug(paginationData)
        // ==================================================================================================================


        const normalLevelLogs = activitiesList.filter((item) => item.level === NORMAL_LEVEL).length
        const mediumLevelLogs = activitiesList.filter((item) => item.level === MEDIUM_LEVEL).length
        const highLevelLogs = activitiesList.filter((item) => item.level === HIGH_LEVEL).length


        const encryptedData = encrypt({status : true , activitiesList , normalLevelLogs , mediumLevelLogs , highLevelLogs , paginationData})
        return new Response(JSON.stringify({ encryptedData }))
    } catch (error) {
        console.debug(error)
        const encryptedData = encrypt({status : false, error : "Sorry! There is an error while fetching data.Please try again later"})
        return new Response(JSON.stringify({ encryptedData }))
    }
}