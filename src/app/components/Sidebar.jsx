"use client"
import {  useSession } from "next-auth/react";
import React from "react"
import Link from "next/link"
import Image from "next/image"
import { RxDashboard } from "react-icons/rx"
import { AiOutlineTeam } from "react-icons/ai"
import { VscTerminalBash } from "react-icons/vsc"
import  { MdQuiz  } from "react-icons/md"


const admin = [
    [
        "/admin/dashboard",
        <RxDashboard size={25} key={156} />,
        "Home"
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
        "Scripts"
    ]
]

export default   function Sidebar({children}){
    const { data: session } = useSession();
    if (session){
        if (session?.user.role === "admin") {
            // admin sidebar
            return (
                <div className="flex" style={{backgroundColor:"rgba(16,19,69, 96%)"}}>
                    <div className="sticky top-0 z-20 w-48  h-screen py-4 px-0   border-none border-r-[1px]   flex flex-col justify-start">
                        <div className="flex   flex-col items-center ">
                        <Link href="/" className="flex items-center w-full justify-center" >
                            <Image
                                src="/assets/img/logo.svg"
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
                            
                            
                            {/* <Link href={"/admin/teams"}>
                                <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
                                    <AiOutlineTeam size={20} />
                                </div>
                            </Link> */}
                            {/* <Link href={"/admin/attacks"}>
                                <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
                                    <BsFillRocketTakeoffFill size={20} />
                                </div>
                            </Link> */}
                            {/* <Link href={"/admin/scripts"}>
                                <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
                                    <VscTerminalBash size={20} />
                                </div>
                            </Link> */}
                            {/* <Link href={"/admin/jobs"}>
                                <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
                                    <MdAddTask size={20} />
                                </div>
                            </Link> */}
                        </div>
                    </div>
                    <main className=" w-full">{children}</main>
                </div>
            )
        }
        else{
            // team side
            return (
                <div className="flex" style={{backgroundColor:"rgba(16,19,69, 96%)"}}>
                    <div className="fixed w-20 h-screen p-4 bg-white border-r-[1px] flex flex-col justify-content">
                        <div className="flex flex-col items-center ">
                        <Link href="/" className="flex items-center">
                            <Image
                                src="/assets/img/logo.svg"
                                width={500}
                                height={500}
                                className="w-full"
                                alt="Picture of the author"
                            />
                        </Link>
                        <span className="border-b-[1px] border-gray-200 w-full p-2"></span>
                        <Link href="/user/dashboard" >
                            <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
                                <RxDashboard size={20} />
                            </div>
                        </Link>
                        {/* <Link href="/user/quiz" >
                            <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
                                <MdQuiz  size={20} />
                            </div>
                        </Link> */}
                        </div>
                    </div>
                    <main className="ml-20 w-full">{children}</main>
                </div>
            )
        }
    }
    else{
        return (
            <>
                {children}
            </>
        )
    }
}
