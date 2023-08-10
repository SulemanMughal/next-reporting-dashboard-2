"use client"

import  { BsThreeDotsVertical  } from "react-icons/bs"
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { AiFillEdit } from "react-icons/ai"
import { MdGroups } from "react-icons/md"
import  { classNames } from "@/app/lib/helpers"
import { AiOutlineLink } from "react-icons/ai"


export default function MenuBtn({setShowModal, showModal , setShowTeamAssignModal}) {
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
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-0 btn-flag-submit shadow-lg text-white  ">
                        <div className="py-0">
                            <Menu.Item>
                                <button  className={classNames( '', 'block px-4 py-5 text-lg font-bold w-full  flex justify-start items-center  hover:text-black hover:bg-white' )} onClick={() => setShowModal(true)}  >
                                    <MdGroups size={23} className="mr-3" />  <span > View Teams </span>
                                </button>
                            </Menu.Item>
                            <Menu.Item>
                                <button  className={classNames( '', 'block px-4 py-5 text-lg font-bold w-full  flex justify-start items-center  hover:text-black hover:bg-white' )}   onClick={() => setShowTeamAssignModal(true)}>
                                    <AiOutlineLink size={23} className="mr-3"  />  <span > Assign Team </span>
                                </button>
                            </Menu.Item>
                            <Menu.Item>
                                <button  className={classNames( '', 'block px-4 py-5 text-lg font-bold w-full  flex justify-start items-center  hover:text-black hover:bg-white' )}  >
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