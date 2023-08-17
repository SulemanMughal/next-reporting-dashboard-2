
import axios from 'axios';
import { VscTerminalBash } from "react-icons/vsc"
import { useRef, useState, useEffect } from "react"
import  { GiCancel } from "react-icons/gi"
import { categories } from "@/app/data/data"
import toast from 'react-hot-toast';  


import decrypt from "@/app/lib/decrypt"

import encrypt from "@/app/lib/encrypt"


const SubmitBtn = ({isSubmit, setShowModal }) => {
  return (
    <>
      {isSubmit ? <button disabled type="button" className="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center w-full justify-center">
                      <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                      </svg>
                      Adding...
                    </button> :
  
                      <>
                        <div className="flex items-center justify-center p-3 ">
                  <button
                  className=" font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 w-6/12 justify-center rounded-md leading-6 bg-red-700  text-red-100 shadow-sm hover:bg-red-500 flex justify-start items-center"
                  type="button"
                  onClick={() => setShowModal(false)}
                  ><span>Cancel</span> <GiCancel  size={23} className="ml-2" /></button>
                  <button
                  type="submit"
                  className=" w-6/12 justify-center rounded-md bg-indigo-600 font-bold uppercase px-6 py-2 font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 flex justify-start items-center"
                  >
                  <span> Add</span> <VscTerminalBash size={23} className="ml-2"/>
                  </button> 
                  </div>
                      </>
  
  
                    }
    </>
  )
}

export default  function CreateScriptModal({ setShowModal, updateScripts }) {
    const name = useRef("");
    const category = useRef("");
    const desc = useRef("");
    const [isSubmit, setSubmit] = useState(false)
    const [sname, setSnames] = useState(null)
  
    useEffect(() => {
      axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/attack_script`)
        .then(res => {

          const {...data } = decrypt(res.data.encryptedData)
          setSnames(data.scripts);
          name.current=data.scripts[0]
          category.current = categories[0]
        })
        .catch(error => {
          console.error(error);
        });
    }, []);
  
  
    const nameChangeHandler = (event) => {
      name.current = event.target[event.target.selectedIndex].value;
    }
  
    const categoryChangeHandler = (event) => {
      category.current = event.target[event.target.selectedIndex].value;
    }
  
    const descChangeHandler = (event) => {
      desc.current = event.target.value;
    }
  
    
  
    const submitHandler = async (event) => {
      event.preventDefault()
      if (name.current == "" || category.current == "") {
        toast.error(`All fields are required`)
      } else {
        try {
          setSubmit(true)
          
          const encryptedData = encrypt({
            name: name.current,
            script_id: (category.current),
            desc : desc.current
          })
          await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/local_scripts`, {
            encryptedData
          });
          setShowModal(false)
          toast.success(`Script has been added successfully`)
          axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/local_scripts`)
          .then(res => {
            
            const {...data } = decrypt(res.data.encryptedData)
            // console.debug(data.scripts)
            updateScripts(data.scripts);
          })
          .catch(error => {
            console.error(error);
          });
        } catch (error) {
          setSubmit(false)
          console.error(error)
          toast.error(`Please try again after some time`)
        }
      }
    }
  
    return (
      <>
        <div
          className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none" data-aos="zoom-out" data-aos-duration="700" 
        >
          <div className="relative w-2/5 px-4 space-y-16 ">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-2xl font-semibold">
                  Details
                </h3>
                <button
                  className="absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 text-2xl w-10 h-10 rounded-full focus:outline-none text-white"
                  onClick={() => setShowModal(false)}
                  >✗</button>
              </div>
              <div className="relative p-6 flex-auto">
                <form className="space-y-6" onSubmit={submitHandler}>
                  <div className="relative z-0 w-full mb-6 group">
                    <label htmlFor="names" className="block mb-2 text-sm font-medium text-gray-900 ">Name</label>
                    <select id="names" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"  onChange={nameChangeHandler}   >
                      {sname && sname.map((name, index) => (
                        <option value={name} key={index}>{name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 ">Category</label>
                    <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "  onChange={categoryChangeHandler}>
                      {categories.map((cat, index) => (
                        <option value={cat} key={index+32}>{cat}</option>
                      ))}
                    </select>
                  </div>
  
                  <div className="relative z-0 w-full mb-6 group">
                    <label htmlFor="desc" className="block mb-2 text-sm font-medium text-gray-900 ">Description</label>
                    <textarea id="message"  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Description" onChange={descChangeHandler} ></textarea>
                  </div>
                  <SubmitBtn  isSubmit={isSubmit} setShowModal={setShowModal} />
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    )
}