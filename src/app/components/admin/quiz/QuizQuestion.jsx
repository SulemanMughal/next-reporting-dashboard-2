"use client"


import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from "react";
import  { BsThreeDotsVertical  } from "react-icons/bs"
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { AiFillEdit } from "react-icons/ai"
import { MdGroups } from "react-icons/md"
import { GiCancel  } from "react-icons/gi"


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


function QuestionMenuBtn() {

    // const [showModal, setShowModal] = useState(false)
    // const showMembers = () => {
    //     setShowModal(true)
    // }


    // const team_id = 5;



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
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md btn-flag-submit  text-white shadow-lg  focus:outline-none">
                    <div className="py-1">
                    <Menu.Item>
                        <button  className={classNames( '', 'block px-4 py-3 text-md ' , 'flex justify-start items-center ', ' w-full hover:bg-white hover:text-black' )}   >
                            <GiCancel size={23} className="mr-3" />  <span > Remove Question </span>
                        </button>
                    </Menu.Item>
                    <Menu.Item>
                        <button  className={classNames( '', 'block px-4 py-2 text-md' , 'flex justify-start items-center',' w-full hover:bg-white hover:text-black' )}  >
                            <AiFillEdit size={23} className="mr-3" />  <span > Update Question</span>
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
      <div className="flex items-center justify-between">
        <button onClick={handleButtonClick} className='text-teal-400'>
          {showText ? 'Hide Answer' : 'Show Answer'}
        </button>
        {showText && <p className="text-green-500 text-lg">{text}</p>}
      </div>
    );
};
  
  
export default function QuizQuestion({question}){
    
    useEffect(()=>{
        AOS.init();
    }, [])
    
    return (
        <>
            <div className="w-full col-span-1 " data-aos="zoom-in" data-aos-duration="1500" data-aos-delay="500">
                <div className="w-full col-span-2  p-4 bg-card-custom border-none rounded-lg shadow sm:p-8  ">
                    <div className="flex justify-between items-center  mb-4">
                        <span className=" rounded-full   text-2xl font-semibold bg-none text-orange-600 " >
                            {question?.points} {"Points"}
                        </span>
                        <QuestionMenuBtn />
                    </div>
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
