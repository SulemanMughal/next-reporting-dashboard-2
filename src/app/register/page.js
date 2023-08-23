"use client"

import Link from "next/link";


import { useRef, useState , useEffect } from "react"

import axios from 'axios';

// import { redirect } from 'next/navigation'

// import {useRouter} from 'next/router'

import { useSession } from "next-auth/react";


import toast, { Toaster } from 'react-hot-toast';


import { useRouter } from 'next/navigation';

import Image from 'next/image'


import AOS from 'aos';
import 'aos/dist/aos.css';

import encrypt from "@/app/lib/encrypt"
import decrypt from "@/app/lib/decrypt"



import CustomToaster from "@/app/components/CustomToaster"


function LeftImage(){
  return (
    <>
      <div className="w-full bg-cover relative max-w-md lg:max-w-2xl lg:w-7/12" data-aos="fade-right" data-aos-duration="600" >
        <div className="flex flex-col items-start justify-center w-full h-full relative lg:pr-10">
          <Image src="/assets/img/data-security.png" alt="me" width={400} height={400} />
        </div>
      </div>
    </>
  )
}


function SubmitBtn({isSubmit, submitHandler}){
  return (
    <>
<div className="relative" data-aos="fade-left" data-aos-duration="600" data-aos-delay="400">
            {isSubmit ? <button disabled type="button" className="py-2.5 px-5 mr-2 text-xl font-medium text-white bg-dark-blue rounded-lg border-0 border-gray-200 hover:bg-dark-blue  focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700  inline-flex items-center w-full justify-center">
    <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-gray-200 animate-spin " viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
    </svg>
    Registering...
</button> : 
  <div>
<button className="w-full inline-block pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center  rounded-lg transition duration-200  ease   text-white bg-dark-blue" onClick={submitHandler}>Register</button>
  <p className="text-white py-3">
    <Link href={"/login"} className="hover:cursor-pointer pl-1 text-blue-500 underline"> Already registered? </Link>
  </p>

  </div>
}
              
            </div>
    </>
  )
}




export default function Login() {

    const [isSubmit, setSubmit] = useState(false)

    const { push } = useRouter();

    const username = useRef("");
    const pass = useRef("");
    const name = useRef("")
    const { data: session } = useSession();

    
  useEffect(() => {
    AOS.init();
    if(session?.user?.role === "admin"){
      push("/admin/dashboard")
  } else if (session?.user?.role === "user"){
      push("/user/dashboard")
  } else {
      push("/login")
  }
  }, [session])

    const submitHandler = async () => {
      if(username.current == "" || pass.current == "" || name.current == ""){
        toast.error('All fields are required')
      }
      else{

      
        setSubmit(true)

        try{
          
          const encryptedData = encrypt({
            email : username.current,
            password : pass.current,
            name : name.current,
        })
            await axios.post('/api/user', {
              encryptedData
            });

            toast.success('Register Successfully.')
            push('/login');
        }
        catch (err){
            setSubmit(false)
            toast.error('Please try again after sometime')
            console.log(err);
        }
      }
    }

    

    return (
      <>
       

<CustomToaster />
<div className="container mx-auto pt-32 login ">
<div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-0 mr-auto mb-0 ml-auto max-w-7xl
      xl:px-5 lg:flex-row">
    <div className="flex flex-col items-center w-full pt-5 pr-10 pb-20 pl-10 lg:pt-20 lg:flex-row">
      <LeftImage />
      <div className="w-full mt-20 mr-0 mb-0 ml-0 relative z-10 max-w-2xl lg:mt-0 lg:w-5/12">
        <div className="flex flex-col items-start justify-start pt-10 pr-10 pb-10 pl-10 bg-transparent 
            relative z-10">
          <p className="w-full text-4xl font-medium text-white text-left leading-snug " data-aos="fade-left" data-aos-duration="600">Sign Up</p>
          <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
            <div className="relative" data-aos="fade-left" data-aos-duration="600" data-aos-delay="100">
              {/* <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">Username</p> */}
              <input placeholder="Display Name" onChange={(e) => (name.current = e.target.value)} type="text" className="placeholder-gray-400 outline-0  border border-2 border-transparent focus:border focus:border-2 focus:border-blue-500  text-white    w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-midnight-blue  rounded-md"/>
            </div>
            <div className="relative" data-aos="fade-left" data-aos-duration="600" data-aos-delay="200">
              {/* <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">Email</p> */}
              <input placeholder="Email" onChange={(e) => (username.current = e.target.value)} type="text" className="placeholder-gray-400 outline-0  border border-2 border-transparent focus:border focus:border-2 focus:border-blue-500  text-white    w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-midnight-blue  rounded-md"/>
            </div>
            <div className="relative" data-aos="fade-left" data-aos-duration="600" data-aos-delay="300">
              {/* <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">Password</p> */}
              <input placeholder="Password" onChange={(e) => (pass.current = e.target.value)} type="password" className="placeholder-gray-400 outline-0  border border-2 border-transparent focus:border focus:border-2 focus:border-blue-500  text-white    w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-midnight-blue  rounded-md"/>
            </div>

            {/* submit button */}

            <SubmitBtn  isSubmit={isSubmit} submitHandler={submitHandler} />
            
          </div>
        </div>
        
      </div>
    </div>
  </div>
</div>

      </>
    )
  }
  