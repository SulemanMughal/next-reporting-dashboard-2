"use client"


// import { MdGroups } from "react-icons/md"


import { AiOutlineUserAdd } from "react-icons/ai"
import  { GiCancel } from "react-icons/gi"

import { useEffect, useState, useRef } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"


const SearchableSelect = ({ options,  user_id }) => {
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
  
    const mapToSelectFormat = (data) => {
      return data.map((item) => ({
        value: item.id,
        label: item.email,
      }));
    };
  
    const handleInputChange = (e) => {
        const inputValue = e.target.value;
      setSelectedOption(inputValue);
      
      setFilteredOptions(
        mapToSelectFormat(options).filter((option) =>
          option.label.toLowerCase().includes(inputValue.toLowerCase())
        )
      );
      setIsDropdownOpen(true)
    };
  
    useEffect(() => {
      if (!selectedOption) {
        setFilteredOptions(mapToSelectFormat(options));
      }
    }, [selectedOption, options]);
  
    return (
      <>
        <input
          type="text"
          className="block py-3 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=""
          value={selectedOption}
          onChange={handleInputChange}
          onFocus={() => setIsDropdownOpen(true)}
          onBlur={() => setIsDropdownOpen(false)}
          
        />
        {isDropdownOpen && (
          <div className="absolute left-0 w-full max-h-72 overflow-y-auto border rounded shadow-lg bg-white">
            {filteredOptions.map((option) => (
              <div
                key={option.value}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100 "
                onMouseDown={(e) => {
                  e.preventDefault(); 
                  setSelectedOption(option.label);
                  setIsDropdownOpen(false);
                    user_id.current = option.value
                }}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </>
    );
  };



function SubmitBtn({isSubmit, setShowAddMemberModal }){
    return (
        <>
                {isSubmit ? <button disabled type="button" className="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700  inline-flex items-center w-full justify-center">
                <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-gray-200 animate-spin " viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
                </svg>
                Adding...
                </button>  :
                <>
                <div className="flex items-center justify-center p-3 ">
                <button
                className=" font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 w-6/12 justify-center rounded-md leading-6 bg-red-700  text-red-100 shadow-sm hover:bg-red-500 flex justify-start items-center"
                type="button"
                onClick={() => setShowAddMemberModal(false)}
                ><span>Cancel</span> <GiCancel  size={23} className="ml-2" /></button>
                <button
                type="submit"
                className=" w-6/12 justify-center rounded-md bg-indigo-600 font-bold uppercase px-6 py-2 font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 flex justify-start items-center"
                >
                <span> Add</span> <AiOutlineUserAdd size={23} className="ml-2"/>
                </button> 
                </div>
                </>
                }
        </>
    )
}






export default function AddTeamMemberModal({setShowAddMemberModal , updateTeams, team_id}){
    
    const user_id = useRef("");
    const [isSubmit, setSubmit] = useState(false)
    const [users, setUsers] = useState(null)

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user`)
        .then(res => {
            if(res.data.status === true){
                setUsers(res.data.users)
            } else {
                toast.error(`${res.data.error}`)
            }
        })
        .catch(err => {
            toast.error(`Sorry! There is an error while fetching users. Please try again after some time`)
        });
    }, [])

    const submitHandler = async (event) => {
        event.preventDefault()
        if(user_id.current == ""  ){
            toast.error(`All fields are required`)
        }
        else{
            try {
                setSubmit(true)
                const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/team/member/add/`, {
                    user_id : user_id.current,
                    id : team_id
                });
                
                if(response.data.status === false){
                    setSubmit(false)
                    setShowAddMemberModal(false)
                    toast.error(`${response.data.error}`)    
                }
                else{
                    setSubmit(false)
                    setShowAddMemberModal(false)
                    toast.success('Successfull, Member has been added.')
                    axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/team`)
                    .then(res => {
                        if(res.data.status === true){
                            updateTeams(res.data.teams);
                        }
                        else{
                            toast.error(`${res.data.error}`)
                        }
                    })
                    .catch(err => {
                        toast.error(`Sorry! There is an error while fetching teams. Please try again after some time`);
                    });
                }
            } catch (error) {
                setSubmit(false)
                setShowAddMemberModal(false)
                toast.error(`Sorry! There is an error while adding member. Please try again after some time`)
            }
        }
    }
    return (
        <>        
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            data-aos="zoom-out" data-aos-duration="700" 
            >
            <div className="relative w-1/4  px-4 space-y-16 ">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <div className='flex items-center justify-start '>
                        <AiOutlineUserAdd  size={30}  />
                        <h3 className=" font-semibold ml-3 text-xl">
                            New Member
                        </h3>
                    </div>
                    <button
                    className="absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 text-2xl w-10 h-10 rounded-full focus:outline-none text-white"
                   onClick={() => setShowAddMemberModal(false)}
                    >✗</button>
                </div>
                <div className="relative p-6 flex-auto">
                <form className="space-y-6" onSubmit={submitHandler}>
                    <div className="relative z-0 w-full mb-6 group">
                        {users && <SearchableSelect options={users}  user_id={user_id} /> } 
                        <label htmlFor="user_id" className="peer-focus:font-medium absolute text-md text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">User Member</label>
                    </div>
                    <div>
                        <SubmitBtn  isSubmit={isSubmit} setShowAddMemberModal={setShowAddMemberModal} />
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