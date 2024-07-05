"use client"

// import  { FaPuzzlePiece } from "react-icons/fa6"
// import { GiSpy } from "react-icons/gi"
import CountUp from 'react-countup';
// import { FaServer } from "react-icons/fa6"

// import { FaServer } from "react-icons/fa6"

import { ChallengeIcon } from "@/app/lib/icons"

export default function TotalChallenges({totalChallenges, totalSolvedChallenges }){
    // console.debug(scenarios)
    return (
        <>
        <div className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105  duration-300">
        <div className="   w-full col-span-1 relative  m-auto p-0 border-none rounded-lg report-box  "  data-aos="fade-down" >
                <div  className="   block  p-6 bg-color-1  rounded-lg shadow relative  ">
                <div className="flex justify-between items-center ">
                        <div>
                            <ChallengeIcon size={35}  className="text-color-2 mb-6" />
                            <p className="font-bold  leading-8 text-color-6  text-3xl mb-2">
                            {totalSolvedChallenges && <CountUp end={totalSolvedChallenges}  duration={3} /> } 
                            </p>
                            <h5 className=" text-xs 2xl:text-base text-color-10">Challenges Completed </h5>
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