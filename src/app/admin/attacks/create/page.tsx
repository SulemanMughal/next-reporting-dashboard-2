"use client"

// import { signIn } from "next-auth/react";
import { useRef , useState, useEffect } from "react"


import axios from 'axios';


import Header from "@/app/components/Header"

// import Link from "next/link"


import { useRouter } from 'next/navigation';


export default  function Attacks(){


    // const data = await axios.get('/api/team');

    // console.debug(data)

    const { push } = useRouter();


    const [teams, setTeams] = useState([]);
    const [scripts, setScripts] = useState(null);
    const [ips, setIP] = useState(null);
    const [isSubmit, setSubmit] = useState(false)



    const team_name = useRef("");
    const script_name = useRef("");
    const ip_address = useRef("")


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
        if(event.target.value !== ""){
            axios.get(`/api/team/${event.target.value}`)
            .then(response => {
              setScripts(response.data.attack_script);
              setIP(response.data.ranges);
            })
            .catch(error => {
              console.error(error);
            });
            team_name.current = event.target[event.target.selectedIndex].text
        }
      }


      const scriptChangeHandler = async (event) =>{
        if(event.target.value !== ""){
          script_name.current = event.target[event.target.selectedIndex].text;
        }
      }

      const addressChangeHandler = async (event) =>{
        if(event.target.value !== ""){
          ip_address.current = event.target[event.target.selectedIndex].text;
        }
      }



      
    

    const submitHandler = async () => {
        setSubmit(true)
        try{


          
            await axios.post('/api/attack_logs', {
              team_name : team_name.current,
              script_name : script_name.current,
              ip_address : ip_address.current
            });

            alert("Successfully Initialized Attack")

            // console.debug("User register successfully")

            // redirect('/login')
            // router.push("/login" )
            push('/attacks');
        }
        catch (err){
            setSubmit(false)
            alert("Please try again after sometime")
            console.log(err);
        }
    }

    return (
        <>
            <main className='bg-gray-100 min-h-screen'>
                <Header />
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Initialize Attack
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
            
              <div className="mb-4">
                                
                <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Team</label>
                <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={teamChangeHandler}>
                <option selected value={""} >Choose a team</option>
                {teams.map(team => (
                    <option key={team.id} value={team.id}>{team.name}</option>
                ))}
                </select>

              </div>
  
                {scripts && (
                    <div className="mb-4">
                                
                    <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Script</label>
                    <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={scriptChangeHandler}>
                    <option selected value={""}  >Choose a script</option>
                    
                    
                    {scripts.map(script => (
                        <option key={script.id} value={script.id}>{script.name}</option>
                    ))}
                    </select>
    
                  </div>
                ) }

                {ips && (
                    <div className="mb-4">
                                
                    <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Select IP Address</label>
                    <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={addressChangeHandler}>
                    <option selected value={""}>Choose an IP Address</option>
                    
                    
                    {ips.map(ip => (
                        <option key={ip.id} value={ip.id}>{ip.ip_start}</option>
                    ))}
                    </select>
    
                  </div>
                )}
              
  
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
            
  
          </div>
        </div>
            </main>
        </>
    )
}