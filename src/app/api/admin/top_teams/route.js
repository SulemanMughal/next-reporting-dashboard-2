
import prisma from "@/app/lib/prisma";



import encrypt from "@/app/lib/encrypt"
import decrypt from "@/app/lib/decrypt"

export async function GET(request){
   try {
        const results = await prisma.$queryRaw`SELECT SUM(obtainedPoints), COALESCE(sum(CASE WHEN submissionStatus THEN 1 ELSE 0 END),0), teamId, name  FROM Answer FULL JOIN Team ON Answer.teamId = Team.id  GROUP BY teamId  ORDER BY SUM(obtainedPoints) DESC LIMIT 15`
        let records = [];
        // console.debug(results)
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
        
        const encryptedData = encrypt({status : true , records})
        return new Response(JSON.stringify({ encryptedData }))
        // return new Response(JSON.stringify({status : true , records }))
   } catch (error) {
        console.debug(error)
        const encryptedData = encrypt({status : false})
        return new Response(JSON.stringify({ encryptedData }))
        // return new Response(JSON.stringify({status : false}))
   }
}