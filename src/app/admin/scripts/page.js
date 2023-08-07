"use client"

import axios from 'axios';
import { useRef, useState, useEffect } from "react"
import { VscTerminalBash } from "react-icons/vsc"
import ScriptCard from "@/app/components/admin/ScriptCard"
import CustomToaster from "@/app/components/CustomToaster"
import FilterBtn from "@/app/components/admin/scripts/FilterBtn"
import CreateScriptModal from "@/app/components/admin/scripts/CreateScriptModal"
import SortBtn from "@/app/components/admin/scripts/SortBtn"


function CreateScriptCard({modelHandler}){
  return (
    <>
      <div className="component component-CerCheckBox ">
        <div className="max-w-sm  mx-2 my-2 bg-none border border-4 border-dotted border-indigo-800 rounded-lg   h-100  h-full flex flex-col    transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-blue-200 duration-300 theme-btn-text-color border-theme-color">
            <button onClick={modelHandler} className='mb-3 font-normal   flex-1'>
                <VscTerminalBash size={120} className="mx-auto " />
            </button>
        </div>
      </div>
    </>
  )
}


export default function Scripts() {
  const [showModal, setShowModal] = useState(null);
  const [scripts, setScripts] = useState(null);
  const modelHandler = () => {
    setShowModal(true)
  }
  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/local_scripts`)
      .then(response => {
        setScripts(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  return (
    <>
      <CustomToaster />
      {showModal ? <CreateScriptModal setShowModal={setShowModal} updateScripts={setScripts} /> : null}
      <div className="px-5 py-4 md:py-7">
            <div className="flex items-center justify-between">
            <h1 className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-5xl font-bold leading-normal text-white"> Attack Scripts</h1>
                <div className="py-3 px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-none  cursor-pointer rounded">
                    <SortBtn  />
                    <FilterBtn />
                </div>
            </div>
            <div className="grid gap-4 auto-rows-fr grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  my-5 px-0">
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