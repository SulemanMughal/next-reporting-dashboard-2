"use client"


import { useSession } from "next-auth/react";
import React , {useState , useEffect} from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import axios from "axios";
import decrypt from "@/app/lib/decrypt"



ChartJS.register(ArcElement, Tooltip, Legend);

// array of random numbers of size 7
// const data = Array.from({ length: 7 }, () => Math.floor(Math.random() * 50));


export const data = {
    labels: [
        "Incident Response",
        "Digital Forensics",
        "Security Operations",
        "Reverse Engineering",
        "OSINT",
        "Threat Hunting",
        "Threat Intelligence"
    ],
    datasets: [
        {
            data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 50)),
            backgroundColor: [
                "#2ecc71",
                "#3498db",
                "#e74c3c",
                "#9b59b6",
                "#f1c40f",
                "#cf6a87",
                "#c7ecee",
                null
            ],
            hoverBackgroundColor: [
                "#2ecc71",
                "#3498db",
                "#e74c3c",
                "#9b59b6",
                "#f1c40f",
                "#cf6a87",
                "#c7ecee",
                null
            ],
            borderWidth: 3,
            borderColor: '#101345'
        },
    ],
  };
  



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



export default function ChallengesChart({userId}){


    const { data: session } = useSession();
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);
    // const [categories, setCategories] = useState(null)
    // const [solveChallengesCounter, setSolveChallengesCounter] = useState(0)
    // const [totalObtainedPointsUser, setTotalObtainedPointsUser] = useState(0)
    const [categories, setCategories] = useState(null)
    const [solveChallengesCounter, setSolveChallengesCounter] = useState(0)
    const [totalObtainedPointsUser, setTotalObtainedPointsUser] = useState(0)

    
    const DataFetch = (userId) => {
        // console.debug(userId)
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/profile/${userId.userId}`)
        .then(res => {
            const {...results } = decrypt(res.data.encryptedData)
            // console.debug(results)
            if(results?.status === true){
                if(results?.result === null ){
                    setUserData(null)
                    setCategories(null)
                    setTotalObtainedPointsUser(0)
                    setSolveChallengesCounter(0)
                    setLoading(false);
                } 
                else{
                    setUserData(results?.result)
                    // console.debug(results)
                    // console.debug(calculateCategoryStats(results?.result?.team?.quiz?.questions))
                    setCategories(calculateCategoryStats(results?.result?.team?.quiz?.questions))
                    setSolveChallengesCounter(checkEqualNumberOfQuestionsAndAnswers(results?.result?.team?.quiz?.questions))
                    setTotalObtainedPointsUser(calculateTotalObtainedPoints(results?.result?.team?.quiz?.questions, params.id))
                    console.debug(calculateCategoryStats(results?.result?.team?.quiz?.questions))
                    setLoading(false);
                }
            } else {
                setUserData(null)
                setCategories(null)
                setTotalObtainedPointsUser(0)
                setSolveChallengesCounter(0)
                setLoading(false);
            }
                // else{
            //         // console.log(data)
            //         setData(data?.result)
            //         setError(null);
            //         // console.debug(calculateCategoryStats(data?.result?.team?.quiz?.questions))
            //         setCategories(calculateCategoryStats(data?.result?.team?.quiz?.questions))

            //         setSolveChallengesCounter(checkEqualNumberOfQuestionsAndAnswers(data?.result?.team?.quiz?.questions))
            //         setTotalObtainedPointsUser(calculateTotalObtainedPoints(data?.result?.team?.quiz?.questions, params.id))
            //     }
                
            // } else {
            //     setData(null)
            //     console.log(data?.error)
            //     toast.error(data?.error);
            //     setError(data?.error);
            //     setCategories(null)
            //     setSolveChallengesCounter(0)
            //     setTotalObtainedPointsUser(0)
            // }
        })
        .catch(error => {
            // setData(null)
            // setCategories(null)
            // setSolveChallengesCounter(0)
            // setTotalObtainedPointsUser(0)
            // console.log(error)
            // toast.error(`Sorry! There is an error while fetching user profile data.Please try again later`);
            // setError(`Sorry! There is an error while fetching user profile data.Please try again later`);
        }).finally(() => {
            setLoading(false);
        })
    }


    useEffect(() => {
        // AOS.init();
        DataFetch({userId})
        
    }, [])


    return (
        <>
            {loading ? <p>Loading...</p> : 
                (

<>

<div  className='w-full col-span-4' data-aos="fade-down" data-aos-duration="500" data-aos-delay="900">
    <div className="intro-y flex items-center h-10 mt-5">
        <h2 className="text-lg font-medium truncate mr-5 text-white">
            Challenges
        </h2>
        <div className="sm:ml-auto mt-3 sm:mt-0 relative text-gray-700 text-gray-300">
            <select className="appearance-none placeholder-gray-300 outline-0  border border-2 border-deep-blue-violet focus:border focus:border-2 focus:border-blue-900  text-gray-300    w-full p-2 pl-4 pr-8   m-0 mt-2 text-base block bg-deep-indigo  rounded-md shadow-sm" model="selectedYear">
                <option value="" disabled="">Year</option>
                                    <option value="2023">2023</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-5 w-5 mt-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
        </div>
    </div>
    <div  className="intro-y box p-5 mt-10 bg-deep-blue-violet rounded-lg"><div className="chartjs-size-monitor"><div className="chartjs-size-monitor-expand"><div className=""></div></div><div className="chartjs-size-monitor-shrink"><div className=""></div></div></div>
        <div className="chartjs-size-monitor">
            <div className="chartjs-size-monitor-expand">
                <div className=""></div>
            </div>
            <div className="chartjs-size-monitor-shrink">
                <div className=""></div>
            </div>
        </div>
        {/* <canvas ignore="" x-ref="chart" className="mt-3 chartjs-render-monitor" height="257" width="277" style="display: block; width: 277px; height: 257px;"></canvas> */}

         <Pie data={data} height={"257"} width={"277"} options={{
            plugins: {

            
                            legend: {
                                display: false
                            }
                        }
         }} />


        <div className="mt-20 text-gray-300 text-sm">



        {/* {categories && Object.entries(categories).map(([category, categoryStats], index) => (
            
            <div className="flex items-center ">
                
                <div className="w-2 h-2 rounded-full mr-3" ></div>
                <span className="truncate">{category}</span> 
                <div className="h-px flex-1 border border-r border-dashed border-gray-300 mx-3 xl:hidden"></div>
                <span className="font-medium xl:ml-auto">{(categoryStats.answerCount/categoryStats.questionCount)*100}%</span> 
            </div>
        ))} */}

                        
                
                <div className="flex items-center ">
                    <div className="w-2 h-2 rounded-full mr-3" style={{"backgroundColor": "#2ecc71"}}></div>
                    <span className="truncate">Incident Response</span> 
                    <div className="h-px flex-1 border border-r border-dashed border-gray-300 mx-3 xl:hidden"></div>
                    <span className="font-medium xl:ml-auto">0%</span> 
                </div>

                        
                
                <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full mr-3" style={{"backgroundColor" : "#3498db"}}></div>
                    <span className="truncate">Digital Forensics</span> 
                    <div className="h-px flex-1 border border-r border-dashed border-gray-300 mx-3 xl:hidden"></div>
                    <span className="font-medium xl:ml-auto">0%</span> 
                </div>

                        
                
                <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full mr-3" style={{"backgroundColor": "#e74c3c"}}></div>
                    <span className="truncate">Security Operations</span> 
                    <div className="h-px flex-1 border border-r border-dashed border-gray-300 mx-3 xl:hidden"></div>
                    <span className="font-medium xl:ml-auto">0%</span> 
                </div>
                <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full mr-3" style={{"backgroundColor": "#f39c12"}}></div>
                    <span className="truncate">CTF-Like</span> 
                    <div className="h-px flex-1 border border-r border-dashed border-gray-300 mx-3 xl:hidden"></div>
                    <span className="font-medium xl:ml-auto">0%</span> 
                </div>
                        
                
                <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full mr-3" style={{"backgroundColor": "#9b59b6"}}></div>
                    <span className="truncate">Reverse Engineering</span> 
                    <div className="h-px flex-1 border border-r border-dashed border-gray-300 mx-3 xl:hidden"></div>
                    <span className="font-medium xl:ml-auto">0%</span> 
                </div>

                        
                
                <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full mr-3" style={{"backgroundColor": "#f1c40f"}}></div>
                    <span className="truncate">OSINT</span> 
                    <div className="h-px flex-1 border border-r border-dashed border-gray-300 mx-3 xl:hidden"></div>
                    <span className="font-medium xl:ml-auto">0%</span> 
                </div>

                        
                
                <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full mr-3" style={{"backgroundColor": "#cf6a87"}}></div>
                    <span className="truncate">Threat Hunting</span> 
                    <div className="h-px flex-1 border border-r border-dashed border-gray-300 mx-3 xl:hidden"></div>
                    <span className="font-medium xl:ml-auto">0%</span> 
                </div>

                        
                
                <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full mr-3" style={{"backgroundColor": "#c7ecee"}}></div>
                    <span className="truncate">Threat Intelligence</span> 
                    <div className="h-px flex-1 border border-r border-dashed border-gray-300 mx-3 xl:hidden"></div>
                    <span className="font-medium xl:ml-auto">0%</span> 
                </div>

            
        </div>
    </div>
    
    
            </div>
</>

                )
            }
            
        </>
    )
}