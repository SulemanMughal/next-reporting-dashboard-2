"use client"

import axios from "axios";
import { useRef ,useState ,useEffect } from "react"


import  { BsPersonFillAdd } from "react-icons/bs"
import  { GiCancel } from "react-icons/gi"


import { BiAddToQueue } from "react-icons/bi"

import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";

// import { BiAddToQueue } from "react-icons/bi"


import AOS from 'aos';
import 'aos/dist/aos.css';

import encrypt from "@/app/lib/encrypt"
import decrypt from "@/app/lib/decrypt"
import  toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';


import { Triangle } from 'react-loader-spinner'


import SVGLoader from "@/app/components/SVGLoader"


function SubmitBtn({isSubmit,setShowModal }){
    return (
        <>
            {isSubmit ?     <SVGLoader  text="Creating..." />
              :
                <>
                <div className="flex items-center justify-end p-3 ">
                <button
                className=" font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 justify-center rounded-md leading-6 bg-red-700  text-red-100 shadow-sm hover:bg-red-500 flex justify-start items-center"
                type="button"
                onClick={() => setShowModal(false)}
                > <GiCancel  size={23} className="mr-2" /> <span>Cancel</span> </button>
                <button
                type="submit"
                className=" justify-center rounded-md bg-indigo-600 font-bold uppercase px-6 py-2 font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 flex justify-start items-center"
                >
               <BiAddToQueue size={23} className="mr-2"/>  <span> Add </span> 
                </button> 
                </div>
                </>
                }
        </>
    )
}



export default function CreateQuizModal({setShowModal}){
    const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(null);

    useEffect(()=>{
        AOS.init();
    }, [])

    const { push } = useRouter();


    const title = useRef("");
    const startAt = useRef("");
    const endAt = useRef("");
    const [isSubmit, setSubmit] = useState(false)

    const submitHandler = async (event) => {
        event.preventDefault()
        if(title.current == ""  || startAt.current == ""  || endAt.current == "" ){
            toast.error(`All fields are required`)
        }
        else{
            try {
                
                setSubmit(true)
                const encryptedData = encrypt({
                    title : title.current,
                    startAt : startAt.current,
                    endAt : endAt.current,
                })
                const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/quiz/create`, {encryptedData});
                setLoading(true)
                setShowModal(false)
                const {...data } = decrypt(res.data.encryptedData)
                // console.debug(data)
                if(data.status === false){
                    setLoading(false)
                    toast.error('Quiz with this title already exists')    
                }
                else{
                    toast.success('Successfull, Quiz has been created')
                
                    push(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/quiz/${data.quiz.id}`);
                }
            } catch (error) {
                setSubmit(false)
                console.error(error)
                setLoading(false)
                
                toast.error(`Sorry, you can't create quiz. Please try again after sometime`)
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
                     Add New Quiz
                    </h3>
                    {setShowModal && (<button
                    className="absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 text-2xl w-10 h-10 rounded-full focus:outline-none text-white"
                   onClick={() => setShowModal(false)}
                    >✗</button>) }
                    
                </div>
                <div className="relative p-6 flex-auto">
                <form className="space-y-6" onSubmit={submitHandler}>
                <div className="relative z-0 w-full mb-6 group">
                <input type="text" id="text"
                    name="title"
                    
                    onChange={(e) => (title.current = e.target.value)}
                    autoComplete="name"
                    required
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Title</label>
                </div>
                

                <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                <Datetime className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer z-auto" input={ true }  onChange={(e) => startAt.current=e._d}/>
                
                <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Starting Date & Time</label>
                </div>
                    <div className="relative z-0 w-full mb-6 group">
                    <Datetime className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" input={ true } onChange={(e) => endAt.current=e._d} />
                    
                    <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Ending Date & Time</label>
                    </div>
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