"use client"

import classes from "./Home.module.css"


import Image from 'next/image';
import React,{useEffect} from "react";
// importing aos
import AOS from 'aos';
import 'aos/dist/aos.css';


export default function Hero(){
    useEffect(() => {
        AOS.init();
      }, [])
    return  (
        <>
            {/* Home Hero Section */}
            
            <section id="hero" className="flex items-center "  >

            <div className="container mx-auto sm:px-4 mt-10">
            <div className="flex flex-wrap my-10" id="section_herosection_about">
                <div className="lg:w-1/2 pr-4 pl-4 flex flex-col justify-center pt-4 lg:pt-0 order-2 lg:order-1 " data-aos="fade-up" data-aos-delay="300" data-aos-easing="ease-out-quart" data-aos-duration="1000">
                <h2 className="font-bold text-4xl mb-3 text-blue-800">Capture The Flag</h2>
                <p className="text-2xl text-black">Join A Free Continuouse Hacking Learning  Environment</p>
                
                </div>
                <div className="lg:w-1/2 pr-4 pl-4 order-1 lg:order-2 hero-img"  >
                
                <Image
                    src="/assets/img/hero-img.png"
                    className='max-w-full h-auto animated vert-move'
                    width={600}
                    height={600}
                    alt="Picture of the author"
                    data-aos="zoom-in" data-aos-delay="300" data-aos-easing="ease-out-quart" data-aos-duration="1000"
                    
                    />
                </div>
            </div>
            </div>

            </section>
        </>
    )
}