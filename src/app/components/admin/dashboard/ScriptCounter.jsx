"use client"

import axios from 'axios';
import { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { VscTerminalBash } from "react-icons/vsc"


import decrypt from "@/app/lib/decrypt"



export default function ScriptCounter(){
    const [scriptCounter, setScriptCounter] = useState(null);
    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/script_counter`)
        .then(res => {
                    
            const {...data } = decrypt(res.data.encryptedData)
            setScriptCounter(data.total_scripts)
        })
        .catch(error => {
            console.error(error);
        });
    }, []);
    return (
        <>
            <div className="w-full col-span-1 relative  m-auto p-0 border-none rounded-lg">
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
            </div>
        </>
    )
}