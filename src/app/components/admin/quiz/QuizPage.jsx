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

// function getScenarioName(question){
//     if(question?.scenario){
//         try{
//             return question?.scenario?.name
//         } catch(error){
//             return ""
//         }
//     } else {
//         return ""
//     }
// }



  
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


export default function QuizPage({quizId}){
    const [data, setData] = useState(null)
    useEffect(() => {   
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/quiz/${quizId}`)
        .then((res) => {
            const {...data } = decrypt(res.data.encryptedData)
            setData(data)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])
    return (
        <>
        <CustomToaster />
        {data ? (
            <>
                <div className="px-5 py-4 md:py-7">
                    <div className="flex items-center justify-between">
                    <div className="inline-flex">
                        <h1 className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-5xl font-bold leading-normal text-white ">
                            {data?.results.title}  
                        </h1>
                    </div>
                        <div className="py-3 px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-none  cursor-pointer rounded">
                            <AddNewScenario />
                            <AddNewQuestion  quizId={quizId} setData={setData}/>
                            {
                                data?.results.questions.length ? 
                                    <GoToQuestionDropDown counter={data.results.questions.length} /> 
                                : null 
                            }
                                <SortDropDown  list={["Ascending", "Descending"]} />
                        </div>
                    </div>
                </div>

                {data?.results.questions.length &&  <FilteredDataWithButtons data={data} quizId={quizId}  setData={setData} /> }  

                {/* <div className="p-4 grid gap-4  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  ">
                    {data?.results.questions.length && 
                       reverseArray(data?.results.questions).map((question, index) =>  
                        <QuizQuestion key={index} question={question}  quizId={quizId} setData={setData} />  
                    )}
                </div> */}
            </>

        ) : null}
            
        </>
    )
}