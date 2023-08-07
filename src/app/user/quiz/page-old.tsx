"use client"

import  { BiSolidLockAlt } from "react-icons/bi"
import Countdown360 from 'react-countdown360'
import {  unitFormatterBlank } from 'react-countdown360'

const timeFormatterDigitalClock = timeLeft => {
    timeLeft = Math.round(timeLeft / 1000)
    const seconds = (timeLeft % 3600) % 60
    const minutes = Math.floor( (timeLeft % 3600) / 60)
    const hours =  Math.floor(timeLeft / 3600) 
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

const questions = [
    "1",
    "1",
    "1",
    "1",
    "1",
    "1",
    "1",
    "1",
    "1",
    "1",
    "1",
    "1",
    "1",
    "1",
    "1",
    "1",
    "1",
    "1",
    "1",
    "1",
    "1",
    "1",
    "1",
    "1",
    "1",
    "1",
    "1",
    "1",
    "1",
    "1",
    "1",
    "1",
    "1",
    "1",
    "1",
    "1",
    "1",
    "1",
    "1",
    "1",
    "1",
    "1",
    "1",
    "1",
    "1",
    "1"
]




function CreateBtn({index}){
    return (
        <>
        <button type="button" className="px-4 py-3 text-md font-medium text-indigo-900 bg-indigo-200 border border-indigo-200 rounded-full mx-2 my-2">
            { (index+1) >= 10 ?    index+1 : "0" +  (index+1)}
        </button>
        </>
    )
}


function Questions(){
    return (
        <>

<div className="w-full col-span-2 max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">

    <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Questions</h5>
   </div>

   <div className="flex items-center justify-center my-4">
   <Countdown360  width={300} seconds={10000} timeFormatter={timeFormatterDigitalClock} unitFormatter={unitFormatterBlank} />
   </div>

   

   <div className="flow-root">
        {/* {questions.map((question , index) =>  <CreateBtn  index={index}  key={index} /> )} */}

        <button type="button" className="  px-4 py-3 w-13 h-13 inline-flex items-center justify-center text-indigo-900 bg-indigo-200 border border-indigo-200 rounded-full mx-2 my-2">
            {"01"}
        </button>
        <button type="button" className="  px-4 py-3 w-13 h-13 inline-flex items-center justify-center text-red-900 bg-red-200 border border-red-200 rounded-full mx-2 my-2">
            {"02"}
        </button>
        <button type="button" className="  px-4 py-3 w-13 h-13 inline-flex items-center justify-center text-green-900 bg-green-200 border border-green-200 rounded-full mx-2 my-2">
            {"03"}
        </button>
        <button type="button" className="  px-4 py-3 w-13 h-13 inline-flex items-center justify-center text-indigo-900 bg-indigo-200 border border-4 border-double border-indigo-800 rounded-full mx-2 my-2">
            {"04"}
        </button>
        
        
        <button type="button" className="px-4 py-4 text-md font-medium text-gray-900 bg-gray-200 border border-gray-200 rounded-full mx-2 my-2">
            <BiSolidLockAlt  size={23} className="my-0 mx-0 p-0"/>
        </button>
        <button type="button" className="px-4 py-4 text-md font-medium text-indigo-900 bg-indigo-200 border border-indigo-200 rounded-full mx-2 my-2">
            <BiSolidLockAlt  size={23} className="my-0 mx-0 p-0"/>
        </button>
        <button type="button" className="px-4 py-4 text-md font-medium text-indigo-900 bg-indigo-200 border border-indigo-200 rounded-full mx-2 my-2">
            <BiSolidLockAlt  size={23} className="my-0 mx-0 p-0"/>
        </button>
        <button type="button" className="px-4 py-4 text-md font-medium text-indigo-900 bg-indigo-200 border border-indigo-200 rounded-full mx-2 my-2">
            <BiSolidLockAlt  size={23} className="my-0 mx-0 p-0"/>
        </button>
        <button type="button" className="px-4 py-4 text-md font-medium text-indigo-900 bg-indigo-200 border border-indigo-200 rounded-full mx-2 my-2">
            <BiSolidLockAlt  size={23} className="my-0 mx-0 p-0"/>
        </button>
        <button type="button" className="px-4 py-4 text-md font-medium text-indigo-900 bg-indigo-200 border border-indigo-200 rounded-full mx-2 my-2">
            <BiSolidLockAlt  size={23} className="my-0 mx-0 p-0"/>
        </button>
        <button type="button" className="px-4 py-4 text-md font-medium text-indigo-900 bg-indigo-200 border border-indigo-200 rounded-full mx-2 my-2">
            <BiSolidLockAlt  size={23} className="my-0 mx-0 p-0"/>
        </button>
        <button type="button" className="px-4 py-4 text-md font-medium text-indigo-900 bg-indigo-200 border border-indigo-200 rounded-full mx-2 my-2">
            <BiSolidLockAlt  size={23} className="my-0 mx-0 p-0"/>
        </button>
        <button type="button" className="px-4 py-4 text-md font-medium text-indigo-900 bg-indigo-200 border border-indigo-200 rounded-full mx-2 my-2">
            <BiSolidLockAlt  size={23} className="my-0 mx-0 p-0"/>
        </button>
        <button type="button" className="px-4 py-4 text-md font-medium text-indigo-900 bg-indigo-200 border border-indigo-200 rounded-full mx-2 my-2">
            <BiSolidLockAlt  size={23} className="my-0 mx-0 p-0"/>
        </button>
        <button type="button" className="px-4 py-4 text-md font-medium text-indigo-900 bg-indigo-200 border border-indigo-200 rounded-full mx-2 my-2">
            <BiSolidLockAlt  size={23} className="my-0 mx-0 p-0"/>
        </button>
        
   </div>
</div>

        </>
    )
}


function QuestionCard({index}){
    return (
        <>
            <div className="w-full col-span-2  p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 mb-4">
            <div className="flex items-center justify-between mb-4">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Question No. {index}</h5>
            </div>
            <div className="flow-root">
                <p >
                    What is the IP Address of the Attacker ?
                </p>
                <div>


<ul className="grid w-full gap-6 md:grid-cols-3 mt-5">
    <li>
        <input type="checkbox" id="react-option" value="" className="hidden peer"  />
        <label htmlFor="react-option" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
            <div className="block">
               <div className="w-full text-lg font-semibold">192.168.1.1</div>
                <div className="w-full text-sm"></div>
            </div>
        </label>
    </li>
    <li>
        <input type="checkbox" id="react-option" value="" className="hidden peer"  />
        <label htmlFor="react-option" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
            <div className="block">
               <div className="w-full text-lg font-semibold">192.168.18.1</div>
                <div className="w-full text-sm"></div>
            </div>
        </label>
    </li>
    <li>
        <input type="checkbox" id="react-option" value="" className="hidden peer"  />
        <label htmlFor="react-option" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
            <div className="block">
               <div className="w-full text-lg font-semibold">192.168.1.19</div>
                <div className="w-full text-sm"></div>
            </div>
        </label>
    </li>
    <li>
        <input type="checkbox" id="react-option" value="" className="hidden peer"  />
        <label htmlFor="react-option" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
            <div className="block">
               <div className="w-full text-lg font-semibold">192.168.10.1</div>
                <div className="w-full text-sm"></div>
            </div>
        </label>
    </li>
    
</ul>

                </div>
            </div>
            </div>
        </>
    )
}


export default function QuizDetails(){
    return (
        <>
            {/* <main className='bg-gray-100 min-h-screen '>
                <div className="p-4 grid grid-cols-5 gap-4 place-items-start h-100">
                    <Questions />
                    <div className="w-full col-span-3 ">
                        {questions.map((question , index) => (
                            <QuestionCard  index={index+1} />
                        ))}
                    </div>
                </div>
            </main> */}
            Blank Page
        </>
    )
}