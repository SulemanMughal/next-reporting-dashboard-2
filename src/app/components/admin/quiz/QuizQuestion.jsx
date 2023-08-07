

import  { BsCheckCircleFill } from "react-icons/bs"

// import { FiChevronsRight } from "react-icons/fi"

export default function QuizQuestion({question}){
    return (
        <>
        <div className="w-full col-span-1 ">
            <div className="w-full col-span-2  p-4 bg-card-custom border-none rounded-lg shadow sm:p-8  mb-4">
            <div className="flex justify-between  mb-4">
                <span className=" rounded-full px-3  text-2xl font-semibold bg-none text-orange-600 mb-3" >
                    {question?.points} {"Points"}
                </span>
            </div>
            <div className="flow-root">
                <p  className="text-gray-400 text-lg font-bold">
                    {question?.Description}
                </p>
                <div>
                    { 
                    question.type === "1" ? 
                        (
                            <>
                                <div className="w-full text-gray-500 bg-none border-none rounded-lg my-4">
                                {[...Array(6)].map((item, index) => (
                                    <>
                                        {question["option_" + (index+1)] !== "" ?  (
                                           <>
                                            {question.original_answer.trim() ===  (index+1).toString() ? (
                                                <>
                                                    <button type="button"  className={"relative flex items-center w-full px-4 py-2 text-lg font-medium border border-gray-400 rounded-lg   justify-start  my-4 border border-2 border-green-500 hover:bg-white hover:text-green-500 text-green-500"} >
                                                        <BsCheckCircleFill size={25} className="  -ml-7 " />
                                                        <p className="ml-3 "> {question["option_" + (index+1)]} </p>
                                                    </button>
                                                    
                                                </>
                                                ) : (
                                                <>
                                                    <button type="button"  className={"relative flex items-center w-full px-4 py-2 text-lg font-medium border border-gray-400 rounded-lg   justify-start  my-2 hover:bg-white hover:text-blue-800  text-gray-400"} >
                                                        <p className="ml-3 "> {question["option_" + (index+1)]} </p>
                                                    </button>
                                                </>
                                            ) }
                                           </>
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
