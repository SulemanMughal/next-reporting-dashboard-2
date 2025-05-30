"use client"

// import  { GiTargetPrize } from "react-icons/gi"
// import  { FaPuzzlePiece } from "react-icons/fa6"
import CountUp from 'react-countup';

// import { LiaCoinsSolid } from "react-icons/lia"
// import   { FaCoins } from "react-icons/fa6"
// import { MdGroups } from "react-icons/md"   
// import { BsStarHalf } from "react-icons/bs"

import { PointsIcon } from "@/app/lib/icons"

export default function TotalObtainedPoints({totalPoints , overall_points }){
    return (
        <>
            {/* <div className="w-full col-span-1 relative  m-auto p-0 border-none rounded-lg">
                <div  className="block  p-6 bg-teal-600  rounded-lg shadow ">
                    <div className="flex justify-between items-center">
                        <div>
                            <h5 className="mb-2 text-3xl font-bold tracking-tight text-white">Points</h5>
                            <p className="font-normal text-white mb-2 text-2xl">
                               {totalPoints && <CountUp end={totalPoints}  duration={5} />     }  
                            </p>
                        </div>
                        <span>
                            <FaCoins size={50}  className="text-teal-300" />
                        </span>
                    </div>
                </div>
            </div> */}
            
            <div className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105  duration-300">
                
            <div className="w-full col-span-1 relative  m-auto p-0 border-none rounded-lg report-box"  data-aos="fade-down" >
                <div  className="block  p-6 bg-color-1  rounded-lg shadow relative">
                <div className="flex justify-between items-center ">
                        <div>
                            <PointsIcon  size={35}  className="text-color-2 mb-6"  />
                            <p className="font-bold  leading-8 text-color-6 text-3xl mb-2">
                                {totalPoints && <CountUp end={totalPoints}  duration={3} />}
                            </p>
                            <h5 className="text-xs 2xl:text-base text-color-10">Team Points </h5>
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