"use client"
import Link from "next/link"
import Image from "next/image"
import SigninButton from "@/app/components/SigninButton/SigninButton"
import { usePathname } from 'next/navigation'
import styles from "./Header.module.css"
import { useSession } from "next-auth/react";
import Countdown from "react-countdown";
import { RiTimerLine } from "react-icons/ri";

import Logo from "@/app/components/Logo"

function checkLoginPath(pathname){
  return pathname === "/login" || pathname === "/register" ? true : false
  
}


function checkHomePage(pathname){
  return pathname === "/" ? true : false
}


const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <span>{hours}:{minutes}:{seconds}</span>;
  } else {
    // Render a countdown
    return <span>{hours}:{minutes}:{seconds}</span>;
  }
};

export default function Header(){
  const pathname = usePathname()
  const { data: session } = useSession();



  return (        
  
  <>
  {
    session?.user ? (
      <>
          <nav  style={{"borderBottom": "1px solid #1b1e3b"}} >
              <div className="flex flex-wrap justify-between items-center  w-full px-10 py-2">
                <Link href="/" className="flex items-center">
                  <Logo />
                  {/* {checkHomePage(pathname) ? null :  (<span className="self-center text-3xl font-semibold whitespace-nowrap  font-bolder text-white pl-3 " >Attack & <span className="text-color-2">Defense</span></span>)} */}
                </Link>
                {/* <div 
                className="rounded-lg timer_counter"
                >
                  <p 
                  className="text-2xl font-bold text-center py-3 px-10 flex items-center justify-center gap-4"
                  >
                    <RiTimerLine size={35}  />
                        <Countdown 
                      date={Date.now() + 50000} 
                       renderer={renderer}
                       precision={1}
                      zeroPadTime={2}
                      daysInHours={true}
                      />
                  </p>
                </div> */}
                {checkLoginPath(pathname) ? null :  (
                  <>
                      <div className="flex md:order-2">
                        <SigninButton />
                    </div>
                  </>
                )}
              </div>
          </nav>  
      </>
      
    ) : 
    (
      <nav className={  styles.stickyMenu} >
            <div className="container mx-auto ">
              <div className="flex flex-wrap justify-between items-center  w-full px-4 py-2">
                <Link href={"/"} className="flex items-center">
                  <Logo />
                  {/* {checkHomePage(pathname) ? null :  (<span className="self-center text-3xl font-semibold whitespace-nowrap  font-bolder text-white pl-3 " >Attack & <span className="text-color-2">Defense -  Q</span></span>)} */}
                </Link>
                {checkLoginPath(pathname) ? null :  (
                  <>
                      <div className="flex md:order-2">
                        <SigninButton />
                    </div>
                  </>
                )}
              </div>
            </div>
          </nav>
    )
  } 
    
  </>
  )
}
