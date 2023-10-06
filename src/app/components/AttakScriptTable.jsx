"use client"

import  { BsThreeDotsVertical  } from "react-icons/bs"
import { AiOutlineUnorderedList } from "react-icons/ai"
import Link from "next/link";
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import CustomToaster from "@/app/components/CustomToaster"



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}




function DropDownMenu() {

    
    return (
        <>
            <Menu as="div" className="relative inline-block text-left">
                <div>
                <Menu.Button className="inline-flex w-full bg-deep-blue-violet text-white py-2  pr-4  pl-4 mt-2  h-full border border-1 border-deep-blue-violet rounded-md mb-0 ml-0 " >
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
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-0 btn-flag-submit shadow-lg">
                    <div className="py-0">
                    <Menu.Item>
                        <Link  href={"/admin/scripts"} className={classNames(  'block px-4 py-5 text-lg font-bold w-full  flex justify-start items-center  hover:bg-blue-300 hover:text-blue-800' )}>
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
        <tr tabIndex={0} className="focus:outline-none h-16 border border-t-0 border-l-0 border-r-0 border-gray-100 rounded truncate w-full" key={script.id}>
          <td className="text-left truncate">
            <p className=" text-sm 2xl:text-base font-medium leading-none text-gray-300 mr-2 ">{script.name}</p>
          </td>
        </tr>
        <tr className="h-3"></tr>
      </>
    )
}


export default function AttakScriptTable({latest_scripts}){
    return (
        <>
          <CustomToaster />
          <div className="w-full col-span-1 relative lg:h-[80vh] h-[50vh] m-auto p-8 border-none rounded-lg bg-card-custom text-white overflow-hidden">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl ">Scripts</h1>
              <DropDownMenu   />    
            </div>
            <hr className="mt-5 h-0.5 border-t-0 bg-white opacity-30" />
                <div >
                    <table className="w-full whitespace-nowrap">
                    <thead>
                        <tr className="focus:outline-none h-16 border-0 rounded">
                        <th className="text-gray-400 text-left">
                            Name
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        {latest_scripts && latest_scripts.map((script , index) => <TableTr script={script}  key={index} index={index+1} />)}
                    </tbody>
                    </table>
                </div>
          </div> 
        </>
    )
}