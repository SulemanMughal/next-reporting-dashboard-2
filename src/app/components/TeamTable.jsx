"use client"



import { useRef , useState, useEffect } from "react"
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import  { GiCancel } from "react-icons/gi"
import {  AiOutlinePlus } from "react-icons/ai"

import  { BsThreeDotsVertical , BsPersonFillAdd } from "react-icons/bs"

import { AiOutlineUnorderedList } from "react-icons/ai"

import Link from "next/link";


import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'




function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}



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
                    axios.get('/api/team/last/10')
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
            <div className="relative w-2/5  px-4 space-y-16 ">
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





function DropDownMenu({teams, setTeams}) {

    const [showModal, setShowModal] = useState(null);
    // const [teams, setTeams] = useState(null);
    const modelHandler = () => {
        setShowModal(true)
    }


    return (
        <>
            {showModal ? <CreateTeamModal setShowModal={setShowModal}  updateTeams={setTeams} /> : null}
            <Menu as="div" className="relative inline-block text-left">
                <div>
                <Menu.Button className="inline-flex w-full justify-center border-none gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm  hover:bg-gray-50">
                    <BsThreeDotsVertical  size={23} />
                </Menu.Button>
                </div>
        
                <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
                >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                    <Menu.Item>
                        <Link  href={"/admin/teams"} className={classNames( 'text-gray-700', 'block px-4 py-2 text-sm' , 'flex justify-start items-center' )}>
                            <AiOutlineUnorderedList size={23} className="mr-3" />  <span > All Team </span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item>
                        <button   className={classNames( 'text-gray-700', 'block px-4 py-2 text-sm' , 'flex justify-start items-center' )}   onClick={modelHandler} >
                            <BsPersonFillAdd size={23} className="mr-3" />  <span > Add New Team</span>
                        </button>
                    </Menu.Item>
                    
                    </div>
                </Menu.Items>
                </Transition>
            </Menu>
      </>
    )
}
  



function TableTr({team}){
    return (
        <>
            <tr tabIndex={0} key={team.team_number} className="focus:outline-none h-16 border border-gray-100 rounded">
                <td className="text-center">
                    <p className="text-base font-medium leading-none text-gray-700 mr-2">{team.team_number}</p>
                </td>
                <td className="text-center">
                    <p className="text-base font-medium leading-none text-gray-700 mr-2">{team.name}</p>
                </td>
            </tr>
            <tr className="h-3"></tr>
        </>
    )
}


function TeamData({teams, setTeams}){
    // const [teams, setTeams] = useState(null)


    useEffect(() => {
        axios.get('/api/team/last/10')
          .then(response => {

            // console.debug(response.data)
            setTeams(response.data);
          })
          .catch(error => {
            console.error(error);
          });
      });
    

    return (
        <>
        <div>
            <table className="w-full whitespace-nowrap">
                <thead>
                    <tr className="focus:outline-none h-16 border border-gray-100 rounded">
                        <th >
                            Team No.
                        </th>
                        <th>
                            Name
                        </th>
                    </tr>
                </thead>
                <tbody>
                {teams && teams.map((team , index) => ( <TableTr  team={team}  key={index} />  ))}
                </tbody>
            </table>

        </div>
            
        </>
    )
}


export default function TeamTable(){

    const [teams, setTeams] = useState(null)

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
            <div className="w-full col-span-3 relative lg:h-[80vh] h-[50vh] m-auto p-8 border rounded-lg bg-white overflow-scroll">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Teams</h1>
                    <DropDownMenu  teams={teams} setTeams={setTeams}/>    
                </div>
                <hr className="mt-5 h-0.5 border-t-0 bg-black opacity-30" />
                <TeamData teams={teams} setTeams={setTeams}/>
            </div>
        </>
    )
}