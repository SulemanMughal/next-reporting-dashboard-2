"use client"


import { AiOutlineFileZip } from "react-icons/ai"
import axios from "axios";
import { toast } from "react-hot-toast";
import {  use, useEffect, useRef, useState } from "react";
import {  useSession } from "next-auth/react";
import AOS from 'aos';
import 'aos/dist/aos.css';


// FileInformation
function QuizFileInfo(){
    return (
        <>
            <div className="p-4 grid  grid-cols-6 gap-4 place-items-center justify-center  ">
                <div className="w-full col-span-2 relative  m-auto p-0  rounded-0">
                    <div className="flex  items-center justify-start px-0 place-items-start text-start">
                        <div className="px-0">
                            <AiOutlineFileZip className="text-gray-300" size={40} />
                        </div>
                        <div className="ml-2">
                            <h3 className="mb-0 pb-0 text-sm  text-gray-400">The Report II.zip</h3>
                            <p className="mt-0 pb-0  text-sm text-gray-400">20 MB</p>
                        </div>
                    </div>
                </div>
                <div className="w-full col-span-2 relative  m-auto p-0  rounded-0 text-start justify-center">
                    <h3 className="text-gray-400">Password</h3>
                    <p className="text-gray-400">blt0</p>
                </div>
                <div className="w-full col-span-2 relative  m-auto p-0  rounded-0 text-center justify-center">
                    <button className="btn-flag-submit hover:bg-blue-900 hover:text-white text-gray-400 font-bold py-2 px-4 border-none rounded">
                        Download File
                    </button>
                </div>
            </div>
            
        </>
    )
}


// total points for a scenario  
function sumPoints(questions){
    let sum = 0
    questions.forEach((question) => {
        sum = sum + question.points
    })
    return sum
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}



// calculate total obtained points
function getTotalObtainedPoints(questions){
    let sum = 0
    if(questions){
        questions.forEach((question) => {
            if(question.answers && question.answers.length !== 0){
                sum = sum + question.answers[0].obtainedPoints
            }
        })
    }
    return sum
}


// get total solved questions
function getTotalSolvedQuestions(questions){
    let sum = 0
    if(questions){
        questions.forEach((question) => {
            if(question.answers && question.answers.length !== 0){
                if(question.answers[0].submissionStatus === true){
                    sum = sum + 1
                }
            }
            
        })
    }
    return sum
}

function QuizInfoList({questions , scenario}){
    let totalObtainedPoints = getTotalObtainedPoints(questions)
    let totalPoints = sumPoints(questions)
    let totalSolvedQuestions = getTotalSolvedQuestions(questions)
    return (
        <>
            <div className="p-4 grid  grid-cols-8 gap-4 place-items-center justify-center  ">
                <div className="w-full col-span-2 relative  m-auto p-0  rounded-0">
                    <h3 className="text-gray-400">Points</h3>
                    <p className="text-orange-400">{totalObtainedPoints}/{totalPoints}</p>
                </div>
                <div className="w-full col-span-2 relative  m-auto p-0  rounded-0">
                    <h3 className="text-gray-400">Difficulty</h3>
                    <p className="text-orange-600">{capitalizeFirstLetter(scenario.difficulty)}</p>
                </div>
                <div className="w-full col-span-2 relative  m-auto p-0  rounded-0">
                    <h3 className="text-gray-400">Solves</h3>
                    <p className="text-green-600">{totalSolvedQuestions}/{questions?.length}</p>
                </div>
            </div>
            <hr className="my-1 h-1  opacity-100  border border-1 border-t-0 border-l-0 border-r-0 border-dashed bg-none" />
        </>
        
    )
}


function convertStringToArray(string){
    return string.split(",").map(item => item.trim())
}

// convert to uppercase first letter of each word   
function convertStringToTitleCase(string){
    return string.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function QuizTags({tags}){
    try {
        return (
            <>
                {
                    convertStringToArray(tags)?.map((tag, index) => {
                        return (
                            <span className="inline-block  rounded-full px-3   py-1 text-sm font-semibold bg-indigo-600 text-indigo-100 mr-2 my-2" key={index}>{convertStringToTitleCase(tag)}</span>
                        )
                    })
                }
            </>
        )
    } catch (error) {
        return ""
    }
}


function ScenarioDescription({scenario}){
    return (
        <>
            <div  className="block  p-6 theme-bg-color-2 rounded-lg shadow mb-5" data-aos="fade-down" data-aos-duration="1500" data-aos-delay="500">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">{scenario.name}</h5>
                <p className="font-normal text-white mb-2 text-md">
                    {scenario.desc}    
                </p>
            </div>
        </>
    )
}


// axios post request


function checkAnswerSubmissionStatus(answers){
    if(answers){
        if(answers.length !== 0){ 
            return answers[0].submissionStatus ? true : false
        } else{
            return false
        }
    } else{
        return false
    }
}


function getSubmitAnswer(answers){
    if(answers){
        if(answers.length !== 0){ 
            return answers[0].submitAnswer 
        } else{
            return false
        }
    } else{
        return false
    }
}


const SubmitBtn  = ({isSubmit , submitHandler}) => {
    return (
      <>
      {isSubmit ? 
      <button disabled type="button" className="btn-flag-submit block w-full  text-gray-400 font-bold  rounded py-3">
  <svg aria-hidden="true" role="status" className="inline w-5 h-5 mr-3 text-gray-200 animate-spin " viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
  </svg>

  </button> : <button className="btn-flag-submit block w-full  text-gray-400 font-bold  rounded py-3" onClick={submitHandler}>Submit</button> }
  </>
    )
  }

function AnswerInputWidget({changeHandler, submitHandler, sovled , isSubmit, submittedAnswer}){
    return (
        <>
            {sovled ? (
                <>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full  px-3 h-full ">
                            <p className=" block w-full btn-flag-submit text-gray-400   rounded py-3 px-4 mb-3 focus:outline-none focus:border-none focus:inset-0  focus:ring-0 focus:shadow-none shadow-none">
                                {submittedAnswer}
                            </p>
                        </div>
                        
                    </div>
                </>

            ) : (
                <>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-5/6 px-3 h-full">
                            <input className=" block w-full btn-flag-submit text-gray-400   rounded py-3 px-4 mb-3 focus:outline-none focus:border-none focus:inset-0  focus:ring-0 focus:shadow-none shadow-none" id="grid-first-name" type="text" placeholder="Format: Team 1 , Team 2" style={{"boxShadow": "inset 0 0px 0 #ddd"}}  autoComplete={"off"} onChange={(e) => changeHandler(e)} />
                        </div>
                        <div className="w-full md:w-1/6 px-3 h-full">
                            <SubmitBtn  isSubmit={isSubmit} submitHandler={submitHandler}/>

                        </div>
                    </div>
                </>

            )}
            
        </>
    )
}


import encrypt from "@/app/lib/encrypt"
import decrypt from "@/app/lib/decrypt"



// function to delay a time 
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

  
// single question component
function Question({question, index, team , quiz, user}){
    const [sovled, setSolved] = useState(checkAnswerSubmissionStatus(question.answers))
    const [isSubmit, setIsSubmit] = useState(false)
    const answer = useRef("")
    const [submitAnswer, setSubmitAnswer] = useState(getSubmitAnswer(question.answers))

    const submitHandler = () => {
        setIsSubmit(true)
        if(answer.current !== ""){

            
            setSubmitAnswer(answer.current)
            
            const encryptedData = encrypt({  
                answer: answer.current,
                question : question.id,
                team : team,
                quiz : quiz,
                user : user

            })
            axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/quiz/submit/answer`, {  encryptedData})
            .then(res => {
                
                const {...data } = decrypt(res.data.encryptedData)


                if(data.status === true){

                    if(data.result.submissionStatus === true){
                        delay(1000).then(() => {
                            toast.success(`Right Answer` )
                            setIsSubmit(false)
                            setSolved(data.result.submissionStatus)
                        })
                        
                    } else{
                        delay(1000).then(() => {
                            toast.error(`Wrong Answer` )
                            setIsSubmit(false)
                            setSolved(data.result.submissionStatus)
                        })   
                    }
                }
                else{
                    delay(1000).then(() => {
                        toast.error(`Sorry, can't be submitted. Please try again after some time.`)
                        setIsSubmit(false)
                        setSolved(false)
                    })
                }
            })
            .catch(error => {
                console.debug(error)
                delay(1000).then(() => {
                    setIsSubmit(false)
                    setSolved(false)
                })
            })
              
        }
        else{
            toast.error("Please enter a valid answer", answer.current)
            setSolved(false)
            setIsSubmit(false)
        }
    }
    const changeHandler = (e) => {
        answer.current = e.target.value
    }

    return (
        <>
            <div className="my-2">
                <h1 className="text-lg text-gray-400 mb-2">
                    {`Question ${index} ) ${question.Description}`}
                </h1>
                {
                    <AnswerInputWidget submitHandler={submitHandler} changeHandler={changeHandler}  sovled={sovled}  isSubmit={isSubmit} setIsSubmit={setIsSubmit}  submittedAnswer={submitAnswer} />
                }
                
            </div>
        </>
    )
}


function QuestionList({questions, team , quiz, user}){
    return (
        <>
            <div  className="block  p-6 bg-card-custom rounded-lg shadow " data-aos="fade-left" data-aos-duration="1500" data-aos-delay="500">
                <h5 className="mb-4 text-3xl font-bold tracking-tight text-gray-300 ">{"Challenge Submission"}</h5>
                {
                    questions&&  questions.map((question, index) => {    
                        return ( <Question key={index} question={question} team={team}  index={index+1} quiz={quiz} user={user} /> )
                    })
                }
            </div>
        </>
    )
}


function Details({scenario , questions}){
    return (
        <>
            <div  className="block  p-6 bg-card-custom rounded-lg shadow ">
            <h5 className="mb-2 text-3xl font-bold tracking-tight text-gray-300">{scenario.name}</h5>
            <p className="font-normal text-gray-400 mb-2 text-md">
                {scenario.desc}    
            </p>
            <QuizTags tags={scenario.tags}/>
            <QuizInfoList questions={questions}  scenario={scenario}/>
            <QuizFileInfo />
        </div>
        </>
    )
}






// import encrypt from "@/app/lib/encrypt"
// import decrypt from "@/app/lib/decrypt"


export default  function QuizDetails({params}){
    const { data: session } = useSession();    
    const [questions, setQuestions] = useState(null)
    const [scenario, setScenario] = useState(null)
    const [team, setTeam] = useState(null)
    const [quiz, setQuiz] = useState(null)
    const [totalPoints, setTotalPoints] = useState(0)
    useEffect(() => {
        AOS.init();
        if (session){
            // const {...data_user } = decrypt(session?.user.user) 
            axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${session?.user.id}/scenario/${params.slug}`)
            .then(res => {
                
                const {...data } = decrypt(res.data.encryptedData)


                if(data.status === true){
                    setQuestions(data?.questions?.team?.quiz?.questions)
                    if(data?.questions?.team?.quiz?.questions.length){
                        setScenario(data?.questions?.team?.quiz?.questions[0]?.scenario)
                        setTeam(data?.questions?.team?.id)
                        setQuiz(data?.questions?.team?.quiz?.id)
                    }
                }
                else{
                    toast.error(`${data.error}`)
                    setTotalChallenges(0)
                }
            })
            .catch(error => {
                console.debug(error)
            })
        }
    }, [])
    return (
        <>
            {questions && (
                <div className="p-4 grid  grid-cols-5 gap-4 items-start justify-center" >
                    <div className="w-full col-span-2 relative   p-0  rounded-0 " data-aos="fade-right" data-aos-duration="1500" data-aos-delay="500">
                        {scenario && <Details scenario={scenario} questions={questions}  /> } 
                    </div>
                    <div className="w-full col-span-3 relative   p-0  rounded-0">
                        {scenario &&  <ScenarioDescription scenario={scenario} /> } 
                        <QuestionList questions={questions} team={team} quiz={quiz} user={session.user.id} />
                    </div>
                </div>
            )}
        </>
    )
}