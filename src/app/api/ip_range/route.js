// import prisma from "@/app/lib/prisma";


// interface RequestBody{
//     ip_start : string;
//     ip_end : string;
//     ip_subnet : string;
//     ip_class : string;
// }





// export async function POST(request: Request){
//     const body : RequestBody = await request.json()

//     const address = await prisma.iP_Address.create({
//         data : {
//             ip_start : body.ip_start,
//             ip_end : body.ip_end,
//             ip_subnet : body.ip_subnet,
//             ip_class : body.ip_class,

//         }
//     })

//     const {...result} = address;

//     return new Response(JSON.stringify(result))
// }



// export async function GET(request : Request){
//     const ranges = await prisma.iP_Address.findMany()

//     // console.debug(teams)

//     return new Response(JSON.stringify(ranges))

// }



export async function GET(request ){
    
    return new Response(JSON.stringify({status : true}))
 }