"use client"

import { TbNewSection } from "react-icons/tb"
import { useState , useRef } from "react"
import  { GiCancel } from "react-icons/gi"
import { FaPuzzlePiece } from "react-icons/fa"
import { toast } from "react-hot-toast"
import axios from "axios"
import { arrayToString } from "@/app/lib/helpers"
import SVGLoader from "@/app/components/SVGLoader"



function SubmitBtn({isSubmit,setShowModal, submitHandler }){
    return (
        <>
            {
            isSubmit ? (
                <SVGLoader text="Adding" />
            ) :
                <>
                    <div className="flex items-center justify-end p-3 ">
                    <button
                    className=" font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1  justify-center rounded-md leading-6 bg-red-700  text-red-100 shadow-sm hover:bg-red-500 flex justify-start items-center"
                    type="button"
                    onClick={() => setShowModal(false)}
                    > <GiCancel  size={23} className="mr-2" /> <span>Cancel</span> </button>
                    <button
                    type="submit"
                    className="  justify-center rounded-md bg-indigo-600 font-bold uppercase px-6 py-2 font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 flex justify-start items-center" onClick={submitHandler}
                    >
                    <FaPuzzlePiece size={23} className="mr-2"/> <span> Add </span> 
                    </button> 
                    </div>
                </>
            }
        </>
    )
}

function TagsInput({tags , setTags}) {
    const [inputValue, setInputValue] = useState('');
    // const [tags, setTags] = useState([]);
  
    const handleInputChange = (event) => {
      setInputValue(event.target.value);
    };
  
    const handleInputKeyDown = (event) => {
      if (event.key === 'Enter' && inputValue) {
        addTag(inputValue);
      }
    };
  
    const handleRemoveTag = (index) => {
      const newTags = [...tags];
      newTags.splice(index, 1);
      setTags(newTags);
    };
  
    const addTag = (tag) => {
      if (!tags.includes(tag)) {
        setTags([...tags, tag]);
        setInputValue('');
      }
    };
  
    return (
      <div className="tags-input">
        <div className="tags-container">
          
          <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            className="input-field block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
          />
            <label htmlFor="tags" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Tags</label>
        </div>
        <div className="flex flex-wrap ">
            {tags.map((tag, index) => (
                <div key={index} className="tag-chip  mb-2 bg-gray-800 p-3 mr-3 text-white">
                {tag}
                <span className="tag-close ml-3" onClick={() => handleRemoveTag(index)}>
                    &#10005;
                </span>
                </div>
            ))}
        </div>
        
          
        </div>
      </div>
    );
}
  



import encrypt from "@/app/lib/encrypt"
import decrypt from "@/app/lib/decrypt"
  

function CreateScenario({setShowModal}){
    
    
    const name = useRef("");
    const [tags, setTags] = useState([]);
    const description = useRef("");
    const difficulty = useRef("");
    const [isSubmit, setSubmit] = useState(false)


    const submitHandler = async () => {
        setSubmit(true)
        if(name.current == ""  || description.current == ""  || difficulty.current == "" || tags.current == "" ){
            toast.error(`All fields are required`)
            setSubmit(false)
        }  else { 
            try {
                const encryptedData = encrypt( {
                    name : name.current,
                    desc : description.current,
                    difficulty : difficulty.current,
                    tags : arrayToString(tags),
                })
                const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/scenario/`, {encryptedData});
                setShowModal(false)
                const {...data } = decrypt(res.data.encryptedData)
                if(data.status === false){
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
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none" data-aos="zoom-out" data-aos-duration="700" 
            >
            <div className="relative w-1/3  px-4 space-y-16 ">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5  rounded-t">
                    <h3 className="text-2xl font-semibold text-dark">
                        New Challenge
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
                    {/* Description */}
                    <div className="relative z-0 w-full my-6 group ">
                        <textarea id="Description" name="Description" rows="4" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" onChange={(e) => (description.current = e.target.value)}></textarea>
                        <label htmlFor="Description" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Description</label>
                    </div>
                    
                

                    {/* scenario field */}
                    <div className="relative z-0 w-full mb-6 group">
                        <select id="difficulty" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer " defaultValue={''}  onChange={(e) => difficulty.current = e.target.value} >
                            <option value="" disabled>Choose a level</option>
                            <option value="Easy" >Easy</option>
                            <option value="Medium" >Medium</option>
                            <option value="Hard" >Hard</option>
                            
                        </select>
                        <label htmlFor="difficulty" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Difficulty</label>
                    </div>

                        <TagsInput  tags={tags} setTags={setTags} />


                    

                <div>
                    
                    <SubmitBtn isSubmit={isSubmit} setShowModal={setShowModal} submitHandler={submitHandler} />
                </div>
                </div>
                </div>

                </div>
                    </div>
            
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}


export default function AddNewScenario(){
    const [showModal, setShowModal] = useState(false)
    return (
        <>
            {showModal && <CreateScenario  setShowModal={setShowModal}  /> }
            <button className="bg-color-1 text-white py-2  pr-4  pl-4 mt-2 h-full border border-1 border-color-1 rounded-md mb-0 ml-0 mr-2 flex justify-start items-center "    onClick={() => setShowModal(true)}  >
                 <FaPuzzlePiece  size={23} className="mr-2" />   New Challenge
            </button>
        </>
    )
}