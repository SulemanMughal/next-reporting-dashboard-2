

import  { BsCheckCircleFill } from "react-icons/bs"

import { FiChevronsRight } from "react-icons/fi"

export default function QuizQuestion({question}){
    return (
        <>
        <div className="w-full col-span-1 ">
            <div className="w-full col-span-2  p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8  mb-4">
            <div className="flex justify-between  mb-4">
                {/* <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">{question?.title}</h5> */}
                <span className=" rounded-full px-3  text-sm font-semibold bg-orange-200 text-orange-800 mb-3" >
                    {question?.points} {"Points"}
                </span>
            </div>
            <div className="flow-root">
                <p >
                    {question?.Description}
                </p>
                <div>
                    { 
                    question.type === "1" ? 
                        (
                            <>
                                <div className="w-full text-gray-900 bg-white border-none rounded-lg my-4">
                                {[...Array(6)].map((item, index) => (
                                    <>
                                        {question["option_" + (index+1)] !== "" ?  (
                                            <button type="button" 
                                                className={"relative inline-flex items-center w-full px-4 py-2 text-lg font-medium border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600  my-1"}
                                                >
                                                    
                                            {question.original_answer.trim() ===  (index+1).toString() ? (
                                                <BsCheckCircleFill size={19} className="text-green-500 " />
                                            ) : null }
                                            
                                            <p className="ml-3"> {question["option_" + (index+1)]} </p>
                                            </button>
                                        ) : null }
                                        
                                    </>
                                ))}
                                </div>
                            </>
                        )
                    : null }
                </div>
            </div>
            
            </div>
            
        </div>
        </>
    )
}
