"use client"

import  { MdGroups  } from "react-icons/md"
import { MdCancel } from "react-icons/md"


import AOS from 'aos';
import 'aos/dist/aos.css';


import { useRef ,useState ,useEffect } from "react"


import { CSSTransition } from 'react-transition-group';


import { FaUserAlt } from "react-icons/fa"


// total obtianed points for a team
function calcTotalPoints(team){
    let points = 0
    if(team && team.answers && team.answers.length){
        team.answers.forEach((answer) => {
            points = points + answer.obtainedPoints
        })
    }
    return points
}


const AccordionItem = ({  isOpen, toggleAccordion , team }) => {
    return (
      <div className="border-none rounded mb-2">
        <div className="flex items-center justify-between p-4 cursor-pointer" onClick={toggleAccordion}>
          
        <div className="flex items-center">
                <div className="flex items-center justify-center h-14 w-14 rounded-full bg-blue-600 ">
                    <span className="text-white font-bold text-3xl p-8 ">
                        {(Array.from(team.name)[0]).toString().toUpperCase()}
                    </span>
                </div>    
                <p className="text-xl text-dark fw-bold ml-5">
                    {team.name}
                </p>
            </div>
            <span className="text-lg text-dark fw-bold truncate">
                {calcTotalPoints(team)} Points
            </span>
            <span className="text-lg text-dark fw-bold truncate">
                {team.users.length} members 
        </span>


          <svg className={`w-6 h-6 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
        
        <CSSTransition in={isOpen} timeout={200} classNames="accordion-content" unmountOnExit>
            <div className="ml-24 py-2 ">
                {
                   ( team.users && team.users.length) ? team.users.map((user, index) => (
                        <div className="flex items-center" key={index}>
                            <FaUserAlt size={23}/>
                            <p className="text-lg text-dark fw-bold ml-5">
                                {user.email}
                            </p>
                        </div>
                        
                   ) ) : null
                }
            </div>
        </CSSTransition>
      </div>
    );
  };
  
const Accordion = ({ teams }) => {
    const [openItemIndex, setOpenItemIndex] = useState(null);
    const toggleAccordion = (index) => {
      if (openItemIndex === index) {
        setOpenItemIndex(null);
      } else {
        setOpenItemIndex(index);
      }
    };
    return (
      <div className="w-full ">
        <div className="space-y-4">
          {teams.map((team, index) => (
            <AccordionItem key={index}  isOpen={openItemIndex === index} team={team} toggleAccordion={() => toggleAccordion(index)} />        
          ))}
        </div>
      </div>
    );
  };

export default function TeamList({setShowModal, teams}){
    useEffect(()=>{
        AOS.init();
    }, [])
    return (
        <>        
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none" data-aos="zoom-out" data-aos-duration="700" 
            >
            <div className="relative w-2/5  px-4 space-y-16 ">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-2xl font-semibold flex  items-center">
                        <MdGroups size={40}/> <span className="ml-3">Teams</span>
                    </h3>
                    <button
                    className="absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 text-2xl w-10 h-10 rounded-full focus:outline-none text-white"
                   onClick={() => setShowModal(false)}
                    >✗</button>
                </div>
                <div className="relative p-6 flex-auto">
                    <ul className=" ">
                        { teams ?  ( <Accordion  teams={teams}/> ) :  
                            <li className="pb-3 sm:pb-4">
                                <div className="flex items-center space-x-4">
                                    <div className="flex min-w-0 items-center">
                                        <MdCancel   className=" h-14 w-14 text-red-600"/>
                                        <p className=" text-gray-900 truncate ml-3 text-xl ">
                                            No team has been assigned yet
                                        </p>
                                    </div>
                                </div>
                            </li> 
                        }
                    </ul>
                </div>
                </div>
                    </div>           
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}