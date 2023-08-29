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

import { convertStringToTitleCase , calcTotalPointsScenario , getDifficultyColor} from "@/app/lib/helpers"

import Link from "next/link";


import CustomTriangleLoader from "@/app/components/CustomTriangleLoader"
import encrypt from "@/app/lib/encrypt"
import decrypt from "@/app/lib/decrypt"
import { toast } from "react-hot-toast";


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
                      <label className="flex items-center text-black rounded mr-2 mt-2 sm:mt-0 bg-indigo-500 p-1 cursor-pointer select-none font-bold pr-2">
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
          <button className="bg-deep-blue w-32 h-full text-white mr-5 text-sm  text-gray-300 my-2 py-2 px-4 rounded">
            Reset Filters
          </button>

      </>
  )
}
  

// const FiltersBtn = ({scenarios}) => {
//   // console.debug(scenarios)
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

//       const [categories, SetCategories] = useState(null)

//       useEffect(() => {
        
//         SetCategories( 
//           [...new Set(scenarios.map(scenario => (
//             { value: `${scenario.category}`, label: `${scenario.category}` }
//           ))), { value: 'All', label: 'All' } ]
//         )
//       } , [])

//       const handleSelectChange = (e) => {
//         setSelectedOption(e.target.value);
//       };

//     return (
//         <>
//             <div  className="block  p-6 bg-card-custom  rounded-lg shadow ">
//               <SearchInput /> 
//               <SelectField options={options} onChange={handleSelectChange} />
//               <DifficultyLevelCheckBox />
//               {
//                 categories && <CheckboxGroup text={"Categories"} options={categories} />
//               }
//               <ResetFilterBtn />
//             </div>
//         </>
//     )
// }


function getUniqueScenarios(questions) {
  const  uniqueScenarioObjects = Array.from(new Set(questions.map(item => JSON.stringify(item.scenario))))
  .map(stringified => JSON.parse(stringified));
  return uniqueScenarioObjects

}


function areObjectsEqual(obj1, obj2) {
  return obj1.id === obj2.id; // Adjust the comparison logic as needed
}


function areCategoriesSame(obj1, obj2) {
  // obj1 === existingcategory
  return obj1.value === obj2; // Adjust the comparison logic as needed
}

export default function QuizPage({quizId}){
    const [data, setData] = useState(null)
    const [scenarios, setScenarios] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [removeQuestion, setRemoveQuestion] = useState(false)
    const [updateQuestion, setUpdateQuestion] = useState(false)
    const [showScenario, setShowScenario] = useState(false)
    const [question, setQuestion] = useState(null)


    // filters states
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

    const [categories, setCategories] = useState(null)


    const handleSelectChange = (e) => {
      setSelectedOption(e.target.value);
    };


    const DateFetch = () => {
      axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/quiz/${quizId}`)
        .then((res) => {
            const {...data } = decrypt(res.data.encryptedData)
            if(data?.status === true){
              let uniqueCategories = [];
              let isUnique = false;
              setData(data)
              setScenarios(getUniqueScenarios(data?.results?.questions))
              setError(null);
              getUniqueScenarios(data?.results?.questions).forEach(scenario => {
                isUnique = !uniqueCategories.some(existingcategory => areCategoriesSame(existingcategory, scenario.category) );
                if (isUnique) uniqueCategories.push({ 
                  value: `${scenario.category}`, 
                  label: `${scenario.category}` 
                });
              })
              uniqueCategories.push({ 
                value: `${"All"}`, 
                label: `${"All"}` 
              });
              setCategories(uniqueCategories)
            } else {
              setError(data?.error);
              setData(null)
              setCategories(null)
              toast.error(data?.error)
            }
        })
        .catch((err) => {
            console.log(err)
            setError(error);
            toast.error("There is an error while fetching data. Please try again later.")
        }).finally(() => {
          setLoading(false);
        })
    }
    useEffect(() => {   
      DateFetch()
    }, [])

    return (
        <>
        <CustomToaster />
        
        {loading ? (
            <>
                <div  className="col-span-4 ">
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

                <div className="flex items-center justify-between p-5 pb-0 mb-5 ">
                  <h1 className="text-white text-2xl font-bold ">
                          {data?.results.title}  
                  </h1>
                <div className="flex justify-end items-center">
                    <AddNewScenario />
                    <AddNewQuestion  quizId={quizId} setData={setData}/>
                </div>
                </div>
                <div className="p-3 grid gap-4  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  ">
                <div className="w-full col-span-1 relative  p-0 border-none rounded-lg "  >
                    <div  className="block  p-6 bg-card-custom  rounded-lg shadow ">
                      <SearchInput /> 
                      <SelectField options={options} onChange={handleSelectChange} />
                      <DifficultyLevelCheckBox />
                      {
                        categories && <CheckboxGroup text={"Categories"} options={categories} />
                      }
                      <ResetFilterBtn />
                    </div>
                </div>
                <div className="w-full col-span-3 relative  p-0 border-none rounded-lg "  >
                    <div className="grid  gap-4  auto-rows-fr grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3" >
                      {(data && scenarios && scenarios.length) && (
                        
                        scenarios.map((scenario, index) => (

                          <>
                          
                            <div className="component component-CerCheckBox" key={index}>
                              <div className="w-full col-span-3 relative      rounded-lg   flex flex-col " >
                                <div className="   bg-deep-blue-violet  rounded-lg shadow   ">
                                  <div className="p-5">
                                    {/* scenario title */}
                                    <h5 className=" font-medium text-base tracking-tight whitespace-normal text-gray-300  text-center mb-1">{convertStringToTitleCase(scenario.name)}</h5>
                                    {/* scenario description */}
                                    <div className="text-gray-400 text-xs truncate text-center">
                                        {scenario.desc}
                                    </div>
                                    <div className=" pt-4 pb-2 text-center">
                                      {/* difficulty level */}
                                        <span className={getDifficultyColor(scenario.difficulty)}>{ convertStringToTitleCase(scenario.difficulty) }</span>
                                        {/* category */}
                                        <span className="px-1 py-1 text-base font-bold bg-none text-blue-400 ">{ convertStringToTitleCase(scenario.category) }</span>
                                        <span className="px-1 py-1 text-base font-bold bg-none text-yellow-400 ">{    calcTotalPointsScenario(scenario) +  " Points"}</span>
                                    </div>
                                    <div className="  pb-2 text-center">
                                      {/* total questions  */}
                                        <span className="px-1 py-1 text-base font-bold bg-none text-rose-400 ">{   scenario?.questions?.length +  " Questions"}</span>
                                    </div>
                                    <div className=" pt-0 pt-2 flex justify-center">
                                      <Link href={`/admin/challenges/${scenario.id}`}  className=" cursor-pointer     bg-dark-navy-blue  flex justify-center items-center   text-white text-base    h-full rounded-md px-2 py-1       ">
                                          <span>{"Details" } </span> 
                                      </Link>
                                </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        ))
                      ) }
                    </div>
                </div>
                
                </div>
            </>
        )}
        
            
        </>
    )
}