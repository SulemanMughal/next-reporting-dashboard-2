export default  function UserQuestionCard({question ,  handleChange , submitHandler}){
    return (
        <>
        <div className="w-full col-span-3 ">
            <div className="w-full col-span-2  p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8  mb-4">
            {/* <div className="flex items-center justify-between mb-4">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">{question?.title}</h5>
            </div> */}
            <div className="flow-root">
                <p >
                    {question?.Description}
                </p>
                <div>
                    { 
                    question.type === "1" ? 
                        (
                            <>
                                <ul className="grid w-full gap-6 md:grid-cols-3 mt-5">
                                    {[...Array(6)].map((item, index) => ( 
                                        <li key={index}  >
                                            <input type="checkbox" id={"react-option-" + (index+1)} value={index+1} className="hidden peer"   onClick={(e)=>handleChange(e)}   />
                                            <label htmlFor={"react-option-" + (index+1)} className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer  peer-checked:border-blue-600 hover:text-gray-600  peer-checked:text-gray-600 hover:bg-gray-50 " >                           
                                                <div className="block">
                                                <div className="w-full text-lg font-semibold">{ question["option_" + (index+1)] }</div>
                                                    <div className="w-full text-sm"></div>
                                                </div>
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                                <div className="flex justify-end">
                                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm   w-full sm:w-auto px-5 py-2.5 text-center  my-4" onClick={submitHandler} >Submit </button>
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