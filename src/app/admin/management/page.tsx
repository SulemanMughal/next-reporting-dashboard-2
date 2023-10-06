import Link from "next/link"
import {  PiUsersThreeFill } from "react-icons/pi";
import { HiUserGroup } from "react-icons/hi"
import { FaServer } from "react-icons/fa"
import { LuActivity } from "react-icons/lu"
import { AiOutlineSolution } from "react-icons/ai"
import { GiFiles } from "react-icons/gi"


// User Management Card
function UserManagementCard() {
    return (
        <div className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105  duration-300">
            <div className="w-full col-span-1 p-6 bg-deep-blue-violet  rounded-lg shadow text-center">
                <PiUsersThreeFill size={80} className=" w-full text-center block" style={{"color" : "#FFA500"}} />
                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 text-white my-3">Users</h5>
                <div className=" py-4 flex justify-center">
                    <Link href={`#!`}  className="cursor-pointer bg-dark-navy-blue flex justify-center items-center   text-white text-sm  2xl:text-base    h-full rounded-md p-2">
                        <span>{"Manage Users" } </span> 
                    </Link>
                </div>
            </div>
        </div>
    )
}

// Team Management Card
function TeamManagementCard() {
    return (
        <div className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105  duration-300">
            <div className="w-full col-span-1 p-6 bg-deep-blue-violet  rounded-lg shadow text-center">
                <HiUserGroup size={80} className=" w-full text-center block"  style={{"color" : "#00FF00"}}/>
                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 text-white my-3">Teams</h5>
                <div className=" py-4 flex justify-center">
                    <Link href={`#!`}  className="cursor-pointer bg-dark-navy-blue flex justify-center items-center   text-white text-sm  2xl:text-base    h-full rounded-md p-2">
                        <span>{"Manage Teams" } </span> 
                    </Link>
                </div>
            </div>
        </div>
    )
}

// Challenges Management Card
function ChallengesManagementCard() {
    return (
        <div className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105  duration-300">
            <div className="w-full col-span-1  p-6 bg-deep-blue-violet  rounded-lg shadow text-center">
                <FaServer size={80} className=" w-full text-center block" style={{"color" : "#FF4081"}} />
                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 text-white my-3">Challenges</h5>
                <div className=" py-4 flex justify-center">
                    <Link href={`#!`}  className="cursor-pointer bg-dark-navy-blue flex justify-center items-center   text-white text-sm  2xl:text-base    h-full rounded-md p-2">
                        <span>{"Manage Challenges" } </span> 
                    </Link>
                </div>
            </div>
        </div>
    )
}

// Submissions Management Card
function SubmissionsManagementCard() {
    return (
        <div className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105  duration-300">
            <div className="w-full col-span-1  p-6 bg-deep-blue-violet  rounded-lg shadow text-center">
                <AiOutlineSolution size={80} className=" w-full text-center block" style={{"color" : "#FFFF00"}} />
                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 text-white my-3">Submissions</h5>
                <div className=" py-4 flex justify-center">
                    <Link href={`#!`}  className="cursor-pointer bg-dark-navy-blue flex justify-center items-center   text-white text-sm  2xl:text-base    h-full rounded-md p-2">
                        <span>{"Manage Submissions" } </span> 
                    </Link>
                </div>
            </div>
        </div>
    )
}

// Acitvities Management Card
function ActivitiesManagementCard() {
    return (
        <div className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105  duration-300">
            <div className="w-full col-span-1  p-6 bg-deep-blue-violet  rounded-lg shadow text-center">
                <LuActivity size={80} className=" w-full text-center block" style={{"color" : "#FF6B6B"}} />
                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 text-white my-3">Activities</h5>
                <div className=" py-4 flex justify-center">
                    <Link href={`#!`}  className="cursor-pointer bg-dark-navy-blue flex justify-center items-center   text-white text-sm  2xl:text-base    h-full rounded-md p-2">
                        <span>{"Manage Activities" } </span> 
                    </Link>
                </div>
            </div>
        </div>
    )
}

// Files Mangement Card
function FilesManagementCard() {
    return (
        <div className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105  duration-300">
            <div className="w-full col-span-1  p-6 bg-deep-blue-violet  rounded-lg shadow text-center">
                <GiFiles size={80} className=" w-full text-center block" style={{"color" : "#F7DD72"}} />
                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 text-white my-3">Files</h5>
                <div className=" py-4 flex justify-center">
                    <Link href={`#!`}  className="cursor-pointer bg-dark-navy-blue flex justify-center items-center   text-white text-sm  2xl:text-base    h-full rounded-md p-2">
                        <span>{"Manage Files" } </span> 
                    </Link>
                </div>
            </div>
        </div>
    )
}


export default function Page() {
    return (
        <div  className="p-4 mb-16">
            <div className="flex justify-between items-center mb-5 ">
                <h1 className="text-white text-2xl font-bold">
                    Management Panel
                </h1>
            </div>
            <div className="p-4 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3  ">
                <UserManagementCard />
                <TeamManagementCard />
                <ChallengesManagementCard />
                <SubmissionsManagementCard />
                <ActivitiesManagementCard />
                <FilesManagementCard />
            </div>
        </div>
    )
}