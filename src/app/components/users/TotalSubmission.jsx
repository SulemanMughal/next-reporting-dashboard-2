"use client"
import CountUp from 'react-countup';
import { RiQuestionAnswerFill } from "react-icons/ri"

export default function TotalSubmission({totalSubmissions}){
    return (
        <>

            {/* <div className="w-full col-span-1 relative  m-auto p-0 border-none rounded-lg">
                <div  className="block  p-6 bg-red-800  rounded-lg shadow ">
                    <div className="flex justify-between items-center">
                        <div>
                            <h5 className="mb-2 text-3xl font-bold tracking-tight text-white">Submission</h5>
                            <p className="font-normal text-white mb-2 text-2xl">
                                {totalSubmissions && <CountUp end={totalSubmissions}  duration={5} />  }  
                            </p>
                        </div>
                        <span>
                            <RiQuestionAnswerFill size={40}  className="text-red-200" />
                        </span>
                    </div>
                    

                </div>
            </div> */}
            <div className="w-full col-span-1 relative  m-auto p-0 border-none rounded-lg report-box"  >
                <div  className="block  p-6 bg-dark-blue  rounded-lg shadow relative">
                <div className="flex justify-between items-center ">
                        <div>
                            <RiQuestionAnswerFill size={40}  className="text-blue-500 mb-6" />
                            <p className="font-bold text-white  text-4xl mb-2">
                            {totalSubmissions && <CountUp end={totalSubmissions}  duration={5} />  } 
                            </p>
                            <h5 className="text-md text-gray-400">Total Completed Challenges </h5>
                        </div>
                        <span>
                        </span>
                    </div>
                </div>
            </div>

            

        </>
    )
}