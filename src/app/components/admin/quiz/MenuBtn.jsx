"use client"

import  { BsThreeDotsVertical  } from "react-icons/bs"
// import Link from "next/link";
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
// import { AiOutlineUnorderedList } from "react-icons/ai"

import { PiUsersThreeFill } from "react-icons/pi"
import { AiFillEdit } from "react-icons/ai"

// import { useState } from "react";


// import TeamMembersModal from "./TeamMembersModal"





function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function MenuBtn({setShowModal, showModal}) {

    // const [showModal, setShowModal] = useState(false)
    // const showMembers = () => {
    //     setShowModal(true)
    // }


    // const team_id = 5;



    return (
        <>
            
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
                        <button  className={classNames( 'text-gray-700', 'block px-4 py-3 text-sm' , 'flex justify-start items-center ' )} onClick={() => setShowModal(true)} >
                            <PiUsersThreeFill size={23} className="mr-3" />  <span > View Members </span>
                        </button>
                    </Menu.Item>
                    <Menu.Item>
                        <button  className={classNames( 'text-gray-700', 'block px-4 py-2 text-sm' , 'flex justify-start items-center' )}  >
                            <AiFillEdit size={23} className="mr-3" />  <span > Update Quiz </span>
                        </button>
                    </Menu.Item>
                    </div>
                </Menu.Items>
                
                </Transition>
            </Menu>
      </>
    )
}
  