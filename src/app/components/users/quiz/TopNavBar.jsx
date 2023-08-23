"use client"

import Link from "next/link"

import { AiFillHome } from "react-icons/ai"

import { FaPuzzlePiece } from "react-icons/fa"

import { MdLeaderboard } from "react-icons/md"


import { usePathname } from 'next/navigation'

import { useSession } from "next-auth/react";


import  { MdQuiz } from "react-icons/md"

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


function checkDashboardPath(pathname){
    if(pathname === "/user/dashboard" ){
        return true
    } else {
        return false
    }
}


function checkAdminDashboardPath(pathname){
    if(pathname === "/admin/dashboard" ){
        return true
    } else {
        return false
    }
}

function checkQuizPath(pathname){
    if(pathname === "/user/quiz" ){
        return true
    } else {
        return false
    }
}



function checkAdminQuizPath(pathname){
    if(pathname === "/admin/quiz" ){
        return true
    } else {
        return false
    }
}

function checkLeaderBoardPage(pathname){
    if(pathname === "/user/board" ){
        return true
    } else {
        return false
    }
}

const UserNavBar = ({pathname}) => {
    return (
        <>
            <nav className="bg-transparent text-gray-400 pt-4 pb-0" id="user_dashboard">
                <div className="container mx-auto flex items-center justify-between">
                    
                    <ul className="flex space-x-4 mb-0">
                    <li >
                        <Link href={"/user/dashboard"} className={classNames( checkDashboardPath(pathname) ? 'active' : '', 'flex  items-center justify-start   p-3 px-5 rounded-3xl rounded-b-none' )} >
                            <AiFillHome  size={30}/> <p className="pl-2 text-xl  pt-1 pb-0 my-0">Home</p>    
                        </Link>
                    </li>
                    <li >
                        <Link href={"/user/quiz"} className={classNames( checkQuizPath(pathname) ? 'active' : '', 'flex  items-center justify-start   p-3 px-5 rounded-3xl rounded-b-none' )}>
                            <FaPuzzlePiece  size={30}/> <p className="pl-2 text-xl  pt-1 pb-0 my-0">Challenges</p>    
                        </Link>
                    </li>
                    <li >
                        <Link href={"/user/board"} className={classNames( checkLeaderBoardPage(pathname) ? 'active' : '', 'flex  items-center justify-start   p-3 px-5 rounded-3xl rounded-b-none' )}>
                            <MdLeaderboard  size={30}/> <p className="pl-2 text-xl  pt-1 pb-0 my-0">ScoreBoard</p>    
                        </Link>
                    </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

const AdminNavBar = ({pathname}) => {
    return (
        <>
            <nav className="bg-transparent text-gray-400 pt-4 pb-0" id="user_dashboard">
                <div className="container mx-auto flex items-center justify-between">
                    
                    <ul className="flex space-x-4 mb-0">
                    <li >
                        <Link href={"/admin/dashboard"} className={classNames( checkAdminDashboardPath(pathname) ? 'active' : '', 'flex  items-center justify-start   p-3 px-5 rounded-3xl rounded-b-none' )} >
                            <AiFillHome  size={30}/> <p className="pl-2 text-xl  pt-1 pb-0 my-0">Home</p>    
                        </Link>
                    </li>
                    <li >
                        <Link href={"/admin/quiz"} className={classNames( checkAdminQuizPath(pathname) ? 'active' : '', 'flex  items-center justify-start   p-3 px-5 rounded-3xl rounded-b-none' )}>
                            <MdQuiz  size={30}/> <p className="pl-2 text-xl  pt-1 pb-0 my-0">Quizes</p>    
                        </Link>
                    </li>
                    {/* <li >
                        <Link href={"/user/board"} className={classNames( checkLeaderBoardPage(pathname) ? 'active' : '', 'flex  items-center justify-start   p-3 px-5 rounded-3xl rounded-b-none' )}>
                            <MdLeaderboard  size={30}/> <p className="pl-2 text-xl  pt-1 pb-0 my-0">ScoreBoard</p>    
                        </Link>
                    </li> */}
                    </ul>
                </div>
            </nav>
        </>
    )
}


export default function TopNavBar() {

    const pathname = usePathname()
    const { data: session } = useSession();

    return (
        <>
            {
                (session?.user?.role === "admin") ? <AdminNavBar pathname={pathname} /> : (session?.user?.role === "user") ? <UserNavBar  pathname={pathname}/> : null
            }
        </>
    )
} 
