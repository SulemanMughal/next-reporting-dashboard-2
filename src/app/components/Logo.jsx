"use client"

import Image from "next/image"
// import Link from "next/link"




export default function Logo(){
    return (
        <Image
            src={"/assets/img/new_logo.svg"}
            width={50}
            height={50}
            alt={"Picture of the author"}
        />
    )
}