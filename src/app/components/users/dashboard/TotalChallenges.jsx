"use client"

import  { FaPuzzlePiece } from "react-icons/fa6"
import CountUp from 'react-countup';
// import {  useEffect, useState } from "react";
// import {  useSession } from "next-auth/react";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// toast

export default function TotalChallenges({totalChallenges}){
    // const { data: session } = useSession();    
    // const [totalChallenges, setTotalChallenges] = useState(0)
    // useEffect(() => {
    //     if (session){
    //         axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${session.user.id}`)
    //         .then(response => {
    //             if(response.data.status === true){
    //                 if(response.data.user?.team?.quiz?.questions?.length) {
    //                     setTotalChallenges(response.data.user?.team?.quiz?.questions?.length)
    //                 } else{
    //                     setTotalChallenges(0)
    //                 }
    //             }
    //             else{
    //                 toast.error(`${response.data.error}`)
    //                 setTotalChallenges(0)
    //             }
    //         })
    //         .catch(error => {
    //             console.debug(error)
    //         })
    //     }
    // }, [])
    return (
        <>
            <div className="w-full col-span-1 relative  m-auto p-0 border-none rounded-lg">
                <div  className="block  p-6 bg-blue-500  rounded-lg shadow ">
                    <div className="flex justify-between items-center">
                        <div>
                            <h5 className="mb-2 text-3xl font-bold tracking-tight text-white">Challenges</h5>
                            <p className="font-normal text-white mb-2 text-2xl">
                                {totalChallenges && (<CountUp end={totalChallenges}  duration={5} /> ) }  
                            </p>
                        </div>
                        <span>
                            <FaPuzzlePiece size={40}  className="text-white" />
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}