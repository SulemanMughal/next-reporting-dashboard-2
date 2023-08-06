
import prisma from "@/app/lib/prisma";


export async function GET(request, {params}){
    const team = await prisma.team.findUnique({
        where: {
            id: parseInt(params.id),
        }, select : {
            name : true,
            id : true,
            quiz : {
                select : {
                    title : true
                }
            },
            answers : {
                select : {
                    submitAnswer : true,
                    obtainedPoints : true,
                    question : true
                }
            },
            users : {
                select : {
                    email : true
                }
            }
        }
    })
    return new Response(JSON.stringify(team))
}