"use client"

import Link from "next/link";
import SortDropDown from "@/app/components/admin/quiz/SortDropDown"
import ActionMenu from "@/app/components/admin/team/ActionMenu"
import {FiChevronsRight} from "react-icons/fi"
import { useRef , useState, useEffect } from "react"
import axios from 'axios';
import toast from 'react-hot-toast';
import CustomToaster from "@/app/components/CustomToaster";
import CreateTeamModal from "@/app/components/admin/team/CreateTeamModal"
import AddTeamMemberModal from "@/app/components/admin/team/AddTeamMemberModal"
import RemoveMember from "@/app/components/admin/team/RemoveMember"
import TeamDetailsModal from "@/app/components/admin/team/TeamDetailsModal"
import TeamDeleteConfirmationModal from "@/app/components/admin/team/TeamDeleteConfirmationModal"
import { BsGrid3X3GapFill } from "react-icons/bs"
import { BiListUl }  from "react-icons/bi"
import { MdGroups } from "react-icons/md"
import { VscTasklist } from "react-icons/vsc"
import { Triangle } from 'react-loader-spinner'
import { calcTeamObtainedPoints } from "@/app/lib/helpers"

import decrypt from "@/app/lib/decrypt"



import AOS from 'aos';
import 'aos/dist/aos.css';





// List View
function TeamListView({teams , removeTeam , setShowAddMemberModal , setShowAddMemberModalHandler , setShowTeamDetailsModalHandler}){
    return (
        <>
            <div className="bg-deep-blue-violet rounded-lg   p-5 mx-5" data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="500">
                
                <div className="mt-5   ">
                    <table className="w-full whitespace-nowrap ">
                        <thead>
                            <tr className="focus:outline-none h-16 border-none rounded text-gray-400">
                                <th key={1}>
                                    Team - ID
                                </th>
                                <th key={2}>
                                    Members
                                </th>
                                {/* <th key={3}>
                                    Quiz
                                </th> */}
                                <th key={4}>
                                    Submissions
                                </th>
                                <th key={5}>
                                    Obtained Points
                                </th>
                                <th key={6}>
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
                                        {team.name }
                                    </p>
                                </td>
                                <td className="text-center">
                                    <p className="text-base font-medium leading-none text-gray-500 mr-2">{
                                        team?.users === null ? "Yet to join" : (team?.users?.length ? team.users.length : "Yet to join" )
                                    }</p>
                                </td>
                                {/* <td className="text-center">
                                    <p className="text-base font-medium leading-none text-gray-500 mr-2">
                                        {team?.quiz === null ?  "Not Assigned Yet" : <Link href={`/admin/quiz/${team.quiz.id}`}>
                                            <span className="inline-flex items-center   px-3 py-1 text-lg font-semibold  mr-2 mb-2" >
                                                {team.quiz.title }  <FiChevronsRight size={23} className="p-1 my-1 ml-2 bg-gray-800 text-gray-500 rounded-full"  />
                                            </span>
                                        </Link> }
                                    </p>
                                </td> */}
                                <td className="text-center">
                                    {team?.answers?.length}
                                </td>
                                <td className="text-center">
                                    {calcTeamObtainedPoints(team?.answers)}
                                </td>
                                <td className="text-center">
                                    <ActionMenu team={team}  removeTeam={removeTeam} setShowAddMemberModal={setShowAddMemberModal} setShowAddMemberModalHandler={setShowAddMemberModalHandler} setShowTeamDetailsModalHandler={setShowTeamDetailsModalHandler}  />
                                </td>
                                </tr>
                                <tr className="h-3"></tr>
                            </>
                        ))} 
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}


// Grid View
function TeamGridView({teams, removeTeam}){
    return (
        <>
            <div className=" grid gap-4 auto-rows-fr grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 " data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="500">
            <div className="w-full col-span-1 relative  m-auto p-0 border-none rounded-lg h-full " >
                <div className="  mx-2 my-2 p-4 bg-card-custom border-none rounded-lg shadow  text-gray-400 ">
                        <div className="p-5">
                            
                            <ul className="w-full ">
                                <li className="py-3 sm:pb-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-shrink-0">
                                            <VscTasklist   size={28}/>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-md font-medium  truncate ">
                                            Questions
                                            </p>
                                        </div>
                                        <div className="flex flex-rows items-center text-base font-semibold  ">
                                            <p>{"Title"}</p>
                                        </div>
                                    </div>
                                </li>
                                <li className="py-3 sm:pb-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-shrink-0">
                                            <MdGroups   size={28}/>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-md font-medium  truncate ">
                                            Teams
                                            </p>
                                        </div>
                                        <div className="flex flex-rows items-center text-base font-semibold  ">
                                            <p>{"Teams"}</p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <span className="py-2 text-lg font-bold bg-none text-green-600 block text-center">{" Points"}</span>
                            {/* <div className=" pt-4 pb-2 flex justify-center">
                                <Link href={`/admin/quiz/${quiz.id}`}  className="transition ease-in-out delay-150 hover:-translate-y-1    hover:bg-blue-300 hover:text-blue-800 duration-300    btn-flag-submit text-gray-400  flex items-center  font-semibold  mr-2 mb-2 justify-center items-center   h-full rounded-0 px-4 py-2 text-xl   w-2/3    ">
                                    <AiFillEye size={23} className=" mr-2 "  /> <span>{"View Details" } </span> 
                                </Link>
                            </div> */}
                        </div>
                    </div>
            </div>
            </div>
        </>
    )
}



import CustomTriangleLoader from "@/app/components/CustomTriangleLoader"


export default   function Teams(){    
    const [teams, setTeams] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(null);
    const [showAddMemberModal, setShowAddMemberModal] = useState(null);
    const [viewType, setViewType] = useState('list'); // Default view type
    const [teamID, setTeamID] = useState(null)
    const [showTeamDetailsModal, setShowTeamDetailsModal] = useState(null);
    // const [showRemoveMemberModal, setShowRemoveMemberModal] = useState(null);
    const [showTeamDeleteConfirmationModal, setShowTeamDeleteConfirmationModal] = useState(null);
    const [showQuizModal, setQuizModal] = useState(null);
    const [removeTeamID, setRemoveTeamID] = useState(null)
    // const [removeTeam, setRemoveTeam] = useState(null)
    
    
    const toggleView = () => {
        setViewType(viewType === 'grid' ? 'list' : 'grid');
    };


    const setShowAddMemberModalHandler = (team_id) => {
        setTeamID(team_id)
        setShowAddMemberModal(true)
    }


    const setShowTeamDetailsModalHandler = (team_id) => {
        setTeamID(team_id)
        setShowTeamDetailsModal(true)
    }

    useEffect(() => {
        AOS.init();
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/team`)
          .then(res => {
            const {...data } = decrypt(res.data.encryptedData)
            if(data.status === true){
                setTeams(data.teams);
                setError(null);
            } else{
                toast.error(`${data.error}`)
                setError(`${data.error}`);
            }
          })
          .catch(error => {
            toast.error(`Sorry! There is an error while fetching teams. Please try again after some time`)
            setError(`Sorry! There is an error while fetching teams. Please try again after some time`);
          }).finally(() => {
             setLoading(false);
            });
    }, []);
    const modelHandler = () => {
        setShowModal(true)
    }
    const removeTeam = (team) => {
        setShowTeamDeleteConfirmationModal(true)
        setRemoveTeamID(team)

        
    }

    return (
        <>
            <CustomToaster />
            {showModal ? <CreateTeamModal setShowModal={setShowModal}  updateTeams={setTeams} /> : null}
            {showAddMemberModal  ? <AddTeamMemberModal  setShowAddMemberModal={setShowAddMemberModal} updateTeams={setTeams}  team_id={teamID} /> : null  }
            {/* {showRemoveMemberModal ? <RemoveMember /> : null } */}
            {showTeamDetailsModal ? <TeamDetailsModal  setShowTeamDetailsModal={setShowTeamDetailsModal}  team_id={teamID} /> : null}
            {showTeamDeleteConfirmationModal ?  
                <TeamDeleteConfirmationModal 
                    setShowTeamDeleteConfirmationModal={setShowTeamDeleteConfirmationModal} 
                    removeTeamID={removeTeamID}
                    setTeams={setTeams}
                /> : null}
            <div >
                
                    {/* Top Header */}
                    <div className="">
                        <div className="flex items-center justify-between p-5 pb-0 mb-5 ">
                        <h1 className="text-white text-2xl font-bold"> Teams</h1>
                            <div className="py-3  flex items-center text-sm font-medium leading-none  cursor-pointer rounded">
                                <button className="bg-deep-blue-violet text-white py-2  pr-4  pl-4 mt-2 h-full border border-1 border-deep-blue-violet rounded-md mb-0 ml-0 flex justify-start items-center"  onClick={modelHandler} >
                                    <MdGroups  size={23} className="mr-2" />   Create New Team
                                </button>
                                <SortDropDown />
                                {/* <button
                                    className="px-4 py-2 theme-btn-bg-color text-white text-lg rounded  flex items-center gap-x-1.5"
                                    onClick={toggleView}
                                >{viewType === 'grid' ?  (<><BiListUl  size={28}/> <span>{'List'}</span></>) : (<><BsGrid3X3GapFill  size={28}/> <span>{'Grid'}</span></>)}</button> */}
                                
                            </div>
                        </div>
                    </div>
                    {loading ? (
            <>
                {/* <div>
                <Triangle
                        height="300"
                        width="300"
                        color="#4fa94d"
                        ariaLabel="triangle-loading"
                        wrapperStyle={{}}
                        wrapperClass={"flex justify-center"}
                        visible={true}
                        className={"flex justify-center"} 
                    />
                </div> */}
                <CustomTriangleLoader />
            </>
        ) : error ? (
            <>
                <div>
                    <p className="text-lg text-white">
                        Error: {error}
                    </p>
                </div>
            </>
        ) : (
            <>
                {viewType === "list" ? 
                    ( <TeamListView  
                        teams={teams}  
                        removeTeam={removeTeam}  
                        setShowAddMemberModal={setShowAddMemberModal}  
                        setShowAddMemberModalHandler={setShowAddMemberModalHandler}  
                        setShowTeamDetailsModalHandler={setShowTeamDetailsModalHandler}  
                        />
                    ) : 
                    ( <TeamGridView  teams={teams}  removeTeam={removeTeam}  /> )
                }
            </>
        )}
                    
               
            </div>
            
        </>
    )
}