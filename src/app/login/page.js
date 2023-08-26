"use client"

import { signIn } from "next-auth/react";
import { useRef, useState } from "react"
import React, { useEffect } from 'react';
import Image from 'next/image'
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import CustomToaster from "@/app/components/CustomToaster"
import encrypt from "@/app/lib/encrypt"
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from 'next/navigation'
import CustomTriangleLoader from "@/app/components/CustomTriangleLoader"
import AOS from 'aos';
import 'aos/dist/aos.css';
import SVGLoader from "@/app/components/SVGLoader"
import  styles from "./login.module.css"


// function SVGLoader({ text = "Adding...", className = "w-full xl:w-32  xl:mr-3 align-top inline-block  py-3 px-4  font-medium text-base text-center  rounded-lg transition duration-200  ease text-white bg-deep-blue-violet" }) {
//   return (
//     <>
//       <button disabled type="button" className={className}>
//         {text}
//         <svg aria-hidden="true" role="status" className="inline w-4 h-6 ml-3 text-gray-200 animate-spin  " viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
//           <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
//           <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
//         </svg>
//       </button>

//     </>
//   )
// }

const SubmitBtn = ({ isSubmit, submitHandler }) => {
  return (
    <>
      <div className="mt-8">
        {isSubmit ? <SVGLoader text={"Login"} /> : 
          <>
            <button className="w-full xl:w-32  xl:mr-3 align-top inline-block  py-3 px-4  font-medium text-base text-center  rounded-lg transition duration-200  ease   text-white bg-deep-blue-violet" onClick={submitHandler}>Login</button>
            <p className="text-white py-3">
              or  <Link href={"/register"} className="hover:cursor-pointer pl-1 text-white"> Sign Up Here </Link>
            </p>
          </>
        }
      </div>
    </>
  )
}

function LeftImage() {
  return (
    <>
      <div className="flex flex-col items-start justify-center w-full h-full relative lg:pr-10">
        <Image src="/assets/img/data-security.png" alt="me" width={400} height={400} />
      </div>

    </>
  )
}

export default function Login() {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { push } = useRouter();
  const [isSubmit, setSubmit] = useState(false)
  const userName = useRef("");
  const pass = useRef("");
  const { data: session } = useSession();
  const pathname = usePathname()

  useEffect(() => {
    AOS.init();
    if (session !== undefined && session?.user !== null) {
      if (session?.user?.role === "admin") {
        push("/admin/dashboard")
      } else if (session?.user?.role === "user") {
        push("/user/dashboard")
      }
    }
  }, [session])

  const submitHandler = async () => {
    if (userName.current == "" || pass.current == "") {
      toast.error('All fields are required')
    } else {
      setSubmit(true)
      try {

        const encryptedData = encrypt({
          username: userName.current,
          password: pass.current,
        })
        const res = await signIn("credentials", {
          encryptedData,
          redirect: false,
          callbackUrl: "/"
        })
        if (res.error) {
          console.log(res.error)
          setSubmit(false)
          setLoading(false)
          toast.error(`Whoops! Something went wrong. These credentials do not match our records.`)
        }
        else {
          toast.success('Sign In Successfully.')
          setSubmit(false)
          setLoading(true)
          push('/');
        }
      }
      catch (err) {
        setSubmit(false)
        setLoading(false)
        toast.error(`Whoops! Something went wrong. These credentials do not match our records.`)
        console.log(err);
      }
    }
  }

  return (
    <>
      <CustomToaster />
      {loading ? (<CustomTriangleLoader height="400" width="400" className="flex justify-center items-center xl:my-32" color="#3151bc" />
      ) : error ? (
        <div>
          <p className="text-lg text-white">
            Error: {error}
          </p>
        </div>
      ) : (
        <>
        <section >

        
          <div className={"container mx-auto pt-12 login " }>
            <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-0 mr-auto mb-0 ml-auto max-w-7xl
                xl:px-5 lg:flex-row ">
              <div className="flex flex-col justify-between items-center w-full pt-5 pr-10 pb-20 pl-10 lg:pt-15 lg:flex-row ">
                <div className="w-full bg-cover relative max-w-md lg:max-w-2xl lg:w-7/12" data-aos="fade-right" data-aos-duration="600" >
                  <LeftImage />
                  <div className="text-4xl text-white font-medium mt-10">
                    Welcome back Defender. <br />
                    Keep those skills sharp!
                  </div>
                </div>
                <div className="w-full mt-20 mr-0 mb-0 ml-0 relative z-10 max-w-2xl lg:mt-0 lg:w-5/12" >
                  <div className="flex flex-col items-start justify-start pt-10 pr-10 pb-10 pl-10 bg-transparent  rounded-xl relative z-10">
                    <p className="w-full text-2xl xl:text-3xl font-bold text-left leading-snug  text-white" data-aos="fade-left" data-aos-duration="600">Sign In</p>
                    <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-4">
                      <div className="relative" data-aos="fade-left" data-aos-duration="600" data-aos-delay="100">
                        <input placeholder="Email" onChange={(e) => (userName.current = e.target.value)} type="text" className=" placeholder-gray-400 outline-0  border border-2 border-deep-blue-violet focus:border focus:border-2 focus:border-blue-900  text-white    w-full p-3 px-4  m-0 mt-2 text-base block bg-deep-indigo  rounded-md shadow-sm" />
                      </div>
                      <div className="relative" data-aos="fade-left" data-aos-duration="600" data-aos-delay="200">
                        <input placeholder="Password" onChange={(e) => (pass.current = e.target.value)} type="password" className=" placeholder-gray-400 outline-0  border border-2 border-deep-blue-violet focus:border focus:border-2 focus:border-blue-900    text-white    w-full p-3  px-4  m-0 text-base block bg-deep-indigo  rounded-md shadow-sm " />
                      </div>
                      <div className="relative" data-aos="fade-left" data-aos-duration="600" data-aos-delay="400">
                        <div className="intro-x flex text-gray-700 dark:text-gray-400 text-xs sm:text-sm mt-4">
                          <div className="flex items-center mr-auto">
                            <input type="checkbox" className="input border mr-2" id="input-remember-me" />
                            <label className="cursor-pointer select-none" htmlFor="input-remember-me">Remember me</label>
                          </div>
                          <a href="#!">
                            Forgot your password?
                          </a>
                        </div>
                      </div>
                      <div className="relative mt-5" data-aos="fade-left" data-aos-duration="600" data-aos-delay="300">
                        <SubmitBtn isSubmit={isSubmit} submitHandler={submitHandler} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        </>
      )}
    </>
  )
}



