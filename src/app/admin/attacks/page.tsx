"use client"

import { useRef , useState, useEffect } from "react"
import {  BsRocketTakeoffFill } from "react-icons/bs"
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

function InitializeAttackModal({setShowModal , updateLogs}){

    const [teams, setTeams] = useState([]);
    const [scripts, setScripts] = useState(null);
    const [ips, setIP] = useState(null);
    const [isSubmit, setSubmit] = useState(false)



    const team_name = useRef("");
    const script_name = useRef("");
    const team_number = useRef("")
    // const ip_address = useRef("")


    useEffect(() => {
        axios.get('/api/team')
          .then(response => {
            // console.debug(response.data)
            setTeams(response.data);
          })
          .catch(error => {
            console.error(error);
          });

        //   axios.get('/api/attack_script')
        //   .then(response => {
        //     // console.debug(response.data)
        //     setScripts(response.data);
        //   })
        //   .catch(error => {
        //     console.error(error);
        //   });

        
      }, []);


      const teamChangeHandler = async (event) =>{
      if(!scripts){
          if(event.target.value !== ""){
              axios.get(`/api/attack_script/`)
              .then(response => {
                setScripts(response.data);
                // setIP(response.data.ranges);
              })
              .catch(error => {
                console.error(error);
              });
              // team_name.current = event.target[event.target.selectedIndex].text
              team_name.current = event.target[event.target.selectedIndex].text
              team_number.current = event.target[event.target.selectedIndex].value
          }
        }
      }

      


      const scriptChangeHandler = async (event) =>{
        if(event.target.value !== ""){
          script_name.current = event.target[event.target.selectedIndex].text;
        }
      }

      // const addressChangeHandler = async (event) =>{
      //   if(event.target.value !== ""){
      //     ip_address.current = event.target[event.target.selectedIndex].text;
      //   }
      // }



      
    

    const submitHandler = async () => {
        setSubmit(true)
        try{


          
            await axios.post('/api/attack_logs', {
              team_name : team_name.current,
              script_name : script_name.current,
              team_number : team_number.current
              // ip_address : ip_address.current
            });

            // alert("Successfully Initialized Attack")
             

            
            axios.get('/api/logs')
            .then(response => {
            // console.debug(response.data)
            updateLogs(response.data.user_logs);
            })
            .catch(error => {
            console.error(error);
            });
            
            setShowModal(false)

            toast.success('Successfully Initialized Attack')   




            // console.debug("User register successfully")

            // redirect('/login')
            // router.push("/login" )
            // push('/attacks');
        }
        catch (err){
            setSubmit(false)
            setShowModal(false)
            // alert("Please try again after sometime")
            toast.error('Please try again after sometime')    
            console.log(err);
        }
    }


    return (

    
    
    <>

          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-50"
          >
            <div className="relative w-4/12 my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl font-semibold">
                    Attack Details
                  </h3>
                  
                  <button
                    className="absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 text-2xl w-10 h-10 rounded-full focus:outline-none text-white"
                    onClick={() => setShowModal(false)}
                    >✗</button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <>
                  <div className="mb-4">
                                
                                <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Team</label>
                                <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={teamChangeHandler} value={team_number.current} >
                                <option  >Choose a team</option>
                                {teams.map(team => (
                                    <option key={team.id} value={team.team_number}>{team.team_number} - {team.name}</option>
                                ))}
                                </select>
                
                              </div>
                  
                                {scripts && (
                                    <div className="mb-4">
                                                
                                    <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Script</label>
                                    <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={scriptChangeHandler}>
                                    <option selected value={""}  >Choose a script</option>
                                    
                                    
                                    {scripts.map((script, index) => (
                                        <option key={index} value={index}>{script}</option>
                                    ))}
                                    </select>
                    
                                  </div>
                                ) }
                
                              
                  
                              <div>
                              {isSubmit ? <button disabled type="button" className="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center w-full justify-center">
                    <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
                    </svg>
                    Initializing...
                </button> : <button
                                  type="submit"
                                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={submitHandler}
                                >
                                  Initialize
                                </button> }
                                
                              </div>
                            
                  </>
                </div>
                {/*footer*/}
                {/* <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Save Changes
                  </button>
                </div> */}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}



function TrLog({params , index}){
  // console.debug(params)
  const log = JSON.parse(params)
  // console.debug(log)
  return (
    <>
    {/* <p>{"OK"}</p> */}
      <tr tabIndex={0} key={index} className="focus:outline-none h-16 border border-gray-100 rounded">
          <td className="text-center">
              <p className="text-base font-medium leading-none text-gray-700 mr-2">{log.date_time}</p>
          </td>
          <td className="text-center">
              <p className="text-base font-medium leading-none text-gray-700 mr-2">{log.team_no}</p>
          </td>
          <td className="text-center">
              <p className="text-sm leading-none text-gray-600 ml-2">{log.attack_name}</p>
          </td>
          <td className="text-center">
              <p className="text-sm leading-none text-gray-600 ml-2">{log.user_ip}</p>
          </td>
      </tr>
      <tr className="h-3"></tr>
    </>
  )
}


export default  function Logs(){

    // const data = await  axios.get('/api/team');

    const [showModal, setShowModal] = useState(false);


    const [logs, setLogs] = useState([]);


    const modelHandler = () => {
        setShowModal(true)
      }

    useEffect(() => {
      axios.get('/api/logs')
        .then(response => {
          // console.debug(response.data)
          // console.debug()
          // const temp = response.data.user_logs
          // console.debug(temp)
          // console.debug
          // temp.map((t) => (console.debug(JSON.parse(t).date_time)))
          setLogs(response.data.user_logs);
        })
        .catch(error => {
          console.error(error);
        });

      
    }, []);


    // console.debug(data.data)


    return (
        <>


<Toaster   toastOptions={{
                style: {
                    background: '#363636',
                    color: '#fff',
                  },
              
    success: {
      iconTheme: {
        primary: 'green',
        secondary: 'white',
      },
    },
  }} />

            {/* <Header /> */}
            {showModal ? <InitializeAttackModal setShowModal={setShowModal}  updateLogs={setLogs}  /> : null}
            <main className='bg-gray-100 min-h-screen'>


<div className="sm:px-6 w-full">

            <div className="px-4 md:px-0 py-4 md:py-7">
                <div className="flex items-center justify-between">
                    <p tabIndex={0} className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">Attack Logs</p>
                    <div className="py-3 px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded">
                        <p>Sort By:</p>
                        <select aria-label="select" className="focus:text-indigo-600 focus:outline-none bg-transparent ml-1">
                            <option className="text-sm text-indigo-800">Latest</option>
                            <option className="text-sm text-indigo-800">Oldest</option>
                            <option className="text-sm text-indigo-800">Latest</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
                <div className="sm:flex items-center justify-between">
                    <div className="flex items-center">
                        <a className="rounded-full focus:outline-none focus:ring-2  focus:bg-indigo-50 focus:ring-indigo-800" href="#!">
                            <div className="py-2 px-8 bg-indigo-100 text-indigo-700 rounded-full">
                                <p>All</p>
                            </div>
                        </a>
                    </div>
                    {/* <Link href={"/attacks/create"} className="bg-blue-700 text-white  block p-2  rounded-full">
                        {<AiOutlinePlus size={23}  /> }
                    </Link> */}
                    {/* <button className="bg-blue-700 text-white  block p-2  rounded-full" onClick={modelHandler}>
                        {<AiOutlinePlus size={23}  /> }
                    </button> */}
                    <button className="  block   bg-blue-200 rounded-full flex  items-center " onClick={modelHandler}  >
                            {<BsRocketTakeoffFill size={30} className="font-bold bg-blue-700 text-white rounded-full py-2 px-0"  /> }<span className="pl-2 pr-4 text-blue-800 font-bold "> Initialize Attack</span>
                            </button>
                </div>
                <div className="mt-7 overflow-x-auto">
                    <table className="w-full whitespace-nowrap">
                        <thead>
                            <tr className="focus:outline-none h-16 border border-gray-100 rounded">
                                <th>
                                  Timestamp
                                </th>
                                <th >
                                  Team Number
                                </th>
                                <th>
                                  Attack Name
                                </th>
                                <th>
                                  IP Address
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs &&   logs.map((log, index) =>  <TrLog params={log} index={index} key={index} /> )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
            </main>
        </>
    )
}