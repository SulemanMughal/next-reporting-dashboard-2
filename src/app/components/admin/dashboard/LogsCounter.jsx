"use client"


import { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { BsFillRocketTakeoffFill } from "react-icons/bs"
import axios from 'axios';

import decrypt from "@/app/lib/decrypt"
import { toast } from 'react-hot-toast';
// import { useSession } from "next-auth/react";
// export const revalidate = 0;


export default function LogsCounter({total_logs}){
    const [logCounter, setLogCounter] = useState(0)
    // const { data: session } = useSession();



    const DataFetch =  () => {
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/logs_counter/${new Date().getTime()}`, {
            headers: { 'Cache-Control': 'no-store' },
            params: { timestamp: new Date().getTime() },
            next: { revalidate: 10 }
        }).then(res => {
            const {...data } = decrypt(res.data.encryptedData)
            if(data?.status === true){
                setLogCounter(data?.total_logs)
            } else{
                logCounter(0)
                toast.error(`There is an while fetching the logs. Please try again later.`)
            }
        })
        .catch(error => {
            console.error(error);
            logCounter(0)
            toast.error(`There is an while fetching the logs. Please try again later.`)
        })
    }


    useEffect(() => {
        setInterval(() => {
            DataFetch()
        }, 3000 );
    }, [])
    
    
    
    

    

    return (
        <>
            {/* <div className="w-full col-span-1 relative  m-auto p-0 border-none rounded-lg">
                <div  className="block  p-6 bg-orange-700 border-none rounded-lg shadow  ">
                    <div className="flex justify-between items-center">
                        <div>
                            <h5 className="mb-2 text-3xl font-bold tracking-tight text-white">Logs</h5>
                            <p className="font-normal text-white mb-2 text-2xl">
                              {logCounter && <CountUp end={logCounter}  duration={5} />     }  
                            </p>
                        </div>
                        <span>
                            <BsFillRocketTakeoffFill size={40}  className="text-white text-3xl font-bold" />
                        </span>
                    </div>
                </div>
            </div> */}


            {/* <div className="w-full col-span-1 relative  m-auto p-0 border-none rounded-lg report-box"  >
                <div  className="block  p-6 bg-card-custom  rounded-lg shadow relative">
                <div className="flex justify-between items-center ">
                        <div>
                            <BsFillRocketTakeoffFill size={40}  className="text-blue-500 mb-6" />
                            <p className="font-bold text-white  text-4xl mb-2">
                            {logCounter && <CountUp end={logCounter}  duration={5} />     }   
                            </p>
                            <h5 className="text-md text-gray-400">Total Logs</h5>
                        </div>
                        <span>
                        </span>
                    </div>
                </div>
            </div> */}
            

            {
                 (
                    <div className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105  duration-300">
                        <div className="   w-full col-span-1 relative  m-auto p-0 border-none rounded-lg report-box  "  data-aos="fade-down" data-aos-duration="500" data-aos-delay="600" >
                            <div  className="   block  p-6 bg-deep-blue-violet  rounded-lg shadow relative  ">
                            <div className="flex justify-between items-center ">
                                    <div>
                                        <BsFillRocketTakeoffFill size={35}  className="text-light-blue mb-6" />
                                        <p className="font-bold  leading-8 text-white  text-3xl mb-2">
                                            {/* {logCounter && <CountUp end={logCounter}  duration={3} />     }   */}
                                            {logCounter}
                                        </p>
                                        <h5 className="text-base text-gray-400">Total Logs</h5>
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

