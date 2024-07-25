"use client"

import React,{useEffect} from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import styles from "./Hero.module.css"
import HeroImage from "@/app/components/HeroImage"
import {Animation} from "@/app/lib/Animation"
import URL_PATTERNS from "@/app/lib/urlpatterns"
import { OutlineUser  } from "@/app/lib/icons"

const AuthBtns = () => {
    return (
        <>
            <div className="my-3 py-3 flex  justify-start items-center" >
                {/* <Link href={URL_PATTERNS?.REGISTER} className={ styles.hero_register_btn + " flex justify-start items-center  w-2/5 h-full  cursor:pointer  uppercase "}  >
                    <OutlineUser  size={24} /> <span className='inline-block ml-2'>{`Register for FREE`}</span>
                </Link> */}
                <Link href={URL_PATTERNS?.LOGIN} className={  styles.hero_login_btn  + "  mx-3 h-full justify-start flex items-center   cursor:pointer  uppercase"}>
                    <span> {`Log in`} </span>
                </Link>
            </div>
        </>
    )
}

export default function Hero(){
    const { data: session } = useSession();
    const { push } = useRouter();
    useEffect(() => {
        Animation()
        if(session !== undefined && session?.user !== null){
            if(session?.user?.role === "admin"){
                push("/admin/dashboard")
            } else if (session?.user?.role === "user"){
                push("/user/dashboard")
            } 
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session])
    return  (
        <>
            <section className={styles.banner_area }>
                <div className={  "  container mx-auto   " }>
                    <div className="flex items-center justify-around" >
                        <div className="lg:w-1/2 pr-4 pl-4 flex flex-col justify-center pt-4 lg:pt-0  " data-aos="zoom-out" >
                            <h1 className="font-bold text-5xl mb-3  uppercase text-white" >{`Blueteams `}</h1>
                            <h1 className="font-bold text-5xl mb-3  uppercase text-color-2">
                                {`CTF`}
                            </h1>
                            <p className="text-1xl  text-color-6">{`A gamified platform for defenders to practice their skills in security investigations and challenges covering; Incident Response, Digital Forensics, Security Operations, Reverse Engineering, and Threat Hunting. `}</p>
                            <AuthBtns />
                        </div>
                        <div className=""  >
                            <HeroImage />
                        </div>
                    </div>
                </div>
            </section>    
        </>
    )
}