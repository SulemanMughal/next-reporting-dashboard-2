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
        <Menu.Button className="flex w-full justify-center gap-x-1.5 rounded-md theme-btn-bg-color px-3 py-2 text-lg font-semibold text-white shadow-sm  items-center">
            <MdSort className="-mr-1 h-7 w-7 text-dark  " aria-hidden="true" /> <span className='text-dark ml-2 text-xl'>Sort</span>
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-0 bg-card-custom shadow-lg ">
          <div className="py-0">
            <Menu.Item >
                {({ active }) => (
                <Link href={"#"} className={classNames(
                active ? 'bg-gray-100 text-gray-900' : 'text-white',
                'block px-4 py-2 text-lg'
                )}>
                Oldest
                </Link>
                )}
            </Menu.Item>  
            <Menu.Item >
                {({ active }) => (
                <Link href={"#"} className={classNames(
                active ? 'bg-gray-100 text-gray-900' : 'text-white',
                'block px-4 py-2 text-lg'
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
