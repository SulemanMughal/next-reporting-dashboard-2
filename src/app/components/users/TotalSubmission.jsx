"use client"

// import  { GiTargetPrize } from "react-icons/gi"
import  { FaPuzzlePiece } from "react-icons/fa6"
import CountUp from 'react-countup';
import { RiQuestionAnswerFill } from "react-icons/ri"

export default function TotalSubmission(){
    return (
        <>

            <div className="w-full col-span-1 relative  m-auto p-0 border-none rounded-lg">
                <div  className="block max-w-sm p-6 bg-red-800 border border-gray-200 rounded-lg shadow ">
                    <div className="flex justify-between items-center">
                        <div>
                            <h5 className="mb-2 text-3xl font-bold tracking-tight text-white">Submission</h5>
                            <p className="font-normal text-white mb-2 text-2xl">
                                <CountUp end={45}  duration={5} />    
                            </p>
                        </div>
                        <span>
                            <RiQuestionAnswerFill size={40}  className="text-red-200" />
                        </span>
                    </div>
                    

                </div>
            </div>

            

        </>
    )
}