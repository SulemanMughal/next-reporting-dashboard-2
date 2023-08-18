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
            <div className="w-full col-span-1 relative  m-auto p-0 border-none rounded-lg">
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
            </div>
        </>
    )
}

