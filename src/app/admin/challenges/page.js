"use client"

import SortDropDown from "@/app/components/admin/quiz/SortDropDown"
import AddNewScenario from "@/app/components/admin/quiz/AddNewScenario"
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react"
import CustomToaster from "@/app/components/CustomToaster"
import { useState } from "react"
import axios from "axios";
// import { toast } from "react-hot-toast";
import decrypt from "@/app/lib/decrypt"
import { Triangle } from 'react-loader-spinner'
import {MdGroups} from "react-icons/md"
import {convertStringToTitleCase , convertStringToArray , getDifficultyColor , calcTotalPointsScenario  }  from "@/app/lib/helpers"
import { AiFillFile } from "react-icons/ai"
import { FaKey } from "react-icons/fa"
import { BsFillDatabaseFill } from "react-icons/bs"
import ExpandableText from "@/app/components/ExpandableText"
import { BsSearch } from "react-icons/bs"
import Link from "next/link";




const SearchInput = () => {
    return (
      <div className="relative">
        <input
          type="text"
          placeholder="Search by name"
          className="placeholder-columbia-blue outline-0  border border-2 border-transparent focus:border focus:border-2 focus:border-blue-900    text-white    w-full  pl-2 py-2 mt-2 mr-0 mb-0 ml-0 text-base block bg-deep-indigo  rounded-md"
        />
        <button
          type="button"
          className="w-4 h-4 absolute inset-y-0 mt-auto mb-auto mr-3 right-0 text-white"
        >
            <BsSearch className="h-4 w-4 " />
        </button>
      </div>
    );
};


const SelectField = ({ options, onChange }) => {
    return (
      <>
      <label className="text-sm text-gray-300 block p-0 mt-5">
        {"Sort By"}
      </label>
      <div className="relative mt-2">
      <select
        className="appearance-none placeholder-gray-400 outline-0  border border-2 border-deep-blue-violet focus:border focus:border-2 focus:border-blue-900  text-gray-400    w-full p-3 pl-4 pr-8   m-0 mt-2 text-base block bg-deep-indigo  rounded-md shadow-sm"
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="text-md py-1">
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
      </div>
      </div>
      </>
    );
  };

  const CheckboxGroup = ({ text, options }) => {
    const [selectedOption, setSelectedOption] = useState('');
  
    const handleCheckboxChange = (value) => {
      setSelectedOption(value);
    };
  
    return (
      <div className="py-3 text-gray-300 text-sm">
        <label className="">
            {text}
        </label>
        <div className="flex pt-2 flex-wrap">
        {options.map((option) => (
           
          <label key={option.value} className="flex items-center mr-3 text-sm">
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
            <button className="bg-deep-blue w-32 h-full text-white mr-5 text-sm  text-gray-300 my-2 py-2 px-4 rounded">
              Reset Filters
            </button>

        </>
    )
  }

  function DifficultyLevelCheckBox(){
    const [selectedOption, setSelectedOption] = useState('');
  
    const handleCheckboxChange = (value) => {
      setSelectedOption(value);
    };
    return (
      <>
        <div className="py-3 text-gray-300">
                    <label className=" text-sm" >Difficulties</label>
                    <div className="flex flex-col sm:flex-row mt-2">
                        <label className="flex items-center text-white rounded mr-2 mt-2 sm:mt-0 bg-green-600 p-1 cursor-pointer select-none font-bold pr-2">
                            <input type="radio"  value="easy" className="input border rounded-full mr-2 appearance-none" checked={selectedOption === "easy"}  onChange={() => handleCheckboxChange("easy")}/>
                            Easy
                        </label>
                        <label className="flex items-center text-black rounded mr-2 mt-2 sm:mt-0 bg-hot-cinnamon p-1 cursor-pointer select-none font-bold pr-2">
                            <input type="radio" className="input border rounded-full mr-2 appearance-none"  value="medium" checked={selectedOption === "medium"} onChange={() => handleCheckboxChange("medium")} />
                            Medium
                        </label>
                        <label className="flex items-center text-black rounded mr-2 mt-2 sm:mt-0 bg-valencia-red p-1 cursor-pointer select-none font-bold pr-2">
                            <input type="radio" className="input border rounded-full mr-2 appearance-none"  value="hard" checked={selectedOption === "hard"} onChange={() => handleCheckboxChange("hard")} />
                            Hard
                        </label>
                    </div>
                </div>
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
                    <DifficultyLevelCheckBox />
                    {/* <CheckboxGroup text={"Difficulties"} options={options_3} /> */}
                    <CheckboxGroup text={"Categories"} options={options_4} />
                    <ResetFilterBtn />
                </div>
        </>
    )
}




// function ScenarioCard({scenario}) {
//     return (
//         <>
//             <div className="w-full col-span-1 h-full " data-aos="zoom-in" data-aos-duration="500" data-aos-delay="200">
//                 <div className="w-full col-span-2  h-full p-4 bg-card-custom border-none rounded-lg shadow sm:p-8  ">
//                     {/* name */}
//                     <div className="flex justify-between items-center  mb-4">
//                         <div className=" flex items-center  " >
//                             <span className='rounded-full   text-lg font-semibold bg-none text-gray-400 '>
//                                 {convertStringToTitleCase(scenario.name) || "Undefined"}
//                             </span>
//                         </div>
//                     </div>
//                     {/* tags */}
//                     <div className='flex justify-start flex-wrap items-center my-3'>
//                         {convertStringToArray(scenario.tags)?.map((tag, index) => {
//                             return (
//                                 <span className="inline-block  rounded-full px-2   py-1 text-sm  bg-indigo-600 text-indigo-100 mr-2 my-2" key={tag}>{convertStringToTitleCase(tag)}</span>
//                             )
//                         })}
//                     </div>
//                     {/* category */}
//                     <div className=" flex items-center  justify-center text-center px-0 mx-0 my-3 flex-wrap" >
//                         <span className="px-1 py-1 text-md font-semibold bg-none text-blue-400">{convertStringToTitleCase(scenario.category)}</span>
//                         <span className={getDifficultyColor(convertStringToTitleCase(scenario.difficulty)) + " mx-2"}>
//                             {convertStringToTitleCase(scenario.difficulty)}
//                         </span>
//                         <span className='px-1 py-1 text-md font-semibold bg-none text-yellow-400'>
//                             {calcTotalPointsScenario(scenario)} {"Points"} 
//                         </span>
//                         <span className='px-1 py-1 text-md font-semibold bg-none text-rose-400  '>
//                             {scenario.questions.length} {"Questions"} 
//                         </span>
//                     </div>
//                     {/* {Files} */}
//                     {scenario.files?.length ? (
//                         <>
//                             {scenario.files.map((file, index) => (
                                
//                                 <div className=" flex items-center  justify-center  px-0 mx-0 my-3 flex-wrap" key={file.filename} >
//                                     <div className="flex justify-start items-center">
//                                         <AiFillFile  size={23} className="text-blue-500"/>
//                                         <span className="px-1 py-1 text-md font-semibold bg-none text-blue-400">
//                                             {convertStringToTitleCase(file.filename)}
//                                         </span>
//                                     </div>
//                                     <div className="flex justify-start items-center mx-3">
//                                         <FaKey  size={23} className="text-green-500"/>
//                                         <span className="px-2 py-1 text-md font-semibold bg-none text-blue-400">
//                                             {convertStringToTitleCase(file.password)}
//                                         </span>
//                                     </div>
//                                     {/* <div className="flex justify-start items-center mx-3">
//                                         <BsFillDatabaseFill  size={23} className="text-cyan-600"/>
//                                         <span className="px-2 py-1 text-md font-semibold bg-none text-blue-400">
//                                             {getFileSize(`${process.env.NEXT_PUBLIC_BASE_URL}${file?.filepath}`)  }
                                            
//                                         </span>
//                                     </div> */}
//                                     {/* <span className={getDifficultyColor(convertStringToTitleCase(scenario.difficulty)) + " mx-2"}>
//                                         {convertStringToTitleCase(scenario.difficulty)}
//                                     </span>
//                                     <span className='px-1 py-1 text-md font-semibold bg-none text-yellow-400'>
//                                         {calcTotalPointsScenario(scenario)} {"Points"} 
//                                     </span>
//                                     <span className='px-1 py-1 text-md font-semibold bg-none text-rose-400  '>
//                                         {scenario.questions.length} {"Questions"} 
//                                     </span> */}
//                                 </div>           
//                             ))}
//                         </>
//                     ) : null}
//                     {scenario?.desc?.length ? (
//                         <div className="flow-root">
//                             <ExpandableText initialText={scenario?.desc} maxLength={150} />
//                         </div>
//                     ) : null}
                     
                    
//                 </div>
//             </div>
//         </>
//     )
// }






function NewScenarioCard({scenarios}){

    // console.debug(scenarios)

    return (
        <>
            {   scenarios?.length ? scenarios.map((item, index) => (
                    <div className="component component-CerCheckBox" key={index} data-aos="fade-up" data-aos-duration="500" data-aos-delay={(index+1)*100}>
                        <div className="w-full col-span-3 relative      rounded-lg   flex flex-col " key={index}>
                            <div className="   bg-deep-blue-violet  rounded-lg shadow   ">
                                <div className="p-5">
                                    {/* scenario name */}
                                    <h5 className=" font-medium text-base tracking-tight whitespace-normal text-gray-300  text-center mb-1">{convertStringToTitleCase(item.name)}</h5>
                                    <div className="text-gray-400 text-xs truncate text-center">
                                        {item.desc}
                                    </div>
                                    {/* <ExpandableText initialText={scenarios[4][index]}  maxLength={150} /> */}
                                    <div className=" pt-4 pb-2 text-center">
                                        {/* Difficulty Level */}
                                        <span className={getDifficultyColor(item.difficulty)}>{ convertStringToTitleCase(item.difficulty) }</span>

                                        {/* Category */}
                                        <span className="px-1 py-1 text-base font-bold bg-none text-blue-400 ">{ convertStringToTitleCase(item.category) }</span>

                                        {/* Total Points for a Scenario */}
                                        <span className="px-1 py-1 text-base font-bold bg-none text-yellow-400 ">{ calcTotalPointsScenario(item) +  " Points"}</span>
                                    </div>
                                </div>
                                <div className=" pt-0 pb-4 flex justify-center">
                                    <Link href={`/admin/challenges/${item.id}`}  className=" cursor-pointer     bg-dark-navy-blue  flex justify-center items-center   text-white text-base    h-full rounded-md px-2 py-1       ">
                                        <span>{"Details" } </span> 
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

import CustomTriangleLoader from "@/app/components/CustomTriangleLoader"


// function checkScenarios(data){
//     let ids = [];
//     let names = [];
//     let status_list = [];
//     let category_list=  [];
//     let description_list = [];
//     let total_points = []
//     let difficulty_list = []
//     let overall_points = 0;
//     if(data.length){
//         data.forEach((item) => {
//             if(item.scenario){
//                 if(ids.includes(item.scenario.id) !== true){
//                     ids.push(item.scenario.id)
//                     names.push(item.scenario.name)
//                     status_list.push(item.scenario.status)
//                     category_list.push(item.scenario.category)
//                     description_list.push(item.scenario.desc)
//                     difficulty_list.push(item.scenario.difficulty)
//                     total_points.push(calcScenarioPoints(item.scenario.questions))
//                     overall_points = overall_points + calcScenarioPoints(item.scenario.questions)
//                 }
//             }
//         })
//     }
//     return [ids, names , status_list, category_list , description_list , total_points , overall_points , difficulty_list];
// }

export default function Page(){
    // const [showModal, setShowModal] = useState(false)
    const [scenarios, setScenarios] = useState([])  
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(()=>{
        AOS.init();
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/scenario/`)
        .then(res => {
            const {...data } = decrypt(res.data.encryptedData)
            // console.log(data)
            if(data.status === true){
                if(data.scenarios?.length) {
                    setScenarios(data?.scenarios)
                    setError(null);
                } else {
                    setScenarios([])
                    setError(null);
                }
            } else{
                setScenarios([])
                setError(`${data.error}`);
                // toast.error(`${data.error}`)
            }
        }).catch((err) => {
            console.log(err)
            // toast.error("Something went wrong")
            setError(`Something went wrong`)
        }).finally(() => {
            setLoading(false);
        })
    }, [])
    return (
        <>

            <CustomToaster />
            <div >
                <div className="flex items-center justify-between pl-5 py-4 md:py-7 ">
                    <h1 className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-5xl font-bold leading-normal text-white"> 
                        Challenges
                    </h1>
                    
                        <div className=" flex items-center text-sm font-medium leading-none text-gray-600 bg-none  cursor-pointer rounded">
                            <AddNewScenario />
                            {/* <SortDropDown /> */}
                            {/* <FilterBtn /> */}
                        </div>
                </div>
                <div className="p-4 grid gap-4  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  ">
                    <div className="w-full col-span-1 relative  p-0 border-none rounded-lg " data-aos="fade-down" data-aos-duration="1000" data-aos-delay="500" >
                        <FiltersBtn />
                    </div>
                
                
                {loading ? (
                    <>
                        <div className="w-full col-span-3 relative  p-0 border-none rounded-lg">
                        {/* <Triangle
                            height="300"
                            width="300"
                            color="#4fa94d"
                            ariaLabel="triangle-loading"
                            wrapperStyle={{}}
                            wrapperClass={"flex justify-center"}
                            visible={true}
                            className={"flex "} 
                        /> */}
                        <CustomTriangleLoader />
                        </div>
                    </>
                ) : error ? (
                        <>
                            <div><p className="text-lg text-white">
                                    Error: {error}
                                </p></div>
                        </>
                ) : (
                    <>
                    <div className="w-full col-span-3 relative  p-0 border-none rounded-lg "   >
                        <div className=" grid gap-4 auto-rows-fr grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 ">
                                {/* {scenarios.map((scenario, index) => (
                                    <>
                                        <ScenarioCard scenario={scenario} key={scenario.id} />
                                    </>
                                ))} */}
                                {scenarios && <NewScenarioCard scenarios={scenarios}  /> }
                            </div>
                    </div>
                    </>
                )}
                </div>
            </div>
        </>
    )
}