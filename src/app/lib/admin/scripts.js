import prisma from "@/app/lib/prisma";





export async function getAllScripts(){
    const scripts = await prisma.attackScript.findMany({})
    return scripts
}