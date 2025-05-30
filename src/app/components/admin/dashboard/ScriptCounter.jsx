"use client"

import { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { VscTerminalBash } from "react-icons/vsc"
export default function ScriptCounter({total_scripts}){
    const [scriptCounter, setScriptCounter] = useState(0)
    useEffect(() => (
        setScriptCounter(total_scripts)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    ), [])
    return (
        <>
            {/* <div className="w-full col-span-1 relative  m-auto p-0 border-none rounded-lg">
                <div  className="block  p-6 bg-cyan-700 border-none rounded-lg shadow ">
                    <div className="flex justify-between items-center">
                        <div>
                            <h5 className="mb-2 text-3xl font-bold tracking-tight text-white">Scripts</h5>
                            <p className="font-normal text-white mb-2 text-2xl">
                               {scriptCounter && <CountUp end={scriptCounter}  duration={5} />     }   
                            </p>
                        </div>
                        <span>
                            <VscTerminalBash size={40}  className="text-white text-3xl font-bold" />
                        </span>
                    </div>
                </div>
            </div> */}

            {/* <div className="w-full col-span-1 relative  m-auto p-0 border-none rounded-lg report-box"  >
                <div  className="block  p-6 bg-card-custom  rounded-lg shadow relative">
                <div className="flex justify-between items-center ">
                        <div>
                            <VscTerminalBash size={40}  className="text-blue-500 mb-6" />
                            <p className="font-bold text-white  text-4xl mb-2">
                            {scriptCounter && <CountUp end={scriptCounter}  duration={5} />     }   
                            </p>
                            <h5 className="text-md text-gray-400">Total Scripts</h5>
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
                                <VscTerminalBash size={35}  className="text-light-blue mb-6" />
                                <p className="font-bold  leading-8 text-white  text-3xl mb-2">
                                    {scriptCounter && <CountUp end={scriptCounter}  duration={3} />     }  
                                </p>
                                <h5 className="text-base text-gray-400">Total Scripts</h5>
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
