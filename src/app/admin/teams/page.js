"use client"

import Link from "next/link";



import SortDropDown from "@/app/components/admin/quiz/SortDropDown"


import ActionMenu from "@/app/components/admin/team/ActionMenu"
// import { BsThreeDotsVertical } from "react-icons/bs"

import {FiChevronsRight} from "react-icons/fi"

import {  AiOutlinePlus } from "react-icons/ai"
import { useRef , useState, useEffect } from "react"
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';


import CreateTeamModal from "@/app/components/admin/team/CreateTeamModal"

function calCulateObtainedPoints(answers){
    
    let points = 0
    for(let index = 0 ; index < answers.length ; index++){
        points = points + answers[index].obtainedPoints
    }
    return points
}









export default   function Teams(){
    
    const [teams, setTeams] = useState(null);
    const [showModal, setShowModal] = useState(null);

    useEffect(() => {
        axios.get('/api/team')
          .then(response => {

            // console.debug(response.data[0].answers)
            setTeams(response.data);
          })
          .catch(error => {
            console.error(error);
          });
    }, []);

    
    const modelHandler = () => {
        setShowModal(true)
    }


    const removeTeam = (team_id) => {
        axios.request({
            method: 'DELETE',
            url: `/api/team/${team_id}`,
        }).then(function (response) {
        }).catch(function (error) {
            console.debug(error);
        });

        axios.all([
            axios.delete(`/api/team/${team_id}`), 
            axios.get(`/api/team`)
            ])
        .then(axios.spread((data1, data2) => {
            console.debug(data1.data.status)
            if(data1.data.status){
                toast.success('Team has been deleted successfully')
            }
            setTeams(data2.data);
        }));
    }

    // const addTeamMember = (team_id) => {
    //     setShowMemberModal(true)
    // }

    return (
        <>
        
            <Toaster   toastOptions={{
                style: {
                    background: '#363636',
                    color: '#fff',
                  },
              
    success: {
      iconTheme: {
        primary: 'green',
        secondary: 'white',
      },
    },
  }} />



            {showModal ? <CreateTeamModal setShowModal={setShowModal}  updateTeams={setTeams} /> : null}
            <div className="sm:px-6 w-ful l">

                    <div className="px-4 md:px-0 py-4 md:py-7">
                        <div className="flex items-center justify-between">
                        <h1 className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-5xl font-bold leading-normal text-white"> Teams</h1>
                            <div className="py-3 px-4 flex items-center text-sm font-medium leading-none  cursor-pointer rounded">
                                <SortDropDown />
                            </div>
                        </div>
                    </div>
                    <div className="bg-card-custom  py-4 md:py-7 px-4 md:px-8 xl:px-10">
                        <div className="sm:flex items-center justify-between">
                            <div className="flex items-center">
                                <a className="rounded-full focus:outline-none focus:ring-2  focus:bg-indigo-50 focus:ring-indigo-800" href="#!">
                                    <div className="py-2 px-8 bg-indigo-100 text-indigo-700 rounded-full">
                                        <p>All</p>
                                    </div>
                                </a>
                            </div>
                            <button className="  block   bg-blue-200 rounded-full flex  items-center " onClick={modelHandler}  >
                            {<AiOutlinePlus size={28} className="font-bold bg-blue-700 text-white rounded-full "  /> }<span className="pl-2 pr-4 text-blue-800 font-bold "> Create New Team</span>
                            </button>
                        </div>
                        <div className="mt-7 overflow-x-auto ">
                            <table className="w-full whitespace-nowrap ">
                                <thead>
                                    <tr className="focus:outline-none h-16 border-none rounded text-gray-400">
                                        
                                        <th>
                                            Team - ID
                                        </th>
                                        <th>
                                            Members
                                        </th>
                                        <th>
                                            Quiz
                                        </th>
                                        <th>
                                            Submissions
                                        </th>
                                        <th>
                                            Obtained Points
                                        </th>
                                        <th>
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                { teams &&  teams.map((team, index) => (
                                    <>
                                    <tr key={index}  className="focus:outline-none h-16 border border-b-0 border-s-0 border-e-0 border-gray-100 rounded text-gray-500">
                                    <td className="text-center">
                                        <p className="text-base font-medium leading-none  mr-2">
                                            {team?.quiz === null ?  "Not Assigned Yet" : <Link href={`/admin/teams/${team.id}`}>
                                                <span className="inline-flex items-center   px-3 py-1 text-lg font-semibold  mr-2 mb-2" >
                                                    {team.name }  <FiChevronsRight size={23} className="p-1 my-1 ml-2 bg-gray-800 text-gray-500 rounded-full"  />
                                                </span>
                                            </Link> }
                                        </p>
                                    </td>
                                    <td className="text-center">
                                        <p className="text-base font-medium leading-none text-gray-500 mr-2">{
                                            team?.users === null ? "Yet to join" : (team?.users?.length ? team.users.length : "Yet to join" )
                                        }</p>
                                    </td>
                                    <td className="text-center">
                                        <p className="text-base font-medium leading-none text-gray-500 mr-2">
                                            {team?.quiz === null ?  "Not Assigned Yet" : <Link href={`/admin/quiz/${team.quiz.id}`}>
                                                <span className="inline-flex items-center   px-3 py-1 text-lg font-semibold  mr-2 mb-2" >
                                                    {team.quiz.title }  <FiChevronsRight size={23} className="p-1 my-1 ml-2 bg-gray-800 text-gray-500 rounded-full"  />
                                                </span>
                                            </Link> }
                                        </p>
                                    </td>
                                    <td className="text-center">
                                        {/* {team?.answers === null ? "0" : (team?.answers?.length ? 0 : team.answers.length )} */}
                                        {team?.answers?.length}
                                    </td>
                                    <td className="text-center">
                                        {/* {team?.answers === null ? "0" : (team?.answers?.length ? 0 : team.answers.length )} */}
                                        {/* {"0"} */}
                                        {calCulateObtainedPoints(team?.answers)}
                                    </td>
                                    <td className="text-center">
                                        <ActionMenu team={team.id}  removeTeam={removeTeam}  />
                                    </td>

                                    {/* <td className="text-center">
                                        <p className="text-base font-medium leading-none text-gray-700 mr-2">{team.api_key}</p>
                                    </td> */}
                                    
                                    </tr>
                                    <tr className="h-3"></tr>
                                        </>
                                ))}

                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            
        </>
    )
}