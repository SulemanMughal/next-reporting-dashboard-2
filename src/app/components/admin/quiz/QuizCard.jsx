"use client"


import Link from "next/link"
import  { VscTasklist } from "react-icons/vsc"
import { MdGroups } from "react-icons/md"
import { AiFillEye } from "react-icons/ai"
import MenuBtn from "@/app/components/admin/quiz/MenuBtn"
import { useState } from "react"
import TeamMembersModal from "./TeamMembersModal"

import TeamList from "./TeamList"


import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react"



function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// calculate total poitns for a quiz
function calcTotalPoints(quiz){
    let points = 0
    if(quiz  && quiz.questions && quiz.questions.length){
        quiz.questions.map((question) => {
            points = points + question.points
        })
    }
    return points
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
    
    

    useEffect(()=>{
        AOS.init();
    }, [])

    return (
        <>
            
        
            {/* {showModal && <TeamMembersModal  setShowModal={setShowModal}  members={quiz.teams.length ? quiz.teams[0].users : 0 } />} */}

            {showModal && <TeamList setShowModal={setShowModal} teams={quiz.teams.length ? quiz.teams : 0 } /> }
            <div className="w-full col-span-1 relative  m-auto p-0 border-none rounded-lg h-full " data-aos="zoom-in" data-aos-duration="1500" data-aos-delay="500">
                <div className="  mx-2 my-2 p-4 bg-card-custom border-none rounded-lg shadow  text-gray-400 ">
                        <div className="p-5">
                            <div className="flex justify-between items-center mb-4 ">
                                <h5 className=" text-2xl font-bold tracking-tight whitespace-normal text-gray-500 ">{quiz.title}</h5>
                                <MenuBtn  setShowModal={setShowModal} showModal={showModal} />    
                            </div>
                            
                            {/* <div className=" pt-4 pb-2 text-center">
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
                                
                            </div> */}
                                <ul className="w-full ">
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
                                <span className="py-2 text-lg font-bold bg-none text-green-600 block text-center">{calcTotalPoints(quiz) + " Points"}</span>
                                <div className=" pt-4 pb-2 flex justify-center">
                                    <Link href={`/admin/quiz/${quiz.id}`}  className="transition ease-in-out delay-150 hover:-translate-y-1    hover:bg-blue-300 hover:text-blue-800 duration-300    btn-flag-submit text-gray-400  flex items-center  font-semibold  mr-2 mb-2 justify-center items-center   h-full rounded-0 px-4 py-2 text-xl   w-2/3    ">
                                        <AiFillEye size={23} className=" mr-2 "  /> <span>{"View Details" } </span> 
                                    </Link>
                                </div>
                        </div>
                    </div>
            </div>
        </>
    )
}