"use client"


// import { AiOutlineFileZip } from "react-icons/ai"
import axios from "axios";
// import { PiPasswordFill } from "react-icons/pi";
import { BiHide, BiShow } from "react-icons/bi";
import { toast } from "react-hot-toast";
import {   useEffect, useRef, useState } from "react";
import {  useSession } from "next-auth/react";
import AOS from 'aos';
import 'aos/dist/aos.css';

import { convertStringToArray , capitalizeFirstLetter , getDifficultyColor } from "@/app/lib/helpers"

// import { AiFillFile } from "react-icons/ai"
// import { FaKey } from "react-icons/fa"
// import { BsFillDatabaseFill } from "react-icons/bs"
import { IoCopyOutline } from "react-icons/io5"
// import ReactTooltip from 'react-tooltip';
import { Tooltip as ReactTooltip } from "react-tooltip";
import { FaFile } from "react-icons/fa"
import { FaTint } from "react-icons/fa"
// import  { FaCloud } from "react-icons/fa"

import Image from "next/image";
import { FaExclamationTriangle } from  "react-icons/fa"

// import Modal from './ReportingModal'

import encrypt from "@/app/lib/encrypt"
import { MdCloudDownload } from "react-icons/md";

import decrypt from "@/app/lib/decrypt"
import Link from "next/link";
import { FiSend } from "react-icons/fi";



// function to delay a time 
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function extractLastStrategyName(inputString) {
    const matches = inputString.match(/Format: ([^\)]*)/g);
    if (matches && matches.length > 0) {
        const lastMatch = matches[matches.length - 1];
        return lastMatch.replace("Format: ", "");
    } else {
        return "* * * * * * "; // No match found
    }
}

function findUserWithMostAnswersAndPoints(questionsData) {
    const userAnswerCounts = {};
    const userTotalPoints = {};
  
    questionsData.team.quiz.questions.forEach(question => {
      question.answers.forEach(answer => {
        const userName = answer.user.name;
        if (userAnswerCounts[userName]) {
          userAnswerCounts[userName]++;
          userTotalPoints[userName] += answer.obtainedPoints || 0;
        } else {
          userAnswerCounts[userName] = 1;
          userTotalPoints[userName] = answer.obtainedPoints || 0;
        }
      });
    });
  
    let mostAnswersUser = null;
    let mostAnswersCount = 0;
    let mostPointsUser = null;
    let mostPoints = 0;
  
    for (const user in userAnswerCounts) {
      if (userAnswerCounts[user] > mostAnswersCount) {
        mostAnswersUser = user;
        mostAnswersCount = userAnswerCounts[user];
      }
      if (userTotalPoints[user] > mostPoints) {
        mostPointsUser = user;
        mostPoints = userTotalPoints[user];
      }
    }
  
    return {
      mostAnswers: {
        user: mostAnswersUser,
        count: mostAnswersCount
      },
      mostPoints: {
        user: mostPointsUser,
        points: mostPoints
      }
    };
  }
  


function getUsersWithSubmissionTime(questionsData) {
  const userSubmissions = [];

  questionsData.forEach(question => {
    question.answers.forEach(answer => {
      const userName = answer.user.name;
      const submissionTime = answer.submittedAt;
      userSubmissions.push({
        user: userName,
        time: submissionTime
      });
    });
  });

  userSubmissions.sort((a, b) => new Date(b.time) - new Date(a.time));

  return userSubmissions;
}



  


  const FileSize = ({file}) => {
    const [fileSize, setFileSize] = useState(0);
    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/files/${file.id}`)
        .then(res => {
            const {...data } = decrypt(res.data.encryptedData)
            if(data.status === true){
                setFileSize(data.size)
            }
            else{
                setFileSize(0)
                toast.error(`${data.error}`)
            }
        }).catch(error => {
            setFileSize(0)
            toast.error(`Sorry! There is an error while fetching file info.Please try again later`)
        })
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className="ml-1  2xl:ml-4">
            <a className="font-medium text-gray-300 text-xs" href="">{file.filename}</a> 
            <div className="text-gray-400 text-xs">
                {fileSize}
            </div>
        </div>
    )
  }




const PasswordRow = ({password}) => {
const [showPassword, setShowPassword] = useState(false);
const handleTogglePassword = () => {
    setShowPassword(!showPassword);
};
return (
    <>
        <span className="text-white">
        {showPassword ? password : "********"}
        </span>
        <button
        className="text-white pl-2"
        onClick={handleTogglePassword}
        >
        {showPassword ? <BiHide /> : <BiShow />}
        </button>
    </>
)
}

// FileInformation
function QuizFileInfo({files}){
    
    return (
        <>
        
        {files && files.map((file, index) => (
            <div  key={file.id}>
                <div className="w-full border-t border-gray-200  border-dark-5 border-dashed mt-5"></div>
                <div className="flex items-center mt-5 justify-between">
                           <div className="flex items-center">
                            <div className="file">
                                    <a href="" className="w-12 file__icon file__icon--file">
                                        <FaFile  className="text-lg 2xl:text-3xl text-white"/>
                                    </a>
                                </div>
                                <FileSize  file={file} />
                           </div>
                                {file.password !== null && file.password.trim() !== "" && (
                                    <div className="ml-auto  2xl:ml-4">
                                        <a className="font-medium text-gray-300 text-xs" href="">Password</a> 
                                        <div className="text-gray-400 text-xs">
                                            <PasswordRow  password={file.password} />
                                        </div>
                                    </div>
                                )}
                                
                            
                            <div className="ml-auto  2xl:ml-4">
                                <Link  href={`${file.filepath}`}  className="w-full my-5 flex items-center justify-center bg-color-3  text-color-2 font-medium font-xs   py-1 px-2  text-xs 2xl:py-2 2xl:px-4   border-none rounded " target="_blank" rel="noopener noreferrer">
                                     {`Download File`} <MdCloudDownload size={20} className="ml-2 " />
                                </Link>
                            </div>
                </div>
                
            </div>
        ))}
        
        </>
    )
}



// calculate total obtained points
function getTotalObtainedPoints(questions){
    let sum = 0
    if(questions){
        questions.forEach((question) => {
            if(question.answers && question.answers.length !== 0){
                if(question.answers[0].submissionStatus === true){
                    sum = sum + question.answers[0].obtainedPoints
                }
                
            }
        })
    }
    return sum
}


// get total solved questions
// condition if scenario is a patch
function getTotalSolvedQuestions(questions , is_patch){
    let sum = 0
    if(questions){
        questions.forEach((question) => {
            if(question.answers && question.answers.length !== 0){
                if(question.answers[0].submissionStatus === true){
                    if(is_patch){
                        if(question.answers[0].checkStatus === false){
                            sum = sum + 1
                        }
                    } else {
                        sum = sum + 1
                    }
                }
            }
        })
    }
    return sum
}

function QuizInfoList({questions , scenario, team_name, firstBlood, firstBloodPoints , is_patch}){

    let totalObtainedPoints = getTotalObtainedPoints(questions)
    let totalSolvedQuestions = getTotalSolvedQuestions(questions , is_patch)


    // logic to handle first blood points to the team
    if(firstBlood && firstBlood === team_name.trim()){
        totalObtainedPoints = totalObtainedPoints + parseInt(firstBloodPoints)
    }

    return (
        <>
        <div className="intro-y flex relative  pt-16 sm:pt-6 items-center">

        <div className="absolute sm:relative -mt-12 sm:mt-0 w-full flex  text-gray-400 sm:text-sm text-xs ">
            
            <div className="intro-x sm:mr-3 ">
                <span className="font-medium text-gray-400 text-xs 2xl:text-sm ">{"Team Points"}</span>
                 <br />
                <span className="font-bold text-yellow-500 text-lg">{totalObtainedPoints}</span> 
                <br />
                
            </div>
            <div className="intro-x sm:mr-3 ml-auto">
                <span className="font-medium text-gray-400 text-xs 2xl:text-sm ">{"Solved Questions / Total"}</span>
                
                <br />
                <span className="font-bold text-color-2 text-lg">
                    {totalSolvedQuestions} / {questions?.length}
                </span> 
            </div>
            <div className="intro-x sm:mr-3 ml-auto">Difficulty<br />
                <span className={" text-xs 2xl:text-sm" +  getDifficultyColor(capitalizeFirstLetter(scenario.difficulty)) } >
                    {capitalizeFirstLetter(scenario.difficulty)}
                </span> 
            </div>
        </div>

        </div>
            { null &&  (<div className="p-4 grid  grid-cols-8 gap-4 place-items-center justify-center  ">
                <div className="w-full col-span-2 relative  m-auto p-0  rounded-0">
                    <h3 className="text-gray-400">Difficulty</h3>
                    <p className={ "px-0  "   +   getDifficultyColor(capitalizeFirstLetter(scenario.difficulty)) }>{capitalizeFirstLetter(scenario.difficulty)}</p>
                </div>
                <div className="w-full col-span-2 relative  m-auto p-0  rounded-0">
                    <h3 className="text-gray-400">OS</h3>
                    <p className="text-rose-600  font-bold py-1 text-xl">{"Windows/Linux"}</p>
                </div>
            </div>)}
        </>
        
    )
}




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


const SubmitBtn  = ({isSubmit , submitHandler , text="Submit"}) => {
    return (
      <>
      {isSubmit ? 
      <button disabled type="button" className="answer-submit-btn block w-full  text-white mt-2  h-full p-2 rounded">
  <svg aria-hidden="true" role="status" className="inline w-5 h-5 mr-3 text-gray-200 animate-spin " viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
  </svg>

  </button> : <button className="answer-submit-btn  w-full  text-white mt-2  h-full p-2 rounded flex items-center justify-center" onClick={submitHandler}>{text} <FiSend size={22} className="ml-2" /> </button> }
  </>
    )
  }

function AnswerInputWidget({changeHandler, submitHandler, sovled , isSubmit, submittedAnswer , format , is_patch , isCheckStatus}){
    return (
        <>
        {
            is_patch ? (
                isCheckStatus ? (
                    <div className="flex flex-wrap -mx-3 mt-2">
                        <div className="w-full  px-3 h-full">
                            <SubmitBtn  isSubmit={isSubmit} submitHandler={submitHandler} text={"Check Status"}/>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-wrap -mx-3 mt-2">
                        <div className="w-full  px-3 h-full ">
                            <p className="text-xl text-green-500 font-bold italic">
                                Solved
                            </p>
                        </div>
                    </div>
                )
                
            ) :  
            sovled ? (
                <div className="flex flex-wrap -mx-3 mt-2">
                    <div className="w-full  px-3 h-full ">
                        <p className="text-xl text-green-500 font-bold italic">
                            Solved
                        </p>
                    </div>
                </div>
            ) :
            <div className="flex flex-wrap -mx-3 mt-2">
                    <div className="w-full md:w-5/6 px-3 h-full">
                        <input className="custom-form-control" id="grid-first-name" type="text" placeholder={format} style={{"boxShadow": "inset 0 0px 0 #ddd"}}  autoComplete={"off"} onChange={(e) => changeHandler(e)} />
                    </div>
                    <div className="w-full md:w-1/6 px-3 h-full">
                        <SubmitBtn  isSubmit={isSubmit} submitHandler={submitHandler}/>
                    </div>
            </div>    
        }
        </>
    )
}







  
// single question component
function Question({question, index, team , quiz, user , setQuestions , params , setTopUser , setRecentSolves, setFirstBlood , is_patch, setFirstBloodPoints, isCheckStatus, setIsCheckStatus}){
    const [sovled, setSolved] = useState(checkAnswerSubmissionStatus(question.answers))
    const [isSubmit, setIsSubmit] = useState(false)
    const answer = useRef("")
    const [submitAnswer, setSubmitAnswer] = useState(getSubmitAnswer(question.answers))

    // console.debug(question)

    const submitHandler = () => {
        setIsSubmit(true)

        if(is_patch){
            answer.current = "false"
        }

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

                // console.debug(data)
                if(data.status === true){

                    if(data.result.submissionStatus === true){
                        delay(1000).then(() => {
                            if(!is_patch){
                                toast.success(`Right Answer` )
                            } else {
                                if(data?.result?.checkStatus){
                                    toast.error(`${data?.message}` )
                                } else{
                                    toast.success(`${data?.message}` )
                                }
                            }
                            setIsSubmit(false)
                            setSolved(data.result.submissionStatus)
                            axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${user}/scenario/${params.slug}`)
                            .then(res => {
                                const {...data_2 } = decrypt(res.data.encryptedData)
                                if(data_2.status === true){
                                    setQuestions(data_2?.questions?.team?.quiz?.questions)
                                    setTopUser(findUserWithMostAnswersAndPoints(data_2?.questions))
                                    setRecentSolves(getUsersWithSubmissionTime(data_2?.questions?.team?.quiz?.questions))
                                    let first_blood = data_2?.questions?.team?.quiz?.questions[0]?.scenario?.first_blood;
                                    first_blood !== null ? first_blood.trim() !== "" ? setFirstBlood(first_blood) : setFirstBlood(null) : setFirstBlood(null)
                                    setIsCheckStatus(data_2?.questions?.team?.quiz?.questions[0]?.answers[0]?.checkStatus)
                                    setFirstBloodPoints(data_2?.questions?.team?.quiz?.questions[0]?.scenario?.first_blood_points)
                                }
                                else{
                                    toast.error(`${data_2.error}`)
                                }
                            }).catch(error => {
                                console.debug(error)
                            })
                        })
                        
                    } else{
                        delay(1000).then(() => {
                            if(is_patch){
                                toast.error(`${data?.message}` )
                            } else {
                                toast.error(`Wrong Answer` )
                            }
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
            <div className="mt-6 text-sm 2xl:text-base text-color-10">
                <label>
                    {`Question ${index} ) ${question.Description}`} <span className="text-xs text-gray-500 ml-2 italic">({question.points} points)</span>
                </label>
                {
                    <AnswerInputWidget submitHandler={submitHandler} changeHandler={changeHandler}  sovled={sovled}  isSubmit={isSubmit} setIsSubmit={setIsSubmit}  submittedAnswer={submitAnswer}  format={extractLastStrategyName(question.Description)} is_patch={is_patch} isCheckStatus={isCheckStatus}  />
                }
                
            </div>
        </>
    )
}


function QuestionList({questions, team , quiz, user , setQuestions , params , setTopUser , setRecentSolves, setFirstBlood, is_patch, setFirstBloodPoints, isCheckStatus , setIsCheckStatus}){
    return (
        <>
            <div  className="  p-5 bg-color-1 rounded-lg shadow " data-aos="fade-left" data-aos-duration="1500" data-aos-delay="500">
                <h2 className="text-xl font-medium mr-auto text-color-6">{"Challenge Submission"}</h2>
                {
                    questions&&  questions.map((question, index) => {    
                        return ( <Question key={index} question={question} setTopUser={setTopUser} team={team}  index={index+1} quiz={quiz} user={user}  setQuestions={setQuestions} params={params} setRecentSolves={setRecentSolves} setFirstBlood={setFirstBlood} 
                            setFirstBloodPoints={setFirstBloodPoints}
                            is_patch={is_patch} isCheckStatus={isCheckStatus} setIsCheckStatus={setIsCheckStatus} /> )
                    })
                }
            </div>
        </>
    )
}




function BestTeamMember({top_user ,team_name , firstBloodPoints}){
    return (
        <>
            <div className="w-full border-t  border-dark-5 border-dashed mt-5"></div>
            <div className="flex justify-between  items-center">
                <div className="w-1/2 mt-3">
                    <div className="intro-x flex items-center h-10">
                        <h2 className="text-base font-bold truncate mr-5 text-red-700 flex  justify-start items-center">
                            <FaTint  />
                            First Blood
                        </h2>
                    </div>
                    <div className="mt-1 ">
                        <a href="#!">
                            <div className="intro-x">
                                <div className=" mb-3 flex items-center zoom-in">
                                    <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                                        <Image  width={"100"}  height={"100"} alt="image" className="rounded-full  ml-3 ml-auto" src="/assets/img/hacker.svg" />
                                    </div>
                                    <div className="ml-4 ">
                                    </div>
                                    <div className="text-gray-300 text-lg font-bold">{team_name}</div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}





function Details({scenario , questions , top_user , team_name , recentSolves, setFirstBlood, firstBlood , firstBloodPoints , is_patch}){
    return (
        <>
            <div  className="block  p-6 bg-color-1 rounded-lg shadow ">
                <h5 className="block font-medium text-2xl text-color-6">{scenario.name}</h5>
                <p className=" text-color-10 mt-3  text-base ">
                    {scenario.desc}    
                </p>
                <QuizInfoList questions={questions}  scenario={scenario} team_name={team_name} firstBlood={firstBlood} firstBloodPoints={firstBloodPoints} is_patch={is_patch} />
                {scenario?.files?.length ? ( <QuizFileInfo  files={scenario?.files}/> ) : null }
                {firstBlood && <BestTeamMember top_user={top_user} team_name={firstBlood} firstBloodPoints={firstBloodPoints} />}
            </div>
        </>
    )
}




function QuizLoad({params, userID}){  
    const [questions, setQuestions] = useState(null)
    const [scenario, setScenario] = useState(null)
    const [team, setTeam] = useState(null)
    const [quiz, setQuiz] = useState(null)
    const [topUser, setTopUser] = useState(null)
    const [teamName, setTeamName] = useState(null)
    const [recentSolves, setRecentSolves] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [firstBlood, setFirstBlood] = useState(null)
    const [firstBloodPoints, setFirstBloodPoints] = useState(null)
    const [is_patch, setIsPatch] = useState(false)
    const [isCheckStatus, setIsCheckStatus] = useState(false)
    

    useEffect(() => {
        if(showModal){
            document.documentElement.style.overflow = "hidden";
        } else{
            document.documentElement.style.overflow = "auto";
        }
    }, [showModal])
    
    useEffect(() => {
        AOS.init();
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${userID}/scenario/${params.slug}`)
        .then(res => {
            const {...data } = decrypt(res.data.encryptedData)
            if(data?.status === true){
                setQuestions(data?.questions?.team?.quiz?.questions)
                if(data?.questions?.team?.quiz?.questions.length){
                    setScenario(data?.questions?.team?.quiz?.questions[0]?.scenario)
                    setTeam(data?.questions?.team?.id)
                    setTeamName(data?.questions?.team?.name)
                    setQuiz(data?.questions?.team?.quiz?.id)
                    setTopUser(findUserWithMostAnswersAndPoints(data?.questions))
                    setRecentSolves(getUsersWithSubmissionTime(data?.questions?.team?.quiz?.questions))
                    let first_blood = data?.questions?.team?.quiz?.questions[0]?.scenario?.first_blood;
                    first_blood !== null ? first_blood.trim() !== "" ? setFirstBlood(first_blood) : setFirstBlood(null) : setFirstBlood(null)
                    setIsPatch(data?.questions?.team?.quiz?.questions[0]?.scenario?.is_patch)
                    let check_status = data?.questions?.team?.quiz?.questions[0]?.answers[0]?.checkStatus;
                    check_status === null || check_status === undefined ? setIsCheckStatus(true) : setIsCheckStatus(check_status)
                    setFirstBloodPoints(data?.questions?.team?.quiz?.questions[0]?.scenario?.first_blood_points || 0)
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
        {questions && (
                <div className="p-2 grid  grid-cols-6 gap-4 items-start justify-center" >
                    <div className="w-full col-span-2 relative   p-0  rounded-0 " data-aos="fade-right" data-aos-duration="700" data-aos-delay="500">
                        {scenario && <Details scenario={scenario} questions={questions} top_user={topUser}  team_name={teamName} recentSolves={recentSolves} setFirstBlood={setFirstBlood} firstBlood={firstBlood} firstBloodPoints={firstBloodPoints} is_patch={is_patch} /> } 
                    </div>
                    <div className="w-full col-span-4 relative   p-0  rounded-0">
                        <QuestionList questions={questions} team={team} quiz={quiz} user={userID} setQuestions={setQuestions} setTopUser={setTopUser} params={params} setRecentSolves={setRecentSolves} setFirstBlood={setFirstBlood} is_patch={is_patch} setFirstBloodPoints={setFirstBloodPoints} isCheckStatus={isCheckStatus} setIsCheckStatus={setIsCheckStatus} />
                    </div>
                </div>
        )}
        </>
    )
}

export default  function QuizDetails({params}){
    const { data: session } = useSession();  
    return (
        <>
            {session && <QuizLoad params={params} userID={session?.user.id} />}
        </>
    )
}