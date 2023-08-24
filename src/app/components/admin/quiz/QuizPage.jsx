"use client"

import axios from "axios";
import { useEffect, useState, useRef } from "react";
import SortDropDown from "@/app/components/admin/quiz/SortDropDown"
import QuizQuestion from "@/app/components/admin/quiz/QuizQuestion"
import GoToQuestionDropDown from "@/app/components/admin/quiz/GoToQuestionDropDown"
import AddNewQuestion from "@/app/components/admin/quiz/AddNewQuestion"
import { reverseArray } from "@/app/lib/helpers"
import AddNewScenario from "@/app/components/admin/quiz/AddNewScenario"
import CustomToaster from "@/app/components/CustomToaster"

import { BsSearch } from "react-icons/bs"

import { ThreeDots , Triangle } from 'react-loader-spinner'
import UpdateQuizQuestion from "./UpdateQuizQuestion"
import RemoveQuestionModal from "./RemoveQuestionModal"
import ScenarioDetailModal from "./ScenarioDetailModal"

import {FaPuzzlePiece} from "react-icons/fa"




import encrypt from "@/app/lib/encrypt"
import decrypt from "@/app/lib/decrypt"


function removeDuplicates(array) {
    let items = []
    array.map((item) => {
        if(item.scenario?.difficulty){
            items.push(item.scenario?.difficulty)
        }
    })
    return items.filter((a, b) => items.indexOf(a) === b)
}

function getQuestionScenarioDifficultyStatus(question) {
    if(question?.scenario){
        try{
            return question?.scenario?.difficulty
        } catch(error){
            return ""
        }
    } else {
        return ""
    }
}

function FilteredDataWithButtons({data , quizId , setData}) {
    const filters = removeDuplicates(data.results.questions)
    let initialData = []
    {reverseArray(data?.results.questions).map((question, index) => ( initialData.push( { name : question, status: getQuestionScenarioDifficultyStatus(question) } ) )) }
    const [statusFilter, setStatusFilter] = useState('all');
    const [filteredData, setFilteredData] = useState(initialData);
    
    useEffect(() => {
        setFilteredData(initialData);
        setStatusFilter("all");
    }, [data])
  const handleFilterChange = (newStatus) => {
    setStatusFilter(newStatus);
    if (newStatus === 'all') {
      setFilteredData(initialData);
    } else {
      const filteredItems = initialData.filter((item) => item.status === newStatus);
      setFilteredData(filteredItems);
    }
  };

  return (
    <div className="p-4">
        <nav className="flex items-center justify-center bg-none h-16">
            <ul className="flex space-x-6">
                <li><button  className={`mr-2 px-10 py-1 rounded-0 text-2xl   ${
                statusFilter === 'all' ? 'bg-none text-blue-300 border border-2 border-t-0 border-l-0 border-r-0 border-blue-300 font-bold transition-all duration-300' : 'bg-none text-white border border-2 border-t-0 border-l-0 border-r-0 border-white'
            }`}
            onClick={() => handleFilterChange('all')} >All</button></li>
            {filters.map((filter, index) => (
                <li key={index}>
                    <button
                    key={index}
                    className={`mr-2 px-10 py-1 rounded-0 text-2xl ${
                    statusFilter === `${filter}` ? 'bg-none text-blue-300 border border-2 border-t-0 border-l-0 border-r-0 border-blue-300 font-bold transition-all duration-300' : 'bg-none text-white border border-2 border-t-0 border-l-0 border-r-0 border-white'
                    }`}
                    onClick={() => handleFilterChange(`${filter}`)} >
                        {filter}
                    </button>    
                </li>
            ))}
            </ul>
        </nav>
        <div className="p-4 grid gap-4  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  ">
            {filteredData.map((item , index) => (
                <QuizQuestion key={index} question={item.name}  quizId={quizId} setData={setData} />
            ))}
        </div>
    </div>
  );
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
      <>
        <label className="text-lg text-gray-400 py-2 block  ">
          {"Sort By"}
        </label>
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
      </>
      
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


  

import CustomTriangleLoader from "@/app/components/CustomTriangleLoader"

export default function QuizPage({quizId}){
    
    
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [removeQuestion, setRemoveQuestion] = useState(false)
    const [updateQuestion, setUpdateQuestion] = useState(false)
    const [showScenario, setShowScenario] = useState(false)
    const [question, setQuestion] = useState(null)




    useEffect(() => {   
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/quiz/${quizId}`)
        .then((res) => {
            const {...data } = decrypt(res.data.encryptedData)
            setData(data)
            setError(null);
            setLoading(false);
        })
        .catch((err) => {
            console.log(err)
            setError(error);
            setLoading(false);
        })
    }, [])
    return (
        <>
        <CustomToaster />
        
        {loading ? (
            <>
                <div  className="col-span-4 ">
                    {/* <Triangle
                        height="300"
                        width="300"
                        color="#4fa94d"
                        ariaLabel="triangle-loading"
                        wrapperStyle={{}}
                        wrapperClass={"flex justify-center"}
                        visible={true}
                        className={"flex justify-center"} 
                    /> */}
                    <CustomTriangleLoader />
                </div>
            </>
        ) : error ? (
            <>
                <div>Error: {error.message}</div>
            </>
        ) : (
            <>
                {removeQuestion && <RemoveQuestionModal setRemoveQuestion={setRemoveQuestion}   quizId={quizId}  question={question} setData={setData}  setQuestion={setQuestion} />}
                {updateQuestion &&  <UpdateQuizQuestion question={question} setUpdateQuestion={setUpdateQuestion}  setData={setData} quizId={quizId}   setQuestion={setQuestion} setRemoveQuestion={setRemoveQuestion} /> }
                {showScenario && <ScenarioDetailModal setShowScenario={setShowScenario} setData={setData} quizId={quizId} setQuestion={setQuestion} question={question}  /> }

                <div className="flex items-center justify-between px-5 py-4 md:py-7">
            <div className="inline-flex">
                <h1 className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-5xl font-bold leading-normal text-white ">
                    {data?.results.title}  
                </h1>
            </div>
                <div className="py-3 px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-none  cursor-pointer rounded">
                    <AddNewScenario />
                    <AddNewQuestion  quizId={quizId} setData={setData}/>
                    {/* {
                        data?.results.questions.length ? 
                            <GoToQuestionDropDown counter={data.results.questions.length} /> 
                        : null 
                    } */}
                        <SortDropDown  list={["Ascending", "Descending"]} />
                </div>
                </div>
                <div className="p-4 grid gap-4  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  ">
                <div className="w-full col-span-1 relative  p-0 border-none rounded-lg " data-aos="fade-down" data-aos-duration="1000" data-aos-delay="500" >
                    <FiltersBtn />
                </div>
                <div className="w-full col-span-3 relative  p-0 border-none rounded-lg "  >
                    <div className="grid  gap-4  auto-rows-fr grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="500">
                        {data?.results.questions.length && 
                            reverseArray(data?.results.questions).map((question, index) =>  
                            <QuizQuestion 
                                key={index} 
                                question={question} 
                                removeQuestion={removeQuestion} 
                                setRemoveQuestion={setRemoveQuestion} 
                                updateQuestion={updateQuestion} 
                                setUpdateQuestion={setUpdateQuestion}  
                                quizId={quizId} 
                                setData={setData} 
                                setQuestion={setQuestion}
                                setShowScenario={setShowScenario}
                            />  
                        )}
                    </div>
                </div>
                
                </div>
            </>
        )}
        
            
        </>
    )
}