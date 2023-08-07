"use client"

import  { FaPuzzlePiece } from "react-icons/fa6"
import CountUp from 'react-countup';

export default function TotalQuestion(){
    return (
        <>
            <div className="w-full col-span-1 relative  m-auto p-0 border-none rounded-lg">
                <div  className="block max-w-sm p-6 bg-blue-500  rounded-lg shadow ">
                    <div className="flex justify-between items-center">
                        <div>
                            <h5 className="mb-2 text-3xl font-bold tracking-tight text-white">Question</h5>
                            <p className="font-normal text-white mb-2 text-2xl">
                                <CountUp end={45}  duration={5} />    
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