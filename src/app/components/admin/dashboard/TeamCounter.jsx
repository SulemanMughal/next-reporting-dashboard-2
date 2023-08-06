"use client"


import CountUp from 'react-countup';
import { useRef , useState, useEffect } from "react"
import { RiTeamFill } from "react-icons/ri"
import axios from 'axios';


export default function TeamCounter(){
    const [teamCounter, setTeamCounter] = useState(null);
    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/team_counter`)
        .then(response => {
            setTeamCounter(response.data.total_teams)
        })
        .catch(error => {
            console.error(error);
        });
    }, []);

    return (
        <>
            <div className="w-full col-span-1 relative  m-auto p-0 border-none rounded-lg">
                <div  className="block max-w-sm p-6 bg-emerald-700 border border-emerald-200 rounded-lg shadow ">
                    <div className="flex justify-between items-center">
                        <div>
                            <h5 className="mb-2 text-3xl font-bold tracking-tight text-white">Teams</h5>
                            <p className="font-normal text-white mb-2 text-2xl">
                                {teamCounter &&  <CountUp end={teamCounter}  duration={5} />     }
                            </p>
                        </div>
                        <span>
                            <RiTeamFill size={40}  className="text-white text-3xl font-bold" />
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}