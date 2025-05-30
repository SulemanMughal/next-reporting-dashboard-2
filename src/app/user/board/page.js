"use client"

import CustomToaster from "@/app/components/CustomToaster"
import axios from "axios";
import { BsSearch } from "react-icons/bs"
import decrypt from "@/app/lib/decrypt"
import { use, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import AOS from 'aos';
import 'aos/dist/aos.css';

import { countries } from "@/app/lib/helpers"
import { useSession } from "next-auth/react";

import Image from "next/image"



import CustomTriangleLoader from "@/app/components/CustomTriangleLoader"
import Link from "next/link";

const getInitials = (name) => {
    return name.charAt(0).toUpperCase() + name.charAt(1).toUpperCase()
}


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
          placeholder="Search by name"
          className="custom-form-control"
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
                <button type="button" className="reset-filter-btn" >Reset Filters</button>
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




const PaginationBlock = () => {
    return (
        <>
            <div className="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center mt-5 mb-14"  data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="500">
            <div>
            
        <nav role="navigation" aria-label="Pagination Navigation" className="flex items-center justify-between">
            <div className="flex justify-between flex-1 sm:hidden">
                <span>
                                            <span className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 rounded-md select-none">
                            « Previous
                        </span>
                                    </span>

                <span>
                                            <button type="button"  dusk="nextPage.before" className="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 leading-5 rounded-md hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150">
                            Next »
                        </button>
                                    </span>
            </div>

            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700 leading-5">
                        <span>Showing</span>
                        <span className="font-medium mx-2">1</span>
                        <span>to</span>
                        <span className="font-medium">10</span>
                        <span>of</span>
                        <span className="font-medium mx-2">19630</span>
                        <span className="mr-3">results</span>
                    </p>
                </div>

                <div>
                    <span className="relative z-0 inline-flex rounded-md shadow-sm">
                        <span>
                            
                                                            <span aria-disabled="true" aria-label="&amp;laquo; Previous">
                                    <span className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default rounded-l-md leading-5" aria-hidden="true">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                    </span>
                                </span>
                                                    </span>

                        
                                                    
                            
                            
                                                                                                <span key="paginator-page-1-page1">
                                                                                    <span aria-current="page">
                                                <span className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none">1</span>
                                            </span>
                                                                            </span>
                                                                    <span key="paginator-page-1-page2">
                                                                                    <button type="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-700 bg-white border border-gray-300 leading-5 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150" aria-label="Go to page 2">
                                                2
                                            </button>
                                                                            </span>
                                                                    <span key="paginator-page-1-page3">
                                                                                    <button type="button"  className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-700 bg-white border border-gray-300 leading-5 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150" aria-label="Go to page 3">
                                                3
                                            </button>
                                                                            </span>
                                                                    <span key="paginator-page-1-page4">
                                                                                    <button type="button"  className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-700 bg-white border border-gray-300 leading-5 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150" aria-label="Go to page 4">
                                                4
                                            </button>
                                                                            </span>
                                                                    <span key="paginator-page-1-page5">
                                                                                    <button type="button"  className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-700 bg-white border border-gray-300 leading-5 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150" aria-label="Go to page 5">
                                                5
                                            </button>
                                                                            </span>
                                                                    <span key="paginator-page-1-page6">
                                                                                    <button type="button"  className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-700 bg-white border border-gray-300 leading-5 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150" aria-label="Go to page 6">
                                                6
                                            </button>
                                                                            </span>
                                                                    <span key="paginator-page-1-page7">
                                                                                    <button type="button"  className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-700 bg-white border border-gray-300 leading-5 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150" aria-label="Go to page 7">
                                                7
                                            </button>
                                                                            </span>
                                                                    <span key="paginator-page-1-page8">
                                                                                    <button type="button"  className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-700 bg-white border border-gray-300 leading-5 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150" aria-label="Go to page 8">
                                                8
                                            </button>
                                                                            </span>
                                                                    <span> 
                                                                                    <button type="button"  className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-700 bg-white border border-gray-300 leading-5 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150" aria-label="Go to page 9">
                                                9
                                            </button>
                                                                            </span>
                                                                    <span>
                                                                                    <button type="button"  className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-700 bg-white border border-gray-300 leading-5 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150" aria-label="Go to page 10">
                                                10
                                            </button>
                                                                            </span>
                                                                                                                
                                                            <span aria-disabled="true">
                                    <span className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-700 bg-white border border-gray-300 cursor-default leading-5 select-none">...</span>
                                </span>
                            
                            
                                                                                
                            
                            
                                                                                                <span key="paginator-page-1-page1962">
                                                                                    <button type="button"  className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-700 bg-white border border-gray-300 leading-5 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150" aria-label="Go to page 1962">
                                                1962
                                            </button>
                                                                            </span>
                                                                    <span key="paginator-page-1-page1963">
                                                                                    <button type="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-700 bg-white border border-gray-300 leading-5 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150" aria-label="Go to page 1963">
                                                1963
                                            </button>
                                                                            </span>
                                                                                    
                        <span>
                            
                                                            <button type="button"  dusk="nextPage.after" rel="next" className="relative inline-flex items-center px-2 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md leading-5 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150" aria-label="Next &amp;raquo;">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                                    </svg>
                                </button>
                                                    </span>
                    </span>
                </div>
            </div>
        </nav>
    </div>

            
        </div>
        </>
    )
}


const DataRow = ({index , item}) =>{
    // console.debug(item)
    const totalPoints = item?.team?.answers.reduce((sum, obj) => sum + obj.obtainedPoints, 0);
    // console.debug(item)
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



function TopScoreHeaderRow({totalPoints , teamTotalObtainedPoints ,usersGroupedByCountry}){
    return (
        <div className="mb-10 grid  auto-rows-fr gap-3 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 "   data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="500">
            <div className="intro-y col-span-1 flex flex-wrap sm:flex-nowrap items-center mt-2 pl-5 pr-5 pb-5 pt-5 bg-color-1 rounded box ">
                <div className="mr-auto col-span-3 text-lg text-gray-300 w-full">
                        {totalPoints-teamTotalObtainedPoints} points left to 
                        <b  className="text-color-2"> Complete </b>
                    <div className="w-full h-9 mt-2 bg-color-3 border-deep-indigo rounded">
                        <div style={{"width":`${teamTotalObtainedPoints/totalPoints*100}%`}} className="h-full bg-color-2 rounded text-center text-color-4 font-bold">{parseInt(teamTotalObtainedPoints/totalPoints*100)}%</div>
                    </div>
                </div>

                {/* Defender Image */}
                {/* <Image  width={"90"}  height={"90"} className="rounded-full w-16 ml-3" src="/assets/img/RaM4kXNrsL0Nx38H3zmi.png" alt="asdas" /> */}
            </div>
            {/* <div className="intro-y col-span-3 flex flex-wrap items-center mt-2 pl-5 pb-5 pt-5 bg-color-1 rounded box text-gray-300" style={{"zIndex":"20"}}>
                {usersGroupedByCountry && usersGroupedByCountry.map((country , index) => (
                    <CountryDefendersCounter country={country} key={index} />
                ))}
            </div> */}
            
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


function UserProgressHeader({userData}){

    // console.debug(userData)
    return (
        <>
        <div className="intro-y col-span-12 overflow-auto lg:overflow-visible text-color-6 mb-8" data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="500">
            <table className="table table-report table-auto -mt-2 ">
                <thead>
                    <tr className="text-white ">
                        <th className="text-center whitespace-nowrap" style={{"width":"0.5%", "border":"0px", "padding":"0px", "paddingLeft":"20px"}}></th>
                        <th className="whitespace-nowrap" style={{"width":"1%"}}></th>
                        <th className="whitespace-nowrap pl-0 text-start" style={{"paddingLeft":"0px"}}></th>
                        <th className="whitespace-nowrap w-1/5 text-center"></th>
                        {/* <th className="whitespace-nowrap w-1/6 text-center"></th> */}
                        <th className="text-center whitespace-nowrap w-1/6"></th>
                        <th className="text-center whitespace-nowrap w-1/8"></th>
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
                {/* <td className="table-report__action text-center place-content-center">
                    <div  className="relative z-50 inline-flex">
                        <div  className=" w-16 h-14 image-fit zoom-in">
                            <Image width={"65"} height={48} className="ml-auto mr-auto" src={`/assets/img/flags/${userData?.country || "PK"}.png`}   alt="asdasd" />
                        </div>
                        
                    </div>
                    <div className="relative"  style={{"display": "none"}}>
                            <div className="absolute top-0 text-center z-50 w-32 p-2 -mt-1 text-sm leading-tight text-white transform -translate-x-3/4 -translate-y-full bg-theme-4 rounded-lg shadow-lg" style={{"--transform-translate-x": "-75%"}}>
                                United States
                            </div>
                            <svg className="absolute z-50 w-6 h-6 text-theme-4 transform -translate-x-12 -translate-y-3 fill-current stroke-current" width="8" height="8">
                                <rect x="12" y="-10" width="8" height="8" transform="rotate(45)"></rect>
                            </svg>
                        </div>
                </td> */}
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
                <td className="text-center table-report__action text-lg text-yellow-400">
                    {/* {calculateTotalObtainedPoints(userData?.answers)} */}
                    <div className="text-green-600 text-base whitespace-nowrap">{"+" + ` ${LastSubmitAnswerCategory(userData?.answers)?.obtainedPoints || 0}` + " Points"}</div>
                </td>
                <td className="text-center table-report__action text-base">
                    {/* Last Submission CAtegory */}
                    <a href="#!" className="font-medium whitespace-nowrap text-gray-300">{LastSubmitAnswerCategory(userData?.answers)?.question?.scenario?.category || "N/A"}</a>
                    {/* <div className="text-green-600 text-xs whitespace-nowrap">{"+" + ` ${LastSubmitAnswerCategory(userData?.answers)?.obtainedPoints || 0}` + " Points"}</div> */}
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

function TableTr({index , item}){
    // console.debug(item , "TableTr")
    // const totalPoints = item?.team?.answers.reduce((sum, obj) => sum + obj.obtainedPoints, 0);

    return (
        
        
        (<tr className="intro-x " style={{"zIndex": "40 !important"}} data-aos="zoom-in" data-aos-duration="1000" data-aos-delay={350}>
            <td className="text-center" style={{"border":"0px", "paddingLeft":"20px", "paddingRight":"0px"}}>
                <h3>{ "  "}</h3>
            </td>
            <td className="">
                {/* <div className="flex">
                    <div className="w-10 h-10 image-fit zoom-in">
                        <Image style={{"border":"2px solid #c90076"}} alt="asdasd" width={40} height={40} className="rounded-full border-opacity-100" src="/assets/img/48Gxpjc6W9oVa1mwbSu5TX1VmaFJxxeNp2MiI7dC.png" />
                    </div>
                </div> */}
            </td>
            <td className="pl-0" style={{"paddingLeft":"0px"}}>
                <a href="#!" className="font-medium whitespace-nowrap pl-0 text-base">{item?.name}</a>
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
                    <div  className="relative z-50 inline-flex items-center text-center">
                        {/* <div  className=" w-16 h-16 image-fit zoom-in ml-5 ">
                            <Image className="border-0" title="Complete 10 reverse engineering investigations" tooltip-content="Complete 10 reverse engineering investigations" src="/assets/img/trmosfctekjabzffgvip.png" width={64} height={64} alt="asdas" /> 
                        </div> */}
                        <p className="text-center">{item?.team?.name}</p>
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
            <td className="text-center table-report__action text-lg text-yellow-400">{calculateTotalObtainedPoints(item?.answers)}</td>
            <td className="text-center table-report__action text-base">
                <a href="#!" className="font-medium whitespace-nowrap text-gray-300">{ LastSubmitAnswerCategory(item?.answers)?.question?.scenario?.category || ""}</a>
                <div className="text-green-600 text-xs whitespace-nowrap">{ LastSubmitAnswerCategory(item?.answers)?.obtainedPoints ?  "+" + ` ${LastSubmitAnswerCategory(item?.answers)?.obtainedPoints || 0}` + " Points" : ""}</div>
            </td>
            <td className="table-report__action w-56">
                <div className="flex justify-center items-center">
                    {/* <a className="flex items-center mr-3 text-gray-300" href="#!">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-eye w-4 h-4 mr-1"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg> View Profile </a> */}
                    <Link className="flex items-center mr-3 text-gray-300" href={`/user/${item?.id}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-eye w-4 h-4 mr-1"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                        View Profile 
                    </Link>
                </div>
            </td>
        </tr>) 
        
    )
}


function LeaderBoardTable({data , userData }){

    // console.debug(data , "LeaderBoardTable")
    return (
        <>
            <div className="intro-y col-span-12 overflow-auto lg:overflow-visible text-gray-400" >
                <table className="table table-report -mt-2">
                <thead >
                    <tr className="text-white ">
                        <th className="text-center whitespace-nowrap" style={{"width":"0.5%", "border":"0px", "padding":"0px", "paddingLeft":"20px"}}> </th>
                        <th className="whitespace-nowrap" style={{"width":"1%"}}></th>
                        <th className="whitespace-nowrap pl-0 text-start" style={{"paddingLeft":"0px"}}>PROFILE</th>
                        {/* <th className="whitespace-nowrap w-1/12 text-center">Country</th> */}
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
                                // (calculateTotalObtainedPoints(item?.answers) && userData?.id !== item.id) ? (<TableTr  key={index} index={index+1} item={item}/>) : null
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
    const [data_1, setData] = useState([])
    const { data: session } = useSession();

    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [totalPoints, setTotalPoints] = useState(0)
    const [teamTotalObtainedPoints, setTeamTotalObtainedPoints] = useState(0)

    const [usersGroupedByCountry, setUsersGroupedByCountry] = useState(null)


    const DataFetch = () => {

        // console.debug("DataFetch")

        try {
            axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/board`)
            .then((res) => {
                // console.debug("NEXT_PUBLIC_BASE_URL")
                const {...data_2} = decrypt(res.data.encryptedData)
                // console.debug(data_2)
                if(data_2.status === true){
                    // console.debug(data_2?.users)
                    // setData(data_2?.users)
                    // setError(null);
                    setUsersGroupedByCountry(data_2.usersGroupedByCountry)
                    
                    
                    
                } else {
                    toast.error(`Something went wrong! Please try again later.`)    
                    setData([])
                    // setError(null);
                }
    
            }).catch((err) => {
                console.log(err);
                toast.error(`Something went wrong! Please try again later.`)
                setData([])
                
            }).finally(() => {
                 setLoading(false);
                //  setError(null);
            });
          } catch (error) {
            console.error(error)
            toast.error(`Something went wrong! Please try again later.`)
            setData([])
            // setError(null);
          }
    }

    const getUserData = ({userID}) => {
        try {
            axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/board/${userID}/`)
            .then((res) => {
                const {...data_3} = decrypt(res.data.encryptedData)
                if(data_3?.status === true){
                    // console.debug(data_3)
                    setUserData(data_3?.result)
                    // console.debug(calculateTotalPoints(data_3?.result?.team?.quiz?.questions))
                    setTotalPoints(calculateTotalPoints(data_3?.result?.team?.quiz?.questions))
                    setTeamTotalObtainedPoints(calculateTotalObtainedPoints(data_3?.result?.team?.answers))
                    
                } else {
                    toast.error("Sorry! There is an error while fetching data.Please try again later")    
                    setUserData(null)
                }
    
            }).catch((err) => {
                console.log(err);
                toast.error("Sorry! There is an error while fetching data.Please try again later")
                setUserData(null)
            });
        } catch (error) {
            console.debug(error)
            toast.error("Sorry! There is an error while fetching data.Please try again later")
            setUserData(null)
        }
    }

    // delay function
    // const delay = ms => new Promise(res => setTimeout(res, ms));

    useEffect(() => {
        AOS.init();
        DataFetch()
        if(session){
            getUserData({userID: session?.user?.id})
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading])
    
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
color="#9fef00"
/>
                </div>
            </>
        ) : (
            <div  className="p-4 mb-15">
                <div className="flex justify-between items-center mb-5 ">
                    <h1 className="text-color-6 text-2xl font-bold">
                        {`Global Leaderboard`}
                    </h1>
                    {/* <div className="flex justify-end items-center ">
                        <FilterResetBtn />
                        <SearchInput />
                    </div> */}
                        {/* <FilterByCountry /> */}
                </div>
                {/* Top Score Header Row */}
                {/* {totalPoints && <TopScoreHeaderRow totalPoints={totalPoints} teamTotalObtainedPoints={teamTotalObtainedPoints} usersGroupedByCountry={usersGroupedByCountry} /> } */}
                {/* <UserProgress /> */}
                {/* {  (session && session?.user  && userData.length )  && (<UserProgressHeader userData={userData} />) } */}
                {userData && (<UserProgressHeader userData={userData} />) }
                {/* <LeaderBoardTable data={data} userData={userData}  /> */}
                { data_1 && <LeaderBoardTable data={data_1} userData={userData}  /> }
                
                
                
                {/* <PaginationBlock /> */}

                
                
                {/* <DataRowHeader />
                {
                    data && data.map((item, index) => (
                        <DataRow  key={index}  index={index+1} item={item} />
                    ))
                } */}

                
                
            </div>
        )}
            
        </>
    )
}