"use client"

import  { BsThreeDotsVertical  } from "react-icons/bs"
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { PiUsersThreeFill } from "react-icons/pi"
import { AiFillEdit } from "react-icons/ai"

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function QuizMenuBtn() {
    return (
        <>
            <Menu as="div" className="relative inline-block text-left">
                <div>
                <Menu.Button className="flex w-full justify-center border-none gap-x-1.5 rounded-md bg-none  px-3 py-2 text-lg font-semibold text-gray-500 shadow-sm  items-center">
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
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md theme-color  text-white shadow-lg  focus:outline-none">
                    <div className="py-1">
                    <Menu.Item>
                        <button  className={classNames( '', 'block px-4 py-3 text-md ' , 'flex justify-start items-center ', ' w-full hover:bg-white hover:text-black' )}  >
                            <PiUsersThreeFill size={23} className="mr-3" />  <span > View Members </span>
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
  