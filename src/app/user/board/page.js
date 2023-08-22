"use client"

import CustomToaster from "@/app/components/CustomToaster"


import { BsSearch } from "react-icons/bs"

const SearchInput = () => {
    return (
      <div className="relative">
        <input
          type="text"
          placeholder="Search by name"
          className="placeholder-gray-400 outline-0  border border-2 border-transparent focus:border focus:border-2 focus:border-blue-500    text-white    w-full py-2 pr-4  pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-dark-blue  rounded-md"
        />
        <button
          type="button"
          className="absolute top-0 right-0 px-3 py-5 text-gray-500 hover:text-blue-500"
        >
            <BsSearch className="h-4 w-4 " />
        </button>
      </div>
    );
};


const DataRowHeader = () =>{
    return (
        <>
            <div className="grid gap-3 auto-rows-fr  grid-cols-5  py-5 px-7 text-xl  text-white rounded-xl place-items-center mb-5">
                <div className=" w-full col-span-1 relative ">
                    <h1 className=" ">
                        #
                    </h1>
                </div>
                <div className=" w-full col-span-1 relative ">
                    <h1 className=" ">
                        Profile
                    </h1>
                </div>
                <div className="w-full col-span-1 relative">
                    <h1 className=" ">
                        Team 
                    </h1>
                </div>
                <div className="w-full col-span-1 relative">
                    <h1 className=" ">
                        Points
                    </h1>
                </div>

                <div className="w-full col-span-1 relative">
                    <h1 className=" ">
                        Latest Submission
                    </h1>
                </div>

            </div>
        </>
    )
}

const DataRow = () =>{
    return (
        <>
            <div className="grid gap-3 auto-rows-fr  grid-cols-5  py-5 px-7 text-xl bg-card-custom text-white rounded-xl place-items-center mb-5">
                <div className="flex  items-center w-full col-span-1 relative ">
                    <h1 className=" ">
                        18312
                    </h1>
                </div>
                <div className="flex  justify-start items-center w-full col-span-1 relative ">
                    <button className="bg-white  text-black  text-md p-2 rounded-full border border-4 border-double border-blue-500 mr-3">
                        SU
                    </button>
                    <h1 className=" ">
                        Suleman
                    </h1>
                </div>
                <div className="w-full col-span-1 relative">
                    <h1 className=" ">
                        Team - 1
                    </h1>
                </div>
                <div className="w-full col-span-1 relative">
                    <h1 className=" ">
                        8465
                    </h1>
                </div>

                <div className="w-full col-span-1 relative">
                    <h1 className=" ">
                        Phishing Analysis
                    </h1>
                </div>
                
                
                

            </div>
        </>
    )
}

export default function Page(){
    return (
        <>
            <CustomToaster />
            <div className="mx-10 mb-10 p-8 bg-midnight-blue rounded-3xl ">
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-white text-2xl font-bold">
                        Scoreboard
                    </h1>
                    <div className="flex justify-end items-center ">
                        <button className="theme-btn-bg-color  text-gray-300 py-2  pr-4  pl-4 mt-2 mr-3 rounded-md mb-0 ml-0 ">
                            Reset Filters
                        </button>
                        <SearchInput />
                    </div>
                </div>
                <DataRowHeader />
                <DataRow />
                <DataRow />
                <DataRow />
                <DataRow />
                <DataRow />
                <DataRow />
                <DataRow />
                <DataRow />
                <DataRow />
                <DataRow />
            </div>
        </>
    )
}