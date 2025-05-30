"use client"

// import  { GiTargetPrize } from "react-icons/gi"
// import  { FaPuzzlePiece } from "react-icons/fa6"
import CountUp from 'react-countup';

// import { LiaCoinsSolid } from "react-icons/lia"
// import   { FaCoins } from "react-icons/fa6"


import  { MdIncompleteCircle } from "react-icons/md"

export default function RightAnswers({totalTrueQuestions , totalFalseQuestions}){
    return (
        <>
            {/* <div className="w-full col-span-1 relative  m-auto p-0 border-none rounded-lg">
                <div  className="block  p-6 bg-orange-600  rounded-lg shadow ">
                    <div className="flex justify-between items-center">
                        <div>
                            <h5 className="mb-2 text-3xl font-bold tracking-tight text-white">Statistics</h5>
                            <p className="font-normal text-white mb-2 text-2xl">
                               {totalTrueQuestions &&  (<>
                                <CountUp end={totalTrueQuestions}  duration={5} /> / <CountUp end={totalFalseQuestions}  duration={5} />
                               </> )}  
                            </p>
                            
                        </div>
                        <span>
                            <MdIncompleteCircle size={50}  className="text-orange-300" />
                        </span>
                    </div>
                </div>
            </div> */}


            <div className="w-full col-span-1 relative  m-auto p-0 border-none rounded-lg report-box"  >
                <div  className="block  p-6 bg-dark-blue  rounded-lg shadow relative">
                <div className="flex justify-between items-center ">
                        <div>
                            <MdIncompleteCircle size={40}  className="text-blue-500 mb-6" />
                            <p className="font-bold text-white  text-4xl mb-2">
                            <CountUp end={totalTrueQuestions}  duration={5} /> / <CountUp end={totalFalseQuestions}  duration={5} />
                            </p>
                            <h5 className="text-md text-gray-400">Successful/Un-successful Challenges</h5>
                        </div>
                        <span>
                        </span>
                    </div>
                </div>
            </div>

            

        </>
    )
}