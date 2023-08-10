"use client"

import TotalSubmission from "@/app/components/users/TotalSubmission"
import TotalObtainedPoints from "@/app/components/users/TotalObtainedPoints"
import RightAnswers from "@/app/components/users/RightAnswers"
import TotalChallenges from "@/app/components/users/dashboard/TotalChallenges"
import axios from "axios";
import { toast } from "react-hot-toast";
import {  useEffect, useState } from "react";
import {  useSession } from "next-auth/react";
import Link from "next/link"
import { AiFillEye } from "react-icons/ai"
import AOS from 'aos';
import 'aos/dist/aos.css';



function countSubmitAnswers(data){
    let counter = 0;

    if(data.length){
        data.forEach((item) => {
            counter = item.answers.length  + counter
        })
        
    }
    return counter;
}


function calcTotalPoints(data){
    let points = 0;
    if(data.length){
        data.forEach((item) => {
            if(item.answers?.[0]?.obtainedPoints){
                points = points + item.answers?.[0]?.obtainedPoints   
            }
        })
    }
    return points;
}


function checkTotalStatus(data){
    let trueQuestions = 0;
    let falseQuestions = 0;
    if(data.length){
        data.forEach((item) => {
            if(item.answers?.[0]?.submissionStatus === true){
                trueQuestions++
            }
            else{
                falseQuestions++
            }
        })
    }
    return [trueQuestions, falseQuestions]
}

function calcScenarioPoints(items){
    let points = 0
    items.forEach((item) => {
        if(item.length !== 0){
            points = points + item.points
        }
    })
    
    return points
}

function checkScenarios(data){
    let ids = [];
    let names = [];
    let status_list = [];
    let category_list=  [];
    let description_list = [];
    let total_points = []
    if(data.length){
        data.forEach((item) => {
            if(item.scenario){
                if(ids.includes(item.scenario.id) !== true){
                    ids.push(item.scenario.id)
                    names.push(item.scenario.name)
                    status_list.push(item.scenario.status)
                    category_list.push(item.scenario.category)
                    description_list.push(item.scenario.desc)
                    total_points.push(calcScenarioPoints(item.scenario.questions))
                }
            }
        })
    }
    return [ids, names , status_list, category_list , description_list , total_points];
}




function QuizList({scenarios}){
    return (
        <>
            {   scenarios?.length ? [...Array(scenarios?.[0].length)].map((item, index) => (
                    <div className="component component-CerCheckBox" key={index}>
                        <div className="w-full col-span-3 relative  p-3   rounded-lg   flex flex-col " key={index}>
                            <div className="  my-2 bg-card-custom  rounded-lg shadow   ">
                                <div className="p-5">
                                    <div className="flex justify-between items-center mb-4">
                                        <h5 className=" text-2xl font-bold tracking-tight whitespace-normal text-gray-300 ">{scenarios[1][index]}</h5>
                                    </div>
                                    <p className="text-gray-400">{scenarios[4][index]}</p>
                                    <div className=" pt-4 pb-2 text-start">
                                        <span className="px-1 py-1 text-md font-semibold bg-none text-green-600 ">{scenarios[2][index]}</span>
                                        <span className="px-1 py-1 text-md font-semibold bg-none text-pink-600">{scenarios[3][index]}</span>
                                        <span className="px-1 py-1 text-md font-semibold bg-none text-orange-400">{ scenarios[5][index] +  " Points"}</span>
                                    </div>
                                </div>
                                <div className=" pt-0 pb-4 flex justify-center">
                                    <Link href={`/user/quiz/${scenarios[0][index]}`}  className="transition ease-in-out delay-150 hover:-translate-y-1    hover:bg-blue-300 hover:text-blue-800 cursor-pointer duration-300    btn-flag-submit text-gray-300  flex items-center   sm:text-sm  sm:w-8/12   2xl:w-7/12  h-full rounded-0 px-4 py-2    font-semibold   mb-2 justify-center items-center  ">
                                        <AiFillEye size={23} className=" mr-2 "  /> <span>{"View Scenario" } </span> 
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )) : null
            }
        </>
    )
}


export default function TopStatistics(){
    const { data: session } = useSession();    
    const [totalChallenges, setTotalChallenges] = useState(0)
    const [totalSubmissions, setTotalSubmissions] = useState(0)
    const [totalPoints, setTotalPoints] = useState(0)
    const [totalTrueQuestions, setTotalTrueQuestions] = useState(0)
    const [totalFalseQuestions, setTotalFalseQuestions] = useState(0)
    const [scenarios, setScenarios] = useState([])
    let data ;
    useEffect(() => {
        AOS.init();
        if (session){
            axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${session.user.id}`)
            .then(response => {
                if(response.data.status === true){
                    if(response.data.user?.team?.quiz?.questions?.length) {
                        data = response.data?.user?.team?.quiz?.questions;
                        setScenarios(checkScenarios(data))
                        setTotalChallenges(data?.length)
                        setTotalSubmissions(countSubmitAnswers(data))
                        setTotalPoints(calcTotalPoints(data))
                        setTotalTrueQuestions(checkTotalStatus(data)[0])
                        setTotalFalseQuestions(checkTotalStatus(data)[1])
                    } else{
                        setTotalChallenges(0)
                    }
                }
                else{
                    toast.error(`${response.data.error}`)
                    setTotalChallenges(0)
                }
            })
            .catch(error => {
                console.debug(error)
            })
        }
    }, [])

    return (
        <>
            <div className="p-4 grid gap-3 auto-rows-fr grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 " data-aos="zoom-in" data-aos-duration="1500" data-aos-delay="500">
                <TotalChallenges  totalChallenges={totalChallenges}   />
                <TotalSubmission  totalSubmissions={totalSubmissions} />
                <TotalObtainedPoints  totalPoints={totalPoints} />
                <RightAnswers  totalTrueQuestions={totalTrueQuestions} totalFalseQuestions={totalFalseQuestions} />
            </div>
            <div className="grid gap-1 auto-rows-fr grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="1000">
                {scenarios &&  <QuizList scenarios={scenarios} /> }
            </div>           
        </>
    )
}