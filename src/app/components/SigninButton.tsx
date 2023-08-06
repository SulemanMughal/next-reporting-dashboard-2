"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

import Link from "next/link"


import { MdJoinLeft } from "react-icons/md"


import { AiOutlineLogout } from "react-icons/ai"

// import { CgProfile } from "react-icons/cg"

import { FaCircleUser } from "react-icons/fa6"

import { HiOutlineLogout , HiOutlineLogin } from "react-icons/hi"


const ProfileBtn = ({username}) => {
  return (
    <button className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 flex items-center">
      <FaCircleUser size={23}  className="mr-2" /> <p className="text-md uppercase font-bold">{username}</p>
    </button>
  )
}


const LogoutBtn = () => {
  return (
    <button onClick={() => signOut()} className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 flex items-center ">
    <p  className="text-md uppercase font-bold mr-2" >Sign Out</p> <HiOutlineLogout  size={23}/>
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

const SigninButton = () => {
  const { data: session } = useSession();
  if (session && session.user) {
    return (
      <div className="flex gap-4 ml-auto">
        <ProfileBtn username={session.user.name} />
        <LogoutBtn />                
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