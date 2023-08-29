"use client"



// Quiz Cards for admin for "admin/quiz" page

import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import QuizCard from "@/app/components/admin/quiz/QuizCard"
import AOS from 'aos';
import 'aos/dist/aos.css';
import decrypt from "@/app/lib/decrypt"
import CustomTriangleLoader from "@/app/components/CustomTriangleLoader"


export default function QuizList(){
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        AOS.init();
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/quiz/`)
        .then(res => {
            const {...data } = decrypt(res.data.encryptedData)
            setData(data)
            setError(null);
            setLoading(false);
        })
        .catch(error => {
            console.log(error)
            setError(error);
            setLoading(false);
        })
    }, [])
    return (
        <>
        {loading ? (
            <>
                <div  className="col-span-4 ">
                    <CustomTriangleLoader />
                </div>
            </>
        ) : error ? (
            <>
                <div>Error: {error.message}</div>
            </>
        ) : (
            <>
                {data && data.results.map((quiz, index) => (
                    <QuizCard  key={index} quiz={quiz} setData={setData}  />
                ))}
            </>
        )}
            
        </>
    )
}