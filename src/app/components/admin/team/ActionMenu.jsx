"use client"


import { BsThreeDotsVertical } from "react-icons/bs"

import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { BiUserX } from "react-icons/bi"

import axios  from "axios"


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


export default function ActionMenu({team, removeTeam , addTeamMember }){

    return (
        <>
    <Menu as="div" className="relative inline-block text-left ">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md btn-flag-submit px-3 py-2 text-lg font-semibold text-white shadow-sm   border-0 ">
          <BsThreeDotsVertical />
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-0 btn-flag-submit shadow-lg text-white hover:text-black">
          <div className="py-0">
                <Menu.Item>
                    {({ active }) => (
                    <button
                    onClick={() => removeTeam(team)}
                        href="#"
                        className={classNames(
                        active ? 'bg-gray-100 ' : '',
                        'block px-4 py-5 text-lg font-bold w-full  flex justify-start items-center'
                        )}
                    >
                        <BiUserX size={23} /> <span className="ml-2">Remove Team</span>
                         
                    </button>
                    )}
                </Menu.Item>
                {/* <Menu.Item>
                    {({ active }) => (
                    <button
                        onClick={() => addTeamMember(team)}
                        href="#"
                        className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-3 text-sm w-full'
                        )}
                    >
                        Add Member
                    </button>
                    )}
                </Menu.Item> */}
              {/* <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    See Details
                  </a>
                )}
              </Menu.Item> */}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
        </>
    )
}
