"use client"

import classes from "./Home.module.css"


import Image from 'next/image';
import React,{useEffect} from "react";
// importing aos
import AOS from 'aos';
import 'aos/dist/aos.css';
import Link from "next/link";


export default function Hero(){
    useEffect(() => {
        AOS.init();
    }, [])
    return  (
        <>
            {/* Home Hero Section */}
            
            <div className="container mx-auto pt-32">
                <div className="flex " id="section_herosection_about">
                    <div className="lg:w-1/2 pr-4 pl-4 flex flex-col justify-center pt-4 lg:pt-0  " data-aos="fade-up" data-aos-delay="300" data-aos-easing="ease-out-quart" data-aos-duration="1000">
                        <h1 className="font-bold text-5xl mb-3  uppercase text-white" >Defensive </h1>
                        <h1 className="font-bold text-5xl mb-3  uppercase" style={{color : "#35c2f1"}}>
                        Cybersecurity
                        </h1>
                        <p className="text-1xl  text-white">An interactive platform designed for security professionals to enhance their expertise through engaging challenges and simulations across various domains, including Incident Response, Digital Forensics, Security Operations, Reverse Engineering, and Threat Hunting. </p>
                        <div className="my-3 py-3" >
                            <Link href={"/register"} className="transition ease-in-out delay-150  bg-blue-500 hover:bg-transparent text-white border-2 border-transparent hover:border-white   py-2 px-14 rounded-0    duration-300 uppercase">
                                Registration
                            </Link>
                            <Link href={"/login"} className="  transition ease-in-out delay-150 bg-transparent  hover:bg-blue-500  border-2 border-white hover:border-blue-500 text-white  py-2 px-14 rounded-0 mx-3  duration-300 uppercase">
                                Log in
                            </Link>
                            
                            
                        </div>
                        
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
            
        </>
    )
}