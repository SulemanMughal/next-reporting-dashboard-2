"use client"
import {  useSession } from "next-auth/react";
import { useState , useEffect } from "react"
import axios from 'axios';

import TotalQuestion from "@/app/components/users/TotalQuestion"
import TotalSubmission from "@/app/components/users/TotalSubmission"
import TotalObtainedPoints from "@/app/components/users/TotalObtainedPoints"
import RightAnswers from "@/app/components/users/RightAnswers"
import UserQuestions from "@/app/components/users/UserQuestions"
import UserQuestionCard from "@/app/components/users/UserQuestionCard"

export default function UserDashboard(){
    const { data: session } = useSession();
    const [team, setTeam] = useState(null)
    const [quiz, setQuiz] = useState(null)
    const [cQuestion , updateQuestion] = useState(null)
    const [items, setItems] = useState([])
    const [successSubmit, setSuccessSubmit] = useState(false)
    useEffect(() => {
        if(session?.user.id){
            axios.post('/api/user/team', {
                "user" : session?.user.id
            })
            .then(response => {
                setTeam({
                    "id" : response.data.results.team.id,
                    "name" : response.data.results.team.name,
                })
                setQuiz(response.data.results.team.quiz)
            })
            .catch(error => {
            })
        }
    }, [])
    // if(session?.user.id){
    //     // useEffect(() => {
    //     //     axios.post('/api/user/team', {
    //     //         "user" : session?.user.id
    //     //     })
    //     //     .then(response => {
    //     //         setTeam({
    //     //             "id" : response.data.results.team.id,
    //     //             "name" : response.data.results.team.name,
    //     //         })
    //     //         setQuiz(response.data.results.team.quiz)
    //     //     })
    //     //     .catch(error => {
    //     //     })
    //     // }, [])
        
        
    // }
    if( session?.user.id &&  !cQuestion && quiz?.activeIndex){
        axios.post('/api/quiz', {
            "user" : session?.user.id,
            "quiz": quiz?.id, 
            "team": team?.id, 
            "cIndex": quiz?.activeIndex
        })
        .then(response => {
            updateQuestion(response.data.results.team.quiz.questions[0])
        })
        .catch(error => {
        })
    }


    const handleChange = (e) => { 
        if(e.target.checked){
            items.push(e.target.value)
        } else {
            var index = items.indexOf(e.target.value);
            items.splice(index,1);
        }
        setItems(items)
    }; 
    const submitHandler = () => {
        axios.post('/api/quiz/submit/answer', {
            user: session?.user.id, 
            team: team?.id, 
            question: cQuestion?.id, 
            quiz: quiz?.id, 
            answer: items.join()
        })
        .then(response => {
            setItems([])
            setSuccessSubmit(true)
        })
        .catch(error => {
            console.debug(error)
        })
    }

    if(successSubmit)[
        axios.all([
            axios.post('/api/user/team', {
                "user" : session?.user.id
            }) ,
            axios.post('/api/quiz', {
                "user" : session?.user.id,
                "quiz": quiz?.id, 
                "team": team?.id, 
                "cIndex": quiz?.activeIndex
            })
        ]).then(axios.spread((data1,data2) => {

            setTeam({
                "id" : data1.data.results.team.id,
                "name" : data1.data.results.team.name,
            })
            setQuiz(data1.data.results.team.quiz)
            updateQuestion(data2.data.results.team.quiz?.questions[0])
            setSuccessSubmit(false)
        }))
    ]

    return (
        <>
            <main className='bg-gray-100 min-h-screen '>
                <div className="p-4 grid  grid-cols-4 gap-4 place-items-center">
                    <TotalQuestion />
                    <TotalSubmission />
                    <TotalObtainedPoints />
                    <RightAnswers />
                </div>
                <div className="p-4 grid grid-cols-5 gap-4 place-items-start h-100">
                    
                {quiz && ( 
                    <UserQuestions   
                        questions={quiz?.questions}
                        startAt={quiz?.startAt} 
                        endAt={quiz?.endAt}
                        activeIndex={quiz?.activeIndex}
                    /> 
                ) }  
                {cQuestion &&  <UserQuestionCard  question={cQuestion} handleChange={handleChange} submitHandler={submitHandler}  />}
                </div>
            </main>
        </>
    )
}