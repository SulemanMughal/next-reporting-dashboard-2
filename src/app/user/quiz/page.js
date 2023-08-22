"use client"

import CustomToaster from "@/app/components/CustomToaster"
import { useEffect , useState } from "react"
import {  useSession } from "next-auth/react";
import AOS from 'aos';
import 'aos/dist/aos.css';



import decrypt from "@/app/lib/decrypt"


import  { FaPuzzlePiece } from "react-icons/fa6"

import { BsSearch } from "react-icons/bs"





import Link from 'next/link'

import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'

import  { MdSort } from "react-icons/md"
import axios from "axios";
import ExpandableText from "@/app/components/ExpandableText";


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}



const SearchInput = () => {
    return (
      <div className="relative">
        <input
          type="text"
          placeholder="Search by name"
          className="placeholder-gray-400 outline-0  border border-2 border-transparent focus:border focus:border-2 focus:border-blue-500    text-white    w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-midnight-blue  rounded-md"
        />
        <button
          type="button"
          className="absolute top-0 right-0 px-3 pt-5 text-gray-500 hover:text-blue-500"
        >
            <BsSearch className="h-6 w-6 " />
        </button>
      </div>
    );
};



const SelectField = ({ options, onChange }) => {
    return (
      <select
        className="placeholder-gray-400 outline-0  border border-2 border-transparent focus:border focus:border-2 focus:border-blue-500    text-white    w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-midnight-blue  rounded-md"
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="text-md py-1">
            {option.label}
          </option>
        ))}
      </select>
    );
  };


  const CheckboxGroup = ({ text, options }) => {
    const [selectedOption, setSelectedOption] = useState('');
  
    const handleCheckboxChange = (value) => {
      setSelectedOption(value);
    };
  
    return (
      <div className="py-3 text-gray-400">
        <label className="">
            {text}
        </label>
        <div className="flex pt-2 flex-wrap">
        {options.map((option) => (
           
          <label key={option.value} className="flex items-center mr-3">
            <input
              type="checkbox"
              value={option.value}
              checked={selectedOption === option.value}
              onChange={() => handleCheckboxChange(option.value)}
              className="mr-2"
            />
            {option.label}
          </label>
        ))}
        </div>
      </div>
    );
  };
  
  
  const ResetFilterBtn = () => {
    return (
        <>
            <button className="theme-btn-bg-color  text-gray-300 my-2 py-2 px-4 rounded">
              Reset Filters
            </button>

        </>
    )
  }
  
  

const FiltersBtn = () => {
    const options = [
        { value: '0', label: 'None' },
        { value: '1', label: 'Newest to Oldest' },
        { value: '2', label: 'Oldest to Newest' },
        { value: '3', label: 'Alphabetical (a-z)' },
        { value: '4', label: 'Alphabetical Inverted (z-a)' },
        { value: '5', label: 'Easiest to Hardest' },
        { value: '6', label: 'Hardest to Easiest' },
      ];
      const [selectedOption, setSelectedOption] = useState('');
      const handleSelectChange = (e) => {
        setSelectedOption(e.target.value);
      };


    //   status by completion
      const options_2 = [
        { value: '1', label: 'Completed' },
        { value: '2', label: 'Not Completed' },
        { value: '3', label: 'Both' },
      ];

    //   difficulty level
      const options_3 = [
        { value: '1', label: 'Easy' },
        { value: '2', label: 'Medium' },
        { value: '3', label: 'Hard' },
        { value: '4', label: 'All' },
      ];

    //   categories
      const options_4 = [
        { value: '1', label: 'Incident Response' },
        { value: '2', label: 'Digital Forensics' },
        { value: '3', label: 'Security Operations' },
        { value: '4', label: 'CTF-Like' },
        { value: '5', label: 'Reverse Engineering' },
        { value: '6', label: 'OSINT' },
        { value: '7', label: 'Threat Hunting' },
        { value: '8', label: 'Threat Intelligence' },
        { value: '9', label: 'All' },
      ];
      
    
    return (
        <>
            <div  className="block  p-6 bg-card-custom  rounded-lg shadow ">
                    <SearchInput /> 
                    <SelectField options={options} onChange={handleSelectChange} />
                    <CheckboxGroup text={"Status"} options={options_2} />
                    <CheckboxGroup text={"Difficulties"} options={options_3} />
                    <CheckboxGroup text={"Categories"} options={options_4} />
                    <ResetFilterBtn />
                </div>
        </>
    )
}

function calcScenarioPoints(items){
    let points = 0
    items.forEach((item) => {
        if(item.length !== 0){
            points = points + item.points
        }
    })
    
    return points
}

function checkScenarios(data){
    let ids = [];
    let names = [];
    let status_list = [];
    let category_list=  [];
    let description_list = [];
    let total_points = []
    let difficulty_list = []
    let overall_points = 0;
    if(data.length){
        data.forEach((item) => {
            if(item.scenario){
                if(ids.includes(item.scenario.id) !== true){
                    ids.push(item.scenario.id)
                    names.push(item.scenario.name)
                    status_list.push(item.scenario.status)
                    category_list.push(item.scenario.category)
                    description_list.push(item.scenario.desc)
                    difficulty_list.push(item.scenario.difficulty)
                    total_points.push(calcScenarioPoints(item.scenario.questions))
                    overall_points = overall_points + calcScenarioPoints(item.scenario.questions)
                }
            }
        })
    }
    return [ids, names , status_list, category_list , description_list , total_points , overall_points , difficulty_list];
}



import { AiFillEye } from "react-icons/ai"


// functions based on difficulty level : select different colors
function getDifficultyColor(difficulty){
    if(difficulty === "Easy"){
        return "px-1 py-1 text-md font-semibold bg-none text-green-400"
    } else if(difficulty === "Medium"){
        return " px-1 py-1 text-md font-semibold bg-none text-orange-400"
    } else if(difficulty === "Hard"){
        return " px-1 py-1 text-md font-semibold bg-none text-red-400"
    } else {
        return " px-1 py-1 text-md font-semibold bg-none text-gray-400"
    }
}

// based on condition select different classess
// function getDifficultyClass(difficulty){
//     if(difficulty === "Easy"){
//         return "text-blue-400"
//     } else if(difficulty === "Medium"){
//         return "text-yellow-400"
//     } else if(difficulty === "Hard"){
//         return "text-red-400"
//     } else {
//         return "text-gray-400"
//     }
// }



function QuizList({scenarios}){

    return (
        <>
            {   scenarios?.length ? [...Array(scenarios?.[0].length)].map((item, index) => (
                    <div className="component component-CerCheckBox" key={index}>
                        <div className="w-full col-span-3 relative  pb-3 px-3 pt-0   rounded-lg   flex flex-col " key={index}>
                            <div className="   bg-card-custom  rounded-lg shadow   ">
                                <div className="p-5">
                                    <div className="flex justify-between items-center mb-4">
                                        <h5 className=" text-2xl font-bold tracking-tight whitespace-normal text-gray-300 ">{scenarios[1][index]}</h5>
                                    </div>
                                    <ExpandableText initialText={scenarios[4][index]}  maxLength={150} />
                                    <div className=" pt-4 pb-2 text-center">
                                        <span className={getDifficultyColor(scenarios[7][index])}>{ scenarios[7][index] }</span>
                                        <span className="px-1 py-1 text-md font-semibold bg-none text-blue-400 ">{ scenarios[3][index] }</span>
                                        <span className="px-1 py-1 text-md font-semibold bg-none text-yellow-400 ">{ scenarios[5][index] +  " Points"}</span>
                                    </div>
                                </div>
                                <div className=" pt-0 pb-4 flex justify-center">
                                    <Link href={`/user/quiz/${scenarios[0][index]}`}  className="transition ease-in-out delay-150 hover:-translate-y-1    hover:bg-blue-300 hover:text-blue-800 cursor-pointer duration-300    btn-flag-submit text-gray-400  flex items-center   sm:text-sm  sm:w-8/12   2xl:w-7/12  h-full rounded-md px-4 py-2    font-semibold   mb-2 justify-center items-center  ">
                                        <span>{"Start Challenge" } </span> 
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )) : null
            }
        </>
    )
}

export default function Page() {
    const { data: session } = useSession();
    const [scenarios, setScenarios] = useState([])  
    let data ;
    useEffect(() => {
        AOS.init();
        if (session){
            axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${session?.user.id}`)
            .then(res => {
                const {...data_2 } = decrypt(res.data.encryptedData)
                // console.log(data)
                if(data_2.status === true){
                    if(data_2.user?.team?.quiz?.questions?.length) {
                        data = data_2?.user?.team?.quiz?.questions;
                        setScenarios(checkScenarios(data))
                    } else {
                        setScenarios([])
                    }
                } else {
                    setScenarios([])
                }
            }
            )
            .catch(err => console.log(err))
        }
    }, [session])
    return (
        <>
            <CustomToaster />
            <div className="mx-10 p-3 bg-midnight-blue rounded-3xl ">
                <div className="p-4 grid  auto-rows-fr  grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 "   data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="500">
                    <div className="w-full col-span-1 relative  p-0 border-none rounded-lg "  >
                        <FiltersBtn />
                    </div>
                    <div className="w-full col-span-3 relative  p-0 border-none rounded-lg "  >
                        <div className="grid    auto-rows-fr grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="500">
                            {scenarios &&  <QuizList scenarios={scenarios} /> }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}