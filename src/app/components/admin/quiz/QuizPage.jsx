"use client"


import axios from "axios";
import { useEffect, useState } from "react";

import SortDropDown from "@/app/components/admin/quiz/SortDropDown"
import QuizQuestion from "@/app/components/admin/quiz/QuizQuestion"
import GoToQuestionDropDown from "@/app/components/admin/quiz/GoToQuestionDropDown"


// axios

export default function QuizPage({quizId}){

    const [data, setData] = useState(null)
    useEffect(() => {   
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/quiz/${quizId}`)
        .then((res) => {
            setData(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])
    return (
        <>

        {data ? (

            <>
                    <div className="px-5 py-4 md:py-7">
                <div className="flex items-center justify-between">
                    <div className="inline-flex">
                        <h1 className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-5xl font-bold leading-normal text-white ">
                            {data?.results.title}  
                        </h1>
                        <span className="inline-block  rounded-full px-3 py-1 text-2xl font-semibold  text-green-600 ml-1 -mt-3  ">{data?.results.teams.length?   data?.results.teams[0].name : ""}</span>
                    </div>
                        <div className="py-3 px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-none  cursor-pointer rounded">
                            {data?.results.questions.length ? <GoToQuestionDropDown counter={data.results.questions.length} /> : null }
                            <SortDropDown  list={["Ascending", "Descending"]}/>
                        </div>
                    </div>
            </div>

            {/* <div className="grid gap-6 auto-rows-fr grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-5">
                {data?.results.questions.length && data?.results.questions.map((question, index) =>  
                    <QuizQuestion key={index} question={question} />  
                )}
            </div> */}

            <div className="p-4 grid gap-4  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
                {data?.results.questions.length && data?.results.questions.map((question, index) =>  
                    <QuizQuestion key={index} question={question} />  
                )}
            </div>
            </>

        ) : null}
            
        </>
    )
}