"use client"

import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { BsArrowBarRight  } from "react-icons/bs"


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


export default function GoToQuestionDropDown({counter}){
    return (
        <>
          <Menu as="div" className="relative inline-block text-left  mx-2 rounded-0">
          <div>
            <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md theme-btn-bg-color px-3 py-2 text-lg font-semibold text-white shadow-sm ">
            <BsArrowBarRight className="-mr-1 h-7 w-7 text-white " aria-hidden="true" /> <span className='text-white ml-2 text-xl'>Go To Challenge</span>
              
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
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-0 btn-flag-submit  text-white  shadow-lg  focus:outline-none">
              <div className="py-0 ">
                {
                    [...Array(counter)].map((item, index) => (
                        <Menu.Item key={index}>
                            {({ active }) => (
                            <a
                                href="#"
                                className={classNames(
                                active ? 'bg-gray-100 text-gray-900 ' : '',
                                'block px-4 py-2 text-lg'
                                )}
                            >
                                {index+1}
                            </a>
                            )}
                        </Menu.Item>      
                    ))
                }
              </div>
            </Menu.Items>
          </Transition>
          </Menu>
        </>
    )
}
