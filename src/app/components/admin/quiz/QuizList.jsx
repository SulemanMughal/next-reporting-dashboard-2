"use client"

import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import QuizCard from "@/app/components/admin/quiz/QuizCard"

import AOS from 'aos';
import 'aos/dist/aos.css';


import decrypt from "@/app/lib/decrypt"



export default function QuizList(){

    

    const [data, setData] = useState(null)
    useEffect(() => {
        AOS.init();
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/quiz/`)
        .then(res => {
            
            const {...data } = decrypt(res.data.encryptedData)
            // console.debug(data)
            setData(data)
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