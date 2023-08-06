import prisma from "@/app/lib/prisma";



interface RequestBody{
    name : string;
    api_key : string;
    team_number : number;

}







export async function POST(request: Request){
    const body : RequestBody = await request.json()

    const team = await prisma.team.findUnique({
        where: {
          name: body.name,
        },
      })


    if(!team){
        try {
            const team = await prisma.team.create({
                data : {
                    name : body.name
    
                }
            })
            return new Response(JSON.stringify({status : true, team}))
        } catch (error) {
            console.debug(error)
            return new Response(JSON.stringify({status : false}))
        }

    }
    else{
        return new Response(JSON.stringify({status : false}))
    }    
}




export async function GET(request : Request){
    try {
        const teams = await prisma.team.findMany({
            select : {
                id : true,
                name : true,
                quiz : {
                    select : {
                        id : true,
                        title : true
                    }
                },
                users : true,
                answers : {
                    select : {
                        obtainedPoints : true
                    }
                },
            }
        })
        return new Response(JSON.stringify(teams))
    } catch (error) {
        console.debug(error)
        return new Response(JSON.stringify({status : false}))

    }
}


