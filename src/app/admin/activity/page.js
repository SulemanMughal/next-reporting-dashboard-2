"use client"

import CustomToaster from "@/app/components/CustomToaster"
import { BsSearch } from "react-icons/bs"
import decrypt from "@/app/lib/decrypt"
import {   useEffect, useState } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from "axios";
import CountUp from 'react-countup';


function FilterResetBtn(){
    return (
        <>
            <div>
                <button type="button" className=" bg-deep-blue-violet text-white py-2  pr-4  pl-4 mt-2  h-full border border-1 border-deep-blue-violet rounded-md mb-0 ml-0 " >Reset Filters</button>
            </div>
        </>

    )
}

const SearchInput = () => {
    return (
      <div className="relative mx-3">
        <input
          type="text"
          placeholder="Search by action"
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


function TopHeader({total_logs , normalLogsCounter , mediumLogsCounter , highLogsCounter}){
    // console.debug(data?.length)
    return (
        <>
             <div className="mb-10 grid  auto-rows-fr gap-3 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 "   data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="500">
                <div className="intro-y col-span-1 flex flex-wrap sm:flex-nowrap items-center mt-2 pl-5 pr-5 pb-5 pt-5 bg-deep-blue-violet rounded box ">
                <div className="mr-auto col-span-3 text-lg text-gray-300 w-full">
                    Total Activities
                    <div className="w-full h-9 mt-2 text-green-400 border-deep-indigo rounded">
                        <b  style={{"color":"#55E6C1"}} className="text-4xl">
                            <CountUp end={total_logs}  duration={3} />  
                        </b>
                    </div>
                </div>
                </div>
                <div className="intro-y col-span-3 flex flex-wrap items-center mt-2 pl-5 pb-5 pt-5 bg-deep-blue-violet rounded box text-gray-300  justify-start" style={{"zIndex":"20"}}>
                    {/* Normal */}
                    <div className="intro-x items-center m-auto w-60 lg:w-1/6 text-gray-300 mb-5"  >
                        <div className="box px-2 flex items-center zoom-in justify-start mx-4">
                            <div className="w-18 h-18 flex-none image-fit overflow-hidden items-center">
                                <div className="relative inline-block text-left   rounded-0" data-headlessui-state=""><div><button className="bg-green-700 text-white text-4xl  font-bold py-4 px-5 rounded-full border border-4 border-double border-white" id="headlessui-menu-button-:r0:" type="button" aria-haspopup="menu" aria-expanded="false" data-headlessui-state="">{"N"}</button></div></div>
                            </div>
                            <div className="ml-4 mr-auto">
                                <div className="font-bold mb-1 text-lg">{normalLogsCounter}</div>
                                <div className="text-yellow-400 text-sm whitespace-nowrap">{"Normal Activities"} </div>
                            </div>
                        </div>
                    </div>

                    {/* Medium */}
                    <div className="intro-x items-center m-auto  w-60 lg:w-1/6 text-gray-300 mb-5"  >
                        <div className="box px-2 flex items-center zoom-in justify-start mx-4">
                            <div className="w-18 h-18 flex-none image-fit overflow-hidden items-center">
                                <div className="relative inline-block text-left   rounded-0" data-headlessui-state=""><div><button className="bg-orange-700 text-white  text-4xl  font-bold py-4 px-5 rounded-full border border-4 border-double border-white" id="headlessui-menu-button-:r0:" type="button" aria-haspopup="menu" aria-expanded="false" data-headlessui-state="">{"M"}</button></div></div>
                            </div>
                            <div className="ml-4 mr-auto">
                                <div className="font-bold mb-1 text-lg">{mediumLogsCounter}</div>
                                <div className="text-yellow-400 text-sm whitespace-nowrap">{"Medium Activities"} </div>
                            </div>
                        </div>
                    </div>

                    {/* High */}
                    <div className="intro-x items-center m-auto  w-60 lg:w-1/6 text-gray-300 mb-5"  >
                        <div className="box px-2 flex items-center zoom-in justify-start mx-4">
                            <div className="w-18 h-18 flex-none image-fit overflow-hidden items-center">
                                <div className="relative inline-block text-left   rounded-0" data-headlessui-state=""><div><button className="bg-red-700 text-white  text-4xl  font-bold py-4 px-5 rounded-full border border-4 border-double border-white" id="headlessui-menu-button-:r0:" type="button" aria-haspopup="menu" aria-expanded="false" data-headlessui-state="">{"H"}</button></div></div>
                            </div>
                            <div className="ml-4 mr-auto">
                                <div className="font-bold mb-1 text-lg">{highLogsCounter}</div>
                                <div className="text-yellow-400 text-sm whitespace-nowrap">{"High Activities"} </div>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
        </>
    )
}



function millisecondsToTime(ms) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    if (days > 0) {
      return `${days} days ago`;
    } else if (hours > 0) {
      return `${hours} hours ago`;
    } else if (minutes > 0) {
      return `${minutes} minutes ago`;
    } else {
      return `${seconds} seconds ago`;
    }

}

function timeStampHumanReadableFormat(datetimeString){
    
// Create a Date object from the datetime string
const datetime = new Date(datetimeString);

// Get the current date and time
const currentDate = new Date();

// Calculate the time difference in milliseconds
const timeDifference = currentDate - datetime;

// Function to convert milliseconds to a human-readable format
// Convert milliseconds to a human-readable time since the provided datetime
return  millisecondsToTime(timeDifference);
}


    

// }

function TableTr({ item, index}){
    // console.debug(item)

    return (
        
        
        (<tr className="intro-x " style={{"zIndex": "40 !important"}} data-aos="zoom-in" data-aos-duration="1000" data-aos-delay={"350"}>

            {/* Sr. No */}
            <td className="text-center py-10" style={{"border":"0px", "paddingLeft":"20px", "paddingRight":"0px"}}>
                <h3>{index}</h3>
            </td>
            {/* <td className="">
            </td> */}
            <td className="pl-0 flex items-center" style={{"paddingLeft":"0px"}}>
                {/* <div className="w-14 h-14 flex-none image-fit overflow-hidden items-center">
                    <div className="relative inline-block text-left   rounded-0" data-headlessui-state=""><div><button className="bg-white  text-black  text-md p-3 px-4 rounded-full border border-4 border-double border-blue-500 uppercase" id="headlessui-menu-button-:r0:" type="button" aria-haspopup="menu" aria-expanded="false" data-headlessui-state="">{"Testing"}</button></div></div>
                </div> */}
                
                <p  className="font-medium whitespace-nowrap pl-3 text-base">{item?.action_name}</p>
            </td>
            <td className="w-60 table-report__action">
                <p className="text-start">{item?.message}</p>
            </td>
            <td className="text-center table-report__action text-lg text-yellow-400 uppercase">{item?.action_by}</td>
            <td className="text-center table-report__action text-lg text-yellow-400 uppercase ">
                <div className="flex items-center justify-center">
                    {
                        item?.level === "Normal" ? (
                            <>
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                </span>
                                <p  className="font-medium whitespace-nowrap pl-3 text-green-500 ">{item?.level}</p>
                            </>
                        ) : (
                            item?.level === "medium" ? (

                                <>
                                    <span className="relative flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
                                    </span>
                                    <p  className="font-medium whitespace-nowrap pl-3 text-orange-500 ">{item?.level}</p>
                                </>

                            ) : (
                                <>
                                    <span className="relative flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                    </span>
                                    <p  className="font-medium whitespace-nowrap pl-3 text-red-500 ">{item?.level}</p>
                                </>
                            )   
                        )
                    }
                    
                </div>
                
                
            </td>
            <td className="text-center table-report__action text-lg text-yellow-400 ">{timeStampHumanReadableFormat(item?.createdAt)}</td>
            
            
        </tr>) 
        
    )
}


function ActivitiesTable({data}){
    return (
        <>
            <div className="intro-y col-span-12 overflow-auto lg:overflow-visible text-gray-400">
                <table className="table table-report -mt-2" >
                <thead data-aos="zoom-in" data-aos-duration="1000" data-aos-delay={500}>
                    <tr className="text-white ">
                        <th className="text-center whitespace-nowrap uppercase" style={{"width":"0.5%", "border":"0px", "padding":"0px", "paddingLeft":"20px"}}>Sr. #</th>
                        {/* <th className="whitespace-nowrap" style={{"width":"1%"}}></th> */}
                        <th className="whitespace-nowrap pl-0 text-start uppercase" style={{"paddingLeft":"15px"}}>Action</th>
                        <th className="whitespace-nowrap w-3/6 text-center uppercase">Info</th>
                        <th className="text-center whitespace-nowrap w-1/12 uppercase">Performed By</th>
                        <th className="text-center whitespace-nowrap w-1/6 uppercase">Level</th>
                        <th className="text-center whitespace-nowrap uppercase">Timestamp </th>
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


function FilterBtn(){
    return (
        <>
            {/* <label for="countries" className="block mb-2 text-sm font-medium text-gray-900 text-white">Filter By</label> */}
            <div className="relative mx-3 ">
                <select id="countries" className="appearance-none placeholder-gray-400 outline-0  border border-2 border-deep-blue-violet focus:border focus:border-2 focus:border-blue-900  text-gray-400    w-full p-2 pl-4 pr-8   m-0 mt-2 text-base block bg-deep-indigo  rounded-md shadow-sm">
                    <option  className="text-md py-1" disabled>Filter By</option>
                    <option value="4" className="text-md py-1">All</option>
                    <option value="1" className="text-md py-1">Normal</option>
                    <option value="2" className="text-md py-1">Medium</option>
                    <option value="3" className="text-md py-1">High</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none mt-2 ">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </div>
            </div>
            
        </>
    )
}

export default function Page(){
    const [data, setData] = useState([])

    const DataFetch = () => {
        try {
            axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/activities/`)
            .then((res) => {
                const {...fetched_data} = decrypt(res.data.encryptedData)
                if(fetched_data.status === true){
                    // setTopUsers(fetched_data?.top_users)
                    // console.debug(fetched_data)
                    setData({ activitiesList :  fetched_data.activitiesList, normalLevelLogs : fetched_data.normalLevelLogs , mediumLevelLogs : fetched_data.mediumLevelLogs , highLevelLogs : fetched_data.highLevelLogs})
                    // setTotalUsers(data_2?.total_users)
                    // console.debug(data_2.paginationData)
                    // setPaginationData(data_2.paginationData)
                } else {
                    // toast.error(`Something went wrong! Please try again later.`)    
                    setData([])
                    // setTopUsers(null)
                    // setTotalUsers(0)
                }
            }).catch((err) => {
                console.log(err);
                // toast.error(`Something went wrong! Please try again later.`)
                // setData([])
                // setTopUsers(null)
                // setTotalUsers(0)
                setData([])
            }).finally(() => {
                //  setLoading(false);
            });
          } catch (error) {
            console.error(error)
            // toast.error(`Something went wrong! Please try again later.`)
            setData([])
          }
    }
    useEffect(() => {
        AOS.init();
        DataFetch()
    }, [])  
    return (
        <>
           <CustomToaster />
           <div  className="p-4 mb-15">
                <div className="flex justify-between items-center mb-5 ">
                    <h1 className="text-white text-2xl font-bold">
                        Acitivity Logging
                    </h1>
                    <div className="flex justify-end items-center ">
                        <FilterResetBtn />
                        <SearchInput />
                        <FilterBtn />
                    </div>
                </div>
                
                
                { data && ( 
                    <>
                        <TopHeader  total_logs={data?.activitiesList?.length}  normalLogsCounter={data.normalLevelLogs} mediumLogsCounter={data.mediumLevelLogs} highLogsCounter={data.highLevelLogs} />
                        <ActivitiesTable  data={data.activitiesList} />
                    </>
                 )}
                
           </div>
        </>
    )
}