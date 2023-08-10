"use client"

import axios from "axios";
import { useEffect, useState, useRef } from "react";
import SortDropDown from "@/app/components/admin/quiz/SortDropDown"
import QuizQuestion from "@/app/components/admin/quiz/QuizQuestion"
import GoToQuestionDropDown from "@/app/components/admin/quiz/GoToQuestionDropDown"
import AddNewQuestion from "@/app/components/admin/quiz/AddNewQuestion"
import { reverseArray } from "@/app/lib/helpers"
import AddNewScenario from "@/app/components/admin/quiz/AddNewScenario"
import CustomToaster from "@/app/components/CustomToaster"


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
        <CustomToaster />
        {data ? (
            <>
                <div className="px-5 py-4 md:py-7">
                    <div className="flex items-center justify-between">
                    <div className="inline-flex">
                        <h1 className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-5xl font-bold leading-normal text-white ">
                            {data?.results.title}  
                        </h1>
                    </div>
                        <div className="py-3 px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-none  cursor-pointer rounded">
                            <AddNewScenario />
                            <AddNewQuestion  quizId={quizId} setData={setData}/>
                            {
                                data?.results.questions.length ? 
                                    <GoToQuestionDropDown counter={data.results.questions.length} /> 
                                : null 
                            }
                                <SortDropDown  list={["Ascending", "Descending"]} />
                        </div>
                    </div>
                </div>
                <div className="p-4 grid gap-4  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
                    
                    {data?.results.questions.length && 
                       reverseArray(data?.results.questions).map((question, index) =>  
                        <QuizQuestion key={index} question={question}  quizId={quizId} setData={setData} />  
                    )}
                </div>
            </>

        ) : null}
            
        </>
    )
}