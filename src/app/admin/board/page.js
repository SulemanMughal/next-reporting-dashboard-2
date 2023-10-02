"use client"

import CustomToaster from "@/app/components/CustomToaster"
import axios from "axios";
import { BsSearch } from "react-icons/bs"
import decrypt from "@/app/lib/decrypt"
import {   useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import AOS from 'aos';
import 'aos/dist/aos.css';

import { countries } from "@/app/lib/helpers"
import { useSession } from "next-auth/react";

import Image from "next/image"
// import  { MdGroups } from "react-icons/md"
// import { GrShieldSecurity } from "react-icons/gr";
import { GiFireShield } from "react-icons/gi";


import CustomTriangleLoader from "@/app/components/CustomTriangleLoader"
import Link from "next/link";




// import CustomToaster from "@/app/components/CustomToaster"
// import axios from "axios";
// import { BsSearch } from "react-icons/bs"
// import decrypt from "@/app/lib/decrypt"
// import { useEffect, useState } from "react";
// import { toast } from "react-hot-toast";
// import AOS from 'aos';
// import 'aos/dist/aos.css';

// import { countries } from "@/app/lib/helpers"


// import Image from "next/image"



function calculateTotalObtainedPoints(answers) {
    return answers.reduce((total, answer) => total + answer.obtainedPoints, 0);
}

function LastSubmitAnswerCategory(answers) {
    let sortedAnswers = answers.sort((a, b) => new Date(a.submittedAt) - new Date(b.submittedAt))
    return sortedAnswers[0] || "N/A"
}

function calculateTotalPoints(questions){
    return questions.reduce((total, item) => total + item.points, 0)
}


const getInitials = (name) => {
    return name.charAt(0).toUpperCase() + name.charAt(1).toUpperCase()
}


function CountryOptions(){
    return (
      <>
        {countries.map(country => (
          <option key={country.code} value={country.code}>
            {country.name}
          </option>
        ))}
      </>
      
    )
  }
  

  const SearchInput = () => {
    return (
      <div className="relative mx-3">
        <input
          type="text"
          placeholder="Search by user name"
          className="placeholder-columbia-blue outline-0  border border-2 border-transparent focus:border focus:border-2 focus:border-blue-900    text-white    w-full  pl-2 py-2 mt-2 mr-0 mb-0 ml-0 text-base block bg-deep-blue-violet  rounded-md flex justify-between items-center"
        />
        <button
          type="button"
          className="w-4 h-4 absolute inset-y-0 mt-5 mb-auto mr-3 right-0 text-white"
        >
            <BsSearch className="h-4 w-4 " />
        </button>
      </div>
    );
};

function FilterResetBtn(){
    return (
        <>
            <div>
                <button type="button" className=" bg-deep-blue-violet text-white py-2  pr-4  pl-4 mt-2  h-full border border-1 border-deep-blue-violet rounded-md mb-0 ml-0 " >Reset Filters</button>
            </div>
        </>

    )
}


function FilterByCountry(){
    return (
        <>
            <div className="relative" data-aos="fade-left" data-aos-duration="600" data-aos-delay="250">
              <select name="country" id="country" className="appearance-none placeholder-gray-400 outline-0  border border-2 border-deep-blue-violet focus:border focus:border-2 focus:border-blue-900  text-gray-400    w-full p-2 pl-4 pr-8   m-0 mt-2 text-base block bg-deep-indigo  rounded-md shadow-sm" onChange={(e) => country.current = e.target.value}>
                <CountryOptions />                                
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
        </>
    )
}


const DataRowHeader = () =>{
    return (
        <>
            <div className="grid gap-3 auto-rows-fr  grid-cols-5  py-5 px-7 text-xl  text-white rounded-xl place-items-center mb-5">
                <div className=" w-full col-span-1 relative ">
                    <h1 className=" ">
                        #
                    </h1>
                </div>
                <div className=" w-full col-span-1 relative  text-center">
                    <h1 className=" ">
                        Profile
                    </h1>
                </div>
                <div className="w-full col-span-1 relative text-center">
                    <h1 className=" ">
                        Team 
                    </h1>
                </div>
                <div className="w-full col-span-1 relative text-center">
                    <h1 className=" ">
                        Points
                    </h1>
                </div>

                <div className="w-full col-span-1 relative text-center">
                    <h1 className=" ">
                        Latest Submission
                    </h1>
                </div>

            </div>
        </>
    )
}





const DataRow = ({index , item}) =>{
    // console.debug(item)
    const totalPoints = item?.team?.answers.reduce((sum, obj) => sum + obj.obtainedPoints, 0);
    console.debug(item)
    return (
        <>
            <div className="grid gap-3 auto-rows-fr  grid-cols-5  py-5 px-7 text-xl bg-card-custom text-white rounded-xl place-items-center mb-5" data-aos="fade-left" data-aos-duration="500" data-aos-delay={index * 100}>
                <div className="flex  items-center w-full col-span-1 relative ">
                    <h1 className=" ">
                        {index}
                    </h1>
                </div>
                <div className="flex  justify-center items-center w-full col-span-1 relative border border-2 border-gray-500 border-t-0 border-r-0 border-b-0  ">
                    <button className="bg-white  text-black  text-md p-2 rounded-full border border-4 border-double border-blue-500 mr-3">
                        {getInitials(item.user.name)}
                    </button>
                    <h1 className=" ">
                        {item.user.name}
                    </h1>
                </div>
                <div className="w-full col-span-1 relative border border-2 border-gray-500 border-t-0 border-r-0 border-b-0 text-center">
                    <h1 className=" p-2">
                        {item.team.name}
                    </h1>
                </div>
                <div className="w-full col-span-1 relative border border-2 border-gray-500 border-t-0 border-r-0 border-b-0 text-center">
                    <h1 className=" text-yellow-500 font-bold p-2">
                        {totalPoints}
                    </h1>
                </div>

                <div className="w-full col-span-1 relative border border-2 border-gray-500 border-t-0 border-r-0 border-b-0 text-center">
                    <h1 className=" ">
                        {item.question?.scenario?.category || null}
                    </h1>
                    <span className="block text-sm text-green-500  pt-1    ">{"+" + ` ${item.obtainedPoints}` + " Points"}</span>
                </div>
                
                
                

            </div>
        </>
    )
}

function CountryDefendersCounter({country}){
    // console.debug({country})
    return (
        <>
            {
                country.country !== null ? (
                    <>
                        <div className="intro-x items-center m-auto w-48 lg:w-1/6 text-gray-300 mb-5">
                            <div className="box px-2 flex items-center zoom-in ">
                                <div className="w-10 h-10 flex-none image-fit overflow-hidden">
                                    <Image  width={40} height={40}  alt="United States" src={`/assets/img/flags/${country?.country || "PK"}.png`} />
                                </div>
                                <div className="ml-4 mr-auto">
                                    <div className="font-medium">{country.country === "" ? "Pakistan" : country.country}</div>
                                    <div className="text-gray-400 text-xs">{country._count.email} Defenders</div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : null
            }
        </>
    )
}



function TopScoreHeaderRow({usersGroupedByCountry}){
    return (
        <div className="mb-10 grid  auto-rows-fr gap-3 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 "   data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="500">
            {/* <div className="intro-y col-span-1 flex flex-wrap sm:flex-nowrap items-center mt-2 pl-5 pr-5 pb-5 pt-5 bg-deep-blue-violet rounded box ">
                <div className="mr-auto col-span-3 text-lg text-gray-300 w-full">
                        252 points left to <b style={{"color":"#55E6C1"}}>
                        Defender
                    </b>

                    <div className="w-full h-9 mt-2 bg-deep-indigo border-deep-indigo rounded">
                        <div style={{"width":"2%"}} className="h-full bg-deep-blue rounded text-center text-white">2%</div>
                    </div>
                    
                </div>
                <Image  width={"90"}  height={"90"} className="rounded-full w-16 ml-3" src="/assets/img/RaM4kXNrsL0Nx38H3zmi.png" alt="asdas" />
            </div> */}
            {/* <div className="intro-y col-span-4 flex flex-wrap items-center mt-2 pl-5 pb-5 pt-5 bg-deep-blue-violet rounded box text-gray-300" style={{"zIndex":"20"}}>     
           
    
            
                <div className="intro-x items-center m-auto w-48 lg:w-1/6 text-gray-300 mb-5">
                    <div className="box px-2 flex items-center zoom-in cursor-default">
                        <div className="w-10 h-10 flex-none image-fit overflow-hidden">
                            <Image  width={40} height={40}  alt="United States" src="/assets/img/US.png" />
                        </div>
                        <div className="ml-4 mr-auto">
                            <div className="font-medium">United States</div>
                            <div className="text-gray-400 text-xs">3622 Defenders</div>
                        </div>
                    </div>
                </div>

            
                <div className="intro-x items-center m-auto w-48 lg:w-1/6 text-gray-300">
                    <div className="box px-2 flex items-center zoom-in cursor-default">
                        <div className="w-10 h-10 flex-none image-fit overflow-hidden">
                            <Image  width={40} height={40}  alt="United States" src="/assets/img/IN.png" />
                        </div>
                        <div className="ml-4 mr-auto">
                            <div className="font-medium">India</div>
                            <div className="text-gray-400 text-xs">2027 Defenders</div>
                        </div>
                    </div>
                </div>

            
                <div className="intro-x items-center m-auto w-48 lg:w-1/6">
                    <div className="box px-2 flex items-center zoom-in cursor-default">
                        <div className="w-10 h-10 flex-none image-fit overflow-hidden">
                            
                            <Image  width={40} height={40}  alt="United States" src="/assets/img/GB.png" />
                        </div>
                        <div className="ml-4 mr-auto">
                            <div className="font-medium">United Kingdom</div>
                            <div className="text-gray-400 text-xs">1341 Defenders</div>
                        </div>
                    </div>
                </div>

            
                <div className="intro-x items-center m-auto w-48 lg:w-1/6">
                    <div className="box px-2 flex items-center zoom-in cursor-default">
                        <div className="w-10 h-10 flex-none image-fit overflow-hidden">
                            <Image  width={40} height={40}  alt="United States" src="/assets/img/AU.png" />
                        </div>
                        <div className="ml-4 mr-auto">
                            <div className="font-medium">Australia</div>
                            <div className="text-gray-400 text-xs">771 Defenders</div>
                        </div>
                    </div>
                </div>

            
                <div className="intro-x items-center m-auto w-48 lg:w-1/6">
                    <div className="box px-2 flex items-center zoom-in cursor-default">
                        <div className="w-10 h-10 flex-none image-fit overflow-hidden">
                            <Image  width={40} height={40}  alt="United States" src="/assets/img/ID.png" />
                        </div>
                        <div className="ml-4 mr-auto">
                            <div className="font-medium">Indonesia</div>
                            <div className="text-gray-400 text-xs">693 Defenders</div>
                        </div>
                    </div>
                </div>

            
                <div className="intro-x items-center m-auto w-48 lg:w-1/6">
                    <div className="box px-2 flex items-center zoom-in cursor-default">
                        <div className="w-10 h-10 flex-none image-fit overflow-hidden">
                            <Image  width={40} height={40}  alt="United States" src="/assets/img/NP.png" />
                        </div>
                        <div className="ml-4 mr-auto">
                            <div className="font-medium">Nepal</div>
                            <div className="text-gray-400 text-xs">580 Defenders</div>
                        </div>
                    </div>
                </div>

            
                <div className="intro-x items-center m-auto w-48 lg:w-1/6">
                    <div className="box px-2 flex items-center zoom-in cursor-default">
                        <div className="w-10 h-10 flex-none image-fit overflow-hidden">
                            <Image  width={40} height={40}  alt="United States" src="/assets/img/FR.png" />
                        </div>
                        <div className="ml-4 mr-auto">
                            <div className="font-medium">France</div>
                            <div className="text-gray-400 text-xs">569 Defenders</div>
                        </div>
                    </div>
                </div>

            
                <div className="intro-x items-center m-auto w-48 lg:w-1/6">
                    <div className="box px-2 flex items-center zoom-in cursor-default">
                        <div className="w-10 h-10 flex-none image-fit overflow-hidden">
                            <Image  width={40} height={40}  alt="United States" src="/assets/img/CA.png" />
                        </div>
                        <div className="ml-4 mr-auto">
                            <div className="font-medium">Canada</div>
                            <div className="text-gray-400 text-xs">418 Defenders</div>
                        </div>
                    </div>
                </div>

            
                <div className="intro-x items-center m-auto w-48 lg:w-1/6">
                    <div className="box px-2 flex items-center zoom-in cursor-default">
                        <div className="w-10 h-10 flex-none image-fit overflow-hidden">
                            <Image  width={40} height={40}  alt="United States" src="/assets/img/IT.png" />
                        </div>
                        <div className="ml-4 mr-auto">
                            <div className="font-medium">Italy</div>
                            <div className="text-gray-400 text-xs">407 Defenders</div>
                        </div>
                    </div>
                </div>

            
                <div className="intro-x items-center m-auto w-48 lg:w-1/6">
                    <div className="box px-2 flex items-center zoom-in cursor-default">
                        <div className="w-10 h-10 flex-none image-fit overflow-hidden">
                            <Image  width={40} height={40}  alt="United States" src="/assets/img/TH.png" />
                        </div>
                        <div className="ml-4 mr-auto">
                            <div className="font-medium">Thailand</div>
                            <div className="text-gray-400 text-xs">407 Defenders</div>
                        </div>
                    </div>
                </div>

            
                <div className="intro-x items-center m-auto w-48 lg:w-1/6">
                    <div className="box px-2 flex items-center zoom-in cursor-default">
                        <div className="w-10 h-10 flex-none image-fit overflow-hidden">
                            <Image  width={40} height={40}  alt="United States" src="/assets/img/BR.png" />
                        </div>
                        <div className="ml-4 mr-auto">
                            <div className="font-medium">Brazil</div>
                            <div className="text-gray-400 text-xs">397 Defenders</div>
                        </div>
                    </div>
                </div>

            
                <div className="intro-x items-center m-auto w-48 lg:w-1/6">
                    <div className="box px-2 flex items-center zoom-in cursor-default">
                        <div className="w-10 h-10 flex-none image-fit overflow-hidden">
                            <Image  width={40} height={40}  alt="United States" src="/assets/img/DE.png" />
                        </div>
                        <div className="ml-4 mr-auto">
                            <div className="font-medium">Germany</div>
                            <div className="text-gray-400 text-xs">354 Defenders</div>
                        </div>
                    </div>
                </div>

                        
            </div> */}
            <div className="intro-y col-span-4 flex flex-wrap items-center mt-2 pl-5 pb-5 pt-5 bg-deep-blue-violet rounded box text-gray-300" style={{"zIndex":"20"}}>
                {usersGroupedByCountry && usersGroupedByCountry.map((country , index) => (
                    <CountryDefendersCounter country={country} key={index} />
                ))}
            </div>
        </div>
    )
}


function TopScoringUsers({users , totalUsers}){
    return (
        <>
             <div className="mb-10 grid  auto-rows-fr gap-3 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 "   data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="500">
                {/* <div>
                    Total Number of Defenders
                </div> */}
                <div className="intro-y col-span-1 flex flex-wrap sm:flex-nowrap items-center mt-2 pl-5 pr-5 pb-5 pt-5 bg-deep-blue-violet rounded box ">
                <div className="mr-auto col-span-3 text-lg text-gray-300 w-full">
                    Total Defenders 
                    <div className="w-full h-9 mt-2 text-green-400 border-deep-indigo rounded">
                        {/* <div  className="h-full bg-deep-blue rounded text-center text-white">{totalUsers}%</div> */}
                       
                        <b  style={{"color":"#55E6C1"}} className="text-5xl"> {totalUsers} </b>
                    </div>
                </div>

                {/* Defender Image */}
                {/* <Image  width={"90"}  height={"90"} className="rounded-full w-16 ml-3" src="/assets/img/RaM4kXNrsL0Nx38H3zmi.png" alt="asdas" /> */}
                </div>
                <div className="intro-y col-span-3 flex flex-wrap items-center mt-2 pl-5 pb-5 pt-5 bg-deep-blue-violet rounded box text-gray-300  justify-start" style={{"zIndex":"20"}}>
                    {/* <div className="box px-2 flex items-center zoom-in justify-start mx-4">
                        <div className="w-14 h-14 flex-none image-fit overflow-hidden items-center">
                            <div className="relative inline-block text-left   rounded-0" data-headlessui-state=""><div><button className="bg-white  text-black  text-md p-3 px-4 rounded-full border border-4 border-double border-blue-500" id="headlessui-menu-button-:r0:" type="button" aria-haspopup="menu" aria-expanded="false" data-headlessui-state="">{"Total Defenders"}</button></div></div>
                        </div>
                        <div className="ml-4 mr-auto">
                            <div className="font-bold mb-1 text-lg">{ "asd"}</div>
                            <div className="text-yellow-400 text-sm">{0} Points</div>
                        </div>
                    </div> */}
                    {users && users.map((user , index) => (
                        user !== null ? (
                                <div className="intro-x items-center  w-48 lg:w-1/6 text-gray-300 mb-5"  key={index}>
                                    <div className="box px-2 flex items-center zoom-in justify-start mx-4">
                                        <div className="w-14 h-14 flex-none image-fit overflow-hidden items-center">
                                            <div className="relative inline-block text-left   rounded-0" data-headlessui-state=""><div><button className="bg-white  text-black  text-md p-3 px-4 rounded-full border border-4 border-double border-blue-500" id="headlessui-menu-button-:r0:" type="button" aria-haspopup="menu" aria-expanded="false" data-headlessui-state="">{user.name.charAt(0).toUpperCase()}</button></div></div>
                                        </div>
                                        <div className="ml-1 mr-auto">
                                            <div className="font-medium mb-1 text-md">{user.name.toUpperCase() }</div>
                                            <div className="text-yellow-400 text-xs">{user.total_points} Points</div>
                                        </div>
                                    </div>
                                </div>
                        ) : null
                    ))}
                    
                </div>
             </div>
        </>
    )
}



function UserProgress(){
    return (
        <>
            <div className="intro-y col-span-12 overflow-auto lg:overflow-visible text-gray-300 mb-8">
            <table className="table table-report table-auto -mt-2 ">
                <thead>
                    <tr>
                        <th className="text-center whitespace-nowrap" style={{"width":"0.5%" , "border":"0px", "padding":"0px", "paddingLeft":"20px"}}></th>
                        <th className="whitespace-nowrap" style={{"width":"1%"}}></th>
                        <th className="whitespace-nowrap pl-0" style={{"paddingLeft":"0px"}}></th>
                        <th className="whitespace-nowrap w-1/12 text-center"></th>
                        <th className="whitespace-nowrap w-1/12 text-center"></th>
                        <th className="whitespace-nowrap w-1/6 text-center"></th>
                        <th className="text-center whitespace-nowrap w-1/12"></th>
                        <th className="text-center whitespace-nowrap w-1/6"></th>
                        <th className="text-center whitespace-nowrap"></th>
                    </tr>
                </thead>
                <tbody className="py-5 px-7">
                        <tr className="intro-x bg-deep-blue-violet rounded" >
                            <td className="text-center border-0 pl-7 pr-0" >
                                <h3>18415</h3>
                            </td>
                            <td className=" py-3  px-5">
                                <div className="flex">
                                    <div className="w-10 h-10 image-fit zoom-in">
                                        <Image width={40} height={40} style={{"border":"2px solid #b0b6bb"}} className="rounded-full border-opacity-100" src="/assets/img/download.png" alt="asdasd" />
                                    </div>
                                </div>
                            </td>
                            <td className="pl-0" style={{"paddingLeft":"0px"}}>
                                <a href="#!" className="font-medium whitespace-nowrap pl-0 text-base">Suleman</a>
                                
                            </td>
                            <td className="table-report__action text-center place-content-center ">
                                <div  className="relative z-50 inline-flex">
                                    <div  className="cursor-pointer w-16 h-14 image-fit zoom-in">
                                        <Image width="64" height={48} className="ml-auto mr-auto" src="/assets/img/PK.png" title="Pakistan" tooltip-content="Pakistan" alt="asdasd" />
                                    </div>
                                    <div className="relative"  style={{"display": "none"}}>
                                        <div className="absolute top-0 text-center z-50 w-32 p-2 -mt-1 text-sm leading-tight text-white transform -translate-x-3/4 -translate-y-full bg-theme-4 rounded-lg shadow-lg" style={{"--transform-translate-x": "-75%"}}>
                                            Pakistan
                                        </div>
                                        <svg className="absolute z-50 w-6 h-6 text-theme-4 transform -translate-x-12 -translate-y-3 fill-current stroke-current" width="8" height="8">
                                            <rect x="12" y="-10" width="8" height="8" transform="rotate(45)"></rect>
                                        </svg>
                                    </div>
                                </div>
                            </td>
                            <td className="w-40 table-report__action">
                    <div className="flex mt-2 mb-2">
                        <div  className="relative z-50 inline-flex items-center">
                                <div  className="cursor-pointer w-16 h-16 image-fit zoom-in ml-5 ">
                                    <Image className="border-0" title="Complete 10 reverse engineering investigations" tooltip-content="Complete 10 reverse engineering investigations" src="/assets/img/trmosfctekjabzffgvip.png" width={64} height={64} alt="asdas" />
                                    
                                </div>
                                <p className="ml-5">{"Team-1"}</p>
                                <div className="relative"  style={{"display": "none"}}>
                                    <div className="absolute top-0 text-center z-50 w-32 p-2 -mt-1 text-sm leading-tight text-white transform -translate-x-3/4 -translate-y-full bg-theme-4 rounded-lg shadow-lg" style={{"--transform-translate-x": "-75%", "zIndex":"100"}}>
                                    {"Team-1"}
                                    </div>
                                    <svg className="absolute z-50 w-6 h-6 text-theme-4 transform -translate-x-12 -translate-y-3 fill-current stroke-current" width="8" height="8">
                                        <rect x="12" y="-10" width="8" height="8" transform="rotate(45)"></rect>
                                    </svg>
                                </div>
                            </div>
                            {/* <div  className="relative z-50 inline-flex">
                                <div  className="cursor-pointer w-16 h-16 image-fit zoom-in ml-5">
                                    <Image className="border-0" title="Complete 20 reverse engineering investigations" tooltip-content="Complete 20 reverse engineering investigations" src="/assets/img/kydjwswcmhagkadmazux.png" width={64} height={64} alt="sadas"  />
                                </div>
                                <div className="relative"  style={{"display": "none"}}>
                                    <div className="absolute top-0 text-center z-50 w-32 p-2 -mt-1 text-sm leading-tight text-white transform -translate-x-3/4 -translate-y-full bg-theme-4 rounded-lg shadow-lg" style={{"--transform-translate-x": "-75%", "zIndex":"100"}}>
                                        Complete 20 reverse engineering investigations
                                    </div>
                                    <svg className="absolute z-50 w-6 h-6 text-theme-4 transform -translate-x-12 -translate-y-3 fill-current stroke-current" width="8" height="8">
                                        <rect x="12" y="-10" width="8" height="8" transform="rotate(45)"></rect>
                                    </svg>
                                </div>
                            </div>
                            <div  className="relative z-50 inline-flex">
                                <div  className="cursor-pointer w-16 h-16 image-fit zoom-in ml-5">
                                    <Image className="border-0" title="Got First-Blood on a Challenge or Investigation" tooltip-content="Got First-Blood on a Challenge or Investigation" src="/assets/img/dj8ndasiJSDi2jsiJSAOD.png" width={64} height={64} alt="sadas"  />
                                </div>
                                <div className="relative"  style={{"display": "none"}}>
                                    <div className="absolute top-0 text-center z-50 w-32 p-2 -mt-1 text-sm leading-tight text-white transform -translate-x-3/4 -translate-y-full bg-theme-4 rounded-lg shadow-lg" style={{"--transform-translate-x": "-75%", "zIndex":"100"}}>
                                        Got First-Blood on a Challenge or Investigation
                                    </div>
                                    <svg className="absolute z-50 w-6 h-6 text-theme-4 transform -translate-x-12 -translate-y-3 fill-current stroke-current" width="8" height="8">
                                        <rect x="12" y="-10" width="8" height="8" transform="rotate(45)"></rect>
                                    </svg>
                                </div>
                            </div> */}
                                                        </div>
                </td>
                            {/* <td className="table-report__action text-center ">
                                <p style={{"color":"#55E6C1"}} className="text-base">Initiate
                                </p>
                            </td> */}
                            <td className="w-40 table-report__action ">
                                <div className="flex mt-2 mb-2">
                                                                    </div>
                            </td>

                            <td className="text-center table-report__action text-lg text-yellow-400">4</td>
                                <td className="text-center table-report__action text-base">
                                    <a href="#!" className="font-medium whitespace-nowrap">Phishing Analysis 2</a>
                                    <div className="text-green-600 text-xs whitespace-nowrap"> + 1 points</div>
                                </td>
                            
                            <td className="table-report__action w-56">
                                <div className="flex justify-center items-center">
                                    <a className="flex items-center mr-3" href="#!">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-eye w-4 h-4 mr-1"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg> View Profile </a>
                                </div>
                            </td>
                        </tr>
                </tbody>
            </table>
        </div>
        </>
    )
}


// function UserProgressHeader(){
//     return (
//         <>
//         <div className="intro-y col-span-12 overflow-auto lg:overflow-visible text-gray-300 mb-8">
//             <table className="table table-report table-auto -mt-2 ">
//                 <thead>
//                     {/* <tr>
//                         <th className="text-center whitespace-nowrap" style={{"width":"0.5%" , "border":"0px", "padding":"0px", "paddingLeft":"20px"}}></th>
//                         <th className="whitespace-nowrap" style={{"width":"1%"}}></th>
//                         <th className="whitespace-nowrap pl-0" style={{"paddingLeft":"0px"}}></th>
//                         <th className="whitespace-nowrap w-1/12 text-center"></th>
//                         <th className="whitespace-nowrap w-1/12 text-center"></th>
//                         <th className="whitespace-nowrap w-1/6 text-center"></th>
                        
//                         <th className="text-center whitespace-nowrap w-1/12"></th>
//                         <th className="text-center whitespace-nowrap w-1/6"></th>
//                         <th className="text-center whitespace-nowrap"></th>
//                     </tr> */}
//                     <tr className="text-white ">
//                         <th className="text-center whitespace-nowrap" style={{"width":"0.5%", "border":"0px", "padding":"0px", "paddingLeft":"20px"}}></th>
//                         <th className="whitespace-nowrap" style={{"width":"1%"}}></th>
//                         <th className="whitespace-nowrap pl-0 text-start" style={{"paddingLeft":"0px"}}></th>
//                         <th className="whitespace-nowrap w-1/12 text-center"></th>
//                         {/* <th className="whitespace-nowrap w-1/12 text-center">Rank</th> */}
//                         <th className="whitespace-nowrap w-1/6 text-center"></th>
//                         <th className="text-center whitespace-nowrap w-1/12"></th>
//                         <th className="text-center whitespace-nowrap w-1/6"></th>
//                         <th className="text-center whitespace-nowrap"></th>
//                     </tr>
//                 </thead>
//                 <tbody className="py-5 px-7">
// <tr className="intro-x " style={{"zIndex": "40 !important"}}>
//                 <td className="text-center" style={{"border":"0px", "paddingLeft":"20px", "paddingRight":"0px"}}>
//                     <h3>{"18415"}</h3>
//                 </td>
//                 <td className="">
//                     {/* <div className="flex">
//                         <div className="w-10 h-10 image-fit zoom-in">
//                             <Image style={{"border":"2px solid #c90076"}} alt="asdasd" width={40} height={40} className="rounded-full border-opacity-100" src="/assets/img/48Gxpjc6W9oVa1mwbSu5TX1VmaFJxxeNp2MiI7dC.png" />
//                         </div>
//                     </div> */}
//                     <div className="flex">
//                                     <div className="w-10 h-10 image-fit zoom-in">
//                                         <Image width={40} height={40} style={{"border":"2px solid #b0b6bb"}} className="rounded-full border-opacity-100" src="/assets/img/download.png" alt="asdasd" />
//                                     </div>
//                                 </div>
//                 </td>
//                 <td className="pl-0" style={{"paddingLeft":"0px"}}>
//                     <a href="#!" className="font-medium whitespace-nowrap pl-0 text-base">{"User_1"}</a>
//                     {/* <span className="ml-3 px-2 py-1 rounded font-bold bg-yellow-400 uppercase text-theme-3 text-xs text-black">PRO</span> */}
//                 </td>
//                 <td className="table-report__action text-center place-content-center">
//                     <div  className="relative z-50 inline-flex">
//                         <div  className="cursor-pointer w-16 h-14 image-fit zoom-in">
//                             <Image width={"65"} height={48} className="ml-auto mr-auto" src="/assets/img/US.png"   alt="asdasd" />
//                         </div>
//                         <div className="relative"  style={{"display": "none"}}>
//                             <div className="absolute top-0 text-center z-50 w-32 p-2 -mt-1 text-sm leading-tight text-white transform -translate-x-3/4 -translate-y-full bg-theme-4 rounded-lg shadow-lg" style={{"--transform-translate-x": "-75%"}}>
//                                 United States
//                             </div>
//                             <svg className="absolute z-50 w-6 h-6 text-theme-4 transform -translate-x-12 -translate-y-3 fill-current stroke-current" width="8" height="8">
//                                 <rect x="12" y="-10" width="8" height="8" transform="rotate(45)"></rect>
//                             </svg>
//                         </div>
//                     </div>
//                 </td>
//                 {/* rank */}
//                 {/* <td className="table-report__action text-center">
//                     <p style={{"color":"#EAB543"}} className="text-base">Guardian
//                     </p>
//                 </td> */}
//                 {/* badges */}
//                 <td className="w-40 table-report__action">
//                     <div className="flex mt-2 mb-2">
//                         <div  className="relative z-50 inline-flex items-center">
//                                 <div  className="cursor-pointer w-16 h-16 image-fit zoom-in ml-5 ">
//                                     <Image className="border-0" title="Complete 10 reverse engineering investigations" tooltip-content="Complete 10 reverse engineering investigations" src="/assets/img/trmosfctekjabzffgvip.png" width={64} height={64} alt="asdas" />
                                    
//                                 </div>
//                                 <p className="ml-5">{"Team-1"}</p>
//                                 <div className="relative"  style={{"display": "none"}}>
//                                     <div className="absolute top-0 text-center z-50 w-32 p-2 -mt-1 text-sm leading-tight text-white transform -translate-x-3/4 -translate-y-full bg-theme-4 rounded-lg shadow-lg" style={{"--transform-translate-x": "-75%", "zIndex":"100"}}>
//                                     {"Team-1"}
//                                     </div>
//                                     <svg className="absolute z-50 w-6 h-6 text-theme-4 transform -translate-x-12 -translate-y-3 fill-current stroke-current" width="8" height="8">
//                                         <rect x="12" y="-10" width="8" height="8" transform="rotate(45)"></rect>
//                                     </svg>
//                                 </div>
//                             </div>
//                             {/* <div  className="relative z-50 inline-flex">
//                                 <div  className="cursor-pointer w-16 h-16 image-fit zoom-in ml-5">
//                                     <Image className="border-0" title="Complete 20 reverse engineering investigations" tooltip-content="Complete 20 reverse engineering investigations" src="/assets/img/kydjwswcmhagkadmazux.png" width={64} height={64} alt="sadas"  />
//                                 </div>
//                                 <div className="relative"  style={{"display": "none"}}>
//                                     <div className="absolute top-0 text-center z-50 w-32 p-2 -mt-1 text-sm leading-tight text-white transform -translate-x-3/4 -translate-y-full bg-theme-4 rounded-lg shadow-lg" style={{"--transform-translate-x": "-75%", "zIndex":"100"}}>
//                                         Complete 20 reverse engineering investigations
//                                     </div>
//                                     <svg className="absolute z-50 w-6 h-6 text-theme-4 transform -translate-x-12 -translate-y-3 fill-current stroke-current" width="8" height="8">
//                                         <rect x="12" y="-10" width="8" height="8" transform="rotate(45)"></rect>
//                                     </svg>
//                                 </div>
//                             </div>
//                             <div  className="relative z-50 inline-flex">
//                                 <div  className="cursor-pointer w-16 h-16 image-fit zoom-in ml-5">
//                                     <Image className="border-0" title="Got First-Blood on a Challenge or Investigation" tooltip-content="Got First-Blood on a Challenge or Investigation" src="/assets/img/dj8ndasiJSDi2jsiJSAOD.png" width={64} height={64} alt="sadas"  />
//                                 </div>
//                                 <div className="relative"  style={{"display": "none"}}>
//                                     <div className="absolute top-0 text-center z-50 w-32 p-2 -mt-1 text-sm leading-tight text-white transform -translate-x-3/4 -translate-y-full bg-theme-4 rounded-lg shadow-lg" style={{"--transform-translate-x": "-75%", "zIndex":"100"}}>
//                                         Got First-Blood on a Challenge or Investigation
//                                     </div>
//                                     <svg className="absolute z-50 w-6 h-6 text-theme-4 transform -translate-x-12 -translate-y-3 fill-current stroke-current" width="8" height="8">
//                                         <rect x="12" y="-10" width="8" height="8" transform="rotate(45)"></rect>
//                                     </svg>
//                                 </div>
//                             </div> */}
//                                                         </div>
//                 </td>
//                 <td className="text-center table-report__action text-lg text-yellow-400">{"asd"}</td>
//                 <td className="text-center table-report__action text-base">
//                     <a href="#!" className="font-medium whitespace-nowrap text-gray-300">{"Security Operations" || null}</a>
//                     <div className="text-green-600 text-xs whitespace-nowrap">{"+" + ` ${"1231"}` + " Points"}</div>
//                 </td>
//                 <td className="table-report__action w-56">
//                     <div className="flex justify-center items-center">
//                         <a className="flex items-center mr-3 text-gray-300" href="#!">
//                             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-eye w-4 h-4 mr-1"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg> View Profile </a>
//                     </div>
//                 </td>
//             </tr>
//                 </tbody>
//             </table>
//         </div>
            
//         </>
//     )
// }

function UserProgressHeader({userData}){

    // console.debug(userData)
    return (
        <>
        <div className="intro-y col-span-12 overflow-auto lg:overflow-visible text-gray-300 mb-8" data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="500">
            <table className="table table-report table-auto -mt-2 ">
                <thead>
                    <tr className="text-white ">
                        <th className="text-center whitespace-nowrap" style={{"width":"0.5%", "border":"0px", "padding":"0px", "paddingLeft":"20px"}}></th>
                        <th className="whitespace-nowrap" style={{"width":"1%"}}></th>
                        <th className="whitespace-nowrap pl-0 text-start" style={{"paddingLeft":"0px"}}></th>
                        <th className="whitespace-nowrap w-1/12 text-center"></th>
                        <th className="whitespace-nowrap w-1/6 text-center"></th>
                        <th className="text-center whitespace-nowrap w-1/12"></th>
                        <th className="text-center whitespace-nowrap w-1/6"></th>
                        <th className="text-center whitespace-nowrap"></th>
                    </tr>
                </thead>
                <tbody className="py-5 px-7">
                <tr className="intro-x " style={{"zIndex": "40 !important"}}>
                <td className="text-center" style={{"border":"0px", "paddingLeft":"20px", "paddingRight":"0px"}}>
                    <h3>{" "}</h3>
                </td>
                <td className="">
                    {/* <div className="flex">
                        <div className="w-10 h-10 image-fit zoom-in">
                            <Image style={{"border":"2px solid #c90076"}} alt="asdasd" width={40} height={40} className="rounded-full border-opacity-100" src="/assets/img/48Gxpjc6W9oVa1mwbSu5TX1VmaFJxxeNp2MiI7dC.png" />
                        </div>
                    </div> */}
                    <div className="flex">
                    <div className="w-10 h-10 image-fit zoom-in">
                        {/* <Image width={40} height={40} style={{"border":"2px solid #b0b6bb"}} className="rounded-full border-opacity-100" src="/assets/img/download.png" alt="asdasd" /> */}
                        <button className="bg-white  text-columbia-blue  text-md p-2 rounded-full border border-4 border-double border-blue-500">
                                {getInitials(userData?.name)}
                        </button>
                    </div>
                </div>
                </td>
                <td className="pl-0" style={{"paddingLeft":"0px"}}>
                    <a href="#!" className="font-medium whitespace-nowrap pl-0 text-base">{userData?.name}</a>
                    {/* <span className="ml-3 px-2 py-1 rounded font-bold bg-yellow-400 uppercase text-theme-3 text-xs text-black">PRO</span> */}
                </td>
                <td className="table-report__action text-center place-content-center">
                    <div  className="relative z-50 inline-flex">
                        <div  className=" w-16 h-14 image-fit zoom-in">
                            <Image width={"65"} height={48} className="ml-auto mr-auto" src={`/assets/img/flags/${userData?.country || "PK"}.png`}   alt="asdasd" />
                        </div>
                        {/* <div className="relative"  style={{"display": "none"}}>
                            <div className="absolute top-0 text-center z-50 w-32 p-2 -mt-1 text-sm leading-tight text-white transform -translate-x-3/4 -translate-y-full bg-theme-4 rounded-lg shadow-lg" style={{"--transform-translate-x": "-75%"}}>
                                United States
                            </div>
                            <svg className="absolute z-50 w-6 h-6 text-theme-4 transform -translate-x-12 -translate-y-3 fill-current stroke-current" width="8" height="8">
                                <rect x="12" y="-10" width="8" height="8" transform="rotate(45)"></rect>
                            </svg>
                        </div> */}
                    </div>
                </td>
                {/* rank */}
                {/* <td className="table-report__action text-center">
                    <p style={{"color":"#EAB543"}} className="text-base">Guardian
                    </p>
                </td> */}
                

                {/* Team Name */}
                <td className="w-40 table-report__action">
                    <div className="flex mt-2 mb-2">
                        <div  className="relative z-50 inline-flex items-center">
                                <div  className="cursor-pointer w-16 h-16 image-fit zoom-in ml-5 ">
                                    {/* <Image className="border-0" title="Complete 10 reverse engineering investigations" tooltip-content="Complete 10 reverse engineering investigations" src="/assets/img/trmosfctekjabzffgvip.png" width={64} height={64} alt="asdas" /> */}
                                    
                                </div>
                                <p className="ml-5">{userData?.team.name}</p>
                                {/* <div className="relative"  style={{"display": "none"}}>
                                    <div className="absolute top-0 text-center z-50 w-32 p-2 -mt-1 text-sm leading-tight text-white transform -translate-x-3/4 -translate-y-full bg-theme-4 rounded-lg shadow-lg" style={{"--transform-translate-x": "-75%", "zIndex":"100"}}>
                                    {"Team-1"}
                                    </div>
                                    <svg className="absolute z-50 w-6 h-6 text-theme-4 transform -translate-x-12 -translate-y-3 fill-current stroke-current" width="8" height="8">
                                        <rect x="12" y="-10" width="8" height="8" transform="rotate(45)"></rect>
                                    </svg>
                                </div> */}
                            </div>    
                        </div>
                </td>

                {/* total obtainedPoints for a user */}
                <td className="text-center table-report__action text-lg text-yellow-400">{calculateTotalObtainedPoints(userData?.answers)}</td>
                <td className="text-center table-report__action text-base">
                    {/* Last Submission CAtegory */}
                    <a href="#!" className="font-medium whitespace-nowrap text-gray-300">{LastSubmitAnswerCategory(userData?.answers)?.question?.scenario?.category || "N/A"}</a>
                    <div className="text-green-600 text-xs whitespace-nowrap">{"+" + ` ${LastSubmitAnswerCategory(userData?.answers)?.obtainedPoints || 0}` + " Points"}</div>
                </td>
                <td className="table-report__action w-56">
                    <div className="flex justify-center items-center">
                        <Link className="flex items-center mr-3 text-gray-300" href={`/user/${userData?.id}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-eye w-4 h-4 mr-1"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                            View Profile 
                        </Link>
                    </div>
                </td>
            </tr>
                </tbody>
            </table>
        </div>
            
        </>
    )
}

// const PaginationBlock = ({paginationData}) => {
//     return (
//         <>
//             <div className="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center mt-5 mb-14 justify-end"  data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="500">
//                 <div>
//                     <nav role="navigation" aria-label="Pagination Navigation" className="flex items-center justify-between">
//                         {/* <div className="flex justify-between flex-1 sm:hidden">
//                             <span>
//                                 <span className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 rounded-md select-none">
//                                     « Previous
//                                 </span>
//                             </span>
//                             <span>
//                                 <button type="button"  dusk="nextPage.before" className="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 leading-5 rounded-md hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150">
//                                     Next »
//                                 </button>
//                             </span>
//                         </div> */}

//                         <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
//                             <div>
//                                 <p className="text-sm text-gray-400 leading-5">
//                                     <span>Showing</span>
//                                     <span className="font-medium mx-2">{paginationData.startIndex}</span>
//                                     <span>to</span>
//                                     <span className="font-medium mx-2">{paginationData.endIndex}</span>
//                                     <span>of</span>
//                                     <span className="font-medium mx-2">{paginationData.total_results}</span>
//                                     <span className="mr-3">results</span>
//                                 </p>
//                             </div>

//                             <div>
                                
//                                 <span className="relative z-0 inline-flex rounded-md shadow-sm">
//                                     {
//                                         (currentPage === "1" ) ? (
//                                             <>
//                                                 <span>    
//                                                     <span aria-disabled="true" aria-label="&amp;laquo; Previous">
//                                                         <span className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default rounded-l-md leading-5" aria-hidden="true">
//                                                             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                                                                 <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path>
//                                                             </svg>
//                                                         </span>
//                                                     </span>
//                                                 </span>
//                                             </>
//                                         ) : (
//                                             <span>    
//                                                 <span aria-disabled="true" aria-label="&amp;laquo; Previous">
//                                                     <span className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default rounded-l-md leading-5" aria-hidden="true">
//                                                         <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                                                             <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path>
//                                                         </svg>
//                                                     </span>
//                                                 </span>
//                                             </span>
//                                         )
//                                     }
//                                     <span>    
//                                         <span aria-disabled="true" aria-label="&amp;laquo; Previous">
//                                             <span className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default rounded-l-md leading-5" aria-hidden="true">
//                                                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                                                     <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path>
//                                                 </svg>
//                                             </span>
//                                         </span>
//                                     </span>
//                                     <span key="paginator-page-1-page1">
//                                         <span aria-current="page">
//                                             <span className="relative inline-flex items-center px-4 py-2 -ml-px text-lg font-bold  text-dark bg-white border border-gray-300 cursor-default leading-5 select-none ">1</span>
//                                         </span>
//                                     </span>
//                                                                                 <span key="paginator-page-1-page2">
//                                                                                                 <button type="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-700 bg-white border border-gray-300 leading-5 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150" aria-label="Go to page 2">
//                                                             2
//                                                         </button>
//                                                                                         </span>
//                                                                                 <span key="paginator-page-1-page3">
//                                                                                                 <button type="button"  className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-700 bg-white border border-gray-300 leading-5 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150" aria-label="Go to page 3">
//                                                             3
//                                                         </button>
//                                                                                         </span>
//                                                                                 <span key="paginator-page-1-page4">
//                                                                                                 <button type="button"  className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-700 bg-white border border-gray-300 leading-5 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150" aria-label="Go to page 4">
//                                                             4
//                                                         </button>
//                                                                                         </span>
//                                                                                 <span key="paginator-page-1-page5">
//                                                                                                 <button type="button"  className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-700 bg-white border border-gray-300 leading-5 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150" aria-label="Go to page 5">
//                                                             5
//                                                         </button>
//                                                                                         </span>
//                                                                                 <span key="paginator-page-1-page6">
//                                                                                                 <button type="button"  className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-700 bg-white border border-gray-300 leading-5 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150" aria-label="Go to page 6">
//                                                             6
//                                                         </button>
//                                                                                         </span>
//                                                                                 <span key="paginator-page-1-page7">
//                                                                                                 <button type="button"  className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-700 bg-white border border-gray-300 leading-5 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150" aria-label="Go to page 7">
//                                                             7
//                                                         </button>
//                                                                                         </span>
//                                                                                 <span key="paginator-page-1-page8">
//                                                                                                 <button type="button"  className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-700 bg-white border border-gray-300 leading-5 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150" aria-label="Go to page 8">
//                                                             8
//                                                         </button>
//                                                                                         </span>
//                                                                                 <span> 
//                                                                                                 <button type="button"  className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-700 bg-white border border-gray-300 leading-5 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150" aria-label="Go to page 9">
//                                                             9
//                                                         </button>
//                                                                                         </span>
//                                                                                 <span>
//                                                                                                 <button type="button"  className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-700 bg-white border border-gray-300 leading-5 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150" aria-label="Go to page 10">
//                                                             10
//                                                         </button>
//                                                                                         </span>
                                                                                                                            
//                                                                         <span aria-disabled="true">
//                                                 <span className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-700 bg-white border border-gray-300 cursor-default leading-5 select-none">...</span>
//                                             </span>
                                        
                                        
                                                                                            
                                        
                                        
//                                                                                                             <span key="paginator-page-1-page1962">
//                                                                                                 <button type="button"  className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-700 bg-white border border-gray-300 leading-5 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150" aria-label="Go to page 1962">
//                                                             1962
//                                                         </button>
//                                                                                         </span>
//                                                                                 <span key="paginator-page-1-page1963">
//                                                                                                 <button type="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-700 bg-white border border-gray-300 leading-5 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150" aria-label="Go to page 1963">
//                                                             1963
//                                                         </button>
//                                                                                         </span>
                                                                                                
//                                     <span>
                                        
//                                                                         <button type="button"  dusk="nextPage.after" rel="next" className="relative inline-flex items-center px-2 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md leading-5 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150" aria-label="Next &amp;raquo;">
//                                                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                                                     <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
//                                                 </svg>
//                                             </button>
//                                                                 </span>
//                                 </span>
//                             </div>
//                         </div>
//                     </nav>
//                 </div>
//         </div>
//         </>
//     )
// }


const PaginationBlock =  ({currentPage , totalPages , startIndex , endIndex , totalResults , handleCurrentPageChange , handlePreviousPage , handleNextPage , handleRecordsPerPage , total_number_of_users_per_page}) => {
    return (
        <>
            <div className="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center mt-5 mb-14 justify-end"  data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="500">
                <div  >
                    <nav role="navigation" aria-label="Pagination Navigation" className="flex items-center justify-between">
                        {(currentPage === totalPages) ? (
                            <>
                                <div role="status" aria-live="polite" className="text-sm text-gray-400 leading-5" title={`Page ${currentPage} of ${totalPages}`}>Showing <b>{startIndex}</b> to <b>{totalResults}</b> of <b>{totalResults}</b> results</div>
                            </>
                        ) : (
                            <>
                                <div role="status" aria-live="polite" className="text-sm text-gray-400 leading-5" title={`Page ${currentPage} of ${totalPages}`}>Showing <b>{startIndex}</b> to <b>{endIndex}</b> of <b>{totalResults}</b> results</div>
                            </>
                        )}
                    <div className="relative z-0 inline-flex rounded-md shadow-sm ml-4">
                        {
                        (totalPages > 4) ? (
                                <>
                                {
                                (currentPage === 1  ) ? ( 
                                    <>
                                    
                                    <button  tabIndex="0" role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-lg font-extrabold text-gray-900 bg-white border border-gray-300 cursor-default leading-5 select-none rounded-l-md " title={"Page " + currentPage} aria-label={"Page " + currentPage}>{currentPage}</button>
                                    <button onClick={() => handleCurrentPageChange(currentPage+1)} tabIndex="0" role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none " title={"Page " + (currentPage+1)} aria-label={"Page " + currentPage+1}>{currentPage+1}</button>
                                    <button onClick={() => handleCurrentPageChange(currentPage+2)} tabIndex="0" role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none " title={"Page " + (currentPage+2)} aria-label={"Page " + currentPage+2}>{currentPage+2}</button>
                                    <button   tabIndex="-1" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none ">...</button>
                                    <button tabIndex="0" role="button" title={`Page ${totalPages}`} aria-label={`Page ${totalPages}`} onClick={() => handleCurrentPageChange(totalPages)} className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none " >{totalPages}</button>
                                    <button  onClick={() => handleNextPage(currentPage)} tabIndex="0" role="button" disabled="" title="Next" aria-label="Next" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none rounded-r-md"  >Next</button>
                                    </>
                                ) : (
                                    ( currentPage === 2) ? (
                                    <>
                                        <button tabIndex="0" role="button" disabled="" title="Previous" aria-label="Previous" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none rounded-l-md" onClick={() => handlePreviousPage(currentPage)}  >Previous</button>
                                        <button onClick={() => handleCurrentPageChange(currentPage-1)} tabIndex="0" role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none " title={"Page " + (currentPage - 1)} aria-label={"Page " + currentPage-1}>{currentPage-1}</button>
                                        <button  tabIndex="0" role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-lg font-extrabold text-gray-900 bg-white border border-gray-300 cursor-default leading-5 select-none " title={"Page " + currentPage} aria-label={"Page " + currentPage}>{currentPage}</button>
                                        <button onClick={() => handleCurrentPageChange(currentPage+1)} tabIndex="0" role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none " title={"Page " + (currentPage+1)} aria-label={"Page " + currentPage+1}>{currentPage+1}</button>
                                        <button   tabIndex="-1" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none ">...</button>
                                        <button tabIndex="0"  onClick={() => handleCurrentPageChange(totalPages)} role="button" title={`Page ${totalPages}`} aria-label={`Page ${totalPages}`} className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none " >{totalPages}</button>
                                        <button  onClick={() => handleNextPage(currentPage)} tabIndex="0" role="button" disabled="" title="Next" aria-label="Next" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none  rounded-r-md"  >Next</button>
                                    </>
                                    ) : (
                                    (( currentPage === 3) ? (
                                        <>
                                            <button tabIndex="0" role="button" disabled="" title="Previous" aria-label="Previous" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none rounded-l-md" onClick={() => handlePreviousPage(currentPage)}  >Previous</button>
                                            <button onClick={() => handleCurrentPageChange(1)} tabIndex="0" role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none " title={"Page " + 1} aria-label={"Page " + 1}>{1}</button>
                                            <button   tabIndex="-1" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none ">...</button>
                                            <button onClick={() => handleCurrentPageChange(currentPage-1)} tabIndex="0" role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none " title={("Page " + (currentPage-1)) || "Page - "} aria-label={"Page " + currentPage-1}>{currentPage-1}</button>
                                            <button  tabIndex="0" role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-lg font-extrabold text-gray-900 bg-white border border-gray-300 cursor-default leading-5 select-none " title={"Page " + currentPage} aria-label={"Page " + currentPage}>{currentPage}</button>
                                            <button onClick={() => handleCurrentPageChange(currentPage+1)} tabIndex="0" role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none " title={"Page " + (currentPage + 1)} aria-label={"Page " + currentPage+1}>{currentPage+1}</button>
                                            <button   tabIndex="-1" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none ">...</button>
                                            <button tabIndex="0" role="button" title={`Page ${totalPages}`} aria-label={`Page ${totalPages}`} onClick={() => handleCurrentPageChange(totalPages)} className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none " >{totalPages}</button>
                                            <button  onClick={() => handleNextPage(currentPage)} tabIndex="0" role="button" disabled="" title="Next" aria-label="Next" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none rounded-r-md"  >Next</button>
                                        </>
                                    ) : ((currentPage === totalPages) ? ( 
                                        <>
                                        <button tabIndex="0" role="button" disabled="" title="Previous" aria-label="Previous" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none rounded-l-md" onClick={() => handlePreviousPage(currentPage)}  >Previous</button>
                                        <button onClick={() => handleCurrentPageChange(1)} tabIndex="0" role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none " title={"Page " + 1} aria-label={"Page " + 1}>{1}</button>
                                        <button   tabIndex="-1" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none ">...</button>
                                        <button onClick={() => handleCurrentPageChange(currentPage-2)} tabIndex="0" role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none " title={"Page " + (currentPage-2)} aria-label={"Page " + currentPage-2}>{currentPage-2}</button>
                                        <button onClick={() => handleCurrentPageChange(currentPage-1)} tabIndex="0" role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none " title={"Page " + (currentPage-1)} aria-label={"Page " + currentPage-1}>{currentPage-1}</button>
                                        <button  tabIndex="0" role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-lg font-extrabold text-gray-900 bg-white border border-gray-300 cursor-default leading-5 select-none  rounded-r-md" title={"Page " + currentPage} aria-label={"Page " + currentPage}>{currentPage}</button>
                                        </>
                                    ) : (( currentPage === totalPages-1) ? ( 
                                        <>
                                        <button tabIndex="0" role="button" disabled="" title="Previous" aria-label="Previous" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none rounded-l-md" onClick={() => handlePreviousPage(currentPage)}  >Previous</button>
                                        <button onClick={() => handleCurrentPageChange(1)} tabIndex="0" role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none " title={"Page " + 1} aria-label={"Page " + 1}>{1}</button>
                                        <button  tabIndex="-1" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none ">...</button>
                                        <button onClick={() => handleCurrentPageChange(currentPage-1)} tabIndex="0" role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none " title={"Page " + (currentPage-1)} aria-label={"Page " + currentPage-1}>{currentPage-1}</button>
                                        <button  tabIndex="0" role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-lg font-extrabold text-gray-900 bg-white border border-gray-300 cursor-default leading-5 select-none " title={"Page " + currentPage} aria-label={"Page " + currentPage}>{currentPage}</button>
                                        <button tabIndex="0" role="button" title={`Page ${totalPages}`} aria-label={`Page ${totalPages}`}  onClick={() => handleCurrentPageChange(currentPage+1)} className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none "  >{totalPages}</button>
                                        <button  onClick={() => handleNextPage(currentPage)} tabIndex="0" role="button" disabled="" title="Next" aria-label="Next" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none rounded-r-md"  >Next</button>
                                        </>
                                    ) : (( currentPage === totalPages-2) ? (
                                        <>
                                        <button tabIndex="0" role="button" disabled="" title="Previous" aria-label="Previous" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none rounded-l-md" onClick={() => handlePreviousPage(currentPage)}  >Previous</button>
                                        <button onClick={() => handleCurrentPageChange(1)} tabIndex="0" role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none " title={"Page " + 1} aria-label={"Page " + 1}>{1}</button>
                                        <button  tabIndex="-1" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none ">...</button>
                                        <button  tabIndex="0" role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-lg font-extrabold text-gray-900 bg-white border border-gray-300 cursor-default leading-5 select-none " title={"Page " + currentPage} aria-label={"Page " + currentPage}>{currentPage}</button>
                                        <button onClick={() => handleCurrentPageChange(currentPage+1)} tabIndex="0" role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none " title={"Page " + (currentPage+1)} aria-label={"Page " + currentPage+1}>{currentPage+1}</button>
                                        <button tabIndex="0" role="button" title={`Page ${totalPages}`} aria-label={`Page ${totalPages}`}  onClick={() => handleCurrentPageChange(currentPage+2)} className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none " >{totalPages}</button>
                                        <button  onClick={() => handleNextPage(currentPage)} tabIndex="0" role="button" disabled="" title="Next" aria-label="Next" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none rounded-r-md"  >Next</button>
                                        </>
                                    ) : (
                                        (
                                        <>
                                            <button tabIndex="0" role="button" disabled="" title="Previous" aria-label="Previous" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none rounded-l-md" onClick={() => handlePreviousPage(currentPage)}  >Previous</button>
                                            <button onClick={() => handleCurrentPageChange(1)} tabIndex="0" role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none " title={"Page " + 1} aria-label={"Page " + 1}>{1}</button>
                                            <button  onClick={() => handleCurrentPageChange(totalPages)} tabIndex="-1" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none ">...</button>
                                            <button onClick={() => handleCurrentPageChange(currentPage-1)} tabIndex="0" role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none " title={"Page " + (currentPage-1)} aria-label={"Page " + currentPage-1}>{currentPage-1}</button>
                                            <button  tabIndex="0" role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-lg font-extrabold text-gray-900 bg-white border border-gray-300 cursor-default leading-5 select-none " title={"Page " + currentPage} aria-label={"Page " + currentPage}>{currentPage}</button>
                                            <button onClick={() => handleCurrentPageChange(currentPage+1)} tabIndex="0" role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none " title={"Page " + (currentPage+1)} aria-label={"Page " + currentPage+1}>{currentPage+1}</button>
                                            <button  onClick={() => handleCurrentPageChange(totalPages)} tabIndex="-1" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none ">...</button>
                                            <button tabIndex="0" role="button" title={`Page ${totalPages}`} aria-label={`Page ${totalPages}`}  onClick={() => handleCurrentPageChange(totalPages)} className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none "  >{totalPages}</button>
                                            <button  onClick={() => handleNextPage(currentPage)} tabIndex="0" role="button" disabled="" title="Next" aria-label="Next" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none rounded-r-md"  >Next</button>
                                        </>
                                        )
                                    ))
                                    )
                                    )
                                    )
                                    ))
                                }   
                                </>
                        ) : (
                            <>
                                {
                                (currentPage === 1  ) ? ( 
                                    <>
                                        
                                        {
                                            (totalPages === 4) ? (
                                                <>
                                                    <button  tabIndex="0" role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-lg font-extrabold text-gray-900 bg-white border border-gray-300 cursor-default leading-5 select-none rounded-l-md " title={"Page " + currentPage} aria-label={"Page " + currentPage} >{currentPage}</button>
                                                    <button onClick={() => handleCurrentPageChange(currentPage+1)} tabIndex="0" role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none" title={"Page " + (currentPage+1)} aria-label={"Page " + currentPage+1}>{currentPage+1}</button>
                                                    <button onClick={() => handleCurrentPageChange(currentPage+2)} tabIndex="0" role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none" title={"Page " + (currentPage+2)} aria-label={"Page " + currentPage+2}>{currentPage+2}</button>
                                                    <button onClick={() => handleCurrentPageChange(currentPage+3)} tabIndex="0" role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none" title={"Page " + (currentPage+3)} aria-label={"Page " + currentPage+3}>{currentPage+3}</button>
                                                    <button  onClick={() => handleNextPage(currentPage)} tabIndex="0" role="button" disabled="" title="Next" aria-label="Next" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none rounded-r-md"  >Next</button>
                                                </>
                                            ) : (
                                                (totalPages === 3) ? (
                                                    <>
                                                    <button  tabIndex="0" role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-lg font-extrabold text-gray-900 bg-white border border-gray-300 cursor-default leading-5 select-none rounded-l-md " title={"Page " + currentPage} aria-label={"Page " + currentPage} >{currentPage}</button>
                                                        <button onClick={() => handleCurrentPageChange(currentPage+1)} tabIndex="0" role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none" title={"Page " + (currentPage+1)} aria-label={"Page " + currentPage+1}>{currentPage+1}</button>
                                                        <button onClick={() => handleCurrentPageChange(currentPage+2)} tabIndex="0" role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none" title={"Page " + (currentPage+2)} aria-label={"Page " + currentPage+2}>{currentPage+2}</button>
                                                        <button  onClick={() => handleNextPage(currentPage)} tabIndex="0" role="button" disabled="" title="Next" aria-label="Next" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none rounded-r-md"  >Next</button>
                                                    </>
                                                ) : (
                                                    (totalPages === 2) ? (
                                                        <>
                                                        <button  tabIndex="0" role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-lg font-extrabold text-gray-900 bg-white border border-gray-300 cursor-default leading-5 select-none rounded-l-md " title={"Page " + currentPage} aria-label={"Page " + currentPage} >{currentPage}</button>
                                                            <button onClick={() => handleCurrentPageChange(currentPage+1)} tabIndex="0" role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none" title={"Page " + (currentPage+1)} aria-label={"Page " + currentPage+1}>{currentPage+1}</button>
                                                            <button  onClick={() => handleNextPage(currentPage)} tabIndex="0" role="button" disabled="" title="Next" aria-label="Next" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none rounded-r-md"  >Next</button>
                                                        </>
                                                    ) : (
                                                        <button  tabIndex="0" role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-lg font-extrabold text-gray-900 bg-white border border-gray-300 cursor-default leading-5 select-none rounded-l-md  rounded-r-md  " title={"Page " + currentPage} aria-label={"Page " + currentPage} >{currentPage}</button>
                                                    )
                                                )
                                            )
                                        }
                                        
                                    </>
                                ) : (
                                    ( currentPage === 2) ? (
                                        <>
                                            {
                                                (totalPages === 4) ? (
                                                    <>
                                                        <button tabIndex="0" role="button" disabled="" title="Previous" aria-label="Previous" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none rounded-l-md" onClick={() => handlePreviousPage(currentPage)}  >Previous</button>
                                                        <button onClick={() => handleCurrentPageChange(currentPage-1)} tabIndex="0" role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none" title={"Page " + (currentPage - 1)} aria-label={"Page " + currentPage-1}>{currentPage-1}</button>
                                                        <button  tabIndex="0" role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-lg font-extrabold text-gray-900 bg-white border border-gray-300 cursor-default leading-5 select-none" title={"Page " + currentPage} aria-label={"Page " + currentPage}>{currentPage}</button>
                                                        <button onClick={() => handleCurrentPageChange(currentPage+1)} tabIndex="0" role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none" title={"Page " + (currentPage+1)} aria-label={"Page " + currentPage+1}>{currentPage+1}</button>
                                                        <button onClick={() => handleCurrentPageChange(currentPage+2)} tabIndex="0" role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none" title={"Page " + (currentPage+2)} aria-label={"Page " + currentPage+2}>{currentPage+2}</button>
                                                        <button  onClick={() => handleNextPage(currentPage)} tabIndex="0" role="button" disabled="" title="Next" aria-label="Next" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none rounded-r-md"  >Next</button>
                                                    </>
                                                ) : (
                                                    (totalPages === 3) ? (
                                                        <>
                                                            <button tabIndex="0" role="button" disabled="" title="Previous" aria-label="Previous" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none rounded-l-md" onClick={() => handlePreviousPage(currentPage)}  >Previous</button>
                                                            <button onClick={() => handleCurrentPageChange(currentPage-1)} tabIndex="0" role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none" title={"Page " + (currentPage - 1)} aria-label={"Page " + currentPage-1}>{currentPage-1}</button>
                                                            <button  tabIndex="0" role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-lg font-extrabold text-gray-900 bg-white border border-gray-300 cursor-default leading-5 select-none" title={"Page " + currentPage} aria-label={"Page " + currentPage}>{currentPage}</button>
                                                            <button onClick={() => handleCurrentPageChange(currentPage+1)} tabIndex="0" role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none" title={"Page " + (currentPage+1)} aria-label={"Page " + currentPage+1}>{currentPage+1}</button>
                                                            <button  onClick={() => handleNextPage(currentPage)} tabIndex="0" role="button" disabled="" title="Next" aria-label="Next" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none rounded-r-md"  >Next</button>
                                                        </>
                                                    ) : (
                                                            (totalPages === 2) ? (
                                                                <>
                                                                    <button tabIndex="0" role="button" disabled="" title="Previous" aria-label="Previous" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none rounded-l-md" onClick={() => handlePreviousPage(currentPage)}  >Previous</button>
                                                                    <button onClick={() => handleCurrentPageChange(currentPage-1)} tabIndex="0" role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none" title={"Page " + (currentPage - 1)} aria-label={"Page " + currentPage-1}>{currentPage-1}</button>
                                                                    <button  tabIndex="0" role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-lg font-extrabold text-gray-900 bg-white border border-gray-300 cursor-default leading-5 select-none rounded-r-md" title={"Page " + currentPage} aria-label={"Page " + currentPage}>{currentPage}</button>
                                                                </>
                                                            ) : null
                                                    )
                                                )
                                            }
                                        </>
                                    ) : (
                                    (( currentPage === 3) ? (
                                        <>
                                            {
                                                (totalPages === 4) ? (
                                                    <>
                                                        <button tabIndex="0" role="button" disabled="" title="Previous" aria-label="Previous" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none rounded-l-md" onClick={() => handlePreviousPage(currentPage)}  >Previous</button>
                                                        <button onClick={() => handleCurrentPageChange(1)} tabIndex="0" role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none" title={"Page " + 1} aria-label={"Page " + 1}>{1}</button>
                                                        <button onClick={() => handleCurrentPageChange(currentPage-1)} tabIndex="0" role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none" title={("Page " + (currentPage-1)) || "Page - "} aria-label={"Page " + currentPage-1}>{currentPage-1}</button>
                                                        <button  tabIndex="0" role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-lg font-extrabold text-gray-900 bg-white border border-gray-300 cursor-default leading-5 select-none" title={"Page " + currentPage} aria-label={"Page " + currentPage}>{currentPage}</button>
                                                        <button onClick={() => handleCurrentPageChange(currentPage+1)} tabIndex="0" role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none" title={"Page " + (currentPage + 1)} aria-label={"Page " + currentPage+1}>{currentPage+1}</button>
                                                        <button  onClick={() => handleNextPage(currentPage)} tabIndex="0" role="button" disabled="" title="Next" aria-label="Next" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none rounded-r-md"  >Next</button>
                                                    </>
                                                ) : (totalPages === 3) ? (
                                                    <>
                                                        <button tabIndex="0" role="button" disabled="" title="Previous" aria-label="Previous" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none rounded-l-md" onClick={() => handlePreviousPage(currentPage)}  >Previous</button>
                                                        <button onClick={() => handleCurrentPageChange(1)} tabIndex="0" role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none" title={"Page " + 1} aria-label={"Page " + 1}>{1}</button>
                                                        <button onClick={() => handleCurrentPageChange(currentPage-1)} tabIndex="0" role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none" title={("Page " + (currentPage-1)) || "Page - "} aria-label={"Page " + currentPage-1}>{currentPage-1}</button>
                                                        <button  tabIndex="0" role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-lg font-extrabold text-gray-900 bg-white border border-gray-300 cursor-default leading-5 select-none rounded-r-md" title={"Page " + currentPage} aria-label={"Page " + currentPage}>{currentPage}</button>
                                                        {/* <button onClick={() => handleCurrentPageChange(currentPage+1)} tabIndex="0" role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none" title={"Page " + (currentPage + 1)} aria-label={"Page " + currentPage+1}>{currentPage+1}</button> */}
                                                        {/* <button  onClick={() => handleNextPage(currentPage)} tabIndex="0" role="button" disabled="" title="Next" aria-label="Next" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none rounded-r-md"  >Next</button> */}
                                                    </>
                                                ) : null
                                            }
                                        </>
                                    ) : ((currentPage === totalPages) ? ( 
                                        <>
                                        <button tabIndex="0" role="button" disabled="" title="Previous" aria-label="Previous" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none rounded-l-md" onClick={() => handlePreviousPage(currentPage)}  >Previous</button>
                                        <button onClick={() => handleCurrentPageChange(1)} tabIndex="0" role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none" title={"Page " + 1} aria-label={"Page " + 1}>{1}</button>
                                        <button onClick={() => handleCurrentPageChange(currentPage-2)} tabIndex="0" role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none" title={"Page " + (currentPage-2)} aria-label={"Page " + currentPage-2}>{currentPage-2}</button>
                                        <button onClick={() => handleCurrentPageChange(currentPage-1)} tabIndex="0" role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none" title={"Page " + (currentPage-1)} aria-label={"Page " + currentPage-1}>{currentPage-1}</button>
                                        <button  tabIndex="0" role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-lg font-extrabold text-gray-900 bg-white border border-gray-300 cursor-default leading-5 select-none rounded-r-md" title={"Page " + currentPage} aria-label={"Page " + currentPage}>{currentPage}</button>
                                        </>
                                    ) : null
                                    )
                                    )
                                    ))
                                }   
                                </>
                        )
                        }
                        </div>
                    </nav>
                    
                </div>
                <div>
                    <select className="  p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ml-3" value={total_number_of_users_per_page} onChange={(e) => handleRecordsPerPage(e.target.value)}>
                        <option value="30" >30 Rows</option>
                        <option value="40" >40 Rows</option>
                        <option value="50" >50 Rows</option>
                        <option value="60">60 Rows</option>
                        <option value="70">70 Rows</option>
                        <option value="80">80 Rows</option>
                        <option value="90">90 Rows</option>
                        <option value="100">100 Rows</option>
                    </select>
                </div>
            </div>
        </>
    )
}

// Admin Original Data
// function TableTr({index , item}){
//     console.debug(item)
//     const totalPoints = item?.team?.answers.reduce((sum, obj) => sum + obj.obtainedPoints, 0);
//     return (
//         <>
//             <tr className="intro-x " style={{"zIndex": "40 !important"}} data-aos="zoom-in" data-aos-duration="1000" data-aos-delay={350}>
//                 <td className="text-center" style={{"border":"0px", "paddingLeft":"20px", "paddingRight":"0px"}}>
//                     <h3>{index}</h3>
//                 </td>
//                 <td className="">
//                     <div className="flex">
//                         <div className="w-10 h-10 image-fit zoom-in">
//                             <Image style={{"border":"2px solid #c90076"}} alt="asdasd" width={40} height={40} className="rounded-full border-opacity-100" src="/assets/img/48Gxpjc6W9oVa1mwbSu5TX1VmaFJxxeNp2MiI7dC.png" />
//                         </div>
//                     </div>
//                 </td>
//                 <td className="pl-0" style={{"paddingLeft":"0px"}}>
//                     <a href="#!" className="font-medium whitespace-nowrap pl-0 text-base">{(item.user.name)}</a>
//                     {/* <span className="ml-3 px-2 py-1 rounded font-bold bg-yellow-400 uppercase text-theme-3 text-xs text-black">PRO</span> */}
//                 </td>
//                 <td className="table-report__action text-center place-content-center">
//                     <div  className="relative z-50 inline-flex">
//                         <div  className="cursor-pointer w-16 h-14 image-fit zoom-in">
//                             <Image width={"65"} height={48} className="ml-auto mr-auto" src="/assets/img/US.png"   alt="asdasd" />
//                         </div>
//                         <div className="relative"  style={{"display": "none"}}>
//                             <div className="absolute top-0 text-center z-50 w-32 p-2 -mt-1 text-sm leading-tight text-white transform -translate-x-3/4 -translate-y-full bg-theme-4 rounded-lg shadow-lg" style={{"--transform-translate-x": "-75%"}}>
//                                 United States
//                             </div>
//                             <svg className="absolute z-50 w-6 h-6 text-theme-4 transform -translate-x-12 -translate-y-3 fill-current stroke-current" width="8" height="8">
//                                 <rect x="12" y="-10" width="8" height="8" transform="rotate(45)"></rect>
//                             </svg>
//                         </div>
//                     </div>
//                 </td>
//                 {/* rank */}
//                 {/* <td className="table-report__action text-center">
//                     <p style={{"color":"#EAB543"}} className="text-base">Guardian
//                     </p>
//                 </td> */}
//                 {/* badges */}
//                 <td className="w-40 table-report__action">
//                     <div className="flex mt-2 mb-2">
//                         <div  className="relative z-50 inline-flex items-center">
//                                 <div  className="cursor-pointer w-16 h-16 image-fit zoom-in ml-5 ">
//                                     <Image className="border-0" title="Complete 10 reverse engineering investigations" tooltip-content="Complete 10 reverse engineering investigations" src="/assets/img/trmosfctekjabzffgvip.png" width={64} height={64} alt="asdas" />
                                    
//                                 </div>
//                                 <p className="ml-5">{item.team.name}</p>
//                                 <div className="relative"  style={{"display": "none"}}>
//                                     <div className="absolute top-0 text-center z-50 w-32 p-2 -mt-1 text-sm leading-tight text-white transform -translate-x-3/4 -translate-y-full bg-theme-4 rounded-lg shadow-lg" style={{"--transform-translate-x": "-75%", "zIndex":"100"}}>
//                                     {item.team.name}
//                                     </div>
//                                     <svg className="absolute z-50 w-6 h-6 text-theme-4 transform -translate-x-12 -translate-y-3 fill-current stroke-current" width="8" height="8">
//                                         <rect x="12" y="-10" width="8" height="8" transform="rotate(45)"></rect>
//                                     </svg>
//                                 </div>
//                             </div>
//                             {/* <div  className="relative z-50 inline-flex">
//                                 <div  className="cursor-pointer w-16 h-16 image-fit zoom-in ml-5">
//                                     <Image className="border-0" title="Complete 20 reverse engineering investigations" tooltip-content="Complete 20 reverse engineering investigations" src="/assets/img/kydjwswcmhagkadmazux.png" width={64} height={64} alt="sadas"  />
//                                 </div>
//                                 <div className="relative"  style={{"display": "none"}}>
//                                     <div className="absolute top-0 text-center z-50 w-32 p-2 -mt-1 text-sm leading-tight text-white transform -translate-x-3/4 -translate-y-full bg-theme-4 rounded-lg shadow-lg" style={{"--transform-translate-x": "-75%", "zIndex":"100"}}>
//                                         Complete 20 reverse engineering investigations
//                                     </div>
//                                     <svg className="absolute z-50 w-6 h-6 text-theme-4 transform -translate-x-12 -translate-y-3 fill-current stroke-current" width="8" height="8">
//                                         <rect x="12" y="-10" width="8" height="8" transform="rotate(45)"></rect>
//                                     </svg>
//                                 </div>
//                             </div>
//                             <div  className="relative z-50 inline-flex">
//                                 <div  className="cursor-pointer w-16 h-16 image-fit zoom-in ml-5">
//                                     <Image className="border-0" title="Got First-Blood on a Challenge or Investigation" tooltip-content="Got First-Blood on a Challenge or Investigation" src="/assets/img/dj8ndasiJSDi2jsiJSAOD.png" width={64} height={64} alt="sadas"  />
//                                 </div>
//                                 <div className="relative"  style={{"display": "none"}}>
//                                     <div className="absolute top-0 text-center z-50 w-32 p-2 -mt-1 text-sm leading-tight text-white transform -translate-x-3/4 -translate-y-full bg-theme-4 rounded-lg shadow-lg" style={{"--transform-translate-x": "-75%", "zIndex":"100"}}>
//                                         Got First-Blood on a Challenge or Investigation
//                                     </div>
//                                     <svg className="absolute z-50 w-6 h-6 text-theme-4 transform -translate-x-12 -translate-y-3 fill-current stroke-current" width="8" height="8">
//                                         <rect x="12" y="-10" width="8" height="8" transform="rotate(45)"></rect>
//                                     </svg>
//                                 </div>
//                             </div> */}
//                                                         </div>
//                 </td>
//                 <td className="text-center table-report__action text-lg text-yellow-400">{totalPoints}</td>
//                 <td className="text-center table-report__action text-base">
//                     <a href="#!" className="font-medium whitespace-nowrap text-gray-300">{item.question?.scenario?.category || null}</a>
//                     <div className="text-green-600 text-xs whitespace-nowrap">{"+" + ` ${item.obtainedPoints}` + " Points"}</div>
//                 </td>
//                 <td className="table-report__action w-56">
//                     <div className="flex justify-center items-center">
//                         <a className="flex items-center mr-3 text-gray-300" href="#!">
//                             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-eye w-4 h-4 mr-1"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg> View Profile </a>
//                     </div>
//                 </td>
//             </tr>
            
//         </>
//     )
// }


// function TeamShield({ teamName, backgroundColor, textColor }) {
//     const svgNS = 'http://www.w3.org/2000/svg';
  
//     return (
//       <svg width="100" height="150" xmlns={svgNS}>
//         {/* Create the shield shape */}
//         <path d="M0 75 L50 0 L100 75 L75 75 L50 100 L25 75 Z" fill={backgroundColor} />
  
//         {/* Create text for team name */}
//         <text x="50" y="130" textAnchor="middle" fill={textColor} fontSize="16">
//           {teamName}
//         </text>
//       </svg>
//     );
//   }
  
//   export default TeamShield;


function TableTr({ item, index}){
    // console.debug(item , "TableTr")
    // const totalPoints = item?.team?.answers.reduce((sum, obj) => sum + obj.obtainedPoints, 0);

    // console.debug(item)

    return (
        
        
        (<tr className="intro-x " style={{"zIndex": "40 !important"}} data-aos="zoom-in" data-aos-duration="1000" data-aos-delay={"350"}>

            {/* Rank Number */}
            <td className="text-center" style={{"border":"0px", "paddingLeft":"20px", "paddingRight":"0px"}}>
                <h3>{index}</h3>
            </td>
            <td className="">
                {/* <div className="flex">
                    <div className="w-10 h-10 image-fit zoom-in">
                        <Image style={{"border":"2px solid #c90076"}} alt="asdasd" width={40} height={40} className="rounded-full border-opacity-100" src="/assets/img/48Gxpjc6W9oVa1mwbSu5TX1VmaFJxxeNp2MiI7dC.png" />
                    </div>
                </div> */}
            </td>
            <td className="pl-0 flex items-center" style={{"paddingLeft":"0px"}}>
                <div className="w-14 h-14 flex-none image-fit overflow-hidden items-center">
                    <div className="relative inline-block text-left   rounded-0" data-headlessui-state=""><div><button className="bg-white  text-black  text-md p-3 px-4 rounded-full border border-4 border-double border-blue-500 uppercase" id="headlessui-menu-button-:r0:" type="button" aria-haspopup="menu" aria-expanded="false" data-headlessui-state="">{item.user_name.charAt(0)}</button></div></div>
                </div>
                <p  className="font-medium whitespace-nowrap pl-3 text-base uppercase">{item?.user_name}</p>
                {/* <span className="ml-3 px-2 py-1 rounded font-bold bg-yellow-400 uppercase text-theme-3 text-xs text-black">PRO</span> */}
            </td>

            {/* Country Image */}
            {/* <td className="table-report__action text-center place-content-center">
                <div  className="relative z-50 inline-flex">
                    <div  className=" w-16 h-14 image-fit zoom-in">
                        <Image width={"65"} height={48} className="ml-auto mr-auto" src={`/assets/img/flags/${item?.country || "PK"}.png`}   alt="asdasd" />
                    </div>
                    <div className="relative"  style={{"display": "none"}}>
                        <div className="absolute top-0 text-center z-50 w-32 p-2 -mt-1 text-sm leading-tight text-white transform -translate-x-3/4 -translate-y-full bg-theme-4 rounded-lg shadow-lg" style={{"--transform-translate-x": "-75%"}}>
                            United States
                        </div>
                        <svg className="absolute z-50 w-6 h-6 text-theme-4 transform -translate-x-12 -translate-y-3 fill-current stroke-current" width="8" height="8">
                            <rect x="12" y="-10" width="8" height="8" transform="rotate(45)"></rect>
                        </svg>
                    </div>
                </div>
            </td> */}
            {/* rank */}
            {/* <td className="table-report__action text-center">
                <p style={{"color":"#EAB543"}} className="text-base">Guardian
                </p>
            </td> */}
            

            {/* Team name */}
            <td className="w-40 table-report__action">
                <div className="flex mt-2 mb-2 justify-center">
                    <div  className="relative z-50 inline-flex items-center text-center ">
                        {/* <div  className=" w-16 h-16 image-fit zoom-in ml-5 ">
                            <Image className="border-0" title="Complete 10 reverse engineering investigations" tooltip-content="Complete 10 reverse engineering investigations" src="/assets/img/trmosfctekjabzffgvip.png" width={64} height={64} alt="asdas" /> 
                        </div> */}
                        <GiFireShield size={35} className="mr-3 text-gray-400"  />
                        {/* <TeamShield teamName="Team A" backgroundColor="#007BFF" textColor="#FFFFFF" /> */}
                        <p className="text-center">{item?.team_name}</p>
                        {/* <div className="relative"  style={{"display": "none"}}>
                            <div className="absolute top-0 text-center z-50 w-32 p-2 -mt-1 text-sm leading-tight text-white transform -translate-x-3/4 -translate-y-full bg-theme-4 rounded-lg shadow-lg" style={{"--transform-translate-x": "-75%", "zIndex":"100"}}>
                            {item?.team?.name}
                            </div>
                            <svg className="absolute z-50 w-6 h-6 text-theme-4 transform -translate-x-12 -translate-y-3 fill-current stroke-current" width="8" height="8">
                                <rect x="12" y="-10" width="8" height="8" transform="rotate(45)"></rect>
                            </svg>
                        </div> */}
                    </div>
                        {/* <div  className="relative z-50 inline-flex">
                            <div  className="cursor-pointer w-16 h-16 image-fit zoom-in ml-5">
                                <Image className="border-0" title="Complete 20 reverse engineering investigations" tooltip-content="Complete 20 reverse engineering investigations" src="/assets/img/kydjwswcmhagkadmazux.png" width={64} height={64} alt="sadas"  />
                            </div>
                            <div className="relative"  style={{"display": "none"}}>
                                <div className="absolute top-0 text-center z-50 w-32 p-2 -mt-1 text-sm leading-tight text-white transform -translate-x-3/4 -translate-y-full bg-theme-4 rounded-lg shadow-lg" style={{"--transform-translate-x": "-75%", "zIndex":"100"}}>
                                    Complete 20 reverse engineering investigations
                                </div>
                                <svg className="absolute z-50 w-6 h-6 text-theme-4 transform -translate-x-12 -translate-y-3 fill-current stroke-current" width="8" height="8">
                                    <rect x="12" y="-10" width="8" height="8" transform="rotate(45)"></rect>
                                </svg>
                            </div>
                        </div>
                        <div  className="relative z-50 inline-flex">
                            <div  className="cursor-pointer w-16 h-16 image-fit zoom-in ml-5">
                                <Image className="border-0" title="Got First-Blood on a Challenge or Investigation" tooltip-content="Got First-Blood on a Challenge or Investigation" src="/assets/img/dj8ndasiJSDi2jsiJSAOD.png" width={64} height={64} alt="sadas"  />
                            </div>
                            <div className="relative"  style={{"display": "none"}}>
                                <div className="absolute top-0 text-center z-50 w-32 p-2 -mt-1 text-sm leading-tight text-white transform -translate-x-3/4 -translate-y-full bg-theme-4 rounded-lg shadow-lg" style={{"--transform-translate-x": "-75%", "zIndex":"100"}}>
                                    Got First-Blood on a Challenge or Investigation
                                </div>
                                <svg className="absolute z-50 w-6 h-6 text-theme-4 transform -translate-x-12 -translate-y-3 fill-current stroke-current" width="8" height="8">
                                    <rect x="12" y="-10" width="8" height="8" transform="rotate(45)"></rect>
                                </svg>
                            </div>
                        </div> */}
                                                    </div>
            </td>
            {/* <td className="text-center table-report__action text-lg text-yellow-400">{calculateTotalObtainedPoints(item?.answers)}</td> */}
            <td className="text-center table-report__action text-lg text-yellow-400">{item?.total_points}</td>
            <td className="text-center table-report__action text-lg text-yellow-400">{item?.total_submissions}</td>
            {/* <td className="text-center table-report__action text-base">
                <a href="#!" className="font-medium whitespace-nowrap text-gray-300">{ LastSubmitAnswerCategory(item?.answers)?.question?.scenario?.category || ""}</a>
                <div className="text-green-600 text-xs whitespace-nowrap">{ LastSubmitAnswerCategory(item?.answers)?.obtainedPoints ?  "+" + ` ${LastSubmitAnswerCategory(item?.answers)?.obtainedPoints || 0}` + " Points" : ""}</div>
            </td> */}
            <td className="table-report__action w-56">
                <div className="flex justify-center items-center">
                    {/* <a className="flex items-center mr-3 text-gray-300" href="#!">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-eye w-4 h-4 mr-1"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg> View Profile </a> */}
                    <Link className="flex items-center mr-3 text-gray-300" href={`/admin/board/user/${item?.id}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-eye w-4 h-4 mr-1"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                        View Profile 
                    </Link>
                </div>
            </td>
        </tr>) 
        
    )
}


function LeaderBoardTable({data , startIndex }){
    return (
        <>
            <div className="intro-y col-span-12 overflow-auto lg:overflow-visible text-gray-400">
                <table className="table table-report -mt-2" >
                <thead data-aos="zoom-in" data-aos-duration="1000" data-aos-delay={500}>
                    <tr className="text-white ">
                        <th className="text-center whitespace-nowrap uppercase" style={{"width":"0.5%", "border":"0px", "padding":"0px", "paddingLeft":"20px"}}>Sr. #</th>
                        <th className="whitespace-nowrap" style={{"width":"1%"}}></th>
                        <th className="whitespace-nowrap pl-0 text-start uppercase" style={{"paddingLeft":"0px"}}>User Name</th>
                        {/* <th className="whitespace-nowrap w-1/12 text-center">Country</th> */}
                        {/* <th className="whitespace-nowrap w-1/12 text-center">Rank</th> */}
                        <th className="whitespace-nowrap w-1/6 text-center uppercase">Team</th>
                        <th className="text-center whitespace-nowrap w-1/12 uppercase">Total POINTS</th>
                        <th className="text-center whitespace-nowrap w-1/6 uppercase">Total Submissions</th>
                        <th className="text-center whitespace-nowrap uppercase">ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data && data.map((item, index) => (
                            <TableTr  key={index} index={startIndex+index} item={item}/>
                        ))
                    }
                    
                </tbody>
                </table>
            </div>
        </>
    )
}



export default function Page(){
    const [loading, setLoading] = useState(true);
    const [topUsers, setTopUsers] = useState(null);
    const [totalUsers, setTotalUsers] = useState(0);
    const [paginationData, setPaginationData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPrage, setRecordsPerPage] = useState(50);
    const DataFetch = () => {
        try {
            axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/board/`, {
                params : {
                    page: currentPage,
                    recordsPerPrage : recordsPerPrage,
                }
            })
            .then((res) => {
                const {...data_2} = decrypt(res.data.encryptedData)
                if(data_2.status === true){
                    setTopUsers(data_2?.top_users)
                    setTotalUsers(data_2?.total_users)
                    setPaginationData(data_2.paginationData)
                } else {
                    toast.error(`Something went wrong! Please try again later.`)    
                    setTopUsers(null)
                    setTotalUsers(0)
                }
            }).catch((err) => {
                console.log(err);
                toast.error(`Something went wrong! Please try again later.`)
                setTopUsers(null)
                setTotalUsers(0)
            }).finally(() => {
                    setLoading(false);
            });
          } catch (error) {
            console.error(error)
            toast.error(`Something went wrong! Please try again later.`)
          }
    }
    useEffect(() => {
        AOS.init();
        DataFetch()
    }, [currentPage, recordsPerPrage])    


    // delay function
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
  

    const handleCurrentPageChange = (page) => {
        setLoading(true)
        delay(500).then(() => {
          setCurrentPage(page)          
        })
    }

    const handlePreviousPage = (page) => {
        setLoading(true)
        delay(500).then(() => {
          setCurrentPage(page-1)          
        })
      }
  
    const handleNextPage = (page) => {
        setLoading(true)
        delay(500).then(() => {
            setCurrentPage(page+1)          
        })
    }

    const handleRecordsPerPage = (recordsPerPrage) => {
        setLoading(true)
        delay(500).then(() => {
            setRecordsPerPage(recordsPerPrage)
        })
    }

    return (
        <>
            <CustomToaster />


            {loading ? (
                <>
                    <div>
                        <CustomTriangleLoader
                            height="400"
                            width="400"
                            className="flex justify-center items-center xl:my-32"
                            color="#3151bc"
                            />
                    </div>
                </>
            ) : (
            <>
                <div  className="p-4 ">
                    <div className="flex justify-between items-center mb-5 ">
                        <h1 className="text-white text-2xl font-bold">
                            Global Leaderboard
                        </h1>
                        <div className="flex justify-end items-center ">
                            {/* <button className="theme-btn-bg-color  text-gray-300 py-2  pr-4  pl-4 mt-2 mr-3 rounded-md mb-0 ml-0 ">
                                Reset Filters
                            </button> */}
                            <FilterResetBtn />
                            <SearchInput />
                            {/* <FilterByCountry /> */}
                        </div>
                    </div>
                    {/* Top Score Header Row */}
                    {/* <TopScoreHeaderRow  usersGroupedByCountry={usersGroupedByCountry} /> */}

                    { topUsers && ( <TopScoringUsers  users={topUsers} totalUsers={totalUsers} /> ) }
                    { paginationData && ( <LeaderBoardTable data={paginationData?.usersPerPage}  startIndex={paginationData.startIndex}  
                        endIndex={paginationData.endIndex}  /> ) }
                    {/* <UserProgress /> */}
                    {/* <UserProgressHeader /> */}
                    {/* {userData && (<UserProgressHeader userData={userData} />) } */}
                    {/* {data && <LeaderBoardTable data={data} /> } */}
                    
                    <PaginationBlock  
                        currentPage={paginationData.currentPage} 
                        totalPages={paginationData.totalPages}  
                        startIndex={paginationData.startIndex}  
                        endIndex={paginationData.endIndex}
                        totalResults={paginationData.totalResults}
                        total_number_of_users_per_page={paginationData.total_number_of_users_per_page}
                        handleCurrentPageChange={handleCurrentPageChange}
                        handlePreviousPage={handlePreviousPage}
                        handleNextPage={handleNextPage}
                        handleRecordsPerPage={handleRecordsPerPage}
                        
                    />
                    {/* <DataRowHeader />
                    {
                        data && data.map((item, index) => (
                            <DataRow  key={index}  index={index+1} item={item} />
                        ))
                    } */}

                    
                    
                </div>
            </>
        )
        }

            
        </>
    )
}