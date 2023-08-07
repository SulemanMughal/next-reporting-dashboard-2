"use client"


import Link from "next/link"


// import Image from "next/image"

// import  { BiTime } from "react-icons/bi"
// import  { BsCalendarDate } from "react-icons/bs"
// import { FiChevronsRight } from "react-icons/fi"
// import  { BiTimeFive } from "react-icons/bi"
// import { BsCalendarCheck } from "react-icons/bs"
// import { GiSandsOfTime } from "react-icons/gi"
import  { VscTasklist } from "react-icons/vsc"
import { MdGroups } from "react-icons/md"

import { AiFillEye } from "react-icons/ai"

// import { GrView } from "react-icons/gr"


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
            <span className="inline-block  rounded-full px-3 py-1 text-lg font-semibold bg-none text-blue-600 mr-2 mb-2">{"Upcoming"}</span>
        )
    }  else if ((current_time.getTime() < end_time.getTime()) && (start_time.getTime() < end_time.getTime())){
        // return "In Progress"
        return (
            <span className="inline-block  rounded-full px-3 py-1 text-lg font-semibold bg-none text-indigo-600 mr-2 mb-2">{"In Progress"}</span>
        )
    } else if (end_time <  current_time){
        // return "End"
        return (
            <span className="inline-block  rounded-full px-3 py-1 text-lg font-semibold bg-none text-violet-600 mr-2 mb-2">{"End"}</span>
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
                <div className="max-w-sm  mx-2 my-2 bg-card-custom border-none rounded-lg shadow  text-gray-400 ">
                        <div className="p-5">
                            <div className="flex justify-between items-center mb-4">
                                <h5 className=" text-2xl font-bold tracking-tight whitespace-normal text-gray-500 ">{quiz.title}</h5>
                                <MenuBtn  setShowModal={setShowModal} showModal={showModal} />    
                            </div>
                            
                            <div className=" pt-4 pb-2 text-center">
                                {
                                    quiz.status.toString().toLowerCase() === "draft" ?   (
                                        <span className="inline-block   px-3 py-1 text-lg font-semibold bg-none text-red-600 mr-2 mb-2">
                                            { capitalizeFirstLetter(quiz.status)}
                                        </span>
                                    ) :
                                    (
                                        <>
                                            <span className="inline-block   px-3 py-1 text-lg font-semibold bg-none text-green-600 mr-2 mb-2">{capitalizeFirstLetter(quiz.status)}</span>
                                            
                                        </>
                                    )
                                }
                                {quizStatus(quiz.startAt, quiz.endAt)}
                                
                            </div>
                                <ul className="max-w-md ">
                                    {/* <li className="py-3 sm:pb-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-shrink-0">
                                                <BsCalendarDate   size={28} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-md font-medium  truncate ">
                                                Start Date
                                                </p>
                                            </div>
                                            <div className="flex flex-rows items-center text-base font-semibold  ">
                                                <p>{new Date(quiz.startAt).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                    </li> */}
                                    {/* <li className="py-3 sm:pb-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-shrink-0">
                                                <BiTime   size={28}/>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-md font-medium  truncate ">
                                                Starting Time
                                                </p>
                                            </div>
                                            <div className="flex flex-rows items-center text-base font-semibold  ">
                                                <p>{new Date(quiz.startAt).toLocaleTimeString('it-IT')}</p>
                                            </div>
                                        </div>
                                    </li> */}
                                    {/* <li className="py-3 sm:pb-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-shrink-0">
                                                <BsCalendarCheck   size={28} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-md font-medium  truncate ">
                                                End Date
                                                </p>
                                            </div>
                                            <div className="flex flex-rows items-center text-base font-semibold  ">
                                                <p>{new Date(quiz.endAt).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                    </li> */}
                                    {/* <li className="py-3 sm:pb-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-shrink-0">
                                                <BiTimeFive   size={28}/>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-md font-medium  truncate ">
                                                Ending Time
                                                </p>
                                            </div>
                                            <div className="flex flex-rows items-center text-base font-semibold  ">
                                                <p>{new Date(quiz.endAt).toLocaleTimeString('it-IT')}</p>
                                            </div>
                                        </div>
                                    </li> */}
                                    {/* <li className="py-3 sm:pb-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-shrink-0">
                                                <GiSandsOfTime   size={28}/>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-md font-medium  truncate ">
                                                Duration
                                                </p>
                                            </div>
                                            <div className="flex flex-rows items-center text-base font-semibold  ">
                                                <p>{new Date((new Date(quiz.endAt)) - new Date(quiz.startAt)).toLocaleTimeString('it-IT')}</p>
                                            </div>
                                        </div>
                                    </li> */}
                                    <li className="py-3 sm:pb-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-shrink-0">
                                                <VscTasklist   size={28}/>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-md font-medium  truncate ">
                                                Questions
                                                </p>
                                            </div>
                                            <div className="flex flex-rows items-center text-base font-semibold  ">
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
                                                <p className="text-md font-medium  truncate ">
                                                Teams
                                                </p>
                                            </div>
                                            <div className="flex flex-rows items-center text-base font-semibold  ">
                                                <p>{quiz.teams.length}</p>
                                            </div>
                                        </div>
                                    </li>

                                    
                                    

                                </ul>

                                <div className=" pt-4 pb-2 flex justify-center">
                                    <Link href={`/admin/quiz/${quiz.id}`}  className="transition ease-in-out delay-150 hover:-translate-y-1    hover:bg-white hover:text-black duration-300    theme-bg-color text-gray-400  flex items-center  w-2/3 h-full rounded-0 px-4 py-2 text-xl font-semibold  mr-2 mb-2 justify-center items-center  ">
                                        <AiFillEye size={23} className=" mr-2 "  /> <span>{"View Details" } </span> 
                                    </Link>
                                </div>
                        </div>
                    </div>
            </div>
        </>
    )
}