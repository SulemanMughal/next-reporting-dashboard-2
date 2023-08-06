"use client"
import {  useSession } from "next-auth/react";
import React from "react"
import Link from "next/link"
import Image from "next/image"
import { RxDashboard } from "react-icons/rx"
import { AiOutlineTeam } from "react-icons/ai"
import { BsFillRocketTakeoffFill } from "react-icons/bs"
import { VscTerminalBash } from "react-icons/vsc"
import { FaLocationDot } from "react-icons/fa6"
import  { MdAddTask } from "react-icons/md"
import  { MdQuiz  } from "react-icons/md"

export default   function Sidebar({children}){
    const { data: session } = useSession();
    if (session){
        if (session?.user.role === "admin") {
            // admin sidebar
            return (
                <div className="flex">
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
                            <Link href="/admin/dashboard" >
                                <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
                                    <RxDashboard size={20} />
                                </div>
                            </Link>
                            <Link href="/admin/quiz" >
                                <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
                                    <MdQuiz size={20} />
                                </div>
                            </Link>
                            <Link href={"/admin/teams"}>
                                <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
                                    <AiOutlineTeam size={20} />
                                </div>
                            </Link>
                            {/* <Link href={"/admin/attacks"}>
                                <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
                                    <BsFillRocketTakeoffFill size={20} />
                                </div>
                            </Link> */}
                            <Link href={"/admin/scripts"}>
                                <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
                                    <VscTerminalBash size={20} />
                                </div>
                            </Link>
                            {/* <Link href={"/admin/jobs"}>
                                <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
                                    <MdAddTask size={20} />
                                </div>
                            </Link> */}
                        </div>
                    </div>
                    <main className="ml-20 w-full">{children}</main>
                </div>
            )
        }
        else{
            // team side
            return (
                <div className="flex">
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
