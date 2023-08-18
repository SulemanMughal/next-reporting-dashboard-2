// "use client"
// import { useEffect, useState } from 'react';
// import CountUp from 'react-countup';
// import { RiTeamFill } from "react-icons/ri"



// export default function TeamCounter({total_teams}){
//     const [teamCounter, setTeamCounter] = useState(0)
//     useEffect(() => (
//         setTeamCounter(total_teams)
//     ), [])
//     return (
//         <>
//             <div className="w-full col-span-1 relative  m-auto p-0 border-none rounded-lg">
//                 <div  className="block  p-6 bg-emerald-700  rounded-lg shadow ">
//                     <div className="flex justify-between items-center">
//                         <div>
//                             <h5 className="mb-2 text-3xl font-bold tracking-tight text-white">Teams</h5>
//                             <p className="font-normal text-white mb-2 text-2xl">
//                                 {teamCounter &&  <CountUp end={teamCounter}  duration={5} />     }
//                             </p>
//                         </div>
//                         <span>
//                             <RiTeamFill size={40}  className="text-white text-3xl font-bold" />
//                         </span>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }


"use client"


import CountUp from 'react-countup';
import { useRef , useState, useEffect } from "react"
import { RiTeamFill } from "react-icons/ri"
import axios from 'axios';


import decrypt from "@/app/lib/decrypt"


export default function TeamCounter(){
    const [teamCounter, setTeamCounter] = useState(null);
    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/team_counter`, {
            headers: { 'Cache-Control': 'no-cache' },
          })
        .then(res => {
            
            const {...data } = decrypt(res.data.encryptedData)
            setTeamCounter(data.total_teams)
        })
        .catch(error => {
            console.error(error);
        });
    }, []);

    return (
        <>
            <div className="w-full col-span-1 relative  m-auto p-0 border-none rounded-lg">
                <div  className="block  p-6 bg-emerald-700  rounded-lg shadow ">
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