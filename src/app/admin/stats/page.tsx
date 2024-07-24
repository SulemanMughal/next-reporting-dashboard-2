"use client"

import { BsSearch } from "react-icons/bs"
import CustomToaster from "@/app/components/CustomToaster"
import CustomTriangleLoader from "@/app/components/CustomTriangleLoader"
import AttakScriptTable from "@/app/components/AttakScriptTable"
import TopTeamChart from "@/app/components/admin/dashboard/TopTeamChart"
// import CountUp from 'react-countup';
import { useState , useEffect } from "react";
import axios from "axios";
import decrypt from "@/app/lib/decrypt"
import AOS from 'aos';
import 'aos/dist/aos.css';
import Link from "next/link";
import { GiFireShield } from "react-icons/gi";
// import TeamCounter from "@/app/components/admin/dashboard/TeamCounter"
import { FaUsers , FaServer } from "react-icons/fa"
import CountUp from 'react-countup';
import { BsFillRocketTakeoffFill } from "react-icons/bs"
import { RiTeamFill } from "react-icons/ri"
import  { GiPuzzle } from "react-icons/gi"
import { LuActivity } from "react-icons/lu"
import { GiLightningHelix } from "react-icons/gi"
import { MdCategory } from "react-icons/md"


import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

function OverAllTotalUserCounter({total_users}){
    const [userCounter, setUserCounter] = useState(0)
    useEffect(() => (
        setUserCounter(total_users)


    // eslint-disable-next-line react-hooks/exhaustive-deps
    ), [])
    return (
        <>
            <div className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105  duration-300">
                <div className="   w-full col-span-1 relative  m-auto p-0 border-none rounded-lg report-box  "  data-aos="fade-down" data-aos-duration="500" data-aos-delay="600" >
                    <div  className="   block  p-6 bg-deep-blue-violet  rounded-lg shadow relative  ">
                        <div className="flex justify-between items-center ">
                            <div>
                                <FaUsers size={35}  className="text-light-blue mb-6" />
                                <p className="font-bold  leading-8 text-white  text-3xl mb-2">
                                    {total_users && <CountUp end={total_users}  duration={3} />     }  
                                </p>
                                <h5 className="text-base text-gray-400">Total Users</h5>
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



function TeamCounter({total_teams}){
    const [teamCounter, setTeamCounter] = useState(0)
    useEffect(() => (
        setTeamCounter(total_teams)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    ), [])
    return (
        <>
            <div className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105  duration-300">
                <div className="   w-full col-span-1 relative  m-auto p-0 border-none rounded-lg report-box  "  data-aos="fade-down" data-aos-duration="500" data-aos-delay="600" >
                    <div  className="   block  p-6 bg-deep-blue-violet  rounded-lg shadow relative  ">
                    <div className="flex justify-between items-center ">
                            <div>
                                <RiTeamFill size={35}  className="text-light-blue mb-6" />
                                <p className="font-bold  leading-8 text-white  text-3xl mb-2">
                                    {teamCounter && <CountUp end={teamCounter}  duration={3} />     }  
                                </p>
                                <h5 className="text-base text-gray-400">Teams</h5>
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


// Overall Total Challenges
function OverallTotalChallenges({total_challenges}){
    const [challengesCounter, setChallengesCounter] = useState(0)
    useEffect(() => (
        setChallengesCounter(total_challenges)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    ), [])
    return (
        <>
            <div className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105  duration-300">
                <div className="   w-full col-span-1 relative  m-auto p-0 border-none rounded-lg report-box  "  data-aos="fade-down" data-aos-duration="500" data-aos-delay="600" >
                    <div  className="   block  p-6 bg-deep-blue-violet  rounded-lg shadow relative  ">
                        <div className="flex justify-between items-center ">
                            <div>
                                <FaServer size={35}  className="text-light-blue mb-6" />
                                <p className="font-bold  leading-8 text-white  text-3xl mb-2">
                                    {challengesCounter && <CountUp end={challengesCounter}  duration={3} />     }  
                                </p>
                                <h5 className="text-base text-gray-400">Challenges</h5>
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

function LogsCounter({total_logs}){
    
    return (
        <>
            {
                 (
                    <div className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105  duration-300">
                        <div className="   w-full col-span-1 relative  m-auto p-0 border-none rounded-lg report-box  "  data-aos="fade-down" data-aos-duration="500" data-aos-delay="600" >
                            <div  className="   block  p-6 bg-deep-blue-violet  rounded-lg shadow relative  ">
                            <div className="flex justify-between items-center ">
                                    <div>
                                        <BsFillRocketTakeoffFill size={35}  className="text-light-blue mb-6" />
                                        <p className="font-bold  leading-8 text-white  text-3xl mb-2">
                                            {total_logs && <CountUp end={total_logs}  duration={3} />     }  
                                            {/* {total_logs} */}
                                        </p>
                                        <h5 className="text-base text-gray-400">Logs</h5>
                                    </div>
                                    <span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}



function QuestionsCounter({total_questions}){
    return (
        <>
            {
                 (
                    <div className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105  duration-300">
                        <div className="   w-full col-span-1 relative  m-auto p-0 border-none rounded-lg report-box  "  data-aos="fade-down" data-aos-duration="500" data-aos-delay="600" >
                            <div  className="   block  p-6 bg-deep-blue-violet  rounded-lg shadow relative  ">
                            <div className="flex justify-between items-center ">
                                    <div>
                                        <GiPuzzle size={35}  className="text-light-blue mb-6" />
                                        <p className="font-bold  leading-8 text-white  text-3xl mb-2">
                                            {total_questions && <CountUp end={total_questions}  duration={3} />  } 
                                        </p>
                                        <h5 className="text-base text-gray-400">Questions</h5>
                                    </div>
                                    <span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}




function ActivitiesCounter({counter}){
    return (
        <>
            {
                 (
                    <div className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105  duration-300">
                        <div className="   w-full col-span-1 relative  m-auto p-0 border-none rounded-lg report-box  "  data-aos="fade-down" data-aos-duration="500" data-aos-delay="600" >
                            <div  className="   block  p-6 bg-deep-blue-violet  rounded-lg shadow relative  ">
                            <div className="flex justify-between items-center ">
                                    <div>
                                        <LuActivity size={35}  className="text-light-blue mb-6" />
                                        <p className="font-bold  leading-8 text-white  text-3xl mb-2">
                                            {counter && <CountUp end={counter}  duration={3} />  } 
                                        </p>
                                        <h5 className="text-base text-gray-400">Activities</h5>
                                    </div>
                                    <span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}


function SubmissionsCounter({counter}){
    return (
        <>
            {
                 (
                    <div className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105  duration-300">
                        <div className="   w-full col-span-1 relative  m-auto p-0 border-none rounded-lg report-box  "  data-aos="fade-down" data-aos-duration="500" data-aos-delay="600" >
                            <div  className="   block  p-6 bg-deep-blue-violet  rounded-lg shadow relative  ">
                            <div className="flex justify-between items-center ">
                                    <div>
                                        <GiLightningHelix size={35}  className="text-light-blue mb-6" />
                                        <p className="font-bold  leading-8 text-white  text-3xl mb-2">
                                            {counter && <CountUp end={counter}  duration={3} />  } 
                                        </p>
                                        <h5 className="text-base text-gray-400">Submissions</h5>
                                    </div>
                                    <span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}




function CatgoriesCounter({counter}){
    return (
        <>
            {
                 (
                    <div className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105  duration-300">
                        <div className="   w-full col-span-1 relative  m-auto p-0 border-none rounded-lg report-box  "  data-aos="fade-down" data-aos-duration="500" data-aos-delay="600" >
                            <div  className="   block  p-6 bg-deep-blue-violet  rounded-lg shadow relative  ">
                            <div className="flex justify-between items-center ">
                                    <div>
                                        <MdCategory size={35}  className="text-light-blue mb-6" />
                                        <p className="font-bold  leading-8 text-white  text-3xl mb-2">
                                            {counter && <CountUp end={counter}  duration={3} />  } 
                                        </p>
                                        <h5 className="text-base text-gray-400">Categories</h5>
                                    </div>
                                    <span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}



ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ['Windows', 'Linux'],
  datasets: [
    {
      label: '# of Challenges',
      data: [12, 19],
      backgroundColor: [
        'rgba(255, 99, 132, 0.4)',
        'rgba(54, 162, 235, 0.4)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
      ],
      borderWidth: 1,
    },
  ],
};


const data_2 = {
    labels: ['Hard', 'Medium', "Easy"],
    datasets: [
      {
        label: '# of Challenges',
        data: [12, 19 , 10],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };


  const data_3 = {
    labels: ['Normal', 'Medium', "Hard"],
    datasets: [
      {
        label: '# of Activities',
        data: [12, 19 , 10],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 0)',
          'rgba(54, 162, 235, 0)',
          'rgba(255, 206, 86, 0)',
        ],
        borderWidth: 1,
      },
    ],
  };

 function OSChart() {
    
  return (
    <>
        <div className="w-full col-span-1 relative  h-[80vh]   p-8 pb-20 border-none rounded-lg bg-card-custom overflow-hidden text-white">
            <h1 className="text-2xl ">OS Based Challenges</h1>
            <hr className="mt-5  mb-10 h-0.5 border-t-0 bg-white opacity-30" />
            <Pie data={data} />
        </div>
    </>
  )
  
  
}


function DifficultyChart() {
    
    return (
      <>
          <div className="w-full col-span-1 relative  h-[80vh]   p-8 pb-20 border-none rounded-lg bg-card-custom overflow-hidden text-white">
              <h1 className="text-2xl ">Difficulty Based Challenges</h1>
              <hr className="mt-5 mb-10 h-0.5 border-t-0 bg-white opacity-30" />
              <Pie data={data_2} />
          </div>
      </>
    )
    
    
  }


  function ActivitiesChart() {
    
    return (
      <>
          <div className="w-full col-span-1 relative  h-[80vh]   p-8 pb-20 border-none rounded-lg bg-card-custom overflow-hidden text-white">
              <h1 className="text-2xl ">Level Based Activities</h1>
              <hr className="mt-5 mb-10 h-0.5 border-t-0 bg-white opacity-30" />
              <Pie data={data_3} />
          </div>
      </>
    )
    
    
  }


export default function Page(){
    useEffect(() => {
        AOS.init();
        // DataFetch()
    }, [])  
    return (
        <>
            <CustomToaster />
            <div  className="p-4 mb-16">
                <div className="flex justify-between items-center mb-5 ">
                    <h1 className="text-white text-2xl font-bold">
                        Statistics
                    </h1>
                    {/* <div className="flex justify-end items-center ">
                        <FilterResetBtn />
                        <SearchInput />
                    </div> */}
                </div>
                {/* Main Content */}
                <div className="p-4 grid gap-4 gap-y-10 auto-rows-fr grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4" >
                    <TeamCounter  total_teams={30} />
                    <OverAllTotalUserCounter total_users={180}  />
                    <LogsCounter  total_logs={197351} />
                    <OverallTotalChallenges  total_challenges={8} />
                    <QuestionsCounter  total_questions={35} />
                    <ActivitiesCounter  counter={700} />
                    <SubmissionsCounter  counter={137} />
                    <CatgoriesCounter  counter={10} />
                </div>
                <div className="p-4 grid grid-cols-3 gap-4 place-items-start h-50" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="500">
                    {/* <TopTeamChart top_teams={data.top_teams} /> */}
                    {/* <AttakScriptTable latest_scripts={null} /> */}
                    <OSChart />
                    <DifficultyChart />
                    <ActivitiesChart />
                </div>
            </div>
        </>
    )
}