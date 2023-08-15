"use client"

import axios from 'axios';
import { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { BsFillRocketTakeoffFill } from "react-icons/bs"


import encrypt from "@/app/lib/encrypt"
import decrypt from "@/app/lib/decrypt"


export default function LogsCounter(){
    const [logsCounter, setLogsCounter] = useState(null);
    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/logs_counter`)
        .then(res => {
            const {...data } = decrypt(res.data.encryptedData)
            setLogsCounter(data.total_logs)
        })
        .catch(error => {
            console.error(error);
        });
    }, []);
    return (
        <>
            <div className="w-full col-span-1 relative  m-auto p-0 border-none rounded-lg">
                <div  className="block  p-6 bg-orange-700 border-none rounded-lg shadow  ">
                    <div className="flex justify-between items-center">
                        <div>
                            <h5 className="mb-2 text-3xl font-bold tracking-tight text-white">Logs</h5>
                            <p className="font-normal text-white mb-2 text-2xl">
                              {logsCounter && <CountUp end={logsCounter}  duration={5} />     }  
                            </p>
                        </div>
                        <span>
                            <BsFillRocketTakeoffFill size={40}  className="text-white text-3xl font-bold" />
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}
