"use client"

import SortDropDown from "@/app/components/admin/quiz/SortDropDown"
import { FaPuzzlePiece } from "react-icons/fa"
import AddNewScenario from "@/app/components/admin/quiz/AddNewScenario"
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useRef } from "react"
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
import CustomTriangleLoader from "@/app/components/CustomTriangleLoader"
import { toast } from "react-hot-toast";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";


import Image from 'next/image'


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
        {options.map((option , index) => (
           
          <label key={index} className="flex items-center mr-3 text-sm pb-2">
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
                    <label className=" text-sm mb-3" >Difficulties</label>
                    <div className="flex  flex-wrap  mt-2">
                        <label className="flex items-center text-white rounded mr-2 my-2 sm:mt-0 bg-green-600 p-1 cursor-pointer select-none font-bold pr-2 ">
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
  




function NewScenarioCard({scenarios}){

    return (
        <>
          {   scenarios?.length ? scenarios.map((item, index) => (
              <div className="component component-CerCheckBox" key={index} data-aos="fade-up" data-aos-duration="400" data-aos-delay={"100"}>
                <div className="w-full col-span-3 relative  h-full    rounded-lg   flex flex-col " key={index}>
                    <div className="   bg-color-1  rounded-lg shadow  h-full ">
                        <div className="p-5">
                            {/* scenario name */}
                            <h5 className=" font-medium text-base tracking-tight whitespace-normal text-gray-300  text-center mb-1">{convertStringToTitleCase(item.name)}</h5>
                            <div className="text-gray-400 text-xs truncate text-center">
                                {item.desc}
                            </div>
                            {/* <ExpandableText initialText={scenarios[4][index]}  maxLength={150} /> */}
                            <div className="flex flex-wrap justify-center items-center pt-4 pb-2">
                              {/* Difficulty Level */}
                              <span className={getDifficultyColor(item.difficulty)}>{ convertStringToTitleCase(item.difficulty) }</span>
                              {/* Category */}
                              <span className="px-1 py-1 text-sm  2xl:text-base font-bold bg-none text-blue-400 ">{ convertStringToTitleCase(item.category) }</span>

                              {/* Total Points for a Scenario */}
                              <span className="px-1 py-1 text-sm  2xl:text-base font-bold bg-none text-yellow-400 ">{ calcTotalPointsScenario(item) +  " Points"}</span>
                            </div>
                        </div>
                        <div className=" pt-0 pb-4 flex justify-center">
                            <Link href={`/admin/challenges/${item.id}`}  className=" cursor-pointer      bg-color-7   flex justify-center items-center   text-white text-sm  2xl:text-base    h-full rounded-md px-2 py-1       ">
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


function WavesList({waves}){
  // console.debug(waves)
  return (
    <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
      {waves && waves?.length && waves.map((wave, index) => (
        <>
        <li className="pb-3 sm:pb-4" key={index}>
        <div className="flex items-center space-x-4 rtl:space-x-reverse mt-2">
            <div className="flex-shrink-0">
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate dark:text-white uppercase mb-1">
                {wave?.name}
              </p>
              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                {wave?.start_time} - {wave?.end_time}
              </p>
            </div>
            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
              {/* $320 */}
              <div className="flex items-center justify-end flex-row gap-2">
                <MdEdit size={22} className="text-green-600" />
                <MdDelete size={22} className="text-red-600" />
              </div>
            </div>
        </div>
      </li>
        </>
      ))}
      
    </ul>
  )
}

function CreateWave({setShowModal}){
  const name = useRef("");
  // const start_time = useRef("");
  // const end_time = useRef("");
  // const is_active = useRef("");
  const scenarios_list = useRef("");

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [is_active, setIsActive] = useState(false);


  const [selectedChallenges, setSelectedChallenges] = useState([]);
  const [challenges, setChallenges] = useState([]);


  const [isSubmit, setSubmit] = useState(false)


  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/scenario`)
      .then((res) => {
        const {...data } = decrypt(res.data.encryptedData)
        if(data.status === true){

          setChallenges(data?.scenarios);
        } else {
          toast.error("Sorry! There is an error while fethcing challenges.Please try again later")
        }
      })
      .catch((error) => {
        console.error("Error fetching challenges:", error);
      });
  }, []);


  const handleChallengeSelect = (e) => {
    const options = e.target.options;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setSelectedChallenges(selected);
  };


  const submitHandler = async () => {
    setSubmit(true)
    if(name.current == ""  || startTime == ""  || endTime == "" || is_active == "" ){
        toast.error(`All fields are required`)
        setSubmit(false)
    }  else { 
        try {
            // const encryptedData = encrypt( )
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/waves/`, {
              name : name.current,
              start_time : startTime,
              end_time : endTime,
              is_active : is_active,
              scenarios_list : scenarios_list.current,
            });
            setShowModal(false)
            const {...data } = res?.data
            if(data?.status === false){
                toast.error(`Sorry, you can't create scenario. Please try again after sometime`)    
            } else {
                toast.success('Successfull, Scenario has been created')
            }
        } catch (error) {
            setSubmit(false)
            console.error(error)
            toast.error(`Sorry, you can't create scenario. Please try again after sometime`)   
        }
    }

}

return (
  <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none" data-aos="zoom-out" data-aos-duration="700" 
  >
    <div className="relative w-1/3  px-4 space-y-16 ">
      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
        <div className="flex items-start justify-between p-5  rounded-t">
            <h3 className="text-2xl font-semibold text-dark">
                New Wave
            </h3>
            {setShowModal && (<button
            className="absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 text-2xl w-10 h-10 rounded-full focus:outline-none text-white"
            onClick={() => setShowModal(false)}
            >✗</button>) }
            
        </div>
        <div className="relative p-6 flex-auto">
          <div className="space-y-6" >
            {/* name */}
            <div className="relative z-0 w-full mb-6 group">
              <input type="text" id="text"
                  name="name"
                  onChange={(e) => (name.current = e.target.value)}
                  autoComplete="off"
                  required
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "   />
              <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
          </div>
          <div>
          <label for="start-time" class="block mb-2 text-sm font-medium text-gray-900 ">Start time:</label>
          <div class="relative">
          <div class="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
          <svg class="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clip-rule="evenodd"/>
          </svg>
          </div>
          <input type="time" id="start-time" class="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " min="09:00" max="18:00"  required
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          />
          </div>
          </div>
          <div>
          <label for="end-time" class="block mb-2 text-sm font-medium text-gray-900 ">End time:</label>
          <div class="relative">
          <div class="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
          <svg class="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clip-rule="evenodd"/>
          </svg>
          </div>
          <input type="time" id="end-time" class="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " min="09:00" max="18:00" 
          value={endTime}
          required

          onChange={(e) => setEndTime(e.target.value)}
          />
          </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Challenges</label>
            <select
              multiple
              className="w-full px-3 py-2 border rounded text-black"
              value={selectedChallenges}
              onChange={handleChallengeSelect}
            >
              {challenges.map((challenge) => (
                <option key={challenge.id} value={challenge.name}>
                  {challenge.name}
                </option>
              ))}
            </select>
          </div>
          <div className="relative" data-aos="zoom-out"  >
            <div className="intro-x flex text-black  text-xs sm:text-sm mt-4">
              <div className="flex items-center mr-auto">
                <input type="checkbox" className="input border mr-2" id="input-remember-me"  checked={is_active} onChange={(e) => setIsActive(!is_active)} />
                <label className="cursor-pointer select-none" htmlFor="input-remember-me">Is Active</label>
              </div>
              {/* <a href="#!">
                Forgot your password?
              </a> */}
            </div>
          </div>
          </div>


          <div className="flex justify-end mt-5">
            <button
              type="button"
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={submitHandler}
            >
              Add Wave
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
)

}


function AddNewWave({showModal, setShowModal}){
  // const [showModal, setShowModal] = useState(false)
  return (
    <>
      <button className="bg-color-1 text-white py-2  pr-4  pl-4 h-full w-full text-center border border-1 border-color-1 rounded-md mb-3 ml-0 mr-2 py-3"  onClick={() => setShowModal(true)}    >
        {/* <FaPuzzlePiece  size={23} className="mr-2" />    */}
        {"New Wave"}
      </button>
    </>
    
  )
}

export default function Page(){
    // const [showModal, setShowModal] = useState(false)
    const [scenarios, setScenarios] = useState([])  
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const [waves, setWaves] = useState(null)

    const [showModal, setShowModal] = useState(false)

    // categories filter
    const [categories, setCategories] = useState(null)


    const fetchWavesList = () => {
      axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/waves/`)
        .then(res => {
          // const {...data } = decrypt(res?.data)
          // console.debug(data)
          console.debug(res?.data)
          if(res?.data?.status === true){
            if(res?.data?.waves?.length) {
              setWaves(res?.data?.waves)
              setError(null);
            } else {
              setWaves(null)
              setError(null);
              toast.error("Sorry! There is an error while fethcing waves.Please try again later")
            }
          } else{
            setWaves(null)
            setError(`${res?.data?.error}`);
            toast.error("Sorry! There is an error while fethcing waves.Please try again later")
          }
        }).catch((err) => {
          console.log(err)
          setError(`toast.error("Sorry! There is an error while fethcing waves.Please try again later")`)
          toast.error("Sorry! There is an error while fethcing waves.Please try again later")
        }).finally(() => {
          setLoading(false);
        })
    }

  // filters
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
      axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/scenario/`)
        .then(res => {
          const {...data } = decrypt(res.data.encryptedData)
          if(data.status === true){
            if(data.scenarios?.length) {
              // console.debug(data)
              // let uniqueCategories = [];
              // let isUnique = false;
              setScenarios(data?.scenarios)
              setError(null);
              // getUniqueScenarios(data?.scenarios).forEach((item) => {
              //   // console.debug(item)
              //   if(uniqueCategories.length === 0){
              //     uniqueCategories.push(item.category)
              //   }
              //   else{
              //     isUnique = false;
              //     uniqueCategories.forEach((category) => {
              //       if(category === item.category){
              //         isUnique = true;
              //       }
              //     })
              //     if(!isUnique){
              //       uniqueCategories.push(item.category)
              //     }
              //   }
              // })
              setCategories(getUniqueScenarios(data?.scenarios))
              // console.debug(getUniqueScenarios(data?.scenarios))

            } else {
              setScenarios([])
              setError(null);
              toast.error("Sorry! There is an error while fethcing challenges.Please try again later")
            }
          } else{
            setScenarios([])
            setError(`${data.error}`);
            toast.error("Sorry! There is an error while fethcing challenges.Please try again later")
          }
        }).catch((err) => {
          console.log(err)
          setError(`toast.error("Sorry! There is an error while fethcing challenges.Please try again later")`)
          toast.error("Sorry! There is an error while fethcing challenges.Please try again later")
        }).finally(() => {
          setLoading(false);
        })
    }



    useEffect(()=>{
        AOS.init();
        DataFetch();
        fetchWavesList()
    }, [])
    return (
        <>

            <CustomToaster />
            {showModal && <CreateWave  setShowModal={setShowModal}  /> }
            <div >
                <div className="flex items-center justify-between p-4  ">
                    <h1 className="text-white text-2xl font-bold"> 
                        Challenges
                    </h1>
                    
                        <div className=" flex items-center text-sm font-medium leading-none text-gray-600 bg-none  cursor-pointer rounded">
                            <AddNewScenario />
                            {/* <SortDropDown /> */}
                            {/* <FilterBtn /> */}
                        </div>
                </div>
                <div className="p-4 grid gap-4  grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  ">
                    <div className="w-full col-span-1 relative  p-0 border-none rounded-lg " data-aos="fade-down" data-aos-duration="1000" data-aos-delay="500" >
                        {/* <FiltersBtn /> */}
                        <div>
                        <AddNewWave showModal={showModal} setShowModal={setShowModal} />
                        </div>
                        {waves && (
                          <div  className="block  p-6 bg-color-1  rounded-lg shadow ">
                            <WavesList waves={waves} />
                          </div>
                        )}
                        
                    </div>
                    {/* <SearchInput />  */}
                            {/* <SelectField options={options} onChange={handleSelectChange} /> */}
                            {/* <CheckboxGroup text={"Status"} options={options_2} /> */}
                            {/* <DifficultyLevelCheckBox /> */}
                            {/* <CheckboxGroup text={"Difficulties"} options={options_3} /> */}
                            {/* <CheckboxGroup text={"Categories"} options={options_4} /> */}
                            {/* {
                              categories && <CheckboxGroup text={"Categories"} options={categories} />
                            } */}
                            {/* <ResetFilterBtn /> */}
                
                
                {loading ? (
                    <>
                        <div className="w-full col-span-3 relative  p-0 border-none rounded-lg">
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
                      <div className=" grid gap-4 auto-rows-fr grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
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