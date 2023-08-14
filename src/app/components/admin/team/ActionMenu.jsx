"use client"


import { Fragment } from 'react'
import { BsThreeDotsVertical } from "react-icons/bs"
import { Menu, Transition } from '@headlessui/react'
import { AiOutlineUserAdd , AiFillEye } from "react-icons/ai"
import { BiUserX } from "react-icons/bi"
import { MdQuiz } from "react-icons/md"


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


export default function ActionMenu({team, removeTeam , setShowAddMemberModal , setShowAddMemberModalHandler , setShowTeamDetailsModalHandler }){
  // console.debug(team)
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
          <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-0 btn-flag-submit shadow-lg ">
            <div className="py-0">
              <Menu.Item>
                  {({ active }) => (
                  <button
                    onClick={() => removeTeam(team)}
                    className={classNames(
                    active ? ' ' : 'text-white', 'block px-4 py-5 text-lg font-bold w-full  flex justify-start items-center  hover:bg-blue-300 hover:text-blue-800'
                    )}
                    >
                    <BiUserX size={23} /> <span className="ml-2">Delete Team</span>
                  </button>
                  )}
              </Menu.Item>
              {/* {
                team.quiz === null ?  (
                  <>
                    <Menu.Item>
                      {({ active }) => (
                      <button
                        
                        className={classNames(
                        active ? ' ' : 'text-white', 'block px-4 py-5 text-lg font-bold w-full  flex justify-start items-center  hover:bg-blue-300 hover:text-blue-800'
                        )}
                        >
                        <MdQuiz size={23} /> <span className="ml-2">Assign Quiz</span>
                      </button>
                      )}
                  </Menu.Item>
                  </>
                ) :  null
              } */}
              <Menu.Item>
                  {({ active }) => (
                  <button
                  onClick={() => setShowAddMemberModalHandler(team.id)}
                    className={classNames(
                    active ? ' ' : 'text-white', 'block px-4 py-5 text-lg font-bold w-full  flex justify-start items-center  hover:bg-blue-300 hover:text-blue-800'
                    )}
                    >
                    <AiOutlineUserAdd size={23} /> <span className="ml-2">Add Member</span>
                  </button>
                  )}
              </Menu.Item>
              <Menu.Item>
                  {({ active }) => (
                  <button
                    onClick={() => setShowTeamDetailsModalHandler(team.id)}
                    className={classNames(
                    active ? ' ' : 'text-white', 'block px-4 py-5 text-lg font-bold w-full  flex justify-start items-center  hover:bg-blue-300 hover:text-blue-800'
                    )}
                    >
                    <AiFillEye size={23} /> <span className="ml-2">Details</span>
                  </button>
                  )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  )
}
