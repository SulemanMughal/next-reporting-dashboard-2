"use client"

import  { FaPuzzlePiece } from "react-icons/fa6"
import CountUp from 'react-countup';

export default function TotalChallenges({totalChallenges, totalSubmissions}){
    return (
        <>
        <div className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105  duration-300">
        <div className="   w-full col-span-1 relative  m-auto p-0 border-none rounded-lg report-box  "  data-aos="fade-down" data-aos-duration="500" data-aos-delay="600" >
                <div  className="   block  p-6 bg-card-custom  rounded-lg shadow relative  ">
                <div className="flex justify-between items-center ">
                        <div>
                            <FaPuzzlePiece size={40}  className="text-blue-500 mb-6" />
                            <p className="font-bold text-white  text-4xl mb-2">
                            {totalSubmissions && <CountUp end={totalSubmissions}  duration={3} />     } / {totalChallenges && (<CountUp end={totalChallenges}  duration={3} /> ) }  
                            </p>
                            <h5 className="text-md text-gray-400">Challenges Completed / Total</h5>
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