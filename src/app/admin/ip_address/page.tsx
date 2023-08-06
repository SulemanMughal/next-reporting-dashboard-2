"use client"

// import Header from "../components/Header"

import Link from "next/link"


import {  AiOutlinePlus } from "react-icons/ai"



import { useRef , useState, useEffect } from "react"



import axios from 'axios';






export default   function IP_Address(){

    // const data = await  axios.get('/api/ip_range');

    
    const [ranges, setRanges] = useState(null);


    useEffect(() => {
        axios.get('/api/ip_range')
          .then(response => {
            console.debug(response.data)
            setRanges(response.data);
          })
          .catch(error => {
            console.error(error);
          });
  
        
      }, []);




    return (
        <>
            {/* <Header /> */}
            <main className='bg-gray-100 min-h-screen'>


<div className="sm:px-6 w-full">

            <div className="px-4 md:px-0 py-4 md:py-7">
                <div className="flex items-center justify-between">
                    <p tabIndex={0} className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">IP Addresses & Ranges</p>
                    <div className="py-3 px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded">
                        <p>Sort By:</p>
                        <select aria-label="select" className="focus:text-indigo-600 focus:outline-none bg-transparent ml-1">
                            <option className="text-sm text-indigo-800">Latest</option>
                            <option className="text-sm text-indigo-800">Oldest</option>
                            <option className="text-sm text-indigo-800">Latest</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
                <div className="sm:flex items-center justify-between">
                    <div className="flex items-center">
                        <a className="rounded-full focus:outline-none focus:ring-2  focus:bg-indigo-50 focus:ring-indigo-800" href=" javascript:void(0)">
                            <div className="py-2 px-8 bg-indigo-100 text-indigo-700 rounded-full">
                                <p>All</p>
                            </div>
                        </a>
                    </div>
                    <Link href={"/ip_address/create"} className="bg-blue-700 text-white  block p-2  rounded-full">
                        {<AiOutlinePlus size={23}  /> }
                    </Link>
                    {/* <button  className="bg-blue-700 text-white  block p-2  rounded-full">
                        
                    </button> */}
                </div>
                <div className="mt-7 overflow-x-auto">
                    <table className="w-full whitespace-nowrap">
                        <thead>
                            <tr className="focus:outline-none h-16 border border-gray-100 rounded">
                                <th >
                                      Sr. No.
                                </th>
                                <th>
                                    IP Starting Point
                                </th>
                                <th>
                                    IP Ending Point
                                </th>
                                <th>
                                    Subnet
                                </th>
                                <th>
                                    Class
                                </th>
                                <th>
                                    Team ID
                                </th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            { ranges &&  ranges.map((range) => (
                                <>
                                <tr tabIndex={0} className="focus:outline-none h-16 border border-gray-100 rounded">
                                <td className="text-center">
                                    <p className="text-base font-medium leading-none text-gray-700 mr-2">{range.id}</p>
                                </td>
                                <td className="text-center">
                                    <p className="text-base font-medium leading-none text-gray-700 mr-2">{range.ip_start}</p>
                                </td>
                                <td className="text-center">
                                    <p className="text-base font-medium leading-none text-gray-700 mr-2">{range.ip_end}</p>
                                </td>
                                <td className="text-center">
                                    <p className="text-sm leading-none text-gray-600 ml-2">{range.ip_subnet}</p>
                                </td>
                                <td className="text-center">
                                    <p className="text-sm leading-none text-gray-600 ml-2">{range.ip_class}</p>
                                </td>
                                
                                <td className="text-center">
                                    <p className="text-sm leading-none text-gray-600 ml-2">{range.teamId}</p>
                                </td>
                                
                            </tr>
                            <tr className="h-3"></tr>
                                </>
                            ))}
                            
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
      
        

            
            </main>
        </>
    )
}