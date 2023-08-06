"use client"


import Link from "next/link"


// import Image from "next/image"

import  { BiTime } from "react-icons/bi"
import  { BsCalendarDate } from "react-icons/bs"
import { FiChevronsRight } from "react-icons/fi"
import  { BiTimeFive } from "react-icons/bi"
import { BsCalendarCheck } from "react-icons/bs"
import { GiSandsOfTime } from "react-icons/gi"
import  { VscTasklist } from "react-icons/vsc"
import { MdGroups } from "react-icons/md"

import MenuBtn from "@/app/components/admin/quiz/MenuBtn"

import { useState } from "react"


import TeamMembersModal from "./TeamMembersModal"

// import { useState } from "react"

// useState


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}



function quizStatus(startAt, endAt){

    
    const current_time = new Date()
    const end_time = new Date(endAt)
    const start_time = new Date(startAt)
    // console.debug( (current_time.getTime() < end_time.getTime()) && (start_time.getTime() < end_time.getTime()))
    if( current_time < start_time)
    { 
        // return "Upcoming" 
        return (
            <span className="inline-block  rounded-full px-3 py-1 text-md font-semibold bg-blue-100 text-blue-800 mr-2 mb-2">{"Upcoming"}</span>
        )
    }  else if ((current_time.getTime() < end_time.getTime()) && (start_time.getTime() < end_time.getTime())){
        // return "In Progress"
        return (
            <span className="inline-block  rounded-full px-3 py-1 text-md font-semibold bg-indigo-100 text-indigo-800 mr-2 mb-2">{"In Progress"}</span>
        )
    } else if (end_time <  current_time){
        // return "End"
        return (
            <span className="inline-block  rounded-full px-3 py-1 text-md font-semibold bg-violet-100 text-violet-800 mr-2 mb-2">{"End"}</span>
        )
    }
}

export default function QuizCard({quiz}){
    
    const [showModal, setShowModal] = useState(false)
    // const showMembers = () => {

    return (
        <>
            
        
            {showModal && <TeamMembersModal  setShowModal={setShowModal}  members={quiz.teams.length ? quiz.teams[0].users : 0 } />}
            <div className="w-full col-span-1 relative  m-auto p-0 border-none rounded-lg h-full ">
                <div className="max-w-sm  mx-2 my-2 bg-white border border-gray-200 rounded-lg shadow   transition ease-in-out delay-150   hover:bg-gray-300 duration-300">
                        <div className="p-5">
                            <div className="flex justify-between items-center">
                                <h5 className="mb-4 text-1xl font-bold tracking-tight whitespace-normal text-gray-900 ">{quiz.title}</h5>
                                <MenuBtn  setShowModal={setShowModal} showModal={showModal} />    
                            </div>
                            
                            <div className=" pt-4 pb-2">
                                {
                                    quiz.status === "draft" ?   (
                                        <span className="inline-block  rounded-full px-3 py-1 text-md font-semibold bg-red-100 text-red-800 mr-2 mb-2">
                                            { capitalizeFirstLetter(quiz.status)}
                                        </span>
                                    ) :
                                    (
                                        <>
                                            <span className="inline-block  rounded-full px-3 py-1 text-md font-semibold bg-green-100 text-green-800 mr-2 mb-2">{capitalizeFirstLetter(quiz.status)}</span>
                                            
                                        </>
                                    )
                                }
                                {quizStatus(quiz.startAt, quiz.endAt)}
                                
                            </div>
                                <ul className="max-w-md ">
                                    <li className="py-3 sm:pb-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-shrink-0">
                                                <BsCalendarDate   size={28} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-md font-medium text-gray-900 truncate ">
                                                Start Date
                                                </p>
                                            </div>
                                            <div className="flex flex-rows items-center text-base font-semibold text-gray-900 ">
                                                <p>{new Date(quiz.startAt).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="py-3 sm:pb-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-shrink-0">
                                                <BiTime   size={28}/>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-md font-medium text-gray-900 truncate ">
                                                Starting Time
                                                </p>
                                            </div>
                                            <div className="flex flex-rows items-center text-base font-semibold text-gray-900 ">
                                                <p>{new Date(quiz.startAt).toLocaleTimeString('it-IT')}</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="py-3 sm:pb-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-shrink-0">
                                                <BsCalendarCheck   size={28} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-md font-medium text-gray-900 truncate ">
                                                End Date
                                                </p>
                                            </div>
                                            <div className="flex flex-rows items-center text-base font-semibold text-gray-900 ">
                                                <p>{new Date(quiz.endAt).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                    </li>
                                    
                                    <li className="py-3 sm:pb-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-shrink-0">
                                                <BiTimeFive   size={28}/>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-md font-medium text-gray-900 truncate ">
                                                Ending Time
                                                </p>
                                            </div>
                                            <div className="flex flex-rows items-center text-base font-semibold text-gray-900 ">
                                                <p>{new Date(quiz.endAt).toLocaleTimeString('it-IT')}</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="py-3 sm:pb-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-shrink-0">
                                                <GiSandsOfTime   size={28}/>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-md font-medium text-gray-900 truncate ">
                                                Duration
                                                </p>
                                            </div>
                                            <div className="flex flex-rows items-center text-base font-semibold text-gray-900 ">
                                                <p>{new Date((new Date(quiz.endAt)) - new Date(quiz.startAt)).toLocaleTimeString('it-IT')}</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="py-3 sm:pb-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-shrink-0">
                                                <VscTasklist   size={28}/>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-md font-medium text-gray-900 truncate ">
                                                Questions
                                                </p>
                                            </div>
                                            <div className="flex flex-rows items-center text-base font-semibold text-gray-900 ">
                                                <p>{quiz._count.questions}</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="py-3 sm:pb-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-shrink-0">
                                                <MdGroups   size={28}/>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-md font-medium text-gray-900 truncate ">
                                                Teams
                                                </p>
                                            </div>
                                            <div className="flex flex-rows items-center text-base font-semibold text-gray-900 ">
                                                <p>{quiz.teams.length}</p>
                                            </div>
                                        </div>
                                    </li>

                                    
                                    

                                </ul>

                                <div className=" pt-4 pb-2">
                                    <Link href={`/admin/quiz/${quiz.id}`} >
                                        <span className="inline-flex  rounded-full px-3 py-1 text-lg font-semibold bg-gray-100 text-gray-800 mr-2 mb-2" >
                                            {"See Details" }  <FiChevronsRight size={23} className="pt-1 ml-2"  />
                                        </span>
                                    </Link>
                                </div>
                        </div>
                    </div>
            </div>
        </>
    )
}