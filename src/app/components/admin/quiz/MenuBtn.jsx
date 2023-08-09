"use client"

import  { BsThreeDotsVertical  } from "react-icons/bs"
// import Link from "next/link";
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
// import { AiOutlineUnorderedList } from "react-icons/ai"

import { PiUsersThreeFill } from "react-icons/pi"
import { AiFillEdit } from "react-icons/ai"

import { MdGroups } from "react-icons/md"

// import { useState } from "react";


// import TeamMembersModal from "./TeamMembersModal"





function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}



// const items=[
//     [

//     ]
// ]

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
                <Menu.Button className="flex w-full justify-center border-none gap-x-1.5 rounded-md bg-none  ml-3 text-lg font-semibold text-gray-500 shadow-sm  items-center">
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
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md btn-flag-submit  text-white shadow-lg  focus:outline-none">
                    <div className="py-1">
                    {/* <Menu.Item>
                        <button  className={classNames( '', 'block px-4 py-3 text-md ' , 'flex justify-start items-center ', ' w-full hover:bg-white hover:text-black' )} onClick={() => setShowModal(true)} >
                            <PiUsersThreeFill size={23} className="mr-3" />  <span > View Members </span>
                        </button>
                    </Menu.Item> */}
                    <Menu.Item>
                        <button  className={classNames( '', 'block px-4 py-3 text-md ' , 'flex justify-start items-center ', ' w-full hover:bg-white hover:text-black' )} onClick={() => setShowModal(true)}  >
                            <MdGroups size={23} className="mr-3" />  <span > View Teams </span>
                        </button>
                    </Menu.Item>
                    <Menu.Item>
                        <button  className={classNames( '', 'block px-4 py-2 text-md' , 'flex justify-start items-center',' w-full hover:bg-white hover:text-black' )}  >
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
  