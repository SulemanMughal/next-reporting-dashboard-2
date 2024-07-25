"use client"

// import TotalSubmission from "@/app/components/users/TotalSubmission"
import TotalObtainedPoints from "@/app/components/users/TotalObtainedPoints"
import { FaTint } from "react-icons/fa"
// import RightAnswers from "@/app/components/users/RightAnswers"
import TotalChallenges from "@/app/components/users/dashboard/TotalChallenges"
import axios from "axios";
import { toast } from "react-hot-toast";
import {  useEffect, useState } from "react";
import {  useSession } from "next-auth/react";
import Link from "next/link"
// import { AiFillEye } from "react-icons/ai"
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaAward } from "react-icons/fa6"
import { FaUsers } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";

// import { FaUser } from "react-icons/fa6";


// import encrypt from "@/app/lib/encrypt"
import decrypt from "@/app/lib/decrypt"
// import  { FaPuzzlePiece } from "react-icons/fa6"
import CountUp from 'react-countup';

// import { LiaCoinsSolid } from "react-icons/lia"
// import   { FaCoins } from "react-icons/fa6"
// import { MdGroups } from "react-icons/md"  
import { FaUser } from "react-icons/fa6"

// import { CircularProgressbar , buildStyles  } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
// import MultiSeriesPieChart from "./MultiSeriesPieChart"
// import UserProgressChart from "./UserProgressChart"
// import { FaUserLarge } from "react-icons/fa6"
import { FaServer } from "react-icons/fa6"
import Image from "next/image"
import { UserIcon } from "@/app/lib/icons"
// import { FaMedal  } from "react-icons/fa6"
// import { FaExternalLinkAlt } from "react-icons/fa"

// import LabTimeChart from "./LabTimeChart"
// import InvestigationChart from "./InvestigationChart"
// import ChallengesChart from "./ChallengesChart"

import { TfiTwitterAlt } from "react-icons/tfi"

// import Avatar from "@/app/components/createAvatar"

// import styles from "./Dashboard.module.css"


// function countSubmitAnswers(data){
//     let counter = 0;

//     if(data.length){
//         data.forEach((item) => {
//             counter = item.answers.length  + counter
//         })
        
//     }
//     return counter;
// }


function calcTotalPoints(data){
    let points = 0;
    if(data.length){
        data.forEach((item) => {
            if(item.answers?.[0]?.submissionStatus === true){
                if(item.answers?.[0]?.obtainedPoints){
                    points = points + item.answers?.[0]?.obtainedPoints   
                }
            }
            
        })
    }
    return points;
}


// function checkTotalStatus(data){
//     let trueQuestions = 0;
//     let falseQuestions = 0;
//     if(data.length){
//         data.forEach((item) => {
//             if(item.answers?.[0]?.submissionStatus === true){
//                 trueQuestions++
//             }
//             else{
//                 falseQuestions++
//             }
//         })
//     }
//     return [trueQuestions, falseQuestions]
// }

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
    let overall_points = 0;
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
                    overall_points = overall_points + calcScenarioPoints(item.scenario.questions)
                }
            }
        })
    }
    return [ids, names , status_list, category_list , description_list , total_points , overall_points];
}


import ExpandableText from "@/app/components/ExpandableText"
import { sub } from "date-fns";


// function QuizList({scenarios}){
//     // console.debug(scenarios)
//     return (
//         <>
//             {   scenarios?.length ? [...Array(scenarios?.[0].length)].map((item, index) => (
//                     <div className="component component-CerCheckBox" key={index}>
//                         <div className="w-full col-span-3 relative  p-3   rounded-lg   flex flex-col " key={index}>
//                             <div className="  my-2 bg-card-custom  rounded-lg shadow   ">
//                                 <div className="p-5">
//                                     <div className="flex justify-between items-center mb-4">
//                                         <h5 className=" text-2xl font-bold tracking-tight whitespace-normal text-gray-300 ">{scenarios[1][index]}</h5>
//                                     </div>
//                                     {/* <p className="text-gray-400">{scenarios[4][index]}</p> */}
//                                     <ExpandableText initialText={scenarios[4][index]}  maxLength={150} />
//                                     <div className=" pt-4 pb-2 text-center">
//                                         {/* <span className="px-1 py-1 text-md font-semibold bg-none text-green-600 ">{scenarios[2][index]}</span>
//                                         <span className="px-1 py-1 text-md font-semibold bg-none text-pink-600">{scenarios[3][index]}</span> */}
//                                         <span className="px-1 py-1 text-md font-semibold bg-none text-orange-400 ">{ scenarios[5][index] +  " Points"}</span>
//                                     </div>
//                                 </div>
//                                 <div className=" pt-0 pb-4 flex justify-center">
//                                     <Link href={`/user/quiz/${scenarios[0][index]}`}  className="transition ease-in-out delay-150 hover:-translate-y-1    hover:bg-blue-300 hover:text-blue-800 cursor-pointer duration-300    btn-flag-submit text-gray-300  flex items-center   sm:text-sm  sm:w-8/12   2xl:w-7/12  h-full rounded-0 px-4 py-2    font-semibold   mb-2 justify-center items-center  ">
//                                         <AiFillEye size={23} className=" mr-2 "  /> <span>{"View Scenario" } </span> 
//                                     </Link>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )) : null
//             }
//         </>
//     )
// }



// const UserRank = () => {
//     return (
//         <>
          


//             <div className="w-full col-span-1 relative  m-auto p-0 border-none rounded-lg report-box"  >
//                 <div  className="block  p-6 bg-dark-blue  rounded-lg shadow relative">
//                 <div className="flex justify-between items-center ">
//                         <div>
//                             <MdIncompleteCircle size={40}  className="text-blue-500 mb-6" />
//                             <p className="font-bold text-white  text-4xl">
//                             <CountUp end={totalTrueQuestions}  duration={5} /> / <CountUp end={totalFalseQuestions}  duration={5} />
//                             </p>
//                             <h5 className="text-md text-gray-400">Overall position</h5>
//                         </div>
//                         <span>
//                         </span>
//                     </div>
//                 </div>
//             </div>

            

//         </>
//     )
// }


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


function UserObtainedPoints({totalObtainedPointsUser, overall_points}){
    return (
        <>
        <div className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105  duration-300">
            <div className="w-full col-span-1 relative  m-auto p-0 border-none rounded-lg report-box "  data-aos="fade-down" data-aos-duration="500" data-aos-delay="700" >
                <div  className="block  p-6 bg-color-1   rounded-lg shadow relative">
                <div className="flex justify-between items-center ">
                        <div>
                            <UserIcon  size={35}  className="text-color-2  mb-6"  />
                            <p className="font-bold  leading-8 text-color-6   text-3xl mb-2">
                                {totalObtainedPointsUser && <CountUp end={totalObtainedPointsUser}  duration={3} />}  
                            </p>
                            <h5 className="text-xs 2xl:text-base  text-color-10">Your Points</h5>
                        </div>
                        <span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}


function TeamPosition({team_position = 0, total_teams = 0}){
    return (
        <>
        <div className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105  duration-300">
            <div className="w-full col-span-1 relative  m-auto p-0 border-none rounded-lg report-box"  data-aos="fade-down" data-aos-duration="500" data-aos-delay="900" >
                <div  className="block  p-6 bg-color-1  rounded-lg shadow relative">
                <div className="flex justify-between items-center ">
                        <div>
                            {/* <FaCoins size={40}  className="text-blue-500 mb-6" /> */}
                            <FaAward  size={35}  className="text-color-2 mb-6"  />
                            <p className="font-bold  leading-8 text-color-6  text-3xl mb-2">
                                {team_position && <CountUp end={team_position}  duration={3} />}
                            </p>
                            <h5 className="text-xs 2xl:text-base text-color-10">Team Position</h5>
                        </div>
                        <span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

// import styles from './CircularProgressBar.module.css';

// const CircularProgressBar = ({ percentage }) => {
//     const progressStyle = {
//       strokeDasharray: `${percentage} 100`,
//     };
  
//     return (
//       <div className={styles.circularProgressBar}>
//         <svg viewBox="0 0 100 100">
//           <circle className={styles.circleBackground} cx="50" cy="50" r="45" />
//           <circle
//             className={styles.circleProgress}
//             cx="50"
//             cy="50"
//             r="45"
//             style={progressStyle}
//           />
//           <text x="50" y="50" className={styles.progressLabel}>
//             {percentage}%
//           </text>
//         </svg>
//       </div>
//     );
//   };


// function TeamCircularProgressBar({  totalPoints , overall_points }) {
//     let percentage = 0;
//     if(totalPoints !== 0){
//         percentage = parseInt((totalPoints / overall_points) * 100)
//     }
//     else{
//         percentage = 0
//     }


//     return (
//         <div className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105  duration-300" data-aos="fade-down" data-aos-duration="500" data-aos-delay="800">
//             <div  className=" w-full col-span-1 p-6 bg-card-custom h-full rounded-lg shadow relative">
//                 <div className="flex justify-center items-center h-full">
//                     <div style={{ width: 200 }}>
//                         <CircularProgressbar value={percentage} text={`${percentage}%`}   />
                        
//                     </div>
                        
//                     </div>
//                 </div>
            
//         </div>
        
//     )
// }


function checkEqualNumberOfQuestionsAndAnswers(data) {
    let soved_challenges = 0;
    try {
        data.forEach(item => {
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
  
  

//   function getAnswersByUser(data, userId) {

//     // console.debug(userId)
//     const results = {};
  
//     try{
//         data.forEach(item => {
//             const { scenario, answers } = item;
//             const scenarioId = scenario.id;
//             const scenarioName = scenario.name;
        
//             const userAnswers = answers.filter(answer => answer.user.id === userId);
        
//             if (!results[scenarioId]) {
//               results[scenarioId] = {
//                 scenarioId,
//                 scenarioName,
//                 userAnswers: []
//               };
//             }
        
//             results[scenarioId].userAnswers.push(...userAnswers);
//           });
        
//           return Object.values(results);
//     } catch(error){
//         return {}
//     }   
//   }


// function getGroupedAnswersWithTotalQuestions(data, userId) {
//     const groupedAnswers = {};
  
//     data.forEach(entry => {
//       const scenarioId = entry.scenario.id;
//       const userAnswers = entry.answers.filter(answer => answer.user.id === userId);
  
//       if (userAnswers.length > 0) {
//         if (!groupedAnswers[scenarioId]) {
//           groupedAnswers[scenarioId] = {
//             scenarioId: scenarioId,
//             scenarioName: entry.scenario.name,
//             userAnswers: [],
//             totalQuestions: entry.scenario.questions.length
//           };
//         }
  
//         groupedAnswers[scenarioId].userAnswers.push(userAnswers[0]);
//       }
//     });
  
//     return Object.values(groupedAnswers);
//   }

// function calculateScenarioStats(data, userId) {
//     const groupedAnswers = {};
  
//     data.forEach(entry => {
//       const scenarioId = entry.scenario.id;
//       const userAnswers = entry.answers.filter(answer => answer.user.id === userId);
  
//       if (userAnswers.length > 0) {
//         if (!groupedAnswers[scenarioId]) {
//           groupedAnswers[scenarioId] = {
//             scenarioId: scenarioId,
//             scenarioName: entry.scenario.name,
//             userAnswers: [],
//             totalQuestions: entry.scenario.questions.length,
//             totalObtainedPoints: 0  // Initialize total obtained points
//           };
//         }
  
//         const obtainedPoints = userAnswers[0].obtainedPoints;
//         groupedAnswers[scenarioId].userAnswers.push(userAnswers[0]);
//         groupedAnswers[scenarioId].totalObtainedPoints += obtainedPoints;  // Add obtained points
//       }
//     });
  
//     return Object.values(groupedAnswers);
//   }

function calculateScenarioStats(data, userId) {
    const groupedAnswers = {};
  
    data.forEach(entry => {
      const scenarioId = entry.scenario.id;
      const userAnswers = entry.answers.filter(answer => answer.user.id === userId);
  
      if (userAnswers.length > 0) {
        if (!groupedAnswers[scenarioId]) {
          groupedAnswers[scenarioId] = {
            scenarioId: scenarioId,
            scenarioName: entry.scenario.name,
            userAnswers: [],
            totalQuestions: entry.scenario.questions.length,
            totalPoints: entry.scenario.questions.reduce((total, question) => total + question.points, 0), // Calculate total points
            totalObtainedPoints: 0
          };
        }
  
        const obtainedPoints = userAnswers[0].obtainedPoints;
        groupedAnswers[scenarioId].userAnswers.push(userAnswers[0]);
        groupedAnswers[scenarioId].totalObtainedPoints += obtainedPoints;
      }
    });
  
    return Object.values(groupedAnswers);
  }

function Discord(){
    return (
        <>
            <div className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105  duration-300">
                <div  className="block   p-6 bg-deep-blue-violet  rounded-lg shadow relative" data-aos="fade-down" data-aos-duration="500" data-aos-delay="900">
                            <h2 className="font-medium text-lg text-white">
                                Join our A&D-Q discord server here!
                            </h2>
                            <a href="#!" target="_BLANK">
                                <div className="intro-y mt-6">
                                    <div className="news__preview image-stretch">
                                        <Image alt="DISCORD " className="rounded-md" width={500} height={500} src="/assets/img/discord.png" />
                                    </div>
                                </div>
                            </a>
                        </div>
                </div>
        </>
    )
}

function CareerBox(){
    return (
        <>
            <div className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105  duration-300 my-5" data-aos="fade-down" data-aos-duration="500" data-aos-delay="500">
                <div  className="block  p-6 bg-deep-blue-violet  rounded-lg shadow relative" >
                            <h2 className="font-medium text-lg text-white ">
                            Follow A&D-Q on Twitter here!
                            </h2>
                            <div className="my-5 flex items-center justify-start mx-5 ">
                                <span className="h-full inline-block ">
                                    <TfiTwitterAlt  className=" h-12 w-12 2xl:h-20 2xl:w-20" style={{"color" : "#7188d9"}}/>
                                </span>
                                <p className=" text-3xl 2xl:text-5xl font-bold mx-4 font-extrabold" style={{"color" : "#7188d9"}}>
                                    Twitter
                                </p>
                            </div>
                            {/* <p className="text-white text-xs mt-2">The platform to help you find your next cybersecurity career!</p>
                            <a href="#!" target="_BLANK">
                                <div className="intro-y mt-6">
                                    <div className="news__preview image-stretch">
                                        <Image alt="DISCORD " className="rounded-md" width={500} height={500} src="/assets/img/cysec_careers_released.png" />
                                    </div>
                                </div>
                            </a> */}

                        </div>
                </div>
        </>
    )
}

function PlatformIntroduction({userId}){
    return (
        <>
            <div className="w-full col-span-7 bg-deep-blue-violet  rounded-lg shadow   p-6 mt-10 " data-aos="fade-down" data-aos-duration="500" data-aos-delay="900">
                        <div className="flex justify-between items-center">
                            <div className="w-9/12">
                                <h1 className="text-2xl mb-3">
                                    <span className="text-white">Welcome to Attack &</span> <span style={{color : "#35c2f1"}}>Defense - Q</span>
                                </h1>
                                <div>
                                    <p className="text-white text-md">
                                        {" We invite you to discover a realm where cyber defenders of all levels can immerse themselves in authentic and competitive scenarios, honing their skills to face the ever-evolving landscape of cyber threats. By participating in our platform, you'll gain the opportunity to engage in gamified challenges that put your technical prowess to the test while maintaining the highest standards of ethical conduct."}
                                    </p>
                                </div>
                                <div className="my-5">
                                    <p className="text-white text-md ">
                                        {"Familiarize yourself with our platform's rules and guidelines, which have been carefully designed to ensure fair play, prevent the sharing of answers and writeups, and create a level playing field for all participants. Attack & Defense - Q is not just a platform - it's a dynamic arena where seasoned defenders can further their expertise through realistic experiences, leveraging external training and self-study to fortify their abilities in investigating and mitigating cyber attacks and intrusions."}
                                    </p>
                                </div>
                                <div className="my-5">
                                    <p className="text-white text-md ">
                                        {" We extend our best wishes to all Defenders embarking on this journey. Your dedication to enhancing your skills will undoubtedly contribute to a safer digital world. Good luck, and may your cyber defenses remain steadfast!"}
                                    </p>
                                </div>
                               
                                <div>
                                    <p className="text-white text-md">
                                        {"Good luck Defenders!"}
                                    </p>
                                </div>
                            </div>
                            <div className="w-3/12">
                                {/* <div className="flex justify-end">
                                    <button className="bg-blue-500 text-white rounded-md  py-1 px-6">
                                        View Investigations
                                    </button>
                                </div> */}
                                <div className="col-span-12 md:col-span-3 rounded-md px-5 mb-auto mt-auto py-4 bg-theme-3 text-white">
                                    <div className="items-center">
                                       
                                        {/* <a href="#!">
                                            <button className="button xl:mt-auto mr-1 mb-2 bg-blue-600 text-white sm:w-full"> View Investigations <i className="fa fa-user-secret text-base text-white"></i></button>
                                        </a> */}
                                        <Link href={"/user/quiz"}>
                                            <button className=" bg-purple-600 flex  justify-center items-center  xl:mt-auto mr-1 mb-2  text-white sm:w-full rounded-md cursor-pointer font-medium py-2 px-3">View Challenges 
                                                <FaServer className="text-base text-white ml-3"  />
                                            </button>
                                        </Link>

                                        <Link href={`/user/${userId}`}>
                                            <button className=" bg-yellow-600 flex  justify-center items-center  xl:mt-auto mr-1 mb-2  text-white sm:w-full rounded-md cursor-pointer font-medium py-2 px-3">View Your Profile <FaUser className="text-base text-white ml-3" /></button>
                                        </Link>
                                        
                                        
                                        {/* <a href="#!">
                                            <button className=" bg-yellow-600 flex  justify-center items-center  xl:mt-auto mr-1 mb-2  text-white sm:w-full rounded-md cursor-pointer font-medium py-2 px-3">View Your Profile <FaUser className="text-base text-white ml-3" /></button>
                                        </a> */}
                                        {/* <a href="#!">
                                            <button className=" bg-yellow-700 flex  justify-center items-center  xl:mt-auto mr-1 mb-2  text-white sm:w-full rounded-md cursor-pointer font-medium py-2 px-3">Highlight Badges &amp; Titles  <FaMedal  className="text-base text-white ml-3" /> </button>
                                        </a> */}
                                        {/* <a href="#!">
                                            <button className=" bg-green-600 flex  justify-center items-center  xl:mt-auto mr-1 mb-2  text-white sm:w-full rounded-md cursor-pointer font-medium py-2 px-3">Redeem Code <FaMedal  className="text-base text-white ml-3" /></button>
                                        </a> */}
                                        {/* <a href="#!">
                                            <button className=" bg-red-600 flex  justify-center items-center  xl:mt-auto mr-1 mb-2  text-white sm:w-full rounded-md cursor-pointer font-medium py-2 px-3">Help / FAQ <FaMedal  className="text-base text-white ml-3" /></button>
                                        </a> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>    
        </>
    )
}


function TeamRow({user}){
    // console.debug(user)
    return (
        <div className={"intro-y rounded text-color-6  zoom-in bg-color-7" }  >
                
                <div className="px-4 py-4 mb-3 flex items-center  cursor-default rounded ">
                    
                        {/* <div className="w-10 h-10 flex-none relative rounded-md overflow-hidden "> */}
                            {/* <Image style={{"border":"2px solid #b0b6bb"}} className="rounded-full border-opacity-100 h-100 object-cover absolute w-100" src="/assets/img/6qTxel0AUuRfjCLGU22340QeWSUNNnI2td9BcGOs.png"  alt="Your Image"  layout="fill" objectFit="cover" objectPosition="center" /> */}
                            {/* <Avatar seed={"X"} /> */}
                            
                        {/* </div> */}
                        <div className=" mr-auto flex items-center justify-start gap-3">
                            {/* <div className="font-medium">
                                <a className="flex items-center bg-color-7" href="#!">
                                    Team - 1
                                </a>
                            </div> */}
                            <FaCircleUser  size={28} className="text-color-6" />
                            <div className="font-base bg-color-7 uppercase">{user?.user_name}</div>
                            
                        </div>
                   
                    <div className="py-1 px-2 rounded-full text-xs  bg-color-1 text-color-6 cursor-default font-medium">{user?.total_obtained_points} Points</div>
                    {/* <button linkurl="#!" className="view-writeup ml-2">
                        <div className="p-2 rounded-full text-xs text-white bg-deep-indigo cursor-pointer font-medium">
                            <FaExternalLinkAlt />
                        </div>
                    </button> */}
                </div>
          
            </div>
    )
}



function TopTeamsBlock({statistics, teamName}){

    // console.debug(statistics)
    return (
        <>
            <div className="p-5 bg-color-1  rounded-lg">
        <div className="intro-y flex items-center justify-between h-10">
            <h2 className="text-xl font-medium truncate mr-5 text-color-6" >
                {teamName}
            </h2>
            <FaUsers size={45} className="text-color-6" />
            
        </div>
        <div className="mt-5">
            {statistics && statistics?.length ? statistics.map((item, index) => (
                <TeamRow key={index} user={item} />
            )) : null    
            }
            {/* <TeamRow /> */}
            {/* <TeamRow />
            <TeamRow />
            <TeamRow />
            <TeamRow />
            <TeamRow /> */}
            
        </div>
    </div>
        </>
    )
}

function FirstBloodBlock({statistics}){
    return (
        <>
            <div className="p-5 mt-2 bg-color-1  rounded-lg">
                <div className="intro-x flex items-center justify-between  ">
                    <h2 className="text-xl font-bold truncate mr-5  flex  justify-start items-center text-color-6">
                        <FaTint  className="mr-2"/> {"First Blood"}
                    </h2>
                    <span className="font-bold text-red-700 text-2xl">{statistics}</span>
                </div>
            </div>
        </>
    )
}



function PublicDemo(){
    return (
        <>
        <div className="p-5 bg-deep-blue-violet rounded-lg mt-5 text-white">
        <h2 className="font-medium text-xl ">
                                   Public A&D-Q Demo 
                                </h2>
                                <div className="mt-2">
                                    <p className="text-sm">{"Get hands-on with the content of A&D-Q without paying a penny. See if it's the right move for your career today!"}</p>
                                </div>
                                <div className="intro-y mt-6 mb-6 ">
                                    <div className="news__preview image-stretch">
                                        <Image alt="A&D-Q " className="rounded-md text-center mx-auto" src="/assets/img/data-security.png"   width={300} height={300}  />
                                    </div>
                                </div>
                               
                                <a href="#!" target="_BLANK">
                                    <button className="bg-blue-600 flex  justify-center items-center  xl:mt-auto mr-1 mb-2  text-white sm:w-full rounded-md cursor-pointer font-medium py-2 px-3"> Access Demo Now!</button>
                                </a>
        </div>
            
        </>
    )
}

function NewsBlock(){
    return (
        <>
            <div id="chimeraPanel" className="grid grid-cols-12 bg-deep-blue-violet rounded-lg mt-4" data-aos="fade-down" data-aos-duration="500" data-aos-delay="400">

<div className="col-span-12 md:col-span-3 rounded-md px-5 mb-auto mt-auto py-4 bg-theme-3 text-white">
    <div className="items-center">
       
        <div className="news__preview image-stretch">
            <Image alt="Operation Chimera" className="rounded-md" src="/assets/img/hackathon.png" width={500} height={500} />
        </div>

    </div>
</div>

<div className="col-span-12 md:col-span-7 rounded-md px-5 py-4 bg-theme-3 text-white">
    <div className="flex items-center">
        <div className="font-medium text-2xl">Hackathon - Coming <span  className="text-cerulean-blue">2023</span> !</div>
    </div>
    <div className="mt-3 text-base">
        {
            (<div>
                {"A hackathon is an immersive event that brings together creative minds from diverse backgrounds to collaboratively tackle complex problems and create innovative solutions. Typically spanning a condensed timeframe, often ranging from hours to a few days, hackathons foster an environment of intense ideation and rapid development. Participants, known as hackers, often include programmers, designers, and domain experts who collaborate in teams to build functional prototypes, applications, or hardware projects."}
                <br /><br />
                
                {"Hackathons provide a unique opportunity for participants to showcase their skills, experiment with new technologies, and transform abstract ideas into tangible projects. These events often focus on specific themes or challenges, from social impact to technological breakthroughs, encouraging participants to think outside the box and push their creative boundaries. At the heart of a hackathon lies the spirit of innovation, learning, and collaboration, as hackers not only compete for recognition but also share knowledge and experiences, contributing to a dynamic and vibrant community of problem solvers."}
              </div>)
        }
    </div>
</div>


<div className="col-span-12 md:col-span-2 rounded-md px-5 mb-auto mt-auto py-4 bg-theme-3 text-white">
    <div className="items-center">
       
        {/* <p className="text-center"><b>Register your interest</b></p> */}
        <br />

                                                   
            <button id="registerforchimera" className="bg-gray-500 flex  justify-center items-center  xl:mt-auto mr-1 mb-2  text-white whitespace-nowrap w-full rounded-md cursor-pointer font-medium  py-1 px-3 text-sm 2xl:text-base 2xl:py-2 2xl:px-3 disabled" > Register Interest </button>
        
                                                
    </div>
</div>


</div>
        </>
    )
}


const CompletedChallengesTable = ({scenariosArray}) => {

    
    return (
        <>
            

<div className="relative overflow-x-auto rounded-lg my-3 overflow-y-auto" >
    <table className="w-full text-sm text-left rtl:text-right  text-gray-400">
        <thead className="text-xs  uppercase  bg-gray-700 text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Challenge Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Obtained Points
                </th>
                <th scope="col" className="px-6 py-3">
                    Category
                </th>
                <th scope="col" className="px-6 py-3">
                    Difficulty Level
                </th>
            </tr>
        </thead>
        <tbody>
            {scenariosArray && scenariosArray.map((scenario, index) => (
                <tr className="border-b bg-gray-800 border-gray-700" key={index}>
                    <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap ">
                        {scenario?.scenario_name}
                    </th>
                    <td className="px-6 py-4">
                        {scenario?.total_obtained_points}
                    </td>
                    <td className="px-6 py-4">
                        {scenario?.category}
                    </td>
                    <td className="px-6 py-4">
                        {scenario?.difficulty}
                    </td>
                </tr>
            ))}
            
        </tbody>
    </table>
</div>

        </>
    )
}



function TopStatisticsData({userId , userName}){

    // console.debug(userId)

    // console.debug(userName)
    const [totalChallenges, setTotalChallenges] = useState(0)
    const [totalSolvedChallenges, setTotalSolvedChallenges] = useState(0)
    // const [totalSubmissions, setTotalSubmissions] = useState(0)
    const [totalPoints, setTotalPoints] = useState(0)
    // const [totalTrueQuestions, setTotalTrueQuestions] = useState(0)
    // const [totalFalseQuestions, setTotalFalseQuestions] = useState(0)
    const [scenarios, setScenarios] = useState([])
    const [totalObtainedPointsUser, setTotalObtainedPointsUser] = useState(0)
    const [total_teams, setTotalTeams] = useState(0)
    const [team_position, setTeamPosition] = useState(0)
    const [userAnswersCategory, setUserAnswersCategory] = useState(null)

    const [teamName, setTeamName] = useState("")

    const [statistics, setStatistics] = useState(null)

    const [bloodCounter, setBloodCounter] = useState(0)

    const [scenariosArray, setScenariosArray] = useState([])

    // const [userPoints, setUserPoints] = useState(0)   

    // const [bonusPoints, setBonusPoints] = useState(0)   
// 
    

    // const [total_questions, setTotalQuestions] = useState(0)





    let data ;


    const DataFetch = () => {
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${userId}`)
            .then(res => {
                const {...data_2 } = decrypt(res.data.encryptedData)
            if(data_2?.status === true){
                // console.debug(data_2)
                setScenariosArray(data_2?.jsonResults)
                setTeamName(data_2?.team_name)
                setBloodCounter(data_2?.total_first_blood_scenarios)
                setStatistics(data_2?.teamStatisticsJson)
                setTotalTeams(data_2.total_teams)
                setTeamPosition(data_2.team_position)
                setTotalSolvedChallenges(parseInt(data_2?.total_successful_scenarios))
                setTotalObtainedPointsUser(data_2?.userObtainedPoints)
                if(data_2.user?.team?.quiz?.questions?.length) {
                    data = data_2?.user?.team?.quiz?.questions
                    setScenarios(checkScenarios(data))
                    setTotalPoints(calcTotalPoints(data) + parseInt(data_2?.totalBonusPoints))
                    setUserAnswersCategory(calculateScenarioStats(data, userId))
                }
            }
            else{
                toast.error(`${data_2.error}`)
            }
        })
        .catch(error => {
            console.debug(error)
        })
    }

    useEffect(() => {
        AOS.init();
        DataFetch()
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
        <div className="p-4 grid gap-3 auto-rows-fr grid-cols-9">
            <div className="w-full col-span-7">
                <div className=" grid gap-6 auto-rows-fr grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 " >
                    <TotalChallenges  totalChallenges={totalChallenges} totalSolvedChallenges={totalSolvedChallenges}    />
                    <UserObtainedPoints totalObtainedPointsUser={totalObtainedPointsUser} overall_points={scenarios[6]}  />
                    <TotalObtainedPoints  totalPoints={totalPoints} overall_points={scenarios[6]}  />
                    <TeamPosition  team_position={team_position} total_teams={total_teams} />
                </div>
                <div className="grid grid-cols-12 gap-4 rounded-lg mt-4">
                    <div className=" w-full col-span-12 relative  m-auto p-0 border-none rounded-lg ">
                        {scenariosArray &&  <CompletedChallengesTable scenariosArray={scenariosArray}  /> }   
                    </div>
                    
                    
                    {/* data-aos="fade-down" data-aos-duration="500" data-aos-delay="900" */}
                    
                    {/* <InvestigationChart /> */}
                    {/* data-aos="fade-down" data-aos-duration="500" data-aos-delay="900" */}
                    {/* <ChallengesChart userId={userId} /> */}
                    {/* <LabTimeChart /> */}
                </div>
            </div>
            <div className="w-full col-span-2" data-aos="fade-up" >
                <TopTeamsBlock statistics={statistics} teamName={teamName} />
                {bloodCounter && bloodCounter > 0 ? <FirstBloodBlock statistics={bloodCounter}  /> : null}
            </div>
        </div>
            
        </>
    )
}

export default function TopStatistics(){
    const { data: session } = useSession();  
    return (
        <>
            {(session  && session?.user) &&  <TopStatisticsData userId={session?.user.id}  userName={session?.user?.name || "Undefined"} /> }
        </>
    )
}