"use client"

import axios from "axios"

import { useRef, useEffect, useState } from "react"
import  { GiCancel } from "react-icons/gi"
import toast, { Toaster } from 'react-hot-toast';
import  { BsPersonFillAdd } from "react-icons/bs";

import AOS from 'aos';
import 'aos/dist/aos.css';

function SubmitBtn({isSubmit, setShowTeamAssignModal }){
  return (
      <>
              {isSubmit ? <button disabled type="button" className="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700  inline-flex items-center w-full justify-center">
              <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-gray-200 animate-spin " viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
              </svg>
              Assigning...
              </button>  :
              <>
              <div className="flex items-center justify-center p-3 ">
              <button
              className=" font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 w-6/12 justify-center rounded-md leading-6 bg-red-700  text-red-100 shadow-sm hover:bg-red-500 flex justify-start items-center"
              type="button"
              onClick={() => setShowTeamAssignModal(false)}
              ><span>Cancel</span> <GiCancel  size={23} className="ml-2" /></button>
              <button
              type="submit"
              className=" w-6/12 justify-center rounded-md bg-indigo-600 font-bold uppercase px-6 py-2 font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 flex justify-start items-center"
              >
              <span> Assign</span> <BsPersonFillAdd size={23} className="ml-2"/>
              </button> 
              </div>
              </>
              }
      </>
  )
}


export default  function TeamAssignModal({setShowTeamAssignModal, quizId , setData}) {    
  
  const [teams, setTeams] = useState([])
  const [isSubmit, setSubmit] = useState(false)
  const team_id = useRef("")

  const submitHandler = async (event) => {
    event.preventDefault()
    if(team_id.current == "" ){
      toast.error(`All fields are required`)
    }
    else{
      setSubmit(true)
      try {
        
        axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/quiz/${quizId}/team/${team_id.current}`)
        .then((res) => {
          toast.success(`Successfully assigned team`)
          axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/quiz/`)
          .then(response => {
              setData(response.data)
          })
          .catch(error => {
              console.log(error)
          })
          setSubmit(false)
          setShowTeamAssignModal(false)
        })
        .catch((err) => {
          console.log(err)
          toast.error(`Sorry, you can't assign team. Please try again after sometime`)
          setSubmit(false)
          setShowTeamAssignModal(false)
        })
        
      } catch (error) {
        
        console.error(error)
        toast.error(`Sorry, you can't assign team. Please try again after sometime`)
        setSubmit(false)
        setShowTeamAssignModal(false)
      }
    }
  }



  useEffect(() => {
    AOS.init();
    axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/team`)
    .then((res) => {
      setTeams(res.data.teams)
    })
    .catch((err) => {
      console.log(err)
    })
  }, [])

  

  return (
    <>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        data-aos="zoom-out" data-aos-duration="700" 
      >
        <div className="relative w-1/4 px-4 space-y-16 ">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-2xl font-semibold">
                Assign Team
              </h3>
              <button
                className="absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 text-2xl w-10 h-10 rounded-full focus:outline-none text-white"
                onClick={() => setShowTeamAssignModal(false)}
                >✗</button>
            </div>
            <div className="relative p-6 flex-auto">
              <form className="space-y-6" onSubmit={submitHandler}>
                
                <div className="relative z-0 w-full mb-6 group">
                  <label htmlFor="team" className="block mb-2 text-md font-medium text-gray-900 ">Team</label>
                  <select id="team" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " defaultValue={''}  onChange={(e) => team_id.current = e.target.value}>
                    <option value="" disabled>Choose a Team</option>
                    {teams && teams.length && teams.map((team , index) => (
                      <option key={index} value={team.id}>{team.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                    <SubmitBtn  isSubmit={isSubmit} setShowTeamAssignModal={setShowTeamAssignModal} />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}