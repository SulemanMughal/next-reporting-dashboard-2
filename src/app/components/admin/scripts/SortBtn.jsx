"use client"


import Link from 'next/link'

import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
// import { ChevronDownIcon } from '@heroicons/react/20/solid'
// import { FiFilter } from "react-icons/fi"

import  { MdSort } from "react-icons/md"

// import { categories } from "@/app/data/data"


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


export default function SortBtn(){
    return (
        <>
<Menu as="div" className="relative inline-block text-left mx-2 ">
      <div>
        <Menu.Button className="bg-deep-blue-violet text-white py-2  pr-4  pl-4 mt-2 h-full border border-1 border-deep-blue-violet rounded-md mb-0 ml-0 flex justify-start items-center">
            <MdSort size={23} className="mr-2" /> <span className=''>Sort</span>
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-0 btn-flag-submit   text-white  shadow-lg  focus:outline-none">
          <div className="py-0">
            <Menu.Item >
                {({ active }) => (
                <Link href={"#"} className={classNames(
                active ? 'bg-gray-100 text-gray-900' : 'text-white',
                'block px-4 py-5 text-lg font-bold w-full  flex justify-start items-center  hover:bg-blue-300 hover:text-blue-800'
                )}>
                Oldest
                </Link>
                )}
            </Menu.Item>  
            <Menu.Item >
                {({ active }) => (
                <Link href={"#"} className={classNames(
                active ? 'bg-gray-100 text-gray-900' : 'text-white',
                'block px-4 py-5 text-lg font-bold w-full  flex justify-start items-center  hover:bg-blue-300 hover:text-blue-800'
                )}>
                    Latest
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
