"use client"

import Image from 'next/image';
import React,{useEffect} from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import styles from "./Hero.module.css"
import { AiOutlineUser } from "react-icons/ai"


const AuthBtns = () => {
    return (
        <>
            <div className="my-3 py-3 flex  justify-start items-center" >
                <Link href={"/register"} className={ styles.theme_btn + " flex justify-start items-center  w-2/5 h-full bg-cerulean-blue text-navy-blue border border-2 border-cerulean-blue cursor:pointer hover:bg-transparent hover:border-white hover:text-white uppercase "}  >
                    <AiOutlineUser  size={24} /> <span className='inline-block ml-2'>Register for FREE</span>
                </Link>
                <Link href={"/login"} className={  styles.theme_btn  + "  mx-3 bg-transparent h-full flex items-center  text-white hover:bg-cerulean-blue border border-2 border-white hover:border-cerulean-blue hover:text-white  uppercase"}>
                 <span> Log in </span>
                </Link>
            </div>
        </>
    )
}

export default function Hero(){
    const { data: session } = useSession();
    const { push } = useRouter();
    useEffect(() => {
        AOS.init();
        if(session !== undefined && session?.user !== null){
            if(session?.user?.role === "admin"){
                push("/admin/dashboard")
            } else if (session?.user?.role === "user"){
                push("/user/dashboard")
            } 
            // else {
            //     push("/login")
            // }
        }
    }, [session])
    return  (
        <>
            <section className={styles.banner_area }>
                <div className={  "  container mx-auto   " }>
                    <div className="flex " >
                        <div className="lg:w-1/2 pr-4 pl-4 flex flex-col justify-center pt-4 lg:pt-0  " data-aos="fade-up" data-aos-delay="300" data-aos-easing="ease-out-quart" data-aos-duration="1000">
                            <h1 className="font-bold text-5xl mb-3  uppercase text-white" >Attack &  </h1>
                            <h1 className="font-bold text-5xl mb-3  uppercase text-cerulean-blue">
                                Defense - Q
                            </h1>
                            <p className="text-1xl  text-white">A gamified platform for defenders to practice their skills in security investigations and challenges covering; Incident Response, Digital Forensics, Security Operations, Reverse Engineering, and Threat Hunting. </p>
                            <AuthBtns />
                        </div>
                        
                        <div className="lg:w-1/2 pr-4 pl-4  "  >
                            <Image
                                src="/assets/img/hero-img.png"
                                className=' animated vert-move pr-0 mr-0'
                                width={700}
                                height={500}
                                alt="Picture of the author"
                                data-aos="zoom-out" data-aos-delay="300" data-aos-easing="ease-out-quart" data-aos-duration="700"
                            />
                        </div>
                    </div>
                </div>
            </section>    
        </>
    )
}