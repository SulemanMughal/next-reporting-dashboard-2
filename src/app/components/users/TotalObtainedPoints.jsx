"use client"

// import  { GiTargetPrize } from "react-icons/gi"
import  { FaPuzzlePiece } from "react-icons/fa6"
import CountUp from 'react-countup';

// import { LiaCoinsSolid } from "react-icons/lia"
import   { FaCoins } from "react-icons/fa6"

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

            <div className="w-full col-span-1 relative  m-auto p-0 border-none rounded-lg report-box"  >
                <div  className="block  p-6 bg-card-custom  rounded-lg shadow relative">
                <div className="flex justify-between items-center ">
                        <div>
                            <FaCoins size={40}  className="text-blue-500 mb-6" />
                            <p className="font-bold text-white  text-4xl mb-2">
                                {totalPoints && <CountUp end={totalPoints}  duration={3} />} / {totalPoints && <CountUp end={overall_points}  duration={3} />}  
                            </p>
                            <h5 className="text-md text-gray-400">Your Points / Total Points</h5>
                        </div>
                        <span>
                        </span>
                    </div>
                </div>
            </div>

            

        </>
    )
}