
"use client"

import  { MdGroups  } from "react-icons/md"
import { MdCancel } from "react-icons/md"


import AOS from 'aos';
import 'aos/dist/aos.css';


import { useRef ,useState ,useEffect } from "react"


// total obtianed points for a team
function calcTotalPoints(team){

    // console.debug("TeamList.jsx: ", team)

    let points = 0
    if(team && team.answers && team.answers.length){
        team.answers.forEach((answer) => {
            points = points + answer.obtainedPoints
        })
    }
    return points
}
    


export default function TeamList({setShowModal, teams}){
    // console.debug("TeamList.jsx: ", teams)
    useEffect(()=>{
        AOS.init();
    }, [])

    return (
        <>        
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none" data-aos="zoom-out" data-aos-duration="700" 
            >
            <div className="relative w-1/3  px-4 space-y-16 ">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-2xl font-semibold flex  items-center">
                        <MdGroups size={40}/> <span className="ml-3">Teams</span>
                    </h3>
                    <button
                    className="absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 text-2xl w-10 h-10 rounded-full focus:outline-none text-white"
                   onClick={() => setShowModal(false)}
                    >✗</button>
                </div>
                <div className="relative p-6 flex-auto">
                    <ul className=" ">
                        {teams ? teams.map((team, index) => (
                            <li className="pb-3 sm:pb-4" key={index}>
                                <div className="flex justify-between  items-center">
                                    <div className="flex items-center">
                                        <div className="flex items-center justify-center h-14 w-14 rounded-full bg-blue-600 ">
                                            <span className="text-white font-bold text-3xl p-8 ">
                                                {(Array.from(team.name)[0]).toString().toUpperCase()}
                                            </span>
                                        </div>    
                                        <p className="text-xl text-dark fw-bold ml-5">
                                            {team.name}
                                        </p>
                                    </div>
                                    <span className="text-lg text-dark fw-bold truncate">
                                        {calcTotalPoints(team)} Points
                                    </span>
                                    <span className="text-lg text-dark fw-bold truncate">
                                        {team.users.length} members 
                                    </span>
                                </div>
                            </li>
                        )) :  <li className="pb-3 sm:pb-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex min-w-0 items-center">
                                <MdCancel   className=" h-14 w-14 text-red-600"/>
                                <p className=" text-gray-900 truncate ml-3 text-xl ">
                                    No team has been assigned yet
                                </p>
                            </div>
                        </div>
                    </li> }
                        
                    </ul>
                </div>

                </div>
                    </div>
            
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}