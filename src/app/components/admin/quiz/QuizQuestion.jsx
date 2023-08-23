"use client"

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from "react";
import  { BsThreeDotsVertical  } from "react-icons/bs"
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { AiFillEdit } from "react-icons/ai"
import {convertStringToTitleCase , convertStringToArray , classNames}  from "@/app/lib/helpers"
import  { IoMdRemoveCircle } from "react-icons/io"
import RemoveQuestionModal from "./RemoveQuestionModal"
import UpdateQuizQuestion from "./UpdateQuizQuestion"
import { AiFillEye } from "react-icons/ai"
import {HiOutlinePencilAlt} from "react-icons/hi"

// import { TbNewSection } from "react-icons/tb"


function QuestionMenuBtn({setRemoveQuestion , scenario , setUpdateQuestion , question , setQuestion , setShowScenario }) {
    return (
        <>  
            <Menu as="div" className="relative inline-block text-left">
                <div>
                <Menu.Button className="flex w-full justify-center border-none gap-x-1.5 rounded-md bg-none  ml-3 text-lg font-semibold text-gray-500 shadow-sm  items-center">
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
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-0 btn-flag-submit   text-white  shadow-lg  focus:outline-none">
                    <div className="py-0">
                    {/* {scenario ? null :  (
                        <Menu.Item>
                            <button  className={classNames( '', 'block px-4 py-5 text-lg font-bold w-full  flex justify-start items-center  hover:bg-blue-300 hover:text-blue-800' )}   >
                                <TbNewSection size={23} className="mr-3" />  <span > Assign Scenario </span>
                            </button>
                        </Menu.Item>    
                    )} */}
                        
                    {/* <Menu.Item>
                        <button  
                            className={classNames( '', 'block px-4 py-5 text-lg  w-full  flex justify-start items-center  hover:bg-blue-300 hover:text-blue-800' )} 
                            onClick={() => (setRemoveQuestion(true) , setQuestion(question)  )}  
                        >
                            <IoMdRemoveCircle size={23} className="mr-3" />  <span > Remove Question </span>
                        </button>
                    </Menu.Item> */}
                    <Menu.Item>
                        <button  className={classNames( '', 'block px-4 py-5 text-lg  w-full  flex justify-start items-center  hover:bg-blue-300 hover:text-blue-800' )} onClick={() => (setUpdateQuestion(true), setQuestion(question))} >
                            <AiFillEdit size={23} className="mr-3" />  <span > Question</span>
                        </button>
                    </Menu.Item>
                    <Menu.Item>
                        <button  
                            className={classNames( '', 'block px-4 py-5 text-lg  w-full  flex justify-start items-center  hover:bg-blue-300 hover:text-blue-800' )}  
                            onClick={() => (setShowScenario(true), setQuestion(question))}
                        >
                            <HiOutlinePencilAlt size={23} className="mr-3" />  <span >Challenge </span>
                        </button>
                    </Menu.Item>
                    </div>
                </Menu.Items>
                
                </Transition>
            </Menu>
      </>
    )
}

const ExpandableText = ({ initialText, maxLength }) => {
    const [expanded, setExpanded] = useState(false);
  
    const toggleExpand = () => {
      setExpanded(!expanded);
    };
  
    const textToDisplay = expanded ? initialText : initialText.slice(0, maxLength);
  
    return (
      <div>
        <p className='text-gray-400'>{textToDisplay}</p>
        {initialText.length > maxLength && (
          <button onClick={toggleExpand} className="text-blue-400 my-1">
            {expanded ? 'See Less' : 'See More'}
          </button>
        )}
      </div>
    );
};

const ToggleTextOnButtonClick = ({text}) => {
    const [showText, setShowText] = useState(false);
  
    const handleButtonClick = () => {
      setShowText(!showText); 
    };
  
    return (
      <div className="flex items-start justify-between">
        <button onClick={handleButtonClick} className='text-teal-400 text-sm w-2/5 text-left'>
          {showText ? 'Hide Answer' : 'Show Answer'}
        </button>
        {showText && <p className="text-green-500 text-sm text-end w-3/5 break-all">{text}</p>}
      </div>
    );
};
  



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

  

export default function QuizQuestion({question , quizId , setData , removeQuestion, setRemoveQuestion, updateQuestion, setUpdateQuestion , setQuestion , setShowScenario}){
    useEffect(()=>{
        AOS.init();
    }, [])
    // const [removeQuestion, setRemoveQuestion] = useState(false)

    // const [updateQuestion, setUpdateQuestion] = useState(false)

    return (
        <>
            {/* {removeQuestion && <RemoveQuestionModal setRemoveQuestion={setRemoveQuestion}   quizId={quizId}  questionId={question.id} setData={setData}/>} */}
            {/* {updateQuestion &&  <UpdateQuizQuestion question={question} setUpdateQuestion={setUpdateQuestion}  setData={setData} quizId={quizId} /> } */}

            

            <div className="w-full col-span-1 h-full " data-aos="zoom-in" data-aos-duration="500" data-aos-delay="200">
                <div className="w-full col-span-2  h-full p-4 bg-card-custom border-none rounded-lg shadow sm:p-8  ">
                    <div className="flex justify-between items-center  mb-4">
                        <div className=" flex items-center  " >
                            
                            {
                                question.scenario ? (
                                    <span className='rounded-full   text-lg font-semibold bg-none text-gray-400 '>{convertStringToTitleCase(question.scenario.name)}</span>
                                ) : null
                            }
                        </div>
                        <QuestionMenuBtn 
                            setRemoveQuestion={setRemoveQuestion}  
                            setUpdateQuestion={setUpdateQuestion} 
                            scenario={question.scenario} 
                            setQuestion={setQuestion}  
                            question={question}
                            setShowScenario={setShowScenario}
                        />
                    </div>
                    
                    {
                        question.scenario ? (
                            <div className='flex justify-start flex-wrap items-center my-3'>
                                    {convertStringToArray(question.scenario.tags)?.map((tag, index) => {
                                        return (
                                            <span className="inline-block  rounded-full px-2   py-1 text-sm  bg-indigo-600 text-indigo-100 mr-2 my-2" key={index}>{convertStringToTitleCase(tag)}</span>
                                        )
                                    })}
                            </div>
                            
                        ) : null
                    }
                    {
                        question.scenario ? (
                            <div className=" flex items-center  justify-center text-center px-0 mx-0 my-3" >
                                <span className="px-1 py-1 text-md font-semibold bg-none text-blue-400">{convertStringToTitleCase(question.scenario.category)}</span>
                                <span className={getDifficultyColor(convertStringToTitleCase(question.scenario.difficulty)) + " mx-2"}>{convertStringToTitleCase(question.scenario.difficulty)}</span>
                                
                                <span className='px-1 py-1 text-md font-semibold bg-none text-yellow-400'>
                                    {question?.points} {"Points"} 
                                </span>
                                {/* <span className='text-rose-400'>{convertStringToTitleCase(question.scenario.status)}</span>
                                <span className="inline-block  rounded-full px-0    py-1 text-md  font-semibold  bg-none text-pink-600">{convertStringToTitleCase(question.scenario.category)}</span> */}
                            </div>
                            
                        ) : null
                    }
                    
                    <div className="flow-root">
                        <div className="w-full text-gray-500 bg-none border-none rounded-lg mb-4">
                            <ToggleTextOnButtonClick  text={question.original_answer}/>
                        </div>
                        <ExpandableText initialText={question?.Description} maxLength={150} />
                    </div>
                </div>
            </div>
        </>
    )
}
