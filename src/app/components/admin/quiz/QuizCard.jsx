"use client"


import Link from "next/link"
import  { VscTasklist } from "react-icons/vsc"
import { MdGroups } from "react-icons/md"
import { AiFillEye } from "react-icons/ai"
import MenuBtn from "@/app/components/admin/quiz/MenuBtn"
import TeamList from "./TeamList"
import { useEffect , useState } from "react"
import { quizStatus, capitalizeFirstLetter , calcTotalPoints } from "@/app/lib/helpers"

import TeamAssignModal from "./TeamAssignModal"

export default function QuizCard({quiz , setData}){
    const [showModal, setShowModal] = useState(false)
    const [showTeamAssignModal, setShowTeamAssignModal] = useState(false)
    
    return (
        <>
            {showModal && <TeamList setShowModal={setShowModal} teams={quiz.teams.length ? quiz.teams : 0 } /> }
            {showTeamAssignModal &&  <TeamAssignModal setShowTeamAssignModal={setShowTeamAssignModal} quizId={quiz.id} setData={setData}  /> }
            <div className="w-full col-span-1 relative  m-auto p-0 border-none rounded-lg h-full " data-aos="zoom-in" data-aos-duration="1500" data-aos-delay="500">
                <div className="  mx-2 my-2 p-4 bg-card-custom border-none rounded-lg shadow  text-gray-400 ">
                        <div className="p-5">
                            <div className="flex justify-between items-center mb-4 ">
                                <h5 className=" text-2xl font-bold tracking-tight whitespace-normal text-gray-500 ">{quiz.title}</h5>
                                <MenuBtn  setShowModal={setShowModal} showModal={showModal} setShowTeamAssignModal={setShowTeamAssignModal} />    
                            </div>
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