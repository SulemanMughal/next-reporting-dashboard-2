
import prisma from "@/app/lib/prisma";
import encrypt from "@/app/lib/encrypt"




// Get All Submissions
export async function GET(request: Request){
    try {
        // console.debug("Get All Submissions")
        const submissions = await prisma.answer.findMany({
            select : {
                user : {
                    select : {
                        name : true,
                        id : true
                    }
                },
                obtainedPoints : true,
                team : {
                    select : {
                        name : true,
                        answers : {
                            where : {
                                submissionStatus : true,
                            },
                            select : {
                                obtainedPoints : true,
                                submittedAt  : true,
                                question : {
                                    select :{
                                        scenario : {
                                            select : {
                                                category : true
                                            }
                                        }
                                    }
                                }
                            },
                            take: 1,
                        }
                    }
                },
                question : {
                    select : {
                        scenario : {
                            select : {
                                name : true,
                                category : true
                            }
                        }
                    }
                }
            }
        })


        // =========================================================================================================
        // Pagination Bloack

        const url = new URL(request.url)
        const total_number_records_per_page = parseInt(url.searchParams.get("recordsPerPrage") || "50");
        const totalResults = submissions.length;
        const totalPages = Math.ceil(totalResults / total_number_records_per_page);
        let currentPage =  parseInt(url.searchParams.get("page") || "1");
        if (currentPage > totalPages){
            currentPage = totalPages
        }
        const startIndex = (((currentPage) - 1) * total_number_records_per_page) + 1;
        const endIndex = (currentPage) * total_number_records_per_page;
        const resultsPerPage = submissions.slice(startIndex - 1, endIndex);
        const paginationData = {
            startIndex,
            endIndex,
            totalResults,
            currentPage,
            totalPages,
            total_number_records_per_page,
            resultsPerPage,

        }

        // console.debug(paginationData)

        // =========================================================================================================

        const encryptedData = encrypt({status : true , data: submissions , paginationData})
        return new Response(JSON.stringify({ encryptedData }))
    } catch (error) {
        console.debug(error)
        const encryptedData = encrypt({status : false, error : 'Sorry! There is an error while fetching data. Please try again after some time.'})
        return new Response(JSON.stringify({ encryptedData }))
    }

}