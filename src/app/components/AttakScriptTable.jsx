"use client"

import { useRef , useState, useEffect } from "react"
import axios from 'axios';
// import { VscTerminalBash } from "react-icons/vsc"
import  { BsThreeDotsVertical , BsPersonFillAdd } from "react-icons/bs"
import { AiOutlineUnorderedList } from "react-icons/ai"
import Link from "next/link";
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import CustomToaster from "@/app/components/CustomToaster"
// import CreateScriptModal from "@/app/components/admin/scripts/CreateScriptModal"
// import { BiWorld } from "react-icons/bi";



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}




function DropDownMenu() {

    
    return (
        <>
            <Menu as="div" className="relative inline-block text-left">
                <div>
                <Menu.Button className="inline-flex w-full justify-center border-none gap-x-1.5 rounded-md theme-btn-bg-color px-3 py-2 text-sm font-bold text-white shadow-sm  " >
                    <BsThreeDotsVertical  size={23} />
                </Menu.Button>
                </div>
        
                <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
                >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md theme-color text-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                    <Menu.Item>
                        <Link  href={"/admin/scripts"} className={classNames(  'block px-4 py-2 text-md' , 'flex justify-start items-center' )}>
                            <AiOutlineUnorderedList size={23} className="mr-3" />  <span > All Scripts </span>
                        </Link>
                    </Menu.Item>
                    </div>
                </Menu.Items>
                </Transition>
            </Menu>
      </>
    )
}
  



function TableTr({ script , index}) {
    return (
      <>
        <tr tabIndex={0} className="focus:outline-none h-16 border border-t-0 border-l-0 border-r-0 border-gray-100 rounded" key={script.id}>
          {/* <td className="text-center">
            <p className="text-base font-medium leading-none text-slate-500 mr-2">{index}</p>
          </td> */}
          <td className="text-center">
            <p className="text-base font-medium leading-none text-slate-500 mr-2">{script.name}</p>
          </td>
          <td className="text-center">
            <p className="text-sm leading-none text-slate-500 ml-2">{script.script_category}</p>
          </td>
        </tr>
        <tr className="h-3"></tr>
      </>
    )
}


import encrypt from "@/app/lib/encrypt"
import decrypt from "@/app/lib/decrypt"



function ScriptTableData({scripts , setScripts}){
    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/local_scripts/latest/10`)
        .then(res => {
            
            const {...data } = decrypt(res.data.encryptedData)

            setScripts(data.scripts);
        })
        .catch(error => {
            console.error(error);
        });
    }, []);


    return  (
        <>
            <div >
                <table className="w-full whitespace-nowrap">
                <thead>
                    <tr className="focus:outline-none h-16 border-0 rounded">
                    {/* <th className="text-slate-500">
                        ID
                    </th> */}
                    <th className="text-slate-500">
                        Name
                    </th>
                    <th className="text-slate-500">
                        Category
                    </th>
                    </tr>
                </thead>
                <tbody>
                    {scripts && scripts.map((script , index) => <TableTr script={script}  key={index} index={index+1} />)}
                </tbody>
                </table>
            </div>
        </>
    )

}


export default function AttakScriptTable(){
    const [scripts, setScripts] = useState(null);
    return (
        <>
          <CustomToaster />
          <div className="w-full col-span-1 relative lg:h-[80vh] h-[50vh] m-auto p-8 border-none rounded-lg bg-card-custom text-white overflow-hidden">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl ">Scripts</h1>
              <DropDownMenu  scripts={scripts} setScripts={setScripts} />    
            </div>
            <hr className="mt-5 h-0.5 border-t-0 bg-white opacity-30" />
            <ScriptTableData scripts={scripts} setScripts={setScripts}/>
          </div> 
        </>
    )
}