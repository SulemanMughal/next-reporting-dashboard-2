"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import Link from "next/link"
import { MdJoinLeft } from "react-icons/md"
import { HiOutlineLogout , HiOutlineLogin } from "react-icons/hi"
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { classNames } from "@/app/lib/helpers"
import { getInitials } from "@/app/lib/helpers"
import {FaUserLarge} from "react-icons/fa6"
import { FaUsersCog } from "react-icons/fa"
import styles from "./SigninButton.module.css"


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
    <button className={styles.signInButton } onClick={() => signIn()}>
      Login
    </button>
  )
}







function ProfileDropDown({username, email}){

  
  return (
      <>
<Menu as="div" className="relative inline-block text-left  mx-1 rounded-0">
    <div>
      <Menu.Button className="bg-transparent  text-dark  text-md p-2 rounded-full border border-4 border-double border-color-2"><FaUserLarge size={16} className={"text-color-2"} /></Menu.Button>
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
      <Menu.Items className="absolute right-0 z-10 mt-2 w-72 origin-top-right rounded-0 btn-profile-dropdown   text-white  shadow-lg  focus:outline-none">
        <div className="py-0">
          <Menu.Item >
            {({ active }) => (
              <button   className={classNames(
                active ? 'bg-gray-100 text-gray-900 ' : '',
                'block px-4 py-5 text-sm  w-full uppercase flex justify-start items-center  '
              )}>{username}</button>
            )}
          </Menu.Item>  
          <Menu.Item >
            {({ active }) => (
              <button   className={classNames(
                active ? 'bg-gray-100 text-gray-900 ' : '',
                'block px-4 py-5 text-sm  w-full uppercase flex justify-start items-center  '
              )}>
                <div className="flex">
                  <FaUserLarge size={18} className="mr-2" /> <span>{email}</span>
                </div>
              </button>
            )}
          </Menu.Item>  
          {/* <Menu.Item >
            {({ active }) => (
              <button   className={classNames(
                active ? 'bg-gray-100 text-gray-900 ' : '',
                'block px-4 py-5 text-sm  w-full uppercase flex justify-start items-center  '
              )}>
                <div className="flex ">
                  <FaUsersCog size={18} className="mr-2" /> <span>{"Account Settings"}</span>
                </div>
              </button>
            )}
          </Menu.Item>  */}
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
        <ProfileDropDown  username={session.user.name} email={session.user.email} />           
      </div>
    );
  }
  return (
    <LoginBtn />
  );
};

export default SigninButton;