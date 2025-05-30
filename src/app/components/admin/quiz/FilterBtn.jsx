"use client"

import Link from 'next/link'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { FiFilter } from "react-icons/fi"


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


export default function FilterBtn(){
    return (
        <>
<Menu as="div" className="relative inline-block text-left ">
      <div>
        <Menu.Button className="flex w-full justify-center gap-x-1.5 rounded-md theme-btn-bg-color px-3 py-2 text-lg font-semibold text-white shadow-sm  items-center">
            <FiFilter className="-mr-1 h-7 w-7 text-white  " aria-hidden="true" /> <span className='text-white ml-2 text-xl'>Filter</span>
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-0 btn-flag-submit shadow-lg   focus:outline-none  text-white">
          <div className="py-1">
                <Menu.Item >
                    {({ active }) => (
                        <Link href={"#"} className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : '',
                        'block px-4 py-5 text-lg font-bold w-full  flex justify-start items-center  hover:bg-blue-300 hover:text-blue-800'
                    )}>
                        Upcoming
                        </Link>
                    )}
                </Menu.Item>
                <Menu.Item >
                    {({ active }) => (
                        <Link href={"#"} className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : '',
                        'block px-4 py-5 text-lg font-bold w-full  flex justify-start items-center  hover:bg-blue-300 hover:text-blue-800'
                    )}>
                        In-Progress
                        </Link>
                    )}
                </Menu.Item>
                <Menu.Item >
                    {({ active }) => (
                        <Link href={"#"} className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : '',
                        'block px-4 py-5 text-lg font-bold w-full  flex justify-start items-center  hover:bg-blue-300 hover:text-blue-800'
                    )}>
                        End
                        </Link>
                    )}
                </Menu.Item>
            
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
        </>
    )
}
