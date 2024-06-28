"use client"

import CustomToaster from "@/app/components/CustomToaster"
import { useEffect , useState } from "react"
import {  useSession } from "next-auth/react";
import AOS from 'aos';
import 'aos/dist/aos.css';

import Image from 'next/image'


import decrypt from "@/app/lib/decrypt"


import  { FaPuzzlePiece } from "react-icons/fa6"

import { BsSearch } from "react-icons/bs"

import {getDifficultyColor} from "@/app/lib/helpers"





import Link from 'next/link'

// import { Fragment } from 'react'
// import { Menu, Transition } from '@headlessui/react'

// import  { MdSort } from "react-icons/md"
import axios from "axios";
// import ExpandableText from "@/app/components/ExpandableText";


// function classNames(...classes) {
//     return classes.filter(Boolean).join(' ')
// }



const SearchInput = () => {
    return (
      <div className="relative">
        <input
          type="text"
          placeholder="Search by name"
          className="custom-form-control"
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
        className="appearance-none custom-form-control"
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
           
          <label key={option.value} className="flex items-center mr-3 text-sm pb-2">
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


  function DifficultyLevelCheckBox(){
    const [selectedOption, setSelectedOption] = useState('');
  
    const handleCheckboxChange = (value) => {
      setSelectedOption(value);
    };
    return (
      <>
        <div className="py-3 text-gray-300">
                    <label className=" text-sm mb-3" >Difficulties</label>
                    <div className="flex  flex-wrap  mt-2">
                        <label className="flex items-center text-white rounded mr-2 my-2 sm:mt-0 bg-green-600 p-1 cursor-pointer select-none font-bold pr-2">
                            <input type="radio"  value="easy" className="input border rounded-full mr-2 appearance-none" checked={selectedOption === "easy"}  onChange={() => handleCheckboxChange("easy")}/>
                            Easy
                        </label>
                        <label className="flex items-center text-black rounded mr-2 my-2 sm:mt-0 bg-hot-cinnamon p-1 cursor-pointer select-none font-bold pr-2">
                            <input type="radio" className="input border rounded-full mr-2 appearance-none"  value="medium" checked={selectedOption === "medium"} onChange={() => handleCheckboxChange("medium")} />
                            Medium
                        </label>
                        <label className="flex items-center text-black rounded mr-2 my-2 sm:mt-0 bg-valencia-red p-1 cursor-pointer select-none font-bold pr-2">
                            <input type="radio" className="input border rounded-full mr-2 appearance-none"  value="hard" checked={selectedOption === "hard"} onChange={() => handleCheckboxChange("hard")} />
                            Hard
                        </label>
                        <label className="flex items-center text-black rounded mr-2 my-2 sm:mt-0 bg-indigo-500 p-1 cursor-pointer select-none font-bold pr-2">
                          <input type="radio" className="input border rounded-full mr-2 appearance-none "  value="all" checked={selectedOption === "all"} onChange={() => handleCheckboxChange("all")} />
                          <span className="block pr-5">All</span>
                      </label>
                    </div>
                </div>
      </>
    )
  }

  
  
  const ResetFilterBtn = () => {
    return (
        <>
            <button className="reset-filter-btn">
              Reset Filters
            </button>

        </>
    )
  }
  


  function UserChallengeProgress(){
    return (
      <>
        <div className="text-lg w-full mr-5 text-gray-300">
          <b style={{"color": "#2ecc71"}}>
              Team Progress
          </b>

          <div className="w-full h-9 mt-2 bg-deep-indigo rounded">
              <div style={{"width": "0%"}} className="h-full bg-theme-4 rounded text-center text-white">0%</div>
          </div>
        </div>
        <Image  width={"90"}  height={"90"} alt="image" className="rounded-full w-20 ml-3 ml-auto" src="/assets/img/bWwHTdsIEC1mQFPmnXnZ.png" />
      </>
    )
  }
  

// const FiltersBtn = ({quizTotalPoints , teamTotalPoints}) => {
//     const options = [
//         { value: '0', label: 'None' },
//         { value: '1', label: 'Newest to Oldest' },
//         { value: '2', label: 'Oldest to Newest' },
//         { value: '3', label: 'Alphabetical (a-z)' },
//         { value: '4', label: 'Alphabetical Inverted (z-a)' },
//         { value: '5', label: 'Easiest to Hardest' },
//         { value: '6', label: 'Hardest to Easiest' },
//       ];
//       const [selectedOption, setSelectedOption] = useState('');
//       const handleSelectChange = (e) => {
//         setSelectedOption(e.target.value);
//       };


//     //   status by completion
//       const options_2 = [
//         { value: '1', label: 'Completed' },
//         { value: '2', label: 'Not Completed' },
//         { value: '3', label: 'Both' },
//       ];

//     //   difficulty level
//       const options_3 = [
//         { value: '1', label: 'Easy' },
//         { value: '2', label: 'Medium' },
//         { value: '3', label: 'Hard' },
//         { value: '4', label: 'All' },
//       ];

//     //   categories
//       const options_4 = [
//         { value: '1', label: 'Incident Response' },
//         { value: '2', label: 'Digital Forensics' },
//         { value: '3', label: 'Security Operations' },
//         { value: '4', label: 'CTF-Like' },
//         { value: '5', label: 'Reverse Engineering' },
//         { value: '6', label: 'OSINT' },
//         { value: '7', label: 'Threat Hunting' },
//         { value: '8', label: 'Threat Intelligence' },
//         { value: '9', label: 'All' },
//       ];
      
    
//     return (
//         <>
//         <div className="intro-y col-span-12 md:col-span-3 flex flex-wrap sm:flex-nowrap items-center pl-5 pr-5 pb-5 pt-5 mb-5 bg-deep-blue-violet ">
//           <div className="text-lg w-full mr-5 text-gray-300">
//             <b style={{"color": "#2ecc71"}}>
//                 Team Progress
//             </b>

//             <div className="w-full h-9 mt-2 bg-deep-indigo rounded">
//                 <div style={{"width": `${parseInt((teamTotalPoints/quizTotalPoints)*100)}%`}} className="h-full bg-deep-blue rounded text-center text-white">{parseInt((teamTotalPoints/quizTotalPoints)*100)}%</div>
//             </div>
//           </div>
//           <Image  width={"90"}  height={"90"} alt="image" className="rounded-full w-20 ml-3 ml-auto" src="/assets/img/bWwHTdsIEC1mQFPmnXnZ.png" />
//         </div>
//         <div  className="block  p-6 bg-deep-blue-violet  rounded-lg shadow ">
//         <SearchInput /> 
//         <SelectField options={options} onChange={handleSelectChange} />
//         <CheckboxGroup text={"Status"} options={options_2} />
//         <DifficultyLevelCheckBox />
//         {/* <CheckboxGroup text={"Difficulties"} options={options_3} /> */}
//         <CheckboxGroup text={"Categories"} options={options_4} />
//         <ResetFilterBtn />
//         </div>
//         </>
//     )
// }

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

// function getDifficultyColor(difficulty){
//     if(difficulty === "Easy"){
//         return "px-1 py-1 text-md font-semibold bg-none text-green-400"
//     } else if(difficulty === "Medium"){
//         return " px-1 py-1 text-md font-semibold bg-none text-orange-400"
//     } else if(difficulty === "Hard"){
//         return " px-1 py-1 text-md font-semibold bg-none text-red-400"
//     } else {
//         return " px-1 py-1 text-md font-semibold bg-none text-gray-400"
//     }
// }


function QuizList({scenarios}){
  // console.debug(scenarios)

    return (
        <>
            {   scenarios?.length ? [...Array(scenarios?.[0].length)].map((item, index) => (
              <div className="component component-CerCheckBox" key={index} data-aos="fade-up" data-aos-duration="400" data-aos-delay={"100"}>
                  <div className="w-full col-span-3 relative      rounded-lg   flex flex-col  h-full" key={index}>
                      <div className="   bg-color-1 rounded-lg shadow    h-full">
                          <div className="p-5">
                              <h5 className=" font-medium text-base tracking-tight whitespace-normal text-gray-300  text-center mb-1">{scenarios[1][index]}</h5>
                              <div className="text-gray-400 text-xs truncate text-center">
                                  {scenarios[4][index]}
                              </div>
                              {/* <ExpandableText initialText={scenarios[4][index]}  maxLength={150} /> */}
                              <div className="flex flex-wrap justify-center items-center pt-4 pb-2">
                                <span className={getDifficultyColor(scenarios[7][index])}>{ scenarios[7][index] }</span>
                                <span className="px-1 py-1 text-sm  2xl:text-base font-bold bg-none text-blue-400 ">{ scenarios[3][index] }</span>
                                <span className="px-1 py-1 text-sm  2xl:text-base font-bold bg-none text-yellow-400 ">{ scenarios[5][index] +  " Points"}</span>
                              </div>
                              
                          </div>
                          <div className=" pt-0 pb-4 flex justify-center">
                              <Link href={`/user/quiz/${scenarios[0][index]}`}  className=" cursor-pointer     bg-color-7  flex justify-center items-center   text-color-6 text-sm font-medium    h-full rounded-md px-3 py-1       ">
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

function calculateTotalObtainedPoints(questions) {
  console.debug(questions)
  let totalObtainedPoints = 0;

  questions.forEach(item => {
      item.answers.forEach(answer => {
          totalObtainedPoints += answer.obtainedPoints;
      });
  });

  return totalObtainedPoints;
}


function getUniqueScenarios(scenarios) {
  
  
  let  uniqueScenarioObjects = Array.from(new Set(scenarios.map(item => item.category)))
  .map(stringified => (
    { 
      value: `${stringified}`, 
      label: `${stringified}` 
    }
  ) );
  uniqueScenarioObjects.push({value: "all", label: "All"})
  return uniqueScenarioObjects
}

export default function Page() {
    const { data: session } = useSession();
    const [scenarios, setScenarios] = useState([])
    const [quizTotalPoints, setQuizTotalPoints] = useState(0)
    const [teamTotalPoints, setTeamTotalPoints] = useState(0)
    let data ;
    let arrSceanrios = [];


    const [categories, setCategories] = useState(null)



    // --------------------
    // filters options


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
    




    const DataFetch = () => {
      axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${session?.user.id}`)
      .then(res => {
          const {...data_2 } = decrypt(res.data.encryptedData)
          // console.log(data)
          if(data_2.status === true){
              if(data_2.user?.team?.quiz?.questions?.length) {
                  data = data_2?.user?.team?.quiz?.questions;
                  arrSceanrios = checkScenarios(data)
                  setScenarios(arrSceanrios)
                  setQuizTotalPoints(arrSceanrios[arrSceanrios.length - 2])
                  setTeamTotalPoints(calculateTotalObtainedPoints(data))

                  // console.debug(arrSceanrios)
                
                  let  uniqueScenarioObjects = Array.from(new Set(arrSceanrios[3].map(item => item)))
                  .map(stringified => (
                    { 
                      value: `${stringified}`, 
                      label: `${stringified}` 
                    }
                  ) );
                  uniqueScenarioObjects.push({value: "all", label: "All"})
                    


                  setCategories(uniqueScenarioObjects)

                  // console.debug(setCategories(getUniqueScenarios(data?.scenarios)))
                  // console.debug(arrSceanrios)
                  // console.debug(checkScenarios(data))
                  // console.debug(data)
                  // console.debug(arrSceanrios[arrSceanrios.length - 2])
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



  // ----------------


    useEffect(() => {
        AOS.init();
        if (session){
          DataFetch()
        }
    }, [session])
    return (
        <>
            <CustomToaster />
            <div className="p-4 grid  auto-rows-fr gap-3 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 "   data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="500">
                    <div className="w-full col-span-1 relative  p-0 border-none rounded-lg "  >
                        {/* <FiltersBtn quizTotalPoints={quizTotalPoints}  teamTotalPoints={teamTotalPoints} /> */}
                        <div className="intro-y col-span-12 md:col-span-3 flex flex-wrap sm:flex-nowrap items-center pl-5 pr-5 pb-5 pt-5 mb-5 bg-color-1 ">
                          <div className="text-lg w-full mr-5 text-gray-300">
                            <b  className="text-color-6" >
                                Team Progress
                            </b>

                            <div className="w-full h-9 mt-2 bg-color-3 rounded">
                                {/* <div style={{"width": `${parseInt(0.5*100)}%`}} className="h-full bg-color-2 rounded text-center text-color-4 font-bold">{parseInt((teamTotalPoints/quizTotalPoints)*100)}%</div> */}
                                <div style={{"width": `${parseInt((teamTotalPoints/quizTotalPoints)*100)}%`}} className="h-full bg-color-2 rounded text-center text-color-4 font-bold">{parseInt((teamTotalPoints/quizTotalPoints)*100)}%</div>
                            </div>
                          </div>
                          <Image  width={"100"}  height={"100"} alt="image" className="rounded-full  ml-3 ml-auto" src="/assets/img/hacker.svg" />
                        </div>
                        <div  className="block  p-6 bg-color-1  rounded-lg shadow ">
                        <SearchInput /> 
                        <SelectField options={options} onChange={handleSelectChange} />
                        <CheckboxGroup text={"Status"} options={options_2} />
                        <DifficultyLevelCheckBox />
                        {/* <CheckboxGroup text={"Difficulties"} options={options_3} /> */}
                        {/* <CheckboxGroup text={"Categories"} options={options_4} /> */}
                        {
                          categories && <CheckboxGroup text={"Categories"} options={categories} />
                        }
                        <ResetFilterBtn />
                        </div>
                    </div>
                    <div className="w-full col-span-3 relative  p-0 border-none rounded-lg "  >
                        <div className="grid   gap-4 auto-rows-fr grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="500">
                            {scenarios &&  <QuizList scenarios={scenarios} /> }
                        </div>
                    </div>
                </div>
        </>
    )
}