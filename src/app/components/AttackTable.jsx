"use client"

import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useRef , useState, useEffect } from "react"


import  { BsThreeDotsVertical , BsPersonFillAdd } from "react-icons/bs"



import { AiOutlineUnorderedList } from "react-icons/ai"


import Link from "next/link";


import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'




function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}



function DropDownMenu() {

    // const [showModal, setShowModal] = useState(null);
    // // const [teams, setTeams] = useState(null);
    // const modelHandler = () => {
    //     setShowModal(true)
    // }


    return (
        <>
            {/* {showModal ? <CreateTeamModal setShowModal={setShowModal}  updateTeams={setTeams} /> : null} */}
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
                        <Link  href={"/admin/attacks"} className={classNames( 'text-gray-700', 'block px-4 py-2 text-sm' , 'flex justify-start items-center' )}>
                            <AiOutlineUnorderedList size={23} className="mr-3" />  <span > All Logs </span>
                        </Link>
                    </Menu.Item>
                    {/* <Menu.Item>
                        <button   className={classNames( 'text-gray-700', 'block px-4 py-2 text-sm' , 'flex justify-start items-center' )}   onClick={modelHandler} >
                            <BsPersonFillAdd size={23} className="mr-3" />  <span > Add New Team</span>
                        </button>
                    </Menu.Item> */}
                    
                    </div>
                </Menu.Items>
                </Transition>
            </Menu>
      </>
    )
}



function TableTr({log, index}){
    // console.debug(log)
    log = JSON.parse(log)
    return (
        <>
            <tr tabIndex={0} key={index} className="focus:outline-none h-16 border border-gray-100 rounded">
                <td className="text-center">
                    <p className="text-base font-medium leading-none text-gray-700 mr-2">{log.date_time}</p>
                </td>
                <td className="text-center">
                    <p className="text-base font-medium leading-none text-gray-700 mr-2">{log.team_no}</p>
                </td>
                <td className="text-center">
                    <p className="text-base font-medium leading-none text-gray-700 mr-2">{log.attack_name}</p>
                </td>
                <td className="text-center">
                    <p className="text-base font-medium leading-none text-gray-700 mr-2">{log.user_ip}</p>
                </td>
            </tr>
            <tr className="h-3"></tr>
        </>
    )
}


function LogData({logs, setLogs}){
    // const [teams, setTeams] = useState(null)


    useEffect(() => {
        axios.get('/api/logs/latest/10')
          .then(response => {
            setLogs(response.data);
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
                            Timestamp
                        </th>
                        <th>
                            Team
                        </th>
                        <th>
                            Attack
                        </th>
                        <th>
                            IP Address
                        </th>
                    </tr>
                </thead>
                <tbody>
                {logs && logs.map((log, index) => ( <TableTr  log={log}  index={index} key={index}  />  ))}
                </tbody>
            </table>

        </div>
            
        </>
    )
}




export default function AttackTable(){

    const [logs, setLogs] = useState(null)

    

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

            <div className="w-full col-span-4 relative lg:h-[80vh] h-[50vh] m-auto p-8 border rounded-lg bg-white overflow-scroll">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Logs</h1>
                    <DropDownMenu  />    
                </div>
                <hr className="mt-5 h-0.5 border-t-0 bg-black opacity-30" />
                <LogData logs={logs} setLogs={setLogs}/>
            </div> 
        </>
    )
}