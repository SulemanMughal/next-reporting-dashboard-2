// import prisma from "@/app/lib/prisma";



// interface RequestBody{
//     team_id : number;
//     script_id : number
// }



// export async function POST(request: Request){
//     const body : RequestBody = await request.json()

//     const team = await prisma.team.update({
//         where: { id: body.team_id },
//         data : {
//             attack_script : {
//                 connect : [
//                     {
//                         id : body.script_id
//                     }
//                 ]
//             }

//         },
//         include : {
//             attack_script : true
//         }
//     })

//     const {...result} = team;

//     return new Response(JSON.stringify(result))
// }








export async function GET(request ){
    
    return new Response(JSON.stringify({status : true}))
 }