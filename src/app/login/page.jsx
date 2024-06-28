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
import SVGLoader from "@/app/components/SVGLoader"
import {Animation} from "@/app/lib/Animation"
import URL_PATTERNS from "@/app/lib/urlpatterns"

const SubmitBtn = ({ isSubmit, submitHandler }) => {
  return (
    <>
      <div className="mt-8">
        {isSubmit ? <SVGLoader text={"Login"} className="submit-btn" /> : 
          <>
            <button className="submit-btn" onClick={submitHandler}>{`Login`}</button>
            
          </>
        }
        <p className="text-white py-3">
          or  <Link href={URL_PATTERNS?.REGISTER} className="hover:cursor-pointer pl-1 text-white"> {`Sign Up Here`} </Link>
        </p>
      </div>
    </>
  )
}

function LeftImage() {
  return (
    <Image src={"/assets/img/new_logo.svg"} alt="me" width={400} height={400} />
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
    // AOS.init();
    Animation()
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
                <div className="w-full bg-cover relative max-w-md lg:max-w-2xl lg:w-7/12  " data-aos="zoom-out"  >
                  <LeftImage />
                  {/* <div className="text-4xl text-white font-medium mt-10  text-color-6 mx-20">
                    <p>
                      {`Welcome back`} 
                    </p>
                  </div> */}
                </div>
                <div className="w-full mt-20 mr-0 mb-0 ml-0 relative z-10 max-w-2xl lg:mt-0 lg:w-5/12" >
                  <div className="flex flex-col items-start justify-start pt-10 pr-10 pb-10 pl-10 bg-transparent  rounded-xl relative z-10">
                    <p className="w-full text-xl xl:text-2xl font-bold text-left leading-snug  text-white" data-aos="zoom-out" >{`Sign in`}</p>
                    <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-4">
                      <div className="relative" data-aos="zoom-out"  >
                        <input placeholder="Email" onChange={(e) => (userName.current = e.target.value)} type="text" className="custom-form-control" />
                      </div>
                      <div className="relative" data-aos="zoom-out"  >
                        <input placeholder="Password" onChange={(e) => (pass.current = e.target.value)} type="password" className="custom-form-control" />
                      </div>
                      <div className="relative" data-aos="zoom-out"  >
                        <div className="intro-x flex text-gray-700 dark:text-gray-400 text-xs sm:text-sm mt-4">
                          <div className="flex items-center mr-auto">
                            <input type="checkbox" className="input border mr-2" id="input-remember-me" />
                            <label className="cursor-pointer select-none" htmlFor="input-remember-me">Remember me</label>
                          </div>
                          {/* <a href="#!">
                            Forgot your password?
                          </a> */}
                        </div>
                      </div>
                      <div className="relative mt-5" data-aos="zoom-out"  >
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