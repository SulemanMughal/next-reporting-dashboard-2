"use client"



import { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import  { MdQuiz } from "react-icons/md"
export default function QuizCounter({total_quizes}){
    const [quizCounter, setQuizCounter] = useState(0)
    useEffect(() => (
        setQuizCounter(total_quizes)
    ), [])
    return (
        <>
            {/* <div className="w-full col-span-1 relative  m-auto p-0 border-none rounded-lg">
                <div  className="block  p-6 bg-red-700 border-none rounded-lg shadow ">
                    <div className="flex justify-between items-center">
                        <div>
                            <h5 className="mb-2 text-3xl font-bold tracking-tight text-white">Quizes</h5>
                            <p className="font-normal text-white mb-2 text-2xl">
                                {quizCounter && <CountUp end={quizCounter}  duration={5} /> }   
                            </p>
                        </div>
                        <span>
                            <MdQuiz size={40}  className="text-white text-3xl font-bold" />
                        </span>
                    </div>
                </div>
            </div> */}

            <div className="w-full col-span-1 relative  m-auto p-0 border-none rounded-lg report-box"  >
                <div  className="block  p-6 bg-card-custom  rounded-lg shadow relative">
                <div className="flex justify-between items-center ">
                        <div>
                            <MdQuiz size={40}  className="text-blue-500 mb-6" />
                            <p className="font-bold text-white  text-4xl mb-2">
                            {quizCounter && <CountUp end={quizCounter}  duration={5} /> }   
                            </p>
                            <h5 className="text-md text-gray-400">Total Quizes</h5>
                        </div>
                        <span>
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}

