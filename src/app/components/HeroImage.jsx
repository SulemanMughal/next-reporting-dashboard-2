"use client"

import Image from "next/image"

export default function HeroImage() {
    return (
        <Image
            src={"/assets/img/Hero_Image.gif"}
            className='pr-0 mr-0'
            width={460}
            height={460}
            alt="Picture of the author"
            data-aos="zoom-out" 
            unoptimized={true}
        />
        
    )
}