"use client"
import { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { RiTeamFill } from "react-icons/ri"



export default function TeamCounter({total_teams}){
    const [teamCounter, setTeamCounter] = useState(0)
    useEffect(() => (
        setTeamCounter(total_teams)
    ), [])
    return (
        <>
            {/* <div className="w-full col-span-1 relative  m-auto p-0 border-none rounded-lg">
                <div  className="block  p-6 bg-emerald-700  rounded-lg shadow ">
                    <div className="flex justify-between items-center">
                        <div>
                            <h5 className="mb-2 text-3xl font-bold tracking-tight text-white">Teams</h5>
                            <p className="font-normal text-white mb-2 text-2xl">
                                {teamCounter &&  <CountUp end={teamCounter}  duration={5} />     }
                            </p>
                        </div>
                        <span>
                            <RiTeamFill size={40}  className="text-white text-3xl font-bold" />
                        </span>
                    </div>
                </div>
            </div> */}
            {/* <div className="w-full col-span-1 relative  m-auto p-0 border-none rounded-lg report-box"  >
                <div  className="block  p-6 deep-blue-violet  rounded-lg shadow relative">
                <div className="flex justify-between items-center ">
                        <div>
                            <RiTeamFill size={40}  className="text-blue-500 mb-6" />
                            <p className="font-bold text-white  text-4xl mb-2">
                            {teamCounter &&  <CountUp end={teamCounter}  duration={5} />     }
                            </p>
                            <h5 className="text-md text-gray-400">Total Teams</h5>
                        </div>
                        <span>
                        </span>
                    </div>
                </div>
            </div> */}


            <div className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105  duration-300">
                <div className="   w-full col-span-1 relative  m-auto p-0 border-none rounded-lg report-box  "  data-aos="fade-down" data-aos-duration="500" data-aos-delay="600" >
                    <div  className="   block  p-6 bg-deep-blue-violet  rounded-lg shadow relative  ">
                    <div className="flex justify-between items-center ">
                            <div>
                                <RiTeamFill size={35}  className="text-light-blue mb-6" />
                                <p className="font-bold  leading-8 text-white  text-3xl mb-2">
                                    {teamCounter && <CountUp end={teamCounter}  duration={3} />     }  
                                </p>
                                <h5 className="text-base text-gray-400">Total Teams</h5>
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
