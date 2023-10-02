"use client"

import AOS from 'aos';
import 'aos/dist/aos.css';
import AttakScriptTable from "@/app/components/AttakScriptTable"
import TeamsPerAttack from "@/app/components/admin/dashboard/TeamsPerAttack"
import LogLineChart from "@/app/components/LogLineChart"
import UserLogsTable from "@/app/components/users/UserLogsTable"
import LogsPerProtocol from "@/app/components/admin/dashboard/LogsPerProtocol"
import IP_PerProtocol from "@/app/components/admin/dashboard/IP_PerProtocol"
import TopTeamChart from "@/app/components/admin/dashboard/TopTeamChart"
import TeamCounter from "@/app/components/admin/dashboard/TeamCounter"
import ScriptCounter from "@/app/components/admin/dashboard/ScriptCounter"
import LogsCounter from "@/app/components/admin/dashboard/LogsCounter"
import QuizCounter from "@/app/components/admin/dashboard/QuizCounter"
import { useEffect, useState } from 'react';
import CustomToaster from "@/app/components/CustomToaster"
import { FaUsers , FaServer } from "react-icons/fa"
import CountUp from 'react-countup';
// import { FaServer } from "react-icons/fa"

// Over All Total Users
function OverAllTotalUserCounter({total_users}){
    const [userCounter, setUserCounter] = useState(0)
    useEffect(() => (
        setUserCounter(total_users)
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

// Overall Total Challenges
function OverallTotalChallenges({total_challenges}){
    const [challengesCounter, setChallengesCounter] = useState(0)
    useEffect(() => (
        setChallengesCounter(total_challenges)
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
                                <h5 className="text-base text-gray-400">Total Challenges</h5>
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


export default function Dashboard({data}){
    useEffect(() => {
        AOS.init();
    })
    return (
        <>
            <CustomToaster />
            <div className="p-4 grid gap-4 auto-rows-fr grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4" data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="500">
                <TeamCounter  total_teams={data.total_teams} />
                {/* <ScriptCounter total_scripts={data.total_scripts}  /> */}
                <OverAllTotalUserCounter total_users={data.total_users}  />
                <LogsCounter  total_logs={data.total_logs} />
                {/* <QuizCounter  total_quizes={data.total_quizes} /> */}
                <OverallTotalChallenges  total_challenges={data.total_challenges} />
                
            </div>
            <div className="p-4 grid  grid-cols-1 gap-4 place-items-center" data-aos="fade-right" data-aos-duration="1000" data-aos-delay="500">
                <LogLineChart  logs_by_hour={data.logs_by_hour}  />
            </div>
            <div className="p-4 grid md:grid-cols-9 grid-cols-1 gap-4 place-items-start h-100" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="500">
                <TeamsPerAttack teams_per_attack_logs={data.teams_per_attack_logs} />
                <LogsPerProtocol logs_per_protocol_logs={data.logs_per_protocol_logs} />
                <IP_PerProtocol ips_per_protocol_logs={data.ips_per_protocol_logs} />
            </div>
            {/* Remove Top Teams Charts and Attacking Script Table */}
            {/* <div className="p-4 grid grid-cols-3 gap-4 place-items-start h-100" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="500">
                <TopTeamChart top_teams={data.top_teams} />
                <AttakScriptTable latest_scripts={data.latest_scripts} />
            </div> */}
            <div className="p-4 grid grid-cols-3 gap-4 place-items-start h-100" >
                <UserLogsTable  />
            </div>
        </>
    )
}