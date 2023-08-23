"use client"

import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import QuizCard from "@/app/components/admin/quiz/QuizCard"

import AOS from 'aos';
import 'aos/dist/aos.css';
import { ThreeDots , Triangle } from 'react-loader-spinner'


import decrypt from "@/app/lib/decrypt"




export default function QuizList(){

    

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        AOS.init();
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/quiz/`)
        .then(res => {
            const {...data } = decrypt(res.data.encryptedData)
            // console.debug(data)
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
                    <Triangle
                        height="300"
                        width="300"
                        color="#4fa94d"
                        ariaLabel="triangle-loading"
                        wrapperStyle={{}}
                        wrapperClass={"flex justify-center"}
                        visible={true}
                        className={"flex justify-center"} 
                    />
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