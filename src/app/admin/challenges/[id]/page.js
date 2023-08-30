"use client"


import axios from "axios";
import { toast } from "react-hot-toast";
import {  use, useEffect, useRef, useState } from "react";
import CustomToaster from "@/app/components/CustomToaster"
import AOS from 'aos';
import 'aos/dist/aos.css';
import decrypt from "@/app/lib/decrypt"
import { convertStringToArray , capitalizeFirstLetter , getDifficultyColor , convertStringToTitleCase , totalScenarioPoints ,extractLastStrategyName } from "@/app/lib/helpers"
import SVGLoader from "@/app/components/SVGLoader";
import Link from "next/link";
import { FaFile } from "react-icons/fa";
import encrypt from "@/app/lib/encrypt"
import  {FaRegEdit}  from "react-icons/fa"
import { MdModeEdit } from "react-icons/md"
import { IoMdClose } from "react-icons/io"



// delay function
const delay = ms => new Promise(res => setTimeout(res, ms));


function AnswerComponent({question , index}){
    const answer = useRef(null)
    const [isSubmit, setIsSubmit] = useState(false)
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState("");
    const desc = useRef(null)
    const points = useRef(null)

    const options = [
        { value: 1, label: '1' },
        { value: 2, label: '2' },
        { value: 3, label: '3' },
        { value: 4, label: '4' },
        { value: 5, label: '5' },
        { value: 6, label: '6' },
        { value: 7, label: '7' },
        { value: 8, label: '8' },
        { value: 9, label: '9' },
        { value: 10, label: '10' },
    ];

    const [selectedOption, setSelectedOption] = useState(0);

    useEffect(() => {
        answer.current = question.original_answer
        desc.current = question.Description
        setEditedText(question.Description)
        setSelectedOption(parseInt(question.points))
        points.current = parseInt(question.points).toString()
    }, [])

    const updateQuestionHandler = (questionID) => {
        setIsSubmit(true)
        if(desc.current === "" || desc.current === null){
            toast.error("Description cannot be empty")
            setIsSubmit(false)
            return
        } else  if(answer.current === "" || answer.current === null){
            toast.error("Answer cannot be empty")
            setIsSubmit(false)
            return
        }
        const encryptedData = encrypt({
            "desc" : desc.current,
            "answer" : answer.current,
            "points" : points.current
        })
        axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/question/${questionID}`, {
            encryptedData
        })
        .then(res => {
            const {...data} = decrypt(res.data.encryptedData)
            if(data.status === true){
                toast.success("Question has been updated successfully")
                
            } else{
                toast.error("Sorry! There is an error while updating. Please try again later")
            }
        })
        .catch(error => {
            console.debug(error)
            toast.error(`Sorry! There is an error while updating. Please try again later`)
        }).finally(() => {
            delay(1000).then(() => {
                setIsSubmit(false)
                setIsEditing(false)
            })
        })
    }

    const handleDescriptionChange = (e) => {
        e.preventDefault()
        setEditedText(e.target.value)
        desc.current = e.target.value
    }


    const handleCancelUpdate = () => {
        setIsEditing(false)
        setEditedText(question.Description)
    }
    
    const handleSelectChange = (event, questionID) => {
        setSelectedOption(event.target.value);
        points.current = event.target.value
        updateQuestionHandler(questionID)
    };
    

    return (
        <>
            {question && (
                <div className="mt-6 text-lg text-gray-300" >
                    {isEditing ? (
                        <>
                        <div className="flex flex-wrap -mx-3 mt-2 items-end">
                            <div className="px-3 h-full  w-10/12">
                                <textarea  value={editedText} onChange={handleDescriptionChange} className=" w-full   placeholder-gray-400 outline-0  border border-2 border-deep-blue-violet focus:border focus:border-2 focus:border-blue-900  text-white     p-3 px-4  m-0 mt-2 text-base block bg-deep-indigo  rounded-md shadow-sm" spellCheck={"false"} rows={"6"}></textarea>
                            </div>
                            
                            <div className="w-1/6 px-3 h-full">
                                {isSubmit ? 
                                    <SVGLoader text={"  "} className="bg-dark-navy-blue block w-full  text-white mt-2  h-full p-2 rounded" /> : (
                                        <div>
                                            <button className="bg-dark-navy-blue block w-full  text-white mt-2  h-full p-2 rounded"  onClick={() => updateQuestionHandler(question.id)} >Update </button> 
                                            <button className="bg-dark-navy-blue block w-full  text-white mt-2  h-full p-2 rounded"  onClick={handleCancelUpdate}  >Cancel </button> 
                                            
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        </>
                    ) : (

                        <>
                        <label className="flex inline-flex items-start">
                            <button>
                                <FaRegEdit className="mr-2 text-deep-blue"  size={23} onClick={() => setIsEditing(true)} /> 
                            </button>
                            <p >
                                <span>
                                    {`Question ${index+1} )`} {` ${editedText}`} <select  className="appearance-none placeholder-gray-400 outline-0  border border-2 border-deep-blue-violet focus:border focus:border-2 focus:border-blue-900  text-sm text-yellow-400 italic   px-2  m-0  text-base inline-block bg-deep-indigo  rounded-md shadow-sm" defaultValue={points.current}
                                    onChange={(e) => handleSelectChange(e, question.id)}
                                    >
                                    <option  value={selectedOption}   >
                                            {selectedOption + " Points"}
                                    </option>

                                    {options.map(option => (
                                        selectedOption == option.value ?  null  : 
                                        (
                                            <option key={option.value} value={option.value}   >
                                                {option.label}
                                            </option>
                                        )
                                    ))}
                                    
                                </select>
                                </span>
                                
                            </p> 
                        </label>
                        <div className="flex flex-wrap -mx-3 mt-2">
                            <div className="  w-5/6 px-3 h-full">
                                <input className=" placeholder-gray-400 outline-0  border border-2 border-deep-indigo focus:border focus:border-2 focus:border-blue-900  text-white    w-full p-2 px-4  m-0 mt-2 text-base block bg-deep-indigo  rounded-md shadow-sm"  type="text" placeholder={extractLastStrategyName(question.Description)} style={{"boxShadow": "inset 0 0px 0 #ddd"}}  autoComplete={"off"}  defaultValue={question.original_answer}  onChange={(e) => (answer.current = e.target.value)} />
                            </div>
                            <div className="w-1/6 px-3 h-full">
                                {isSubmit ? 
                                    <SVGLoader text={"  "} className="bg-dark-navy-blue block w-full  text-white mt-2  h-full p-2 rounded" /> : <button className="bg-dark-navy-blue block w-full  text-white mt-2  h-full p-2 rounded"  onClick={() => updateQuestionHandler(question.id)} >Update </button> 
                                }
                            </div>
                        </div>
                        </>
                    )}
                </div>
            )}
        </>
    )
}


export default function Page({ params }){
    const [scenario, setScenario] = useState(null)
    const [totalPoints, setTotalPoints] = useState(0) 
    const [fileSizes, setFileSizes] = useState([])

    // const [showNameUpdateIcon, setShowNameUpdateIcon] = useState(false)

    const [challengeName, setChallengeName] = useState("")

    const DateFetch = () => {
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/scenario/${params.id}`)
        .then(res => {
            const {...data } = decrypt(res.data.encryptedData)
            if(data.status === true){
                setScenario(data?.result)
                setChallengeName(data?.result?.name)
                setTotalPoints(totalScenarioPoints(data?.result))
                setFileSizes(data?.fileSizes)
            } else{
                toast.error(`${data.error}`)
                setChallengeName("")
                setScenario(null)
                setFileSizes([])
            }
        })
        .catch(error => {
            console.debug(error)
        })
    }


    useEffect(() => {
        AOS.init();
        DateFetch()
        
    }, [])

    const handleChallengeNameChange = (e) => {
        e.preventDefault()
        setChallengeName(e.target.value)
    }

    const updateName = (e) => {
        e.preventDefault()
        // console.debug("update Name : " , challengeName)

        // setShowNameUpdateIcon(true)
        const encryptedData = encrypt({
            "name" : challengeName
        })
        axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/scenario/${params.id}`, {
            encryptedData
        })
        .then(res => {
            const {...data } = decrypt(res.data.encryptedData)
            if(data.status === true){
                toast.success("Challenge name has been updated successfully")
                // setShowNameUpdateIcon(false)
                DateFetch()
            } else{
                toast.error(`${data.error}`)
            }
        })
        .catch(error => {
            console.debug(error)
            toast.error(`Sorry! There is an error while updating challenge.Please try again later.`)
        })
    }

    const cancelUpdate = (e) => {
        console.debug("cencel update name")
        e.preventDefault()
        // setShowNameUpdateIcon(false)
        setChallengeName(scenario.name)
    }
    
    
    return (
        <>
            <CustomToaster />
            <div className="p-2 grid  grid-cols-6 gap-4 items-start justify-center" >
            {scenario && (
                <>
                    {/* Left Side */}
                    <div className="w-full col-span-2 relative   p-0  rounded-0 " data-aos="fade-right" data-aos-duration="700" data-aos-delay="500">
                        <div  className="block  p-6 bg-deep-blue-violet rounded-lg shadow ">
                            <div className="relative " 
                                >
                                <input
                                    type="text"
                                    placeholder="Challenge Title"
                                    className="placeholder-columbia-blue outline-0  border border-2 border-transparent focus:border focus:border-2 focus:border-blue-900  bg-deep-indigo text-white  focus:text-blue-600 pl-2   w-full  pl-0  py-2 mt-2 pr-20 mr-0 mb-0 ml-0 text-3xl block bg-deep-blue-violet  rounded-md flex justify-between items-center"
                                    value={challengeName}
                                    onChange={(e) => handleChallengeNameChange(e)}
                                    
                                    
                                />
                                <div >
                                    <button
                                        type="button"
                                        className="w-4 h-4 absolute inset-y-0 mt-5 mb-auto mr-4  right-0 text-white"
                                        style={{"zIndex": "9999"}}
                                        onClick={(e) => updateName(e)}
                                        
                                        >
                                            <MdModeEdit className="h-5 w-5 text-green-500  z-50"   />
                                    </button>
                                    <button
                                        type="button"
                                        className="w-5 h-5 absolute inset-y-0 mt-5 mb-auto mr-12  right-0 text-white"
                                        onClick={(e) => cancelUpdate(e)}
                                        style={{"zIndex": "9999"}}
                                        
                                        >
                                            <IoMdClose className="h-5 w-5 text-red-500 z-50"   />
                                    </button>
                                </div>
                                
                            </div>
                                {/* <h5 className="block font-medium text-3xl text-blue-600">{scenario.name}</h5> */}
                                
                                <p className=" text-gray-300 mt-2 text-lg">
                                    {scenario.desc}    
                                </p>
                                <div className="mt-5">
                                    {
                                        convertStringToArray(scenario.tags)?.map((tag, index) => {
                                            return (
                                                <span className="px-2 py-1 rounded-full bg-deep-blue text-white mr-1 font-sm " key={index}>{convertStringToTitleCase(tag)}</span>
                                            )
                                        })
                                    }
                                </div>
                                <div className="intro-y flex relative  pt-16 sm:pt-6 items-center">
            
                        <div className="absolute sm:relative -mt-12 sm:mt-0 w-full flex  text-gray-400 text-xs sm:text-sm">
                            
                            <div className="intro-x sm:mr-3 ">
                                <span className="font-medium text-gray-400  ">{"Total Points"}</span>
                                <br />
                                <span className="font-bold text-yellow-500 text-lg">{totalPoints}</span> 
                                <br />
                                
                            </div>
                            <div className="intro-x sm:mr-3 ml-auto">
                                <span className="font-medium text-gray-400  ">{"Total Questions"}</span>
                                
                                <br />
                                <span className="font-bold text-emerald-500 text-lg">
                                    {scenario?.questions?.length}
                                </span> 
                            </div>
                            <div className="intro-x sm:mr-3 ml-auto">Difficulty<br />
                                <span className={" text-sm " +  getDifficultyColor(capitalizeFirstLetter(scenario.difficulty)) } >
                                    {capitalizeFirstLetter(scenario.difficulty)}
                                </span> 
                            </div>
                            
                            <div className="intro-x sm:mr-3 ml-auto">OS<br />
                                <span className="text-sm  text-emerald-500 py-1 ">
                                    {scenario.os_type}
                                </span> 
                            </div>
                        </div>
            
                                </div>
                                {(scenario?.files && scenario?.files?.length ) && scenario?.files.map((file, index) => (
                                    <div  key={file.id}>
                                        <div className="w-full border-t border-gray-200  border-dark-5 border-dashed mt-5"></div>
                                        <div className="flex items-center mt-5">
                                                    <div className="file">
                                                        <a href="" className="w-12 file__icon file__icon--file">
                                                            <FaFile  className="text-3xl text-white"/>
                                                        </a>
                                                    </div>
                                                    {/* File Sizes */}
                                                    <div className="ml-4">
                                                        <a className="font-medium text-gray-300" href="">{file.filename}</a> 
                                                        <div className="text-gray-400 text-xs">
                                                            {fileSizes[index]}
                                                        </div>
                                                    </div>

                                                    <div className="ml-auto">
                                                        <a className="font-medium text-gray-300" href="">Password</a> 
                                                        <div className="text-gray-400 text-xs">
                                                            {file.password}
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="ml-auto">
                                                        <Link  href={`${file.filepath}`}  className="w-full my-5 block bg-dark-navy-blue  text-white font-medium font-xs py-2 px-4 border-none rounded" target="_blank" rel="noopener noreferrer">
                                                            Download File
                                                        </Link>
                                                    </div>
                                        </div>
                                    </div>
                                ))}
                                
                                
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="w-full col-span-4 relative   p-0  rounded-0">
                        {/* Top Header Challenge details */}
                        <div className="rounded-md px-5 py-4 mb-2 bg-deep-blue text-white mb-5" data-aos="fade-up" data-aos-duration="700" data-aos-delay="500">
                                <div className="flex items-center">
                                    <div className="font-medium text-lg">Scenario</div>
                                    <div className="text-xs bg-white px-1 rounded-md text-gray-800 ml-auto">{scenario.name}</div>
                                </div>
                                <div className="mt-3 text-base">
                                    {scenario.desc} 

                                </div>
                        </div>

                        {/* Questions List */}
                        <div  className="  p-5 bg-deep-blue-violet rounded-lg shadow " data-aos="fade-left" data-aos-duration="1500" data-aos-delay="500">
                            <h2 className="text-xl font-medium mr-auto text-gray-300">{"Challenge Submission"}</h2>
                            {
                                (scenario?.questions && scenario?.questions.length) &&  scenario?.questions.map((question, index) =>    
                                    (
                                        <>
                                            <AnswerComponent question={question} key={index} index={index} />
                                        </>
                                    )
                                )
                            }
                        </div>
                    </div>
                </>

            )}
            </div>
        </>

    )
}



