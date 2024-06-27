"use client"
import Link from "next/link"
import Image from "next/image"
import SigninButton from "@/app/components/SigninButton/SigninButton"
import { usePathname } from 'next/navigation'
import styles from "./Header.module.css"
import { useSession } from "next-auth/react";

import Logo from "@/app/components/Logo"

function checkLoginPath(pathname){
  if(pathname === "/login" || pathname === "/register"){
    return true
  } else{
    return false
  }
  
}


function checkHomePage(pathname){
  if(pathname === "/"){
    return true
  } else{
    return false
  }
}

import Script from 'next/script'


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
                  <Image
                      src="/assets/img/data-security.png"
                      width={50}
                      height={50}
                      alt="Picture of the author"
                  />
                  {checkHomePage(pathname) ? null :  (<span className="self-center text-3xl font-semibold whitespace-nowrap  font-bolder text-white pl-3 " >Attack & <span className="text-cerulean-blue">Defense -  Q</span></span>)}
                </Link>
                {checkLoginPath(pathname) ? null :  (
                  <>
                      <div className="flex md:order-2">
                        <SigninButton />
                    </div>
                  </>
                )}
              </div>
          </nav>  
          {/* JavaScript Script */}
          {/* <Script id="show-banner">
            {`document.getElementsByTagName('body')[0].classList.remove('theme-color')
              document.getElementsByTagName('body')[0].classList.add('bg-deep-indigo')`}
          </Script> */}
      </>
      
    ) : 
    (
      <nav className={  styles.stickyMenu} >
            <div className="container mx-auto ">
              <div className="flex flex-wrap justify-between items-center  w-full px-4 py-2">
                <Link href={"/"} className="flex items-center">
                  <Logo />
                  {checkHomePage(pathname) ? null :  (<span className="self-center text-3xl font-semibold whitespace-nowrap  font-bolder text-white pl-3 " >Attack & <span className="text-cerulean-blue">Defense -  Q</span></span>)}
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