
import axios from 'axios';
import { VscTerminalBash } from "react-icons/vsc"
import { useRef, useState, useEffect } from "react"
import  { GiCancel } from "react-icons/gi"
import { categories } from "@/app/data/data"
import toast from 'react-hot-toast';  
import SVGLoader from "@/app/components/SVGLoader"

import decrypt from "@/app/lib/decrypt"

import encrypt from "@/app/lib/encrypt"


const SubmitBtn = ({isSubmit, setShowModal }) => {
  return (
    <>
      {isSubmit ? <SVGLoader text={"Adding..."} /> :
  
                      <>
                        <div className="flex items-center justify-end p-3 ">
                  <button
                  className=" font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1  justify-center rounded-md leading-6 bg-red-700  text-red-100 shadow-sm hover:bg-red-500 flex justify-start items-center"
                  type="button"
                  onClick={() => setShowModal(false)}
                  >
                   <GiCancel  size={23} className="mr-2" /> <span>Cancel</span> 
                  </button>
                  <button
                  type="submit"
                  className="  justify-center rounded-md bg-indigo-600 font-bold uppercase px-6 py-2 font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 flex justify-start items-center"
                  >
                  <VscTerminalBash size={23} className="mr-2"/> <span> Add</span> 
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