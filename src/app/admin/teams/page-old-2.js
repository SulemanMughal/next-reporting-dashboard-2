"use client"

import Link from "next/link";

import {  AiOutlinePlus } from "react-icons/ai"
import { useRef , useState, useEffect } from "react"
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import  { BsPersonFillAdd } from "react-icons/bs"
import  { GiCancel } from "react-icons/gi"


import TeamListCard from "@/app/components/admin/TeamListCard"


function CreateTeamModal({setShowModal , updateTeams}){
    
    const name = useRef("");
    const [isSubmit, setSubmit] = useState(false)
    const submitHandler = async (event) => {
        event.preventDefault()
        if(name.current == "" ){
            toast.error(`All fields are required`)
        }
        else{
            try {
                setSubmit(true)
                const response = await axios.post('/api/team', {
                    name : name.current
                });
                setShowModal(false)
                if(response.data.status === false){
                    toast.error('Team with this name already exists')    
                }
                else{
                    toast.success('Successfull, Team has been created')
                    axios.get('/api/team')
                    .then(response => {
                        updateTeams(response.data);
                    })
                    .catch(error => {
                        console.error(error);
                    });
                }
            } catch (error) {
                setSubmit(false)
                console.error(error)
                toast.error(`Sorry, you can't create team. Please try again after sometime`)
            }
        }
    }
    return (
        <>        
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
            <div className="relative w-3/8  px-4 space-y-16 ">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-1xl font-semibold">
                    Team Details
                    </h3>
                    <button
                    className="absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 text-2xl w-10 h-10 rounded-full focus:outline-none text-white"
                    onClick={() => setShowModal(false)}
                    >✗</button>
                </div>
                <div className="relative p-6 flex-auto">
                <form className="space-y-6" onSubmit={submitHandler}>
                <div className="relative z-0 w-full mb-6 group">
                <input type="text" id="text"
                    name="name"
                    
                    onChange={(e) => (name.current = e.target.value)}
                    autoComplete="name"
                    required
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
                </div>

                <div>
                    {isSubmit ? <button disabled type="button" className="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center w-full justify-center">
                <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
                </svg>
                Creating...
                </button>  :
                <>
                <div className="flex items-center justify-center p-3 ">
                <button
                className=" font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 w-6/12 justify-center rounded-md leading-6 bg-red-700  text-red-100 shadow-sm hover:bg-red-500 flex justify-start items-center"
                type="button"
                onClick={() => setShowModal(false)}
                ><span>Cancel</span> <GiCancel  size={23} className="ml-2" /></button>
                <button
                type="submit"
                className=" w-6/12 justify-center rounded-md bg-indigo-600 font-bold uppercase px-6 py-2 font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 flex justify-start items-center"
                >
                <span> Create</span> <BsPersonFillAdd size={23} className="ml-2"/>
                </button> 
                </div>
                </>
                }

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



export default   function Teams(){
    
    const [teams, setTeams] = useState(null);
    const [showModal, setShowModal] = useState(null);

    useEffect(() => {
        axios.get('/api/team')
          .then(response => {

            console.debug(response.data)
            setTeams(response.data);
          })
          .catch(error => {
            console.error(error);
          });
      }, []);

    
      const modelHandler = () => {
        setShowModal(true)
      }

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
            <main className='bg-gray-100 min-h-screen'>
                <div className="sm:px-6 w-full">

                    <div className="px-4 md:px-0 py-4 md:py-7">
                        <div className="flex items-center justify-between">
                            <p tabIndex={0} className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">Teams</p>
                            <div className="py-3 px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded">
                                <p>Sort By:</p>
                                <select aria-label="select" className="focus:text-indigo-600 focus:outline-none bg-transparent ml-1">
                                    <option className="text-sm text-indigo-800">Latest</option>
                                    <option className="text-sm text-indigo-800">Oldest</option>
                                    <option className="text-sm text-indigo-800">Latest</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
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
                        <div className="mt-7 overflow-x-auto">
                            <table className="w-full whitespace-nowrap">
                                <thead>
                                    <tr className="focus:outline-none h-16 border border-gray-100 rounded">
                                        
                                        <th>
                                            Team - ID
                                        </th>
                                        <th>
                                            Quiz
                                        </th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                { teams &&  teams.map((team) => (
                                    <>
                                    <tr tabIndex={0} className="focus:outline-none h-16 border border-gray-100 rounded">
                                    {/* <td className="text-center">
                                        <p className="text-base font-medium leading-none text-gray-700 mr-2">{team.team_number}</p>
                                    </td> */}
                                    <td className="text-center">
                                        <p className="text-base font-medium leading-none text-gray-700 mr-2">{team.name}</p>
                                    </td>
                                    <td className="text-center">
                                        <p className="text-base font-medium leading-none text-gray-700 mr-2">
                                            {team?.quiz === null ?  "Not Assigned Yet" : <Link href={"asd"}>
                                                <span >
                                                    {team.quiz.title}
                                                </span>
                                            </Link> }
                                        </p>
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
            </main>
            
        </>
    )
}