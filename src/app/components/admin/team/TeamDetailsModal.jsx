"use client"

import { MdCancel, MdGroups } from "react-icons/md"
import { useEffect, useState, useRef } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"



function calculateTotalPointsPerUser(answers, email) {
    const totalPointsPerUser = {};
  
    answers.forEach((answer) => {
      const userEmail = answer.user.email;
      const obtainedPoints = answer.obtainedPoints;
  
      if (!totalPointsPerUser[userEmail]) {
        totalPointsPerUser[userEmail] = 0;
      }
  
      totalPointsPerUser[userEmail] += obtainedPoints;
    });
    return totalPointsPerUser[email];
  }

export default function TeamDetailsModal({setShowTeamDetailsModal , team_id}){
    const [users, setUsers] = useState(null)
    // const [answers , setAnswers] = useState(null)
    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/team/${team_id}`)
        .then(res => {
            if(res.data.status === true){
                setUsers(res.data.team?.users)
            } else {
                toast.error(`${res.data.error}`)
            }
        })
        .catch(err => {
            toast.error(`Sorry! There is an error while fetching team details. Please try again after some time`)
        });
    }, [])
    return (
        <>        
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none" data-aos="zoom-out" data-aos-duration="700" 
            >
                <div className="relative w-1/4  px-4 space-y-16 ">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                            <div className='flex items-center justify-start '>
                                <MdGroups  size={30}  />
                                <h3 className=" font-semibold ml-3 text-xl">
                                    Team Details
                                </h3>
                            </div>
                            <button
                            className="absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 text-2xl w-10 h-10 rounded-full focus:outline-none text-white"
                        onClick={() => setShowTeamDetailsModal(false)}
                            >✗</button>
                        </div>
                        <div className="relative p-6 flex-auto">
                            <ul className=" ">
                                { ( users && users?.length ) ? (
                                    <>
                                        {users.map((user , index) => (
                                            <div className="flex items-center justify-between p-4 " key={index} >
                                                <div className="flex items-center">
                                                    <div className="flex items-center justify-center h-14 w-14 rounded-full bg-blue-600 ">
                                                        <span className="text-white font-bold text-3xl p-8 ">
                                                            {(Array.from(user.email)[0]).toString().toUpperCase()}
                                                        </span>
                                                    </div>    
                                                    <p className="text-xl text-dark fw-bold ml-5">
                                                        {user.email}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                ) : 
                                (
                                    <li className="pb-3 sm:pb-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex min-w-0 items-center">
                                                <MdCancel   className=" h-14 w-14 text-red-600"/>
                                                <p className=" text-gray-900 truncate ml-3 text-xl ">
                                                    No member has been added yet.
                                                </p>
                                            </div>
                                        </div>
                                    </li> 
                                )
                                }
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}