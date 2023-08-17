"use client"

import CountUp from 'react-countup';
import { VscTerminalBash } from "react-icons/vsc"
export default function ScriptCounter({total_scripts}){
    return (
        <>
            <div className="w-full col-span-1 relative  m-auto p-0 border-none rounded-lg">
                <div  className="block  p-6 bg-cyan-700 border-none rounded-lg shadow ">
                    <div className="flex justify-between items-center">
                        <div>
                            <h5 className="mb-2 text-3xl font-bold tracking-tight text-white">Scripts</h5>
                            <p className="font-normal text-white mb-2 text-2xl">
                               {total_scripts && <CountUp end={total_scripts}  duration={5} />     }   
                            </p>
                        </div>
                        <span>
                            <VscTerminalBash size={40}  className="text-white text-3xl font-bold" />
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}