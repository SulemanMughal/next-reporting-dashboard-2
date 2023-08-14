"use client"

import { MdQuiz } from "react-icons/md"


export default function AssignQuizModal(){
    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            data-aos="zoom-out" data-aos-duration="700" 
            >
                <div className="relative w-1/4  px-4 space-y-16 ">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                        <div className='flex items-center justify-start '>
                            <MdQuiz  size={30}  />
                            <h3 className=" font-semibold ml-3 text-xl">
                                Assign Quiz
                            </h3>
                        </div>
                        <button
                        className="absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 text-2xl w-10 h-10 rounded-full focus:outline-none text-white"
                    
                        >✗</button>
                    </div>
                    <div className="relative p-6 flex-auto">
                    <form className="space-y-6" >
                        <div className="relative z-0 w-full mb-6 group">
                            {/* {users && <SearchableSelect options={users}  user_id={user_id} /> }  */}
                            <label htmlFor="user_id" className="peer-focus:font-medium absolute text-md text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Quiz</label>
                        </div>
                        <div>
                            {/* <SubmitBtn  isSubmit={isSubmit} setShowAddMemberModal={setShowAddMemberModal} /> */}
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