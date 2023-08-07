import Image from 'next/image'

import Hero from '@/app/components/Home/Hero/Hero'
import HomeAboutUs from "@/app/components/Home/HomeAboutUs/HomeAboutUs"
// import HomeFAQ from "@/app/components/Home/HomeFAQ/HomeFAQ"


import HomeCTA from "@/app/components/Home/HomeCTA/HomeCTA"


export default function Home() {
  return (
    <Hero />
    // <main className='bg-gray-100 min-h-screen ' style={{backgroundImage: "-webkit-linear-gradient(41deg, #0d0f2d 0%, #101230 100%)"}}>
      
    //   {/* <HomeAboutUs />
    //   <HomeCTA /> */}
    //   {/* 
    //   <HomeFAQ /> */}
    // </main>
  )
}
