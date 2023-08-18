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
import { useEffect } from 'react';


export default function Dashboard({data}){
    useEffect(() => {
        AOS.init();
    })
    return (
        <>
            <div className="p-4 grid gap-3 auto-rows-fr grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4" data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="500">
                <TeamCounter  total_teams={data.total_teams} />
                <ScriptCounter total_scripts={data.total_scripts}  />
                <LogsCounter  total_logs={data.total_logs} />
                <QuizCounter  total_quizes={data.total_quizes} />
            </div>
            <div className="p-4 grid  grid-cols-1 gap-4 place-items-center" data-aos="fade-right" data-aos-duration="1000" data-aos-delay="500">
                <LogLineChart  logs_by_hour={data.logs_by_hour} />
            </div>
            <div className="p-4 grid md:grid-cols-9 grid-cols-1 gap-4 place-items-start h-100" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="500">
                <TeamsPerAttack teams_per_attack_logs={data.teams_per_attack_logs} />
                <LogsPerProtocol logs_per_protocol_logs={data.logs_per_protocol_logs} />
                <IP_PerProtocol ips_per_protocol_logs={data.ips_per_protocol_logs} />
            </div>
            <div className="p-4 grid grid-cols-3 gap-4 place-items-start h-100" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="500">
                <TopTeamChart top_teams={data.top_teams} />
                <AttakScriptTable latest_scripts={data.latest_scripts} />
            </div>
            <div className="p-4 grid grid-cols-3 gap-4 place-items-start h-100" data-aos="fade-down" data-aos-duration="1000" data-aos-delay="500">
                <UserLogsTable  />
            </div>
        </>
    )
}