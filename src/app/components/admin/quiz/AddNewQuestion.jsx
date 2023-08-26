"use client"

import { useState, useEffect, useRef } from "react"
import { BiAddToQueue } from "react-icons/bi"


// import CreateQuizModal from "./CreateQuizModal"

import  { GiCancel } from "react-icons/gi"

// import CustomToaster from "@/app/components/CustomToaster"

import AOS from 'aos';
import 'aos/dist/aos.css';


import encrypt from "@/app/lib/encrypt"
import decrypt from "@/app/lib/decrypt"




import  toast from 'react-hot-toast';
import axios from "axios"



function SubmitBtn({isSubmit,setShowModal }){
    return (
        <>
            {isSubmit ? <button disabled type="button" className="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700  inline-flex items-center w-full justify-center">
                <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-gray-200 animate-spin " viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
                </svg>
                Adding...
                </button>  :
                <>
                <div className="flex items-center justify-end p-3 ">
                <button
                className=" font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1  justify-center rounded-md leading-6 bg-red-700  text-red-100 shadow-sm hover:bg-red-500 flex justify-start items-center"
                type="button"
                onClick={() => setShowModal(false)}
                >
                    <GiCancel  size={23} className="mr-2" /> <span>Cancel</span> </button>
                <button
                type="submit"
                className="  justify-center rounded-md bg-indigo-600 font-bold uppercase px-6 py-2 font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 flex justify-start items-center"
                >
                <BiAddToQueue size={23} className="mr-2"/> <span> Add </span> 
                </button> 
                </div>
                </>
                }
        </>
    )
}



// function QuestionTitleInput(){
//     return (
//         <></    
//     )
// }


function CreateQuestion({setShowModal , quizId , setData}){
    
    
    
    

    const title = useRef("");
    const description = useRef("");
    const original_answer = useRef("");
    const points = useRef("");
    const scenario_id = useRef("");
    const [isSubmit, setSubmit] = useState(false)
    const [scenario, setScenario] = useState([])

    useEffect(()=>{
        AOS.init();
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/scenario/`)
        .then((res) => {
            const {...data } = decrypt(res.data.encryptedData)
            setScenario(data.scenarios)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])


    const submitHandler = async (event) => {
        event.preventDefault()
        if(title.current == ""  || description.current == ""  || points.current == "" || original_answer.current == "" || scenario_id.current == ""){
            toast.error(`All fields are required`)
        } else {
            try {
                setSubmit(true)
                
                const encryptedData = encrypt({
                    title : title.current,
                    Description : description.current,
                    original_answer : original_answer.current,
                    points : points.current,
                    scenario_id : scenario_id.current
                })
                const res = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/quiz/${quizId}/question/create`, {encryptedData });
                setShowModal(false)
                    
                const {...data } = decrypt(res.data.encryptedData)
                // asdasdasdsadasd
                // asdasd

                if(data.status === false){
                    toast.error(`Sorry, you can't create question. Please try again after sometime`)    
                } else {
                    toast.success('Successfull, Question has been created')
                    axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/quiz/${quizId}`)
                    
                    .then((res) => {
                        const {...data_2 } = decrypt(res.data.encryptedData)
                        setData(data_2)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                }
            } catch (error) {
                setSubmit(false)
                console.error(error)
                toast.error(`Sorry, you can't create question. Please try again after sometime`)   
            }
        }
    }


    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none" data-aos="zoom-out" data-aos-duration="700" 
            >
            <div className="relative w-1/3  px-4 space-y-16 ">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-2xl font-semibold text-dark">
                     Add New Question
                    </h3>
                    {setShowModal && (<button
                    className="absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 text-2xl w-10 h-10 rounded-full focus:outline-none text-white"
                   onClick={() => setShowModal(false)}
                    >✗</button>) }
                    
                </div>
                <div className="relative p-6 flex-auto">
                <form className="space-y-6" onSubmit={submitHandler}>
                    {/* title */}
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="text" id="text"
                            name="title"
                            onChange={(e) => (title.current = e.target.value)}
                            autoComplete="name"
                            required
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                        <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Title</label>
                    </div>
                    {/* Description */}
                    <div className="relative z-0 w-full my-6 group ">
                        <textarea id="Description" name="Description" rows="4" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" onChange={(e) => (description.current = e.target.value)}></textarea>
                        <label htmlFor="Description" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Description</label>
                    </div>
                    {/* Original Answer */}
                    <div className="relative z-0 w-full my-6 group">
                        <input type="text" id="original_answer"
                            name="original_answer"
                            onChange={(e) => (original_answer.current = e.target.value)}
                            autoComplete="original_answer"
                            required
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                        <label htmlFor="original_answer" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Original Answer</label>
                    </div>
                    {/* total points */}
                    <div className="relative z-0 w-full my-6 group">
                        <input type="number" id="points"
                            name="points"
                            onChange={(e) => (points.current = e.target.value)}
                            autoComplete="points"
                            required
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                        <label htmlFor="points" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Points</label>
                    </div>
                    {/* scenario field */}
                    <div className="relative z-0 w-full mb-6 group">
                        <select id="scenario" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer " defaultValue={''}  onChange={(e) => scenario_id.current = e.target.value}>
                            <option value="" disabled>Choose a Challenge</option>
                            {scenario && scenario.map((item, index) => (
                                <option key={index} value={item.id}>{item.name}</option>
                            ))}
                        </select>
                        <label htmlFor="scenario" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Challenge</label>
                    </div>
                    
                

                

                <div>
                    <SubmitBtn  isSubmit={isSubmit} setShowModal={setShowModal} />

                </div>
                </form>
                </div>

                </div>
                    </div>
            
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}


export default function AddNewQuestion({quizId , setData}){

    const [showModal, setShowModal] = useState(false)

    


    return (
        <>
            {/* <CustomToaster /> */}
            {showModal && <CreateQuestion  setShowModal={setShowModal} quizId={quizId}  setData={setData} /> }
            <div className="relative inline-block text-left border-none ">
                <button className="inline-flex w-full justify-center gap-x-1.5 rounded-md theme-btn-bg-color  px-3 py-2 text-lg border-none font-semibold text-white shadow-sm   items-center "  onClick={() => setShowModal(true)} >
                    <BiAddToQueue  size={23} />   New Question
                </button>
            </div>
        </>
    )
}