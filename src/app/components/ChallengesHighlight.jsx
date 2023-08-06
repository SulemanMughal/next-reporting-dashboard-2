import { data } from "../data/data"

import { SiSemanticweb } from "react-icons/si"



export default function ChallengesHighlight(){
    return (
        <div className="w-full col-span-3 relative lg:h-[70vh] h-[50vh] m-auto p-8 border rounded-lg bg-white overflow-scroll">
            <h1 className="2xl:text-2xl text-1xl">Challenges Highlight</h1>
            <hr className="my-5 h-0.5 border-t-0 bg-black opacity-30" />
            <ul>    
                <li  className="bg-gray-50 hover:bg-gray-100 rounded-0 my-3 p-2 pl-3 " >
                    <p className="my-3 uppercase">Most Popular Challenge</p>
                    <div className="flex items-center cursor-pointer ">
                        <div className="bg-purple-100 rounded-lg p-3 ">
                            <SiSemanticweb  className="text-purple-800" size={30} />
                        </div>
                        <div className="pl-4 ">
                        <p className="text-gray-800 ">Convulatd Bot</p>
                        <p className="text-gray-800 ">2 owns</p>
                        
                    </div>
                    </div>
                </li>
                <li  className="bg-gray-50 hover:bg-gray-100 rounded-0 my-3 p-2 pl-3 " >
                    <p className="my-3 uppercase">Least Popular Challenge</p>
                    <div className="flex items-center cursor-pointer ">
                        <div className="bg-purple-100 rounded-lg p-3 ">
                            <SiSemanticweb  className="text-purple-800" size={30} />
                        </div>
                        <div className="pl-4 ">
                        <p className="text-gray-800 ">Dork Inside</p>
                        <p className="text-gray-800 ">2 owns</p>
                    </div>
                    </div>
                </li>
                <li  className="bg-gray-50 hover:bg-gray-100 rounded-0 my-3 p-2 pl-3 " >
                    <p className="my-3 uppercase">Most Popular Category</p>
                    <div className="flex items-center cursor-pointer ">
                        <div className="bg-purple-100 rounded-lg p-3 ">
                            <SiSemanticweb  className="text-purple-800" size={30} />
                        </div>
                        <div className="pl-4 ">
                        <p className="text-gray-800 ">Forensic</p>
                        <p className="text-gray-800 ">2 owns</p>
                    </div>
                    </div>
                </li>
                <li  className="bg-gray-50 hover:bg-gray-100 rounded-0 my-3 p-2 pl-3 " >
                    <p className="my-3 uppercase">Least Popular Category</p>
                    <div className="flex items-center cursor-pointer ">
                        <div className="bg-purple-100 rounded-lg p-3 ">
                            <SiSemanticweb  className="text-purple-800" size={30} />
                        </div>
                        <div className="pl-4 ">
                        <p className="text-gray-800 ">Hardware</p>
                        <p className="text-gray-800 ">2 owns</p>
                    </div>
                    </div>
                </li>
            </ul>
        </div>
    )
}