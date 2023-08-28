"use client"


import axios from "axios";
import { toast } from "react-hot-toast";

import {  use, useEffect, useRef, useState } from "react";
import CustomToaster from "@/app/components/CustomToaster"

import AOS from 'aos';
import 'aos/dist/aos.css';
import decrypt from "@/app/lib/decrypt"
import { convertStringToArray , capitalizeFirstLetter , getDifficultyColor , convertStringToTitleCase , totalScenarioPoints ,extractLastStrategyName } from "@/app/lib/helpers"

import SVGLoader from "@/app/components/SVGLoader";
import Link from "next/link";
import { FaFile } from "react-icons/fa";
import encrypt from "@/app/lib/encrypt"



// delay function
const delay = ms => new Promise(res => setTimeout(res, ms));


function AnswerComponent({question , index}){



    const answer = useRef(null)
    const [isSubmit, setIsSubmit] = useState(false)
    useEffect(() => {
        answer.current = question.original_answer
    }, [])


    const updateAnswerHandler = (questionID) => {
        setIsSubmit(true)
        if(answer.current === "" || answer.current === null){
            toast.error("Answer cannot be empty")
            setIsSubmit(false)
            return
        }
        const encryptedData = encrypt({
            "answer" : answer.current
        })
        axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/question/${questionID}`, {
            encryptedData
        })
        .then(res => {
            const {...data} = decrypt(res.data.encryptedData)
            if(data.status === true){
                toast.success("Answer updated successfully")
                
            } else{
                toast.error("Sorry! There is an error while updating. Please try again later")
            }
        })
        .catch(error => {
            console.debug(error)
            toast.error(`Sorry! There is an error while updating. Please try again later`)
        }).finally(() => {
            delay(1000).then(() => {
                setIsSubmit(false)
            })
        })
    }

    return (
        <>
            {question && (
                <div className="mt-6 text-lg text-gray-300" >
                    <label>
                        {`Question ${index+1} ) ${question.Description}`} <span className="text-xs text-gray-500 ml-2 italic">({question.points} points)</span>
                    </label>
                    <div className="flex flex-wrap -mx-3 mt-2">
                        <div className="w-full  w-5/6 px-3 h-full">
                            <input className=" placeholder-gray-400 outline-0  border border-2 border-deep-indigo focus:border focus:border-2 focus:border-blue-900  text-white    w-full p-2 px-4  m-0 mt-2 text-base block bg-deep-indigo  rounded-md shadow-sm"  type="text" placeholder={extractLastStrategyName(question.Description)} style={{"boxShadow": "inset 0 0px 0 #ddd"}}  autoComplete={"off"}  defaultValue={question.original_answer}  onChange={(e) => (answer.current = e.target.value)} />
                        </div>
                        <div className="w-full md:w-1/6 px-3 h-full">
                            {isSubmit ? 
                                    <SVGLoader text={"  "} className="bg-dark-navy-blue block w-full  text-white mt-2  h-full p-2 rounded" /> : <button className="bg-dark-navy-blue block w-full  text-white mt-2  h-full p-2 rounded"  onClick={() => updateAnswerHandler(question.id)} >Update </button> 
                            }
                            

                        </div>
                    </div>
                </div>
            )}
        </>
    )
}


export default function Page({ params }){
    const [scenario, setScenario] = useState(null)
    const [totalPoints, setTotalPoints] = useState(0) 
    const [fileSizes, setFileSizes] = useState([])


    useEffect(() => {
        AOS.init();
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/scenario/${params.id}`)
        .then(res => {
            const {...data } = decrypt(res.data.encryptedData)
            // console.debug(data?.result?.result)
            if(data.status === true){
                setScenario(data?.result)
                setTotalPoints(totalScenarioPoints(data?.result))
                setFileSizes(data?.fileSizes)
            } else{
                toast.error(`${data.error}`)
                setScenario(null)
                setFileSizes([])
            }
            //     setQuestions(data?.questions?.team?.quiz?.questions)
            //     if(data?.questions?.team?.quiz?.questions.length){
            //         setScenario(data?.questions?.team?.quiz?.questions[0]?.scenario)
            //         setTeam(data?.questions?.team?.id)
            //         setTeamName(data?.questions?.team?.name)
            //         setQuiz(data?.questions?.team?.quiz?.id)
            //         setTopUser(findUserWithMostAnswersAndPoints(data?.questions))
            //         // console.debug(getUsersWithSubmissionTime(data?.questions?.team?.quiz?.questions))
            //         setRecentSolves(getUsersWithSubmissionTime(data?.questions?.team?.quiz?.questions))
                    
            //     }
            // }
            // else{
            //     toast.error(`${data.error}`)
            //     setTotalChallenges(0)
            // }
        })
        .catch(error => {
            console.debug(error)
        })
    }, [])


    
    
    return (
        <>
            <CustomToaster />
            <div className="p-2 grid  grid-cols-6 gap-4 items-start justify-center" >
            {scenario && (
                <>
                    {/* Left Side */}
                    <div className="w-full col-span-2 relative   p-0  rounded-0 " data-aos="fade-right" data-aos-duration="700" data-aos-delay="500">
                        <div  className="block  p-6 bg-deep-blue-violet rounded-lg shadow ">
                                <h5 className="block font-medium text-3xl text-blue-600">{scenario.name}</h5>
                                <p className=" text-gray-300 mt-2 text-lg">
                                    {scenario.desc}    
                                </p>
                                <div className="mt-5">
                                    {
                                        convertStringToArray(scenario.tags)?.map((tag, index) => {
                                            return (
                                                <span className="px-2 py-1 rounded-full bg-deep-blue text-white mr-1 font-sm " key={index}>{convertStringToTitleCase(tag)}</span>
                                            )
                                        })
                                    }
                                </div>
                                <div className="intro-y flex relative  pt-16 sm:pt-6 items-center">
            
                        <div className="absolute sm:relative -mt-12 sm:mt-0 w-full flex  text-gray-400 text-xs sm:text-sm">
                            
                            <div className="intro-x sm:mr-3 ">
                                <span className="font-medium text-gray-400  ">{"Total Points"}</span>
                                <br />
                                <span className="font-bold text-yellow-500 text-lg">{totalPoints}</span> 
                                <br />
                                
                            </div>
                            <div className="intro-x sm:mr-3 ml-auto">
                                <span className="font-medium text-gray-400  ">{"Total Questions"}</span>
                                
                                <br />
                                <span className="font-bold text-emerald-500 text-lg">
                                    {scenario?.questions?.length}
                                </span> 
                            </div>
                            <div className="intro-x sm:mr-3 ml-auto">Difficulty<br />
                                <span className={" text-sm " +  getDifficultyColor(capitalizeFirstLetter(scenario.difficulty)) } >
                                    {capitalizeFirstLetter(scenario.difficulty)}
                                </span> 
                            </div>
                            
                            <div className="intro-x sm:mr-3 ml-auto">OS<br />
                                <span className="text-sm  text-emerald-500 py-1 ">
                                    {scenario.os_type}
                                </span> 
                            </div>
                        </div>
            
                                </div>
                                {(scenario?.files && scenario?.files?.length ) && scenario?.files.map((file, index) => (
                                    <div  key={file.id}>
                                        <div className="w-full border-t border-gray-200  border-dark-5 border-dashed mt-5"></div>
                                        <div className="flex items-center mt-5">
                                                    <div className="file">
                                                        <a href="" className="w-12 file__icon file__icon--file">
                                                            <FaFile  className="text-3xl text-white"/>
                                                        </a>
                                                    </div>
                                                    {/* File Sizes */}
                                                    <div className="ml-4">
                                                        <a className="font-medium text-gray-300" href="">{file.filename}</a> 
                                                        <div className="text-gray-400 text-xs">
                                                            {fileSizes[index]}
                                                        </div>
                                                    </div>

                                                    <div className="ml-auto">
                                                        <a className="font-medium text-gray-300" href="">Password</a> 
                                                        <div className="text-gray-400 text-xs">
                                                            {file.password}
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="ml-auto">
                                                        <Link  href={`${file.filepath}`}  className="w-full my-5 block bg-dark-navy-blue  text-white font-medium font-xs py-2 px-4 border-none rounded" target="_blank" rel="noopener noreferrer">
                                                            Download File
                                                        </Link>
                                                    </div>
                                        </div>
                                    </div>
                                ))}
                                
                                
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="w-full col-span-4 relative   p-0  rounded-0">
                        {/* Top Header Challenge details */}
                        <div className="rounded-md px-5 py-4 mb-2 bg-deep-blue text-white mb-5" data-aos="fade-up" data-aos-duration="700" data-aos-delay="500">
                                <div className="flex items-center">
                                    <div className="font-medium text-lg">Scenario</div>
                                    <div className="text-xs bg-white px-1 rounded-md text-gray-800 ml-auto">{scenario.name}</div>
                                </div>
                                <div className="mt-3 text-base">
                                    {scenario.desc} 

                                </div>
                        </div>

                        {/* Questions List */}
                        <div  className="  p-5 bg-deep-blue-violet rounded-lg shadow " data-aos="fade-left" data-aos-duration="1500" data-aos-delay="500">
                            <h2 className="text-xl font-medium mr-auto text-gray-300">{"Challenge Submission"}</h2>
                            {
                                (scenario?.questions && scenario?.questions.length) &&  scenario?.questions.map((question, index) =>    
                                    (
                                        <>
                                            <AnswerComponent question={question} key={index} index={index} />
                                        </>
                                    )
                                )
                            }
                        </div>
                    </div>
                </>

            )}
            </div>
        </>

    )
}



