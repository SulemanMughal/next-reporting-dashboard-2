"use client"

import Link from "next/link"
import { AiFillHome } from "react-icons/ai"
import { FaPuzzlePiece } from "react-icons/fa"
import { MdLeaderboard } from "react-icons/md"
import { usePathname } from 'next/navigation'
import { useSession } from "next-auth/react";
import  { MdQuiz } from "react-icons/md"
import { VscTerminalBash } from "react-icons/vsc"
import  { MdGroups } from "react-icons/md"
import { GiSpy } from "react-icons/gi"
import { FaServer } from "react-icons/fa"

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
    if(pathname === "/user/quiz"  || pathname.includes("/user/quiz/")){
        return true
    } else {
        return false
    }
}

function checkAdminChallengesPage(pathname){
    if(pathname === "/admin/challenges" || pathname.includes("/admin/challenges/") ){
        return true
    } else {
        return false
    }
}



function checkAdminQuizPath(pathname){
    if(pathname === "/admin/quiz" || pathname.includes("/admin/quiz/")  ){
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


function checkAdminScriptsPage(pathname){
    if(pathname === "/admin/scripts" ){
        return true
    } else {
        return false
    }
}

function checkAdminTeamsPage(pathname){
    if(pathname === "/admin/teams" ){
        return true
    } else {
        return false
    }
}

function checkAdminLeaderBoardPage(pathname){
    if(pathname === "/admin/board" ){
        return true
    } else {
        return false
    }
}


const UserNavBar = ({pathname}) => {
    return (
        <>
            <nav className="bg-transparent text-gray-400 pt-4 -mb-6" id="user_dashboard">
                <div className="container pl-28">
                    
                    <ul className="flex space-x-2 space-y-0 items-end place-items-end">
                    <li className="" >
                        <Link href={"/user/dashboard"} className={classNames( checkDashboardPath(pathname) ? 'active' : '', 'flex   items-center justify-start   p-4 px-7 rounded-3xl rounded-b-none text-sm' )} >
                            <AiFillHome  size={23}/> <p className="pl-2   pt-1 pb-0 my-0">Home</p>    
                        </Link>
                    </li>
                    <li className="" >
                        <Link href={"/user/quiz"} className={classNames( checkQuizPath(pathname) ? 'active' : '', 'flex   items-center justify-start   p-4 px-7 rounded-3xl rounded-b-none text-sm' )}>
                            <FaServer  size={23}/> <p className="pl-2   pt-1 pb-0 my-0">Challenges</p>    
                        </Link>
                    </li>
                    <li className="" >
                        <Link href={"/user/board"} className={classNames( checkLeaderBoardPage(pathname) ? 'active' : '', 'flex   items-center justify-start   p-4 px-7 rounded-3xl rounded-b-none text-sm' )}>
                            <MdLeaderboard  size={23}/> <p className="pl-2   pt-1 pb-0 my-0">Leaderboard</p>    
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
            <nav className="bg-transparent text-gray-400 pt-4 -mb-6" id="user_dashboard">
                <div className="container pl-28">
                    
                    <ul className="flex space-x-2 space-y-0 items-end place-items-end">
                    <li >
                        <Link href={"/admin/dashboard"} className={classNames( checkAdminDashboardPath(pathname) ? 'active' : '', 'flex   items-center justify-start   p-4 px-7 rounded-3xl rounded-b-none text-sm' )} >
                            <AiFillHome  size={23}/> <p className="pl-2   pt-1 pb-0 my-0">Home</p>    
                        </Link>
                    </li>
                    <li >
                        <Link href={"/admin/quiz"} className={classNames( checkAdminQuizPath(pathname) ? 'active' : '', 'flex   items-center justify-start   p-4 px-7 rounded-3xl rounded-b-none text-sm' )}>
                            <MdQuiz  size={23}/> <p className="pl-2   pt-1 pb-0 my-0">Quizes</p>    
                        </Link>
                    </li>
                    <li >
                        <Link href={"/admin/challenges"} className={classNames( checkAdminChallengesPage(pathname) ? 'active' : '', 'flex   items-center justify-start   p-4 px-7 rounded-3xl rounded-b-none text-sm' )}>
                            <FaServer  size={23}/> <p className="pl-2   pt-1 pb-0 my-0">Challenges</p>    
                        </Link>
                    </li>
                    <li >
                        <Link href={"/admin/scripts"} className={classNames( checkAdminScriptsPage(pathname) ? 'active' : '', 'flex   items-center justify-start   p-4 px-7 rounded-3xl rounded-b-none text-sm' )}>
                            <VscTerminalBash  size={23}/> <p className="pl-2   pt-1 pb-0 my-0">Scripts</p>    
                        </Link>
                    </li>
                    <li >
                        <Link href={"/admin/teams"} className={classNames( checkAdminTeamsPage(pathname) ? 'active' : '', 'flex   items-center justify-start   p-4 px-7 rounded-3xl rounded-b-none text-sm' )}>
                            <MdGroups  size={23}/> <p className="pl-2   pt-1 pb-0 my-0">Teams</p>    
                        </Link>
                    </li>
                    <li >
                        <Link href={"/admin/board"} className={classNames( checkAdminLeaderBoardPage(pathname) ? 'active' : '', 'flex   items-center justify-start   p-4 px-7 rounded-3xl rounded-b-none text-sm' )}>
                            <MdLeaderboard  size={23}/> <p className="pl-2   pt-1 pb-0 my-0">Leaderboard</p>    
                        </Link>
                    </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}


export default function TopNavBar() {

    const pathname = usePathname()
    const { data: session } = useSession();

    // console.debug(pathname.includes("/admin/quiz/") )

    return (
        <>
            {
                (session?.user?.role === "admin") ? <AdminNavBar pathname={pathname} /> : (session?.user?.role === "user") ? <UserNavBar  pathname={pathname}/> : null
            }
        </>
    )
} 
