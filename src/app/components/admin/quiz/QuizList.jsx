"use client"

import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import QuizCard from "@/app/components/admin/quiz/QuizCard"






export default function QuizList(){

    const [data, setData] = useState(null)

    useEffect(() => {
      
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/quiz/`)
        .then(response => {
            setData(response.data)
        })
        .catch(error => {
            console.log(error)
        })
    }, [])
    return (
        <>
            {data && data.results.map((quiz, index) => (
                <QuizCard  key={index} quiz={quiz} setData={setData}  />
            ))}
        </>
    )
}