"use client"


import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"


import QuizCard from "@/app/components/admin/quiz/QuizCard"

export default function QuizList(){

    const [data, setData] = useState(null)
    const target_url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/quiz/`

    useEffect(() => {
        axios.get(target_url)
        .then(response => {
            setData(response.data)
        })
        .catch(error => {
        })
    }, [])
    return (
        <>
            {data && data.results.map((quiz, index) => (
                <QuizCard  key={index} quiz={quiz}  />
            ))}
        </>
    )
}