"use client"


// import { useSession } from "next-auth/react";


import CustomTriangleLoader from "@/app/components/CustomTriangleLoader"


import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from "axios";
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast";
import decrypt from "@/app/lib/decrypt"
import Image from "next/image";
import { FaUser, FaCogs, FaQuestion , FaClipboard , FaSearchPlus, FaHeartbeat , FaProjectDiagram , FaSpider , FaShieldAlt , FaBrain , FaServer  } from "react-icons/fa";
import { getInitials } from "@/app/lib/helpers"
import CountUp from 'react-countup';
// import { de } from "date-fns/locale";


// const icons = [
//     <FaShieldAlt  className="mr-2 text-base "/>,
//     <FaBrain  className="mr-2 text-base "/>,
//     <FaServer  className="mr-2 text-base "/>,
// ]

import {cybersecurityIcons} from "@/app/lib/icons"



// function countQuestionsByScenario(questionsList) {
//     const scenarioCounts = {};

//     for (const question of questionsList) {
//         const scenarioName = question.scenario.category;
//         if (scenarioName in scenarioCounts) {
//             scenarioCounts[scenarioName]++;
//         } else {
//             scenarioCounts[scenarioName] = 1;
//         }
//     }

//     return scenarioCounts;
// }


function calculateCategoryStats(questions) {
    const categoryStats = {};
    try {
        questions.forEach(question => {
            const category = question?.scenario?.category;
            const submitted = question?.answers.length > 0;
            if (!categoryStats[category]) {
                categoryStats[category] = {
                    questionCount: 0,
                    answerCount: 0
                };
            }
            categoryStats[category].questionCount++;
            if (submitted) {
                categoryStats[category].answerCount++;
            }
        });
        return categoryStats
    } catch (error) {
        console.debug(error)
        return {}
    }
}



function checkEqualNumberOfQuestionsAndAnswers(questions) {
    let soved_challenges = 0;
    try {
        questions.forEach(item => {
            let { scenario, answers } = item;
            if (scenario.questions.length === answers.length) {
                soved_challenges = soved_challenges + 1
            } 
        });
        return soved_challenges;
    } catch (error) {
        return 0
    }
  }

  function calculateTotalObtainedPoints(data, userId) {
    try{
        const totalObtainedPoints = data.reduce((total, obj) => {
            const userAnswers = obj.answers.filter(answer => answer.user.id === userId);
            const userObtainedPoints = userAnswers.reduce((sum, answer) => sum + answer.obtainedPoints, 0);
            return total + userObtainedPoints;
          }, 0);
          
          return totalObtainedPoints;
    } catch(error){
        console.debug(error)
        return 0;
    }
}


export default function Page({ params }){

    // const { data: session } = useSession();



    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState(null)
    const [solveChallengesCounter, setSolveChallengesCounter] = useState(0)
    const [totalObtainedPointsUser, setTotalObtainedPointsUser] = useState(0)


    

    // { params: { id: '02fb5aad-8836-44cf-bead-3bd235024f91' } }

    // const solved

    // for (const category in categoryStats) {
    //     if (categoryStats[category].answerCount === 0) {
    //         delete categoryStats[category];
    //     }
    // }




    const DataFetch = () => {
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/profile/${params.id}`)
        .then(res => {
            const {...data } = decrypt(res.data.encryptedData)
            if(data?.status === true){
                if(data?.result === null ){
                    setData(`Sorry! No User has been found with this id`)
                    setError(`Sorry! No User has been found with this id`);
                    setCategories(null)
                    setTotalObtainedPointsUser(0)
                    setSolveChallengesCounter(0)
                } else{
                    // console.log(data)
                    setData(data?.result)
                    setError(null);
                    // console.debug(calculateCategoryStats(data?.result?.team?.quiz?.questions))
                    setCategories(calculateCategoryStats(data?.result?.team?.quiz?.questions))

                    setSolveChallengesCounter(checkEqualNumberOfQuestionsAndAnswers(data?.result?.team?.quiz?.questions))
                    setTotalObtainedPointsUser(calculateTotalObtainedPoints(data?.result?.team?.quiz?.questions, params.id))
                }
                
            } else {
                setData(null)
                console.log(data?.error)
                toast.error(data?.error);
                setError(data?.error);
                setCategories(null)
                setSolveChallengesCounter(0)
                setTotalObtainedPointsUser(0)
            }
        })
        .catch(error => {
            setData(null)
            setCategories(null)
            setSolveChallengesCounter(0)
            setTotalObtainedPointsUser(0)
            console.log(error)
            toast.error(`Sorry! There is an error while fetching user profile data.Please try again later`);
            setError(`Sorry! There is an error while fetching user profile data.Please try again later`);
        }).finally(() => {
            setLoading(false);
        })
    }

    useEffect(() => {
        AOS.init();
        DataFetch()
       // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [])

    return (
        <>
            {loading ? (
                <CustomTriangleLoader
                    height="400"
                    width="400"
                    className="flex justify-center items-center xl:my-32"
                    
                />
            ) : error ? (
                <p className="text-lg text-white">
                    Error: {error}
                </p>
            ) : (
                <>
                    <div className="p-3 mb-5">
                        {/* Profile Info */}
                    <div className="pb-0 mb-5 bg-color-1 rounded-lg px-5">
                        <div className="flex flex-col lg:flex-row  border-b  border-gray-500  py-5  ">
                                <div className="flex flex-1  items-center justify-center lg:justify-start">
                                    <div className="w-20 h-20 sm:w-24 sm:h-24 flex-none lg:w-32 lg:h-32 image-fit relative ">
                                        {/* <Image style={{"border":"3px solid #b0b6bb"}} className="rounded-full border-solid border-2 border-blue-500 border-opacity-100" alt="Suleman" src="/assets/img/download.png"   height={"128"}  width={"128"} />                       */}
                                        <button className="bg-white   text-6xl p-2 rounded-full border border-4 border-double border-blue-500 w-full h-full" style={{"color" : "#7F9CF5" , "backgroundColor" : "#EBF4FF" }}>{getInitials(data?.name)}</button>
                                    </div>
                                    <div className="ml-5 w-full">
                                        <div className="w-full sm:whitespace-normal font-medium text-2xl text-gray-300">
                                            {data?.name}
                                            {/* <span className="ml-3">
                                                <Image className="h-10 inline tooltip" src={`/assets/img/flags/${data?.country || "PK"}.png`} alt="AD-Q"  height={40}  width={40}/>
                                            </span> */}
                                        </div>
                                        {/* <div className="text-base text-gray-300">Rank: <span style={{"color":"#55E6C1"}}>Initiate</span></div> */}
                                        
                                                                
                                            
                                                            
                                        <div className="text-base mt-2">
                                        
                                            
                                            
                                            {" "}
                                            
                                        </div>
                                    
                                    </div>
                                </div>
                                
                                <div className="flex mt-6 lg:w-1/3 lg:mt-0 items-center content-center lg:items-start border-l border-r border-gray-500  border-t lg:border-t-0 justify-center text-gray-600  px-5 pt-5 lg:pt-0">
                                
                                    
                                        
                                    
                                </div>
                                
                                <div className="mt-6 lg:w-1/3 lg:mt-0 flex-1 flex items-center justify-center px-5 border-gray-200 pt-5 lg:pt-0">
                                    
                                    {/* Global Position */}
                                    {/* <div className="text-center rounded-md w-20 grid grid-rows-2 mr-3">
                                        <div className="font-semibold text-3xl text-yellow-400">
                                            <CountUp end={18476}  duration={3} />
                                        </div>
                                        <div className="text-gray-600 text-sm">Global Position</div>
                                    </div> */}

                                    {/* Country Position */}
                                    {/* <div className="text-center rounded-md w-24 grid grid-rows-2 ml-5">
                                        <div className="font-semibold text-3xl text-yellow-400">
                                            <CountUp end={134}  duration={3} />
                                        </div>
                                        <div className="text-gray-600 text-sm">Country Position</div>
                                    </div> */}
                                    <div className="text-center rounded-md w-20 grid grid-rows-2">
                                        <div className="font-semibold text-4xl text-yellow-500">
                                            {totalObtainedPointsUser &&  (<CountUp end={totalObtainedPointsUser}  duration={3} />) } 
                                        </div>
                                        <div className="text-gray-600 text-sm">Points <span className="opacity-0">Lorem</span></div>
                                    </div>
                                    <div className="text-center rounded-md w-20 grid grid-rows-2">
                                        <div className="font-semibold text-green-400 text-4xl">
                                           {solveChallengesCounter &&  (<CountUp end={solveChallengesCounter}  duration={3} />) }  
                                        </div>
                                        <div className="text-gray-600 text-sm">Challenges <span className="opacity-0">Lorem</span></div>
                                    </div>
                                    <div className="text-center rounded-md w-32 grid grid-rows-2">
                                        {/* <div className="font-semibold text-teal-400 text-3xl">0</div>
                                        <div className="text-gray-600 text-sm">Investigations <span className="opacity-0">Lorem</span></div> */}
                                    </div>
                                    
                                </div>
                                
                        </div>
                        <div className="nav-tabs flex flex-col sm:flex-row justify-center lg:justify-start text-gray-300">
                            <a href="#" className="py-4 sm:mr-8 flex items-center active"> 
                                <FaUser className="w-4 h-4 mr-2" /> Profile </a>
                            <a href="#!" className="py-4 sm:mr-8 flex items-center"> <FaCogs className="w-4 h-4 mr-2" /> Account Settings </a>
                            <a href="#!" className="py-4 sm:mr-8 flex items-center"> <FaQuestion className="w-4 h-4 mr-2" /> Help </a>
                            <a href="#"  className="py-4 sm:mr-8 flex items-center tooltip" data-trigger="click"> <FaClipboard className="w-4 h-4 mr-2" /> Public Profile URI </a>
                        </div>
                    </div>

                    <div className="tab-content mt-5">
            <div className="tab-content__pane active" id="profile">
                <div className="grid grid-cols-12 gap-6">
                    {/* badges */}
                    {/* User Profile Badges PlaceHolder */}

                    {/* Progress */}
                    <div className="intro-y box col-span-12 lg:col-span-6 bg-color-1 rounded-lg">
                        <div className="flex items-center px-5 py-5 sm:py-0 border-b border-gray-500 ">
                            <h2 className="font-medium text-base mr-auto text-gray-300">
                                Progress
                            </h2>
                            
                            <div className="nav-tabs ml-auto hidden sm:flex">
                            <a data-toggle="tab" data-target="#work-in-progress-new" href="#!" className="py-5 ml-6 active"></a>
                            <a data-toggle="tab" data-target="#work-in-progress-last-week" href="#!" className="py-5 ml-6">&nbsp;</a>
                            </div>
                        </div>
                        <div className="p-5">
                            <div className="tab-content text-gray-300">
                                <div className="tab-content__pane active" id="work-in-progress-new">
                                    {categories && Object.entries(categories).map(([category, categoryStats], index) => (
                                        <div  className="mb-5" key={index}>
                                            
                                            <div className="flex items-center">
                                                {/* <FaSearchPlus  className="mr-2 text-base "/> */}
                                                {/* <span className="mr-2 text-base">
                                                    {cybersecurityIcons[category] || cybersecurityIcons["Default"]}
                                                </span> */}
                                                <div className="text-gray-300 mr-auto text-sm">{category}</div>
                                                <div className="font-medium">{categoryStats.answerCount} / <span className="text-gray-600">{categoryStats.questionCount}</span></div>
                                            </div>
                                            <div className="w-full h-1 mt-2 bg-dark-navy-blue rounded-full">
                                                <div className="fill-up h-full bg-deep-blue rounded-full w-0" style={{"width" : `${(categoryStats.answerCount/categoryStats.questionCount)*100}%`}} ></div>
                                            </div> 
                                        </div>    
                                    ))}
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                

                </div>
            </div>
                    </div>
                    </div>
                </>
            )}
        </>
        
    )
}


// {/* Digital Forensics Investigations */}
// <div>
// <div className="flex items-center">
//     <FaSearchPlus  className="mr-2 text-base "/>
//     <div className="text-gray-300 mr-auto text-sm">Digital Forensics Investigations</div>
//     <div className="font-medium">0 / <span className="text-gray-600">31</span></div>
// </div>
// <div className="w-full h-1 mt-2 bg-dark-navy-blue rounded-full">
//     <div className="fill-up h-full bg-deep-blue rounded-full w-0" ></div>
// </div> 
// </div>
// {/* Incident Response Investigations */}
// <div className="mt-5">
// <div className="flex items-center">
//     <FaHeartbeat  className="mr-2 text-base "/>
//     <div className="text-gray-300 mr-auto text-sm">Incident Response Investigations</div>
//     <div className="font-medium">0 / <span className="text-gray-600">31</span></div>
// </div>
// <div className="w-full h-1 mt-2 bg-dark-navy-blue rounded-full">
//     <div className="fill-up h-full bg-deep-blue rounded-full w-0" ></div>
// </div> 
// </div>
// {/* Security Ops Investigations */}
// <div className="mt-5">
// <div className="flex items-center">
//     <FaProjectDiagram  className="mr-2 text-base "/>
//     <div className="text-gray-300 mr-auto text-sm">Security Ops Investigations</div>
//     <div className="font-medium">0 / <span className="text-gray-600">31</span></div>
// </div>
// <div className="w-full h-1 mt-2 bg-dark-navy-blue rounded-full">
//     <div className="fill-up h-full bg-deep-blue rounded-full w-0" ></div>
// </div> 
// </div>
// {/* Reverse Engineering Investigations */}
// <div className="mt-5">
// <div className="flex items-center">
//     <FaSpider  className="mr-2 text-base "/>
//     <div className="text-gray-300 mr-auto text-sm">Reverse Engineering Investigations</div>
//     <div className="font-medium">0 / <span className="text-gray-600">31</span></div>
// </div>
// <div className="w-full h-1 mt-2 bg-dark-navy-blue rounded-full">
//     <div className="fill-up h-full bg-deep-blue rounded-full w-0" ></div>
// </div> 
// </div>
// {/* Threat Hunting Investigations */}
// <div className="mt-5">
// <div className="flex items-center">
//     <FaShieldAlt  className="mr-2 text-base "/>
//     <div className="text-gray-300 mr-auto text-sm">Threat Hunting Investigations</div>
//     <div className="font-medium">0 / <span className="text-gray-600">31</span></div>
// </div>
// <div className="w-full h-1 mt-2 bg-dark-navy-blue rounded-full">
//     <div className="fill-up h-full bg-deep-blue rounded-full w-0" ></div>
// </div> 
// </div>
// {/* Threat Intelligence Investigations */}
// <div className="mt-5">
// <div className="flex items-center">
//     <FaBrain  className="mr-2 text-base "/>
//     <div className="text-gray-300 mr-auto text-sm">Threat Intelligence Investigations</div>
//     <div className="font-medium">0 / <span className="text-gray-600">31</span></div>
// </div>
// <div className="w-full h-1 mt-2 bg-dark-navy-blue rounded-full">
//     <div className="fill-up h-full bg-deep-blue rounded-full w-0" ></div>
// </div> 
// </div>
// {/* Challenges */}
// <div className="mt-5">
// <div className="flex items-center">
//     <FaServer  className="mr-2 text-base "/>
//     <div className="text-gray-300 mr-auto text-sm">Challenges</div>
//     <div className="font-medium">0 / <span className="text-gray-600">31</span></div>
// </div>
// <div className="w-full h-1 mt-2 bg-dark-navy-blue rounded-full">
//     <div className="fill-up h-full bg-deep-blue rounded-full w-24" ></div>
// </div> 
// </div>