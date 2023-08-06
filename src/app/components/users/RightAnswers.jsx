"use client"

import  { GiTargetPrize } from "react-icons/gi"
import  { FaPuzzlePiece } from "react-icons/fa6"
import CountUp from 'react-countup';

// import { LiaCoinsSolid } from "react-icons/lia"
// import   { FaCoins } from "react-icons/fa6"


import  { MdIncompleteCircle } from "react-icons/md"

export default function RightAnswers(){
    return (
        <>
            <div className="w-full col-span-1 relative  m-auto p-0 border-none rounded-lg">
                <div  className="block max-w-sm p-6 bg-orange-600 border border-gray-200 rounded-lg shadow ">
                    <div className="flex justify-between items-center">
                        <div>
                            <h5 className="mb-2 text-3xl font-bold tracking-tight text-white">Statistics</h5>
                            <p className="font-normal text-white mb-2 text-2xl">
                                <CountUp end={25}  duration={5} /> / <CountUp end={45}  duration={5} />
                            </p>
                        </div>
                        <span>
                            <MdIncompleteCircle size={50}  className="text-orange-300" />
                        </span>
                    </div>
                </div>
            </div>

            

        </>
    )
}