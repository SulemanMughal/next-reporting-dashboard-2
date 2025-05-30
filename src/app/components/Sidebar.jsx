"use client"
import {  useSession } from "next-auth/react";
import React , { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { RxDashboard } from "react-icons/rx"
import { AiOutlineTeam } from "react-icons/ai"
import { VscTerminalBash } from "react-icons/vsc"
import  { MdQuiz  } from "react-icons/md"



import { GrShieldSecurity } from "react-icons/gr";


const admin = [
    [
        "/admin/dashboard",
        <RxDashboard size={25} key={156} />,
        "Dasboard"
    ],
    [
        "/admin/quiz",
        <MdQuiz size={25} key={156} />,
        "Quiz"
    ],
    [
        "/admin/teams",
        <AiOutlineTeam size={25} key={156} />,
        "Teams"
    ],
    [
        "/admin/scripts",
        <VscTerminalBash size={25} key={156} />,
        "Officerrs"
    ]
]

const team = [
    [
        "/user/dashboard",
        <RxDashboard size={25} key={156} />,
        "Dashboard"
    ],
]


function AdminSideBar(){
    return (
        <>
            <div className="sticky top-0 z-20 w-48  h-screen py-4 px-0   border-none border-r-[1px]   flex flex-col justify-start" >
                <div className="flex   flex-col items-center ">
                <Link href="/" className="flex items-center w-full justify-center" >
                    <Image
                        src="/assets/img/logo_new.png"
                        width={50}
                        height={50}
                        alt="Picture of the author"
                        
                    />
                    
                </Link>
                    <span className="border-none  border-b-[1px] border-gray-200 w-full p-2"></span>
                    {admin.map((item, index) => (
                        <Link href={item[0]} className="w-full bg-none text-white hover:bg-blue-300 hover:text-blue-800 cursor-pointer  p-3 py-5  transition ease-in-out delay-150  duration-300 " key={index} >
                        <div className="  rounded-lg  w-full flex items-center font-bold   ">
                        {item[1]} <span  className="ml-2 ">{item[2]}</span>
                        </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
}

function UserSideBar(){
    return (
        <>
        <div className="sticky top-0 z-20 w-48  h-screen py-4 px-0   border-none border-r-[1px]   flex flex-col justify-start">
            <div className="flex   flex-col items-center ">
            <Link href="/" className="flex items-center w-full justify-center" >
                <Image
                    src="/assets/img/logo_new.png"
                    width={50}
                    height={50}
                    
                    alt="Picture of the author"
                />
            </Link>
                <span className="border-none  border-b-[1px] border-gray-200 w-full p-2"></span>
                {team.map((item, index) => (
                    <Link href={item[0]} className="w-full bg-none text-white hover:bg-blue-300 hover:text-blue-800 cursor-pointer  p-3 py-5  transition ease-in-out delay-150  duration-300 " key={index} >
                    <div className="  rounded-lg  w-full flex items-center font-bold   ">
                    {item[1]} <span  className="ml-2 ">{item[2]}</span>
                    </div>
                    </Link>
                ))}
            </div>
        </div>
        </>
    )
}


// import decrypt from "@/app/lib/decrypt"


export default   function Sidebar({children}){
    const { data: session } = useSession();
    // if (session){
    //     if (session?.user.role === "admin") {
    //         return (
    //             <div className="flex" style={{backgroundColor:"rgba(16,19,69, 96%)"}}>
    //                 <AdminSideBar   />
    //                 {session?.user.role && <main className=" w-full">{children}</main> }
    //             </div>
    //         )
    //     }
    //     else if (session?.user.role === "user"){
    //         return (
    //             <div className="flex" style={{backgroundColor:"rgba(16,19,69, 96%)"}}>
    //                 <UserSideBar />
    //                 {session?.user.role && <main className=" w-full">{children}</main> }
    //             </div>
    //         )
    //     }
    //     else{
    //         return (
    //             <div className="flex" style={{backgroundColor:"rgba(16,19,69, 96%)"}}>
    //                 <main className=" w-full">{children}</main>
    //             </div>
    //         )
    //     }
    // }
    // else{
        
    // }
    return (
        <>
            {children}
        </>
    )
}
