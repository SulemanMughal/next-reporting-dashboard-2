
import  { BiSolidLockAlt } from "react-icons/bi"
import Countdown360 from 'react-countdown360'
import {  unitFormatterBlank } from 'react-countdown360'








function CreateBtn({index , activeIndex }){
    if(activeIndex === index){
        return (
            <button type="button" className="px-4 py-3 w-13 h-13 inline-flex items-center justify-center text-indigo-900 bg-indigo-200 border border-4 border-double border-indigo-800 rounded-full mx-2 my-2">
                { (index) >= 10 ?    index : "0" +  (index)}
            </button>
        )
    } else if(activeIndex < index){
        return (
            
            <button type="button" className="px-4 py-4 text-md font-medium text-gray-900 bg-gray-200 border border-gray-200 rounded-full mx-2 my-2">
                <BiSolidLockAlt  size={23} className="my-0 mx-0 p-0"/>
            </button>
        )
    } else {
        return (
            <button type="button" className="  px-4 py-3 w-13 h-13 inline-flex items-center justify-center text-green-900 bg-green-200 border border-green-200 rounded-full mx-2 my-2">
                { (index) >= 10 ?    index : "0" +  (index)}
            </button>
        )
    }
    
}

export default function UserQuestions({  startAt , endAt , questions , activeIndex }){
    const current_time = new Date()
    const end_time = new Date(endAt)
    const start_time = new Date(startAt)
    const timeFormatterDigitalClock = timeLeft => {
        timeLeft = Math.round(timeLeft / 1000)
        const seconds = (timeLeft % 3600) % 60
        const minutes = Math.floor( (timeLeft % 3600) / 60)
        const hours =  Math.floor(timeLeft / 3600) 
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }
    if( end_time < current_time){
        return (
            <>
                <div class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 w-full col-span-3" role="alert">
                    <p class="font-bold">Quiz has been ended</p>
                    <p>{"You can't submit any quiz from now"}</p>
                </div>
                
            </>
        )
    }
    if(  current_time < start_time ){
        return (
            <>
                <div class="bg-orange-100 border-l-4 border-blue-500 text-blue-700 p-4 w-full col-span-3" role="alert">
                    <p class="font-bold">Quiz Info</p>
                    <p>Quiz is not started yet</p>
                </div>
            </>
        )
    }
    if(start_time < current_time < end_time){
        return (
            <>
                <div  className="w-full col-span-2 max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Questions</h5>
                    </div>
                    <div className="flex items-center justify-center my-4">
                        <Countdown360  width={300} seconds={(end_time-current_time)/1000} timeFormatter={timeFormatterDigitalClock} unitFormatter={unitFormatterBlank} />
                        
                    </div>
            <div className="flow-root">
                {
                    questions?.map((item, index) => (
                        <>
                            <CreateBtn  index={index+1} key={index}  activeIndex={activeIndex}  />
                        </>
                    ))
                }

            </div>
                </div>
            </>
        )
    }
}