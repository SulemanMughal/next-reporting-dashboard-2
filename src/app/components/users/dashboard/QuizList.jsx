import QuizMenuBtn from "./QuizMenuBtn"


import Link from "next/link"


import { AiFillEye } from "react-icons/ai"


function QuizTopHeader(){
    return (
        <>
            Quiz Top Header
        </>
    )
}


export default function QuizList(){
    return (
        <div className="p-4 grid grid-cols-12 gap-0 place-items-start h-100 px-0">
            {
                [...Array(5)].map((e, index) => (
                    <div className="w-full col-span-3 relative  p-3   rounded-lg h-full ">
                <div className="  my-2 bg-card-custom  rounded-lg shadow   ">
                    <div className="p-5">
                        <div className="flex justify-between items-center mb-4">
                            <h5 className=" text-2xl font-bold tracking-tight whitespace-normal text-gray-300 ">{"Sample Quiz - " + (index+1)}</h5>
                        </div>
                        <p className="text-gray-400">{"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."}</p>
                        <div className=" pt-4 pb-2 text-start">
                            <span className="px-1 py-1 text-md font-semibold bg-none text-green-600 ">{"In Progress"}</span>
                            <span className="px-1 py-1 text-md font-semibold bg-none text-pink-600">{"Security Operations"}</span>
                            <span className="px-1 py-1 text-md font-semibold bg-none text-orange-400">{"20 Points"}</span>
                        </div>
                    </div>
                    <div className=" pt-4 pb-2 flex justify-center">
                        <Link href={`/user/quiz/123`}  className="transition ease-in-out delay-150 hover:-translate-y-1    hover:bg-white hover:text-black duration-300    theme-bg-color text-gray-300  flex items-center  w-7/12 h-full rounded-0 px-4 py-2 text-xl font-semibold  mr-2 mb-2 justify-center items-center  ">
                            <AiFillEye size={23} className=" mr-2 "  /> <span>{"View Quiz" } </span> 
                        </Link>
                    </div>
                </div>
            </div>
                ))
            }
            
            
            
        </div>
        
    )
}