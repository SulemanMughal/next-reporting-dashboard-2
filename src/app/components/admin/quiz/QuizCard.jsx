"use client"


import Link from "next/link"
import  { VscTasklist } from "react-icons/vsc"
import { MdGroups } from "react-icons/md"
import { AiFillEye } from "react-icons/ai"
import MenuBtn from "@/app/components/admin/quiz/MenuBtn"
import TeamList from "./TeamList"
import { useEffect , useState } from "react"
import { FaPuzzlePiece } from "react-icons/fa"
import { quizStatus, capitalizeFirstLetter , calcTotalPoints  , calcTotalScenarios} from "@/app/lib/helpers"
import TeamAssignModal from "./TeamAssignModal"





export default function QuizCard({quiz , setData}){
    const [showModal, setShowModal] = useState(false)
    const [showTeamAssignModal, setShowTeamAssignModal] = useState(false)
    
    return (
        <>
            {showModal && <TeamList setShowModal={setShowModal} teams={quiz.teams.length ? quiz.teams : 0 } /> }
            {showTeamAssignModal &&  <TeamAssignModal setShowTeamAssignModal={setShowTeamAssignModal} quizId={quiz.id} setData={setData}  /> }
            <div className="w-full col-span-1 relative  m-auto p-0 border-none rounded-lg h-full " data-aos="zoom-in" data-aos-duration="500" data-aos-delay="200">
                <div className="  m-0 p-0  bg-deep-blue-violet  border-none rounded-lg shadow  text-gray-300 ">
                        <div className="p-5">
                            {/* quiz - title */}
                            <div className="flex justify-between items-center mb-4 ">
                                <h5 className=" font-medium text-base tracking-tight whitespace-normal text-gray-300  text-center mb-1 ">{quiz.title}</h5>
                                <MenuBtn  setShowModal={setShowModal} showModal={showModal} setShowTeamAssignModal={setShowTeamAssignModal} />    
                            </div>
                            <div className=" pt-4 pb-2 flex justify-between">
                                
                                <span className="py-1 text-base font-bold bg-none text-blue-400" >{  quiz.teams.length +  " Teams" }</span>
                                <span className=" py-1 text-base font-bold bg-none text-yellow-400 ">{  calcTotalScenarios(quiz) +  " Challenges"}</span>
                            </div>
                            <div className=" pb-2 flex justify-between">
                                <span className="py-1  text-base font-bold bg-none text-green-400">{quiz._count.questions + " Questions"}</span>
                                <span className="py-1  text-base font-bold bg-none text-rose-400">{calcTotalPoints(quiz) + " Points"}</span>
                            </div>
                            {/* <ul className="w-full ">
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
                                <li className="py-3 sm:pb-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-shrink-0">
                                            <FaPuzzlePiece   size={28}/>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-md font-medium  truncate ">
                                            Challenges
                                            </p>
                                        </div>
                                        <div className="flex flex-rows items-center text-base font-semibold  ">
                                            <p>{calcTotalScenarios(quiz)}</p>
                                        </div>
                                    </div>
                                </li>
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
                            </ul> */}
                            
                            <div className=" pt-5 pb-2 flex justify-center">
                                <Link href={`/admin/quiz/${quiz.id}`}  className="  cursor-pointer     bg-dark-navy-blue  flex justify-center items-center   text-white text-base    h-full rounded-md px-3 py-1    ">
                                    {/* <AiFillEye size={23} className=" mr-2 "  />  */}
                                    <span>{"Details" } </span> 
                                </Link>
                            </div>
                        </div>
                    </div>
            </div>
        </>
    )
}