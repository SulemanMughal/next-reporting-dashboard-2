"use client"

// import axios from 'axios';
import { useRef, useState, useEffect } from "react"
import { VscTerminalBash } from "react-icons/vsc"
import ScriptCard from "@/app/components/admin/ScriptCard"
import FilterBtn from "@/app/components/admin/scripts/FilterBtn"
import CreateScriptModal from "@/app/components/admin/scripts/CreateScriptModal"
import SortBtn from "@/app/components/admin/scripts/SortBtn"


import AOS from 'aos';
import 'aos/dist/aos.css';


function CreateScriptCard({modelHandler}){
  return (
    <>
      <div className="w-full col-span-1 relative  m-auto p-0 border-none rounded-lg h-full" >
        <div className="  mx-2 my-2 bg-none border border-4 border-dotted border-indigo-800 rounded-lg   h-100  h-full flex flex-col    transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-blue-200 duration-300 theme-btn-text-color border-theme-color">
            <button onClick={modelHandler} className='mb-3 font-normal   flex-1'>
                <VscTerminalBash size={120} className="mx-auto " />
            </button>
        </div>
      </div>
    </>
  )
}


export default function ScriptList({data}) {
  const [showModal, setShowModal] = useState(null);
  const [scripts, setScripts] = useState(null);
  const modelHandler = () => {
    setShowModal(true)
  }
  useEffect(() => {
    AOS.init();
    setScripts(data.scripts);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {showModal ? <CreateScriptModal setShowModal={setShowModal} updateScripts={setScripts} /> : null}
      <div className="">
            <div className="flex items-center justify-between p-5 px-3 pb-0 mb-5">
            <h1 className="text-white text-2xl font-bold"> Attack Scripts</h1>
                <div className="flex justify-end items-center">
                    <SortBtn  />
                    <FilterBtn />
                </div>
            </div>
            <div className="pb-5 px-0 grid gap-4 auto-rows-fr grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
              <CreateScriptCard modelHandler={modelHandler} />
              {scripts && scripts.map((script, index) => (
                <>
                  <ScriptCard key={index} script={script} />
                </>
              ))}
          </div>  
        </div>
    </>
  )
}