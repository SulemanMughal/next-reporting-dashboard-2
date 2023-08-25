"use client"

import CustomToaster from "@/app/components/CustomToaster"
import axios from "axios";
import { BsSearch } from "react-icons/bs"
import decrypt from "@/app/lib/decrypt"
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

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

const getInitials = (name) => {
    return name.charAt(0).toUpperCase() + name.charAt(1).toUpperCase()
}



const DataRow = ({index , item}) =>{
    // console.debug(item)
    const totalPoints = item?.team?.answers.reduce((sum, obj) => sum + obj.obtainedPoints, 0);
    return (
        <>
            <div className="grid gap-3 auto-rows-fr  grid-cols-5  py-5 px-7 text-xl bg-card-custom text-white rounded-xl place-items-center mb-5">
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
                        {item.question.scenario.category}
                    </h1>
                    <span className="block text-sm text-green-500  pt-1    ">{"+" + ` ${item.obtainedPoints}` + " Points"}</span>
                </div>
                
                
                

            </div>
        </>
    )
}

export default function Page(){
    const [data, setData] = useState([])
    useEffect(() => {
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
                {
                    data && data.map((item, index) => (
                        <DataRow  key={index}  index={index+1} item={item} />
                    ))
                }
                
            </div>
        </>
    )
}