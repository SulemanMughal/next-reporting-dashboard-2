"use client"

import Link from "next/link";
import { useRef, useState , useEffect } from "react"
import axios from 'axios';
import { useSession } from "next-auth/react";
import { usePathname } from 'next/navigation'
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Image from 'next/image'
// import AOS from 'aos';
// import 'aos/dist/aos.css';
import encrypt from "@/app/lib/encrypt"
import CustomToaster from "@/app/components/CustomToaster"
import SVGLoader from "@/app/components/SVGLoader"
import {Animation} from "@/app/lib/Animation"
import URL_PATTERNS from "@/app/lib/urlpatterns";

// import { countries } from "@/app/lib/helpers"

function LeftImage(){
  return (
    <Image src={"/assets/img/new_logo.svg"} alt="me" width={400} height={400} />
    // <>
    //   <div className="flex flex-col items-start justify-center w-full h-full relative lg:pr-10">
    //       <Image src="/assets/img/data-security.png" alt="me" width={400} height={400} />
    //     </div>
    // </>
  )
}





// function CountryOptions(){
//   return (
//     <>
//       {countries.map(country => (
//         <option key={country.code} value={country.code}>
//           {country.name}
//         </option>
//       ))}
//     </>
    
//   )
// }


function SubmitBtn({isSubmit, submitHandler}){
  return (
    <div className="mt-8">
        {isSubmit ?  
          (
            <SVGLoader text={"Register"} className="submit-btn"   />
          )  : 
          (
            <button className="submit-btn" onClick={submitHandler}>{`Register`}</button>
          )
        }
        <p className="text-white py-3">
          <Link href={URL_PATTERNS?.LOGIN} className="underline hover:cursor-pointer pl-1 text-white"> {`Already registered?`} </Link>
        </p>
    </div>
  )
}




export default function Login() {

    const [isSubmit, setSubmit] = useState(false)

    const { push } = useRouter();

    const username = useRef("");
    const name = useRef("")
    const pass = useRef("");
    const passConfimation = useRef("");
    // const country = useRef("");
    const { data: session } = useSession();
    const pathname = usePathname()

    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
      setIsChecked(!isChecked);
    };

    
  useEffect(() => {
    // AOS.init();
    Animation();
    if(session?.user?.role === "admin"){
      push("/admin/dashboard")
  } else if (session?.user?.role === "user"){
      push("/user/dashboard")
  } else {
      if(pathname === "/register"){
        push("/register")
      } else{
        push("/login")
      }
      
  }
  }, [session])

    const submitHandler = async () => {
      if(username.current == "" || pass.current == "" || name.current == ""   ){
        toast.error('All fields are required')
      } else if (isChecked == false){
        toast.error('Please accept the terms and conditions')
      } else if (passConfimation.current !== pass.current){
        toast.error('Both Passwords must be same')
      }
      else{
        setSubmit(true)
        try{
          const encryptedData = encrypt({
            email : username.current,
            password : pass.current,
            name : name.current,
            country : ""
        })
            await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user`, {
              encryptedData
            });

            toast.success('Register Successfully.')
            push('/login');
        }
        catch (err){
            setSubmit(false)
            toast.error('Please try again after sometime')
            console.log(err);
        }
      }
    }

    

    return (
      <>
       

<CustomToaster />
<div className="container mx-auto  login ">
<div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-0 mr-auto mb-0 ml-auto max-w-7xl
      xl:px-5 lg:flex-row">
    <div className="flex flex-col items-center w-full pt-5 pr-10 pb-20 pl-10 lg:pt-5 lg:flex-row">
      <div className="w-full bg-cover relative max-w-md lg:max-w-2xl lg:w-7/12" data-aos="zoom-out"  >
        <LeftImage />
        {/* <div className="text-4xl text-white font-medium mt-10 leading-tight">
        {"Welcome to "}
        <span className="text-cerulean-blue">
          {"A&D - Q"}
        </span>
        <br />
        {"We're glad you're here."}
        </div> */}
        {/* <div className="-intro-x mt-5 text-lg text-white text-gray-500">Stronger Defenders are forged on our platform.</div> */}
      </div>
      <div className="w-full mt-20 mr-0 mb-0 ml-0 relative z-10 max-w-2xl lg:mt-0 lg:w-5/12">
        <div className="flex flex-col items-start justify-start pt-10 pr-10 pb-10 pl-10 bg-transparent relative z-10">
          <p className="w-full text-xl xl:text-2xl font-bold text-left leading-snug  text-white" data-aos="zoom-out" >Sign Up</p>
          <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-4">
            <div className="relative" data-aos="zoom-out"  >
              <input placeholder="Display Name" onChange={(e) => (name.current = e.target.value)} type="text" className="custom-form-control"/>
            </div>
            <div className="relative" data-aos="zoom-out"  >
              <input placeholder="Email" onChange={(e) => (username.current = e.target.value)} type="text" className="custom-form-control"/>
            </div>
            {/* <div className="relative" data-aos="zoom-out"  >
              <select name="country" id="country" className="appearance-none placeholder-gray-400 outline-0  border border-2 border-deep-blue-violet focus:border focus:border-2 focus:border-blue-900  text-gray-400    w-full p-3 pl-4 pr-8   m-0 mt-2 text-base block bg-deep-indigo  rounded-md shadow-sm" onChange={(e) => country.current = e.target.value}>
                <CountryOptions />                                
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div> */}
            <div className="relative" data-aos="zoom-out"  >
              <input placeholder="Password" onChange={(e) => (pass.current = e.target.value)} type="password" className="custom-form-control"/>
            </div>
            <div className="relative" data-aos="zoom-out"  >
              <input placeholder="Password Confirmation" onChange={(e) => (passConfimation.current = e.target.value)} type="password" className="custom-form-control"/>
            </div>
            {/* <div  className="relative" data-aos="zoom-out"  >
              <select name="signupfrom" id="signupfrom" className="appearance-none placeholder-gray-400 outline-0  border border-2 border-deep-blue-violet focus:border focus:border-2 focus:border-blue-900  text-gray-400    w-full p-3 pl-4 pr-8   m-0 mt-2 text-base block bg-deep-indigo  rounded-md shadow-sm" defaultValue={"1"}>
                <option  value="1">How did you hear about us?</option>
                <option value="2">Facebook</option>
                <option value="3">LinkedIn</option>
                <option value="4">Word of Mouth</option>
                <option value="5">Twitter</option>
                <option value="6">Reddit</option>
                <option value="7">Other</option>
                </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div> */}
            {/* <div className="relative" data-aos="zoom-out"  >
              <label className="text-white   whitespace-nowrap text-sm" htmlFor="marketing_content">
              {"I wish to receive marketing emails from BTLO including; giveaways, announcements, and special events."}
              </label>
              <br />
              <label className="relative inline-flex items-center cursor-pointer mt-3" data-aos="zoom-out"  >
                <input type="checkbox" value="" className="sr-only peer" id="marketing_content" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 peer-focus:ring-blue-800 rounded-full peer bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ml-3 text-sm font-medium text-gray-900 text-gray-300"></span>
              </label>
            </div> */}
            {/* <div className="relative" data-aos="zoom-out"  >
                <div   className="input_area mt-5 text-white lg:text-white flex text-xs items-center">
                   <input type="checkbox" id="tos" name="tos"  required="" role="terms" checked={isChecked} onChange={handleCheckboxChange}  />
                    <span className="m-1 ml-2"> I agree with the <a className="text-cerulean-blue"  href="#!">Terms of Service</a> and <a  className="text-cerulean-blue"  href="#!">Privacy Policies</a></span>
                  <br />
              </div>
            </div> */}
            <div className="relative" data-aos="zoom-out"  >
              <div className="intro-x flex text-gray-700 dark:text-gray-400 text-xs sm:text-sm mt-4">
                <div className="flex items-center mr-auto">
                  <input type="checkbox" className="input border mr-2" id="input-remember-me" name="tos"  required=""  checked={isChecked} onChange={handleCheckboxChange}  />
                  <label className="cursor-pointer select-none " htmlFor="input-remember-me"><span className="m-1 ml-2 "> I agree with the <a className="text-color-2"  href="#!">Terms of Service</a> and <a  className="text-color-2"  href="#!">Privacy Policies</a></span></label>
                </div>
                {/* <a href="#!">
                  Forgot your password?
                </a> */}
              </div>
            </div>

            {/* submit button */}
            <div className="relative mt-5" data-aos="zoom-out"  >
              <SubmitBtn  isSubmit={isSubmit} submitHandler={submitHandler} />
            </div>
            
          </div>
        </div>
        
      </div>
    </div>
  </div>
</div>

      </>
    )
  }
  