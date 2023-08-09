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
// import {  useEffect, useState } from "react";
// import {  useSession } from "next-auth/react";

// useEffect


export default function Dashboard(){
    // const { data: session } = useSession(); 
    useEffect(() => {
        AOS.init();
    })
    return (
        <>
            <div className="p-4 grid gap-3 auto-rows-fr grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4" data-aos="zoom-in" data-aos-duration="1500" data-aos-delay="500">
                <TeamCounter  />
                <ScriptCounter />
                <LogsCounter />
                <QuizCounter /> 
            </div>
            <div className="p-4 grid  grid-cols-1 gap-4 place-items-center" data-aos="fade-right" data-aos-duration="1500" data-aos-delay="500">
                <LogLineChart />
            </div>
            <div className="p-4 grid md:grid-cols-9 grid-cols-1 gap-4 place-items-start h-100" data-aos="fade-left" data-aos-duration="1500" data-aos-delay="500">
                <TeamsPerAttack />
                <LogsPerProtocol />
                <IP_PerProtocol />
            </div>
            <div className="p-4 grid grid-cols-3 gap-4 place-items-start h-100" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="500">
                <TopTeamChart />
                <AttakScriptTable />
            </div>
            <div className="p-4 grid grid-cols-3 gap-4 place-items-start h-100" data-aos="fade-down" data-aos-duration="1500" data-aos-delay="500">
                <UserLogsTable />
            </div>
        </>
    )
}



      
      {/* 
      <div className="p-4 grid md:grid-cols-10 grid-cols-1 gap-4 place-items-start h-100">
        <AttackTable />
        <TeamTable />
        <LogChart />
      </div>
      <div className="p-4 grid md:grid-cols-8 grid-cols-1 gap-4">
        <AttakScriptTable />
        <CategoryBreakdown />
      </div>
      <div className="p-4 grid md:grid-cols-7 grid-cols-1 gap-4">
        <JobTable />
        <JobStatusChart />
      </div>
       */}