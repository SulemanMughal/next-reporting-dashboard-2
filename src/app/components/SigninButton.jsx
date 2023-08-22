"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

import Link from "next/link"


import { MdJoinLeft } from "react-icons/md"


import { AiOutlineLogout } from "react-icons/ai"

// import { CgProfile } from "react-icons/cg"

import { FaCircleUser } from "react-icons/fa6"

import { HiOutlineLogout , HiOutlineLogin } from "react-icons/hi"



import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

import  { MdSort } from "react-icons/md"



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


const ProfileBtn = ({username}) => {
  return (
    <button className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 flex items-center">
      <FaCircleUser size={23}  className="mr-2" /> <p className="text-md uppercase font-bold">{username}</p>
    </button>
  )
}


const LogoutBtn = () => {
  return (
    <button onClick={() => signOut()} className="block px-4 py-5 text-sm  w-full uppercase flex justify-start items-center  hover:bg-blue-300 hover:text-blue-800">
      <div className="flex">
        <HiOutlineLogout size={18} className="mr-2" /> <span>{"Sign Out"}</span>
      </div>
  </button>
  )
}


const LoginBtn = () => {
  return (
    <button type="button" onClick={() => signIn()} className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2  dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 flex items-center">
      <p  className="text-md uppercase font-bold mr-2" >Sign In</p> <HiOutlineLogin  size={23}/>
    </button>
  )
}


const JoinBtn = () => {
  return (
    <Link href="/register">
      <button className="group relative h-12  overflow-hidden rounded-lg bg-blue-700 text-lg shadow">
        <div className="absolute inset-0 w-3 bg-amber-400 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
        <span className="relative text-white group-hover:text-white flex items-center text-center mx-auto px-6 font-bold">Join <MdJoinLeft size={23} className="ml-3"/></span>
      </button>
        
    </Link>
  )
}


import { RxDashboard } from "react-icons/rx"
import {FaUserLarge} from "react-icons/fa6"
import { FaUsersCog } from "react-icons/fa"

// import { GrUserSettings } from "react-icons/gr"



// function first two initial of username
function getInitials(name) {
  // const splitName = name.toUpperCase().split(" ");
  // if (splitName.length === 1) {
  //   return splitName[0].charAt(0);
  // } else {
    
  // }
  return name.toUpperCase().charAt(0) + name.toUpperCase().charAt(0);
}



function ProfileDropDown({username, email}){


  const list = [
    [
      "/admin/dashboard",
        <RxDashboard size={25} key={156} />,
      "Dasboard"
    ],
  ]

  
  return (
      <>
<Menu as="div" className="relative inline-block text-left  mx-1 rounded-0">
    <div>
      <Menu.Button className="bg-white  text-dark  text-md p-2 rounded-full border border-4 border-double border-blue-500">{getInitials(username)}</Menu.Button>
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
              <button   className={classNames(
                active ? 'bg-gray-100 text-gray-900 ' : '',
                'block px-4 py-5 text-sm  w-full uppercase flex justify-start items-center  hover:bg-blue-300 hover:text-blue-800'
              )}>{username}</button>
            )}
          </Menu.Item>  
          <Menu.Item >
            {({ active }) => (
              <button   className={classNames(
                active ? 'bg-gray-100 text-gray-900 ' : '',
                'block px-4 py-5 text-sm  w-full uppercase flex justify-start items-center  hover:bg-blue-300 hover:text-blue-800'
              )}>
                <div className="flex">
                  <FaUserLarge size={18} className="mr-2" /> <span>{email}</span>
                </div>
              </button>
            )}
          </Menu.Item>  
          <Menu.Item >
            {({ active }) => (
              <button   className={classNames(
                active ? 'bg-gray-100 text-gray-900 ' : '',
                'block px-4 py-5 text-sm  w-full uppercase flex justify-start items-center  hover:bg-blue-300 hover:text-blue-800'
              )}>
                <div className="flex ">
                  <FaUsersCog size={18} className="mr-2" /> <span>{"Account Settings"}</span>
                </div>
              </button>
            )}
          </Menu.Item> 
          <Menu.Item >
            <LogoutBtn />
          </Menu.Item> 
           
        </div>
      </Menu.Items>
    </Transition>
  </Menu>
      </>
  )
}


const SigninButton = () => {
  const { data: session } = useSession();
  if (session && session.user) {
    return (
      <div className="flex gap-4 ml-auto items-center justify-center ">
        {/* <ProfileBtn username={session.user.name} />
        <LogoutBtn />      */}
        <ProfileDropDown  username={session.user.name} email={session.user.email}/>           
      </div>
    );
  }
  return (
    <div className="flex gap-2  items-center">
      <LoginBtn />
      <JoinBtn />
    </div>
  );
};

export default SigninButton;