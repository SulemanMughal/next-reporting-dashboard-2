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
import { el } from "date-fns/locale";
import { BiHide, BiShow } from "react-icons/bi";
import { MdCloudDownload } from "react-icons/md";

// delay function
const delay = ms => new Promise(res => setTimeout(res, ms));

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
                                <textarea  value={editedText} onChange={handleDescriptionChange} className=" w-full   placeholder-gray-400 outline-0  border border-2 border-deep-blue-violet focus:border focus:border-2 focus:border-blue-900  text-white     p-3 px-4  m-0 mt-2 text-base block bg-color-3 rounded-md shadow-sm" spellCheck={"false"} rows={"6"}></textarea>
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
                                <FaRegEdit className="mr-2 " style={{
                                    color : "var(--color-2)"
                                }}  size={23} onClick={() => setIsEditing(true)} /> 
                            </button>
                            <p >
                                <span className=" text-sm 2xl:text-base">
                                    {`Question ${index+1} )`} {` ${editedText}`} <select  className="appearance-none placeholder-gray-400 outline-0  border border-2 border-color-1 focus:border focus:border-2 focus:border-blue-900  text-sm text-yellow-400 italic   px-2  m-0   inline-block bg-color-1  rounded-md shadow-sm" defaultValue={points.current}
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
                                <input className=" placeholder-gray-400 outline-0  border border-2 border-color-1 focus:border focus:border-2 focus:border-blue-900  text-white    w-full p-2 px-4  m-0 mt-2 text-base block bg-color-1  rounded-md shadow-sm"  type="text" placeholder={extractLastStrategyName(question.Description)} style={{"boxShadow": "inset 0 0px 0 #ddd"}}  autoComplete={"off"}  defaultValue={question.original_answer}  onChange={(e) => (answer.current = e.target.value)} />
                            </div>
                            <div className="w-1/6 px-3 h-full">
                                {isSubmit ? 
                                    <SVGLoader text={"  "} className="bg-color-1  block w-full  text-white mt-2  h-full p-2 rounded" /> : <button className="bg-color-1 block w-full  text-white mt-2  h-full p-2 rounded"  onClick={() => updateQuestionHandler(question.id)} >Update </button> 
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
    const [challengeName, setChallengeName] = useState("")
    const [challengeDesc, setChallengeDesc] = useState("")
    // const [tags, setTags] = useState(null)

    let tagsArray = useRef([])

    const DateFetch = () => {
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/scenario/${params.id}`)
        .then(res => {
            const {...data } = decrypt(res.data.encryptedData)
            if(data.status === true){
                setScenario(data?.result)
                setChallengeDesc(data?.result?.desc)
                setChallengeName(data?.result?.name)
                setTotalPoints(totalScenarioPoints(data?.result))
                setFileSizes(data?.fileSizes)
                // setTags(convertStringToArray(data?.result?.tags))
                tagsArray.current = convertStringToArray(data?.result?.tags)
            } else{
                toast.error(`${data.error}`)
                setChallengeName("")
                setScenario(null)
                setFileSizes([])
                // setTags([])
                tagsArray.current= []
            }
        })
        .catch(error => {
            console.debug(error)
        })
    }


    const UpdateData = () => {

        // console.debug("Siubmissoin")

        if(challengeName === "" || challengeName === null){
            toast.error("Challenge name cannot be empty")
            return
        } else if(challengeName.length < 3){
            toast.error("Challenge name must be atleast 3 characters long")
            return
        } else if(challengeName.length > 50){  
            toast.error("Challenge name must be less than 50 characters long")
            return
        } else if(challengeDesc === "" || challengeDesc === null){
            toast.error("Challenge description cannot be empty")
            return
        } else if(challengeDesc.length < 3){
            toast.error("Challenge description must be atleast 3 characters long")
            return
        } else if(challengeDesc.length > 500){
            toast.error("Challenge description must be less than 500 characters long")
            return
        }
        const encryptedData = encrypt({
            "name" : challengeName,
            "desc" : challengeDesc,
            "tags" : tagsArray.current.join(', ')
        })
        axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/scenario/${params.id}`, {
            encryptedData
        })
        .then(res => {
            const {...data_2 } = decrypt(res.data.encryptedData)
            if(data_2?.status === true){
                toast.success("Challenge name has been updated successfully")
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
        UpdateData()
        
    }

    const cancelUpdate = (e) => {
        console.debug("cencel update name")
        e.preventDefault()
        setChallengeName(scenario.name)
    }


    const handleChallengeDescChange = (e) => {
        e.preventDefault()
        setChallengeDesc(e.target.value)
    }

    const updateDesc = (e) => {
        e.preventDefault()
        UpdateData()
    }

    const cancelDescUpdate = (e) => {
        e.preventDefault()
        setChallengeDesc(scenario.desc)
    }


    // delay functoin
    const delay = ms => new Promise(res => setTimeout(res, ms));


    // function removeValue(value, index, arr) {
    //     // If the value at the current array index matches the specified value (2)
    //     if (value === 2) {
    //     // Removes the value from the original array
    //         arr.splice(index, 1);
    //         return true;
    //     }
    //     return false;
    // }


    const removeTag = (event, tagToRemove) => {
        // console.debug(tags => tags.filter(tag => tag !== tagToRemove))
        // // setTags(tags => tags.filter(tag => tag !== tagToRemove));
        // console.debug(tags)

        // tags.removeValue(tagToRemove)
        // console.debug(tags)
        // tags = 

        // console.debug(tagToRemove)

        // console.debug(tags.filter(item => item !== tagToRemove))
        // tags = tags.filter(item => item !== tagToRemove)
        // setTags(newArray);
        tagsArray.current = tagsArray.current.filter(item => item !== tagToRemove)
        // console.debug(tagsArray.current)
        UpdateData()

        // console.debug(tags)

      };

    // const removeTag = ( event,tag) => {
    //     event.preventDefault()
        
    //     // console.debug("remove tag", tags , tag)
    //     // const newArray  = tags.filter(item => (item !== tag))

    //     // // console.debug(newArray)

    //     // // console.debug(tags.filter(item => item.trim().toLowerCase() !== tag.trim().toLowerCase()))
        
        
    //     // // UpdateData()
    //     // setTags(newArray)

    //     // // setTags(newArray)


    //     // console.debug(tags)

    //     console.debug((tags => tags.filter(item => item !== tag)))
    //     // setTags(tags => tags.filter(item => item !== tag));
    //     // UpdateData()

        
    //     // delay(1000).then(() => {
            
    //     //     console.debug(tags)
    //     // })
        
    //     // const encryptedData = encrypt({
    //     //     "name" : challengeName,
    //     //     "desc" : challengeDesc,
    //     //     "tags" : tags.join(', ')
    //     // })
        
        

    // }
    
    
    return (
        <>
            <CustomToaster />
            <div className="p-2 grid  grid-cols-6 gap-4 items-start justify-center" >
            {scenario && (
                <>
                    {/* Left Side */}
                    <div className="w-full col-span-2 relative   p-0  rounded-0 " data-aos="fade-right" data-aos-duration="700" data-aos-delay="500">
                        <div  className="block  p-6 bg-color-1 rounded-lg shadow ">
                            <div className="relative " 
                                >
                                <input
                                    type="text"
                                    placeholder="Challenge Title"
                                    className="placeholder-columbia-blue outline-0  border border-2 border-transparent focus:border focus:border-2 focus:border-blue-900  bg-deep-indigo text-white  focus:text-blue-600 pl-2   w-full  pl-0  py-2 mt-2 pr-20 mr-0 mb-0 ml-0 text-3xl block bg-color-3  rounded-md flex justify-between items-center"
                                    value={challengeName}
                                    onChange={(e) => handleChallengeNameChange(e)}
                                    
                                    
                                />
                                <div >
                                    <button
                                        type="button"
                                        className="w-4 h-4 absolute inset-y-0 mt-5 mb-auto mr-4  right-0 text-white transition ease-in-out delay-75  hover:scale-150  duration-300"
                                        style={{"zIndex": "9999"}}
                                        onClick={(e) => updateName(e)}
                                        
                                        >
                                            <MdModeEdit className="h-5 w-5 text-green-500  z-50"   />
                                    </button>
                                    <button
                                        type="button"
                                        className="w-5 h-5 absolute inset-y-0 mt-5 mb-auto mr-12  right-0 text-white  transition ease-in-out delay-75  hover:scale-150  duration-300"
                                        onClick={(e) => cancelUpdate(e)}
                                        style={{"zIndex": "9999"}}
                                        
                                        >
                                            <IoMdClose className="h-5 w-5 text-red-500 z-50"   />
                                    </button>
                                </div>
                                
                            </div>
                                {/* <h5 className="block font-medium text-3xl text-blue-600">{scenario.name}</h5> */}
                                
                                
                                <div className="relative">
                                <textarea  
                                    value={challengeDesc} 
                                    onChange={(e) => handleChallengeDescChange(e)} 
                                    className=" w-full   placeholder-gray-400 outline-0  border border-2 border-color-1 focus:border focus:border-2 focus:border-color-3  text-white focus:text-blue-600    p-3 px-4 pr-12  m-0 mt-2 text-base block focus:bg-deep-indigo  bg-color-3  rounded-md shadow-sm focus:overflow-y-auto" spellCheck={"false"} rows={"10"}></textarea>
                                    <div className="flex flex-wrap">
                                        <button 
                                        onClick={(e) => updateDesc(e)}
                                        className="absolute top-2 right-2 w-4 h-4 absolute inset-y-0 mt-5 mb-auto mr-4  right-0 text-white transition ease-in-out delay-75  hover:scale-150  duration-300" 
                                        
                                        >
                                            <MdModeEdit className="h-5 w-5 text-green-500  z-50"   />
                                        </button>
                                        <button 
                                            onClick={(e) => cancelDescUpdate(e)}
                                        className="absolute top-10 right-2 w-4 h-4 absolute inset-y-0 mt-5 mb-auto mr-4  right-0 text-white transition ease-in-out delay-75  hover:scale-150  duration-300">
                                            <IoMdClose className="h-5 w-5 text-red-500 z-50"   />
                                        </button>
                                    </div>
                                </div>

                                {/* <p className=" text-gray-300 mt-2 text-lg">
                                    {scenario.desc}    
                                </p> */}
                                {tagsArray.current && tagsArray.current.length > 0 && (
                                    <div className="mt-5">
                                    {
                                        tagsArray.current?.map((tag, index) => {
                                            return (
                                                <div className="px-2 py-1 rounded-full bg-deep-blue text-white mr-1 font-sm  inline-block group hover:cursor-pointer" onClick={(event) => removeTag(event,tag)} key={index}>
                                                    <div className="flex items-center justify-end">
                                                    <span>{convertStringToTitleCase(tag)}</span>
                                                        <button className="text-white hidden group-hover:inline-block ml-2  transition ease-in-out delay-75  group-hover:scale-150  duration-300 font-bold" 
                                                        ><IoMdClose className="h-4 w-4 text-blue-200"   /></button>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                )}
                                
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
                                        <div className="flex items-center mt-5 justify-between">
                                            <div className="flex items-center justify-start">
                                            <div className="file">
                                                        <a href="" className="w-12 file__icon file__icon--file">
                                                            <FaFile  className=" text-lg 2xl:text-3xl text-white"/>
                                                        </a>
                                                    </div>
                                                    {/* File Sizes */}
                                                    <div className="ml-1  2xl:ml-4">
                                                        <a className="font-medium text-gray-300 text-xs" href="">{file.filename}</a> 
                                                        <div className="text-gray-400 text-xs">
                                                            {fileSizes[index]}
                                                        </div>
                                                    </div>
                                            </div>
                                                    
                                                    

                                                    {/* <div className="ml-auto">
                                                        <a className="font-medium text-gray-300 text-xs" href="">Password</a> 
                                                        <div className="text-gray-400 text-xs">
                                                            {file.password}
                                                        </div>
                                                    </div> */}

{file.password !== null && file.password.trim() !== "" && (
                                    <div className="ml-auto  2xl:ml-4">
                                        <a className="font-medium text-gray-300 text-xs" href="">Password</a> 
                                        <div className="text-gray-400 text-xs">
                                            <PasswordRow  password={file.password} />
                                        </div>
                                    </div>
                                )}
                                                    
                                                    {/* <div className="ml-auto">
                                                        <Link  href={`${file.filepath}`}  className="w-full my-5 block bg-dark-navy-blue  text-white font-medium font-xs   py-1 px-2  text-xs 2xl:py-2 2xl:px-4   border-none rounded " target="_blank" rel="noopener noreferrer">
                                                            Download File
                                                        </Link>
                                                    </div> */}

                                                    <div className="ml-auto  2xl:ml-4">
                                <Link  href={`${file.filepath}`}  className="w-full my-5 flex items-center justify-center bg-color-3  text-color-2 font-medium font-xs   py-1 px-2  text-xs 2xl:py-2 2xl:px-4   border-none rounded " target="_blank" rel="noopener noreferrer">
                                     {`Download File`} <MdCloudDownload size={20} className="ml-2 " />
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
                        {/* <div className="rounded-md px-5 py-4 mb-2 bg-deep-blue text-white mb-5" data-aos="fade-up" data-aos-duration="700" data-aos-delay="500">
                                <div className="flex items-center">
                                    <div className="font-medium text-lg">Scenario</div>
                                    <div className="text-xs bg-white px-1 rounded-md text-gray-800 ml-auto">{scenario.name}</div>
                                </div>
                                <div className="mt-3 text-base">
                                    {scenario.desc} 

                                </div>
                        </div> */}

                        {/* Questions List */}
                        <div  className="  p-5 bg-color-3 rounded-lg shadow " data-aos="fade-left" data-aos-duration="1500" data-aos-delay="500">
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



