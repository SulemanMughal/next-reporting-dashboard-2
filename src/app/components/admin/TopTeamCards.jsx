"use client"


import { GiDiamondTrophy } from "react-icons/gi"

import   { FaCoins } from "react-icons/fa6"


import CountUp from 'react-countup';


import  { MdIncompleteCircle } from "react-icons/md"

function TopTeam(){
    return (
        <>
            <div className="w-full col-span-1 relative  m-auto p-0 border-none rounded-lg">
                <div  className="block max-w-sm p-6 bg-cyan-700 border border-cyan-200 rounded-lg shadow ">
                    <div className="flex justify-between items-center">
                        <div>
                            <h5 className="mb-2 text-3xl font-bold tracking-tight text-white">Top Team</h5>
                            <p className="font-normal text-white mb-2 text-2xl">
                                Team - 1    
                            </p>
                        </div>
                        <span>
                            <GiDiamondTrophy size={40}  className="text-white text-3xl font-bold" />
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}




function TeamObtainedPoints(){
    return (
        <>
            <div className="w-full col-span-1 relative  m-auto p-0 border-none rounded-lg">
                <div  className="block max-w-sm p-6 bg-green-700 border border-green-200 rounded-lg shadow ">
                    <div className="flex justify-between items-center">
                        <div>
                            <h5 className="mb-2 text-3xl font-bold tracking-tight text-white">Points</h5>
                            <p className="font-normal text-white mb-2 text-2xl">
                            <CountUp end={45}  duration={5} /> 
                            </p>
                        </div>
                        <span>
                            <FaCoins size={40}  className="text-white text-3xl font-bold" />
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}

function RightAnswers(){
    return (
        <>
            <div className="w-full col-span-1 relative  m-auto p-0 border-none rounded-lg">
                <div  className="block max-w-sm p-6 bg-orange-600 border border-gray-200 rounded-lg shadow ">
                    <div className="flex justify-between items-center">
                        <div>
                            <h5 className="mb-2 text-3xl font-bold tracking-tight text-white">Statistics</h5>
                            <p className="font-normal text-white mb-2 text-2xl">
                                <CountUp end={25}  duration={5} /> 
                            </p>
                        </div>
                        <span>
                            <MdIncompleteCircle size={50}  className="text-orange-300" />
                        </span>
                    </div>
                </div>
            </div>

            

        </>
    )
}

export default function TopTeamCards(){
    return (
        <>
        <div className="p-4 grid  grid-cols-3 gap-4 place-items-center justify-between ">
            <TopTeam />
            <TeamObtainedPoints />
            <RightAnswers />
        </div>
            
        </>
    )
}