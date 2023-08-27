"use client"

import CustomToaster from "@/app/components/CustomToaster"
import axios from "axios";
import { BsSearch } from "react-icons/bs"
import decrypt from "@/app/lib/decrypt"
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import AOS from 'aos';
import 'aos/dist/aos.css';

import { countries } from "@/app/lib/helpers"


import Image from "next/image"

const getInitials = (name) => {
    return name.charAt(0).toUpperCase() + name.charAt(1).toUpperCase()
}


function CountryOptions(){
    return (
      <>
        {countries.map(country => (
          <option key={country} value={country}>
            {country}
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
          placeholder="Search by name"
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
                <button type="button" className=" bg-deep-blue-violet text-white py-2  pr-4  pl-4 mt-2 h-full border border-1 border-deep-blue-violet rounded-md mb-0 ml-0 " >Reset Filters</button>
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


function TopScoreHeaderRow(){
    return (
        <div className="mb-10 grid  auto-rows-fr gap-3 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 "   data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="500">
            <div className="intro-y col-span-1 flex flex-wrap sm:flex-nowrap items-center mt-2 pl-5 pr-5 pb-5 pt-5 bg-deep-blue-violet rounded box ">
                <div className="mr-auto col-span-3 text-lg text-gray-300 w-full">
                        252 points left to <b style={{"color":"#55E6C1"}}>
                        Defender
                    </b>

                    <div className="w-full h-9 mt-2 bg-deep-indigo border-deep-indigo rounded">
                        <div style={{"width":"2%"}} className="h-full bg-deep-blue rounded text-center text-white">2%</div>
                    </div>
                    
                </div>
                <Image  width={"90"}  height={"90"} className="rounded-full w-16 ml-3" src="/assets/img/RaM4kXNrsL0Nx38H3zmi.png" alt="asdas" />
            </div>
            <div className="intro-y col-span-3 flex flex-wrap items-center mt-2 pl-5 pb-5 pt-5 bg-deep-blue-violet rounded box text-gray-300" style={{"zIndex":"20"}}>     
           
    
            
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

                        
        </div>
        </div>
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


function UserProgressHeader(){
    return (
        <>
        <div className="intro-y col-span-12 overflow-auto lg:overflow-visible text-gray-300 mb-8">
            <table className="table table-report table-auto -mt-2 ">
                <thead>
                    {/* <tr>
                        <th className="text-center whitespace-nowrap" style={{"width":"0.5%" , "border":"0px", "padding":"0px", "paddingLeft":"20px"}}></th>
                        <th className="whitespace-nowrap" style={{"width":"1%"}}></th>
                        <th className="whitespace-nowrap pl-0" style={{"paddingLeft":"0px"}}></th>
                        <th className="whitespace-nowrap w-1/12 text-center"></th>
                        <th className="whitespace-nowrap w-1/12 text-center"></th>
                        <th className="whitespace-nowrap w-1/6 text-center"></th>
                        
                        <th className="text-center whitespace-nowrap w-1/12"></th>
                        <th className="text-center whitespace-nowrap w-1/6"></th>
                        <th className="text-center whitespace-nowrap"></th>
                    </tr> */}
                    <tr className="text-white ">
                        <th className="text-center whitespace-nowrap" style={{"width":"0.5%", "border":"0px", "padding":"0px", "paddingLeft":"20px"}}></th>
                        <th className="whitespace-nowrap" style={{"width":"1%"}}></th>
                        <th className="whitespace-nowrap pl-0 text-start" style={{"paddingLeft":"0px"}}></th>
                        <th className="whitespace-nowrap w-1/12 text-center"></th>
                        {/* <th className="whitespace-nowrap w-1/12 text-center">Rank</th> */}
                        <th className="whitespace-nowrap w-1/6 text-center"></th>
                        <th className="text-center whitespace-nowrap w-1/12"></th>
                        <th className="text-center whitespace-nowrap w-1/6"></th>
                        <th className="text-center whitespace-nowrap"></th>
                    </tr>
                </thead>
                <tbody className="py-5 px-7">
<tr className="intro-x " style={{"zIndex": "40 !important"}}>
                <td className="text-center" style={{"border":"0px", "paddingLeft":"20px", "paddingRight":"0px"}}>
                    <h3>{"18415"}</h3>
                </td>
                <td className="">
                    {/* <div className="flex">
                        <div className="w-10 h-10 image-fit zoom-in">
                            <Image style={{"border":"2px solid #c90076"}} alt="asdasd" width={40} height={40} className="rounded-full border-opacity-100" src="/assets/img/48Gxpjc6W9oVa1mwbSu5TX1VmaFJxxeNp2MiI7dC.png" />
                        </div>
                    </div> */}
                    <div className="flex">
                                    <div className="w-10 h-10 image-fit zoom-in">
                                        <Image width={40} height={40} style={{"border":"2px solid #b0b6bb"}} className="rounded-full border-opacity-100" src="/assets/img/download.png" alt="asdasd" />
                                    </div>
                                </div>
                </td>
                <td className="pl-0" style={{"paddingLeft":"0px"}}>
                    <a href="#!" className="font-medium whitespace-nowrap pl-0 text-base">{"User_1"}</a>
                    {/* <span className="ml-3 px-2 py-1 rounded font-bold bg-yellow-400 uppercase text-theme-3 text-xs text-black">PRO</span> */}
                </td>
                <td className="table-report__action text-center place-content-center">
                    <div  className="relative z-50 inline-flex">
                        <div  className="cursor-pointer w-16 h-14 image-fit zoom-in">
                            <Image width={"65"} height={48} className="ml-auto mr-auto" src="/assets/img/US.png"   alt="asdasd" />
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
                </td>
                {/* rank */}
                {/* <td className="table-report__action text-center">
                    <p style={{"color":"#EAB543"}} className="text-base">Guardian
                    </p>
                </td> */}
                {/* badges */}
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
                <td className="text-center table-report__action text-lg text-yellow-400">{"asd"}</td>
                <td className="text-center table-report__action text-base">
                    <a href="#!" className="font-medium whitespace-nowrap text-gray-300">{"Security Operations" || null}</a>
                    <div className="text-green-600 text-xs whitespace-nowrap">{"+" + ` ${"1231"}` + " Points"}</div>
                </td>
                <td className="table-report__action w-56">
                    <div className="flex justify-center items-center">
                        <a className="flex items-center mr-3 text-gray-300" href="#!">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" className="feather feather-eye w-4 h-4 mr-1"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg> View Profile </a>
                    </div>
                </td>
            </tr>
                </tbody>
            </table>
        </div>
            
        </>
    )
}

function TableTr({index , item}){
    // console.debug(item)
    const totalPoints = item?.team?.answers.reduce((sum, obj) => sum + obj.obtainedPoints, 0);
    return (
        <>
            <tr className="intro-x " style={{"zIndex": "40 !important"}}>
                <td className="text-center" style={{"border":"0px", "paddingLeft":"20px", "paddingRight":"0px"}}>
                    <h3>{index}</h3>
                </td>
                <td className="">
                    <div className="flex">
                        <div className="w-10 h-10 image-fit zoom-in">
                            <Image style={{"border":"2px solid #c90076"}} alt="asdasd" width={40} height={40} className="rounded-full border-opacity-100" src="/assets/img/48Gxpjc6W9oVa1mwbSu5TX1VmaFJxxeNp2MiI7dC.png" />
                        </div>
                    </div>
                </td>
                <td className="pl-0" style={{"paddingLeft":"0px"}}>
                    <a href="#!" className="font-medium whitespace-nowrap pl-0 text-base">{(item.user.name)}</a>
                    {/* <span className="ml-3 px-2 py-1 rounded font-bold bg-yellow-400 uppercase text-theme-3 text-xs text-black">PRO</span> */}
                </td>
                <td className="table-report__action text-center place-content-center">
                    <div  className="relative z-50 inline-flex">
                        <div  className="cursor-pointer w-16 h-14 image-fit zoom-in">
                            <Image width={"65"} height={48} className="ml-auto mr-auto" src="/assets/img/US.png"   alt="asdasd" />
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
                </td>
                {/* rank */}
                {/* <td className="table-report__action text-center">
                    <p style={{"color":"#EAB543"}} className="text-base">Guardian
                    </p>
                </td> */}
                {/* badges */}
                <td className="w-40 table-report__action">
                    <div className="flex mt-2 mb-2">
                        <div  className="relative z-50 inline-flex items-center">
                                <div  className="cursor-pointer w-16 h-16 image-fit zoom-in ml-5 ">
                                    <Image className="border-0" title="Complete 10 reverse engineering investigations" tooltip-content="Complete 10 reverse engineering investigations" src="/assets/img/trmosfctekjabzffgvip.png" width={64} height={64} alt="asdas" />
                                    
                                </div>
                                <p className="ml-5">{item.team.name}</p>
                                <div className="relative"  style={{"display": "none"}}>
                                    <div className="absolute top-0 text-center z-50 w-32 p-2 -mt-1 text-sm leading-tight text-white transform -translate-x-3/4 -translate-y-full bg-theme-4 rounded-lg shadow-lg" style={{"--transform-translate-x": "-75%", "zIndex":"100"}}>
                                    {item.team.name}
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
                <td className="text-center table-report__action text-lg text-yellow-400">{totalPoints}</td>
                <td className="text-center table-report__action text-base">
                    <a href="#!" className="font-medium whitespace-nowrap text-gray-300">{item.question?.scenario?.category || null}</a>
                    <div className="text-green-600 text-xs whitespace-nowrap">{"+" + ` ${item.obtainedPoints}` + " Points"}</div>
                </td>
                <td className="table-report__action w-56">
                    <div className="flex justify-center items-center">
                        <a className="flex items-center mr-3 text-gray-300" href="#!">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" className="feather feather-eye w-4 h-4 mr-1"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg> View Profile </a>
                    </div>
                </td>
            </tr>
            
        </>
    )
}


function LeaderBoardTable({data}){
    return (
        <>
            <div className="intro-y col-span-12 overflow-auto lg:overflow-visible text-gray-400">
                <table className="table table-report -mt-2">
                <thead>
                    <tr className="text-white ">
                        <th className="text-center whitespace-nowrap" style={{"width":"0.5%", "border":"0px", "padding":"0px", "paddingLeft":"20px"}}>#</th>
                        <th className="whitespace-nowrap" style={{"width":"1%"}}></th>
                        <th className="whitespace-nowrap pl-0 text-start" style={{"paddingLeft":"0px"}}>PROFILE</th>
                        <th className="whitespace-nowrap w-1/12 text-center">Country</th>
                        {/* <th className="whitespace-nowrap w-1/12 text-center">Rank</th> */}
                        <th className="whitespace-nowrap w-1/6 text-center">Team</th>
                        <th className="text-center whitespace-nowrap w-1/12">POINTS</th>
                        <th className="text-center whitespace-nowrap w-1/6">LATEST HIT</th>
                        <th className="text-center whitespace-nowrap">ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data && data.map((item, index) => (
                            <TableTr  key={index} index={index+1} item={item}/>
                        ))
                    }
                    
                </tbody>
                </table>
            </div>
        </>
    )
}



export default function Page(){
    const [data, setData] = useState([])
    useEffect(() => {
        AOS.init();
      try {
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/submissions/`)
        .then((res) => {
            const {...data_2} = decrypt(res.data.encryptedData)
            if(data_2.status === true){
                setData(data_2.submissions)
            } else {
                toast.error(`Something went wrong! Please try again later.`)    
                setData([])
            }

        }).catch((err) => {
            console.log(err);
            toast.error(`Something went wrong! Please try again later.`)
            setData([])
        });
      } catch (error) {
        console.error(error)
        toast.error(`Something went wrong! Please try again later.`)
        setData([])
      }

    
      
    }, [])
    
    return (
        <>
            <CustomToaster />
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
                        <FilterByCountry />
                    </div>
                </div>
                {/* Top Score Header Row */}
                <TopScoreHeaderRow />
                {/* <UserProgress /> */}
                <UserProgressHeader />
                {data && <LeaderBoardTable data={data} /> }
                
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