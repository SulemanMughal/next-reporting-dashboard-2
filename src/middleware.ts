import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"


// import decrypt from "@/app/lib/decrypt"


export default withAuth(
    function middleware(req){
        
        // const {...data } = decrypt(req.nextauth.token?.user)
        // console.de
        // console.debug("middlware called , " , req.nextauth.token)
        if (req.nextUrl.pathname.startsWith("/admin") && req.nextauth.token?.role !== "admin"){
            return NextResponse.redirect(
                new URL("/login", req.url)
            )
        }
        if (req.nextUrl.pathname.startsWith("/user") && req.nextauth.token?.role !== "user"){
            return NextResponse.redirect(
                new URL("/login", req.url)
            )
        }
        // if (req.nextUrl.pathname.startsWith("/") && req.nextauth.token?.role === "admin"){
        //     return NextResponse.redirect(
        //         new URL("/admin/dashboard", req.url)
        //     )
        // }
        // if (req.nextUrl.pathname.startsWith("/") && req.nextauth.token?.role === "user"){
        //     return NextResponse.redirect(
        //         new URL("/user/dashboard", req.url)
        //     )
        // }
        
        
    },
    {
        callbacks : {
            authorized : ({token}) => !!token
        }
    }
)



// export function middleware(request: NextApiRequest, response: NextApiResponse) {

    
//     console.debug("middlware called")
//     // const requestHeaders = new Headers(request.headers);
//     // add field to request headers
//     // requestHeaders.set("X-My-Custom-Header", "CustomHeaderValue");
//     return NextResponse.next();

// }


export const config = {
    matcher  : [
        "/admin/:path*",
        "/user/:path*",
        "/dashboard/:path*",
    ]
}



