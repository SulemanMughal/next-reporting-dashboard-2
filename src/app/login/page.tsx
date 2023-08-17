"use client"

import { signIn } from "next-auth/react";
import { useRef , useState } from "react"
import React, {  useEffect } from 'react';

import Image from 'next/image'
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import CustomToaster from "@/app/components/CustomToaster"


const SubmitBtn  = ({isSubmit , submitHandler}) => {
  return (
    <>
    {isSubmit ? 
    <button disabled type="button" className="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700  inline-flex items-center w-full justify-center">
<svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-gray-200 animate-spin " viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
</svg>
Signing In...
</button> : <button className="w-full inline-block pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center text-white bg-indigo-500 rounded-lg transition duration-200 hover:bg-indigo-600 ease" onClick={submitHandler}>Sign In</button> }
</>
  )
}


import encrypt from "@/app/lib/encrypt"
import decrypt from "@/app/lib/decrypt"



// const DynamicWaveAnimation = () => {
//   const generateRandomHeight = () => {
//     return Math.floor(Math.random() * 40) + 20; // Generate random height between 20 and 60
//   };

//   const numPoints = 100; // Number of points

//   return (
//     <div className="dynamic-wave-container">
//       <div className="dynamic-wave">
//         {Array.from({ length: numPoints }).map((_, index) => (
//           <div
//             key={index}
//             className="point"
//             style={{ height: `${generateRandomHeight()}px` }}
//           ></div>
//         ))}
//       </div>
//     </div>
//   );
// };


// const SineWaveAnimation = () => {
//   const numPoints = 100; // Number of points

//   const generatePointStyle = (index) => {
//     const angle = (index / numPoints) * Math.PI * 2;
//     const x = index * 8; // Horizontal spacing between points
//     const y = Math.sin(angle) * 50 + 50; // Adjust the amplitude and baseline
//     return {
//       left: `${x}px`,
//       bottom: `${y}px`,
//     };
//   };

//   return (
//     <div className="sine-wave-container">
//       <div className="sine-wave">
//         {Array.from({ length: numPoints }).map((_, index) => (
//           <div
//             key={index}
//             className="point"
//             style={generatePointStyle(index)}
//           ></div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const DotsWaveAnimation = () => {
//   const numDots = 100; // Number of dots

//   const generateDotStyle = (index) => {
//     const x = index * 10; // Horizontal spacing between dots
//     const y = Math.sin((x / 100) * Math.PI * 2) * 15 + 20; // Adjust the amplitude and baseline
//     return {
//       left: `${x}px`,
//       bottom: `${y}px`,
//     };
//   };

//   return (
//     <div className="dots-wave-container">
//       <div className="dots-wave">
//         {Array.from({ length: numDots }).map((_, index) => (
//           <div
//             key={index}
//             className="dot"
//             style={generateDotStyle(index)}
//           ></div>
//         ))}
//       </div>
//     </div>
//   );
// };
// const WaveLinesOfDotsAnimation = () => {
//   const numLines = 5; // Number of wave lines
//   const dotsPerLine = 50; // Dots per line

//   const generateDotStyle = (lineIndex, dotIndex) => {
//     const x = dotIndex * 10; // Horizontal spacing between dots
//     const y = Math.sin((x / 100) * Math.PI * 2) * 15 + 20; // Adjust the amplitude and baseline
//     return {
//       left: `${x}px`,
//       bottom: `${y + lineIndex * 25}px`, // Adjust vertical position for each line
//     };
//   };

//   return (
//     <div className="wave-lines-container">
//       {Array.from({ length: numLines }).map((_, lineIndex) => (
//         <div className="wave-line" key={lineIndex}>
//           {Array.from({ length: dotsPerLine }).map((_, dotIndex) => (
//             <div
//               key={dotIndex}
//               className="dot"
//               style={generateDotStyle(lineIndex, dotIndex)}
//             ></div>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// };

// const AnimatedWaveLinesOfDots = () => {
//   const numLines = 5; // Number of wave lines
//   const dotsPerLine = 10; // Dots per line

//   const generateDotStyle = (lineIndex, dotIndex) => {
//     const x = dotIndex * 10; // Horizontal spacing between dots
//     const y = Math.sin((x / 100) * Math.PI * 2) * 15 + 20; // Adjust the amplitude and baseline
//     return {
//       left: `${x}px`,
//       bottom: `${y + lineIndex * 25}px`, // Adjust vertical position for each line
//     };
//   };

//   return (
//     <div className="wave-lines-container">
//       {Array.from({ length: numLines }).map((_, lineIndex) => (
//         <div className="wave-line" key={lineIndex}>
//           {Array.from({ length: dotsPerLine }).map((_, dotIndex) => (
//             <div
//               key={dotIndex}
//               className="dot"
//               style={generateDotStyle(lineIndex, dotIndex)}
//             ></div>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// };






export default function Login() {
  const { push } = useRouter();
  const [isSubmit, setSubmit] = useState(false)
  const userName = useRef("");
  const pass = useRef("");
  const submitHandler = async () => {
    if(userName.current == "" || pass.current == "" ){
      toast.error('All fields are required')
    } else {
      setSubmit(true)
      try{
        
        const encryptedData = encrypt({
          username : userName.current,
          password : pass.current,
        })
        const res  = await signIn("credentials" , {
          encryptedData,
          redirect : false,
          callbackUrl : "/dashboard"
        })

        
        if(res.error ){
          console.log(res.error)
          setSubmit(false)
          toast.error('Credentials do not match!')
        }
        else{
            toast.success('Sign In Successfully.')
            setSubmit(false)    
            push('/');
        }
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
        {/* <AnimatedWaveLinesOfDots /> */}
        
        
        <div className=" relative py-16 ">
          <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-0 mr-auto mb-0 ml-auto max-w-7xl
              xl:px-5 lg:flex-row">
            <div className="flex flex-col items-center w-full pt-5 pr-10 pb-20 pl-10 lg:pt-15 lg:flex-row">
              <div className="w-full mt-20 mr-0 mb-0 ml-0 relative z-10 max-w-2xl lg:mt-0 lg:w-5/12">
                <div className="flex flex-col items-start justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl
                    relative z-10">
                  <p className="w-full text-4xl font-medium text-center leading-snug font-serif">Welcome Back</p>
                  <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                    
                    <div className="relative">
                      <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">Email</p>
                      <input placeholder="123@ex.com" onChange={(e) => (userName.current = e.target.value)} type="text" className="border placeholder-gray-400 focus:outline-none
                          focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                          border-gray-300 rounded-md"/>
                    </div>
                    <div className="relative">
                      <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                          absolute">Password</p>
                      <input placeholder="Password" onChange={(e) => (pass.current = e.target.value)} type="password" className="border placeholder-gray-400 focus:outline-none
                          focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                          border-gray-300 rounded-md"/>
                    </div>
                    <div className="relative">
                      <SubmitBtn isSubmit={isSubmit} submitHandler={submitHandler} />  
                    </div>
                  </div>
                </div>
                <svg viewBox="0 0 91 91" className="absolute top-0 left-0 z-0 w-32 h-32 -mt-12 -ml-12 text-yellow-300
                    fill-current"><g stroke="none" strokeWidth="1" fillRule="evenodd"><g fillRule="nonzero"><g><g><circle
                    cx="3.261" cy="3.445" r="2.72"/><circle cx="15.296" cy="3.445" r="2.719"/><circle cx="27.333" cy="3.445"
                    r="2.72"/><circle cx="39.369" cy="3.445" r="2.72"/><circle cx="51.405" cy="3.445" r="2.72"/><circle cx="63.441"
                    cy="3.445" r="2.72"/><circle cx="75.479" cy="3.445" r="2.72"/><circle cx="87.514" cy="3.445" r="2.719"/></g><g
                    transform="translate(0 12)"><circle cx="3.261" cy="3.525" r="2.72"/><circle cx="15.296" cy="3.525"
                    r="2.719"/><circle cx="27.333" cy="3.525" r="2.72"/><circle cx="39.369" cy="3.525" r="2.72"/><circle
                    cx="51.405" cy="3.525" r="2.72"/><circle cx="63.441" cy="3.525" r="2.72"/><circle cx="75.479" cy="3.525"
                    r="2.72"/><circle cx="87.514" cy="3.525" r="2.719"/></g><g transform="translate(0 24)"><circle cx="3.261"
                    cy="3.605" r="2.72"/><circle cx="15.296" cy="3.605" r="2.719"/><circle cx="27.333" cy="3.605" r="2.72"/><circle
                    cx="39.369" cy="3.605" r="2.72"/><circle cx="51.405" cy="3.605" r="2.72"/><circle cx="63.441" cy="3.605"
                    r="2.72"/><circle cx="75.479" cy="3.605" r="2.72"/><circle cx="87.514" cy="3.605" r="2.719"/></g><g
                    transform="translate(0 36)"><circle cx="3.261" cy="3.686" r="2.72"/><circle cx="15.296" cy="3.686"
                    r="2.719"/><circle cx="27.333" cy="3.686" r="2.72"/><circle cx="39.369" cy="3.686" r="2.72"/><circle
                    cx="51.405" cy="3.686" r="2.72"/><circle cx="63.441" cy="3.686" r="2.72"/><circle cx="75.479" cy="3.686"
                    r="2.72"/><circle cx="87.514" cy="3.686" r="2.719"/></g><g transform="translate(0 49)"><circle cx="3.261"
                    cy="2.767" r="2.72"/><circle cx="15.296" cy="2.767" r="2.719"/><circle cx="27.333" cy="2.767" r="2.72"/><circle
                    cx="39.369" cy="2.767" r="2.72"/><circle cx="51.405" cy="2.767" r="2.72"/><circle cx="63.441" cy="2.767"
                    r="2.72"/><circle cx="75.479" cy="2.767" r="2.72"/><circle cx="87.514" cy="2.767" r="2.719"/></g><g
                    transform="translate(0 61)"><circle cx="3.261" cy="2.846" r="2.72"/><circle cx="15.296" cy="2.846"
                    r="2.719"/><circle cx="27.333" cy="2.846" r="2.72"/><circle cx="39.369" cy="2.846" r="2.72"/><circle
                    cx="51.405" cy="2.846" r="2.72"/><circle cx="63.441" cy="2.846" r="2.72"/><circle cx="75.479" cy="2.846"
                    r="2.72"/><circle cx="87.514" cy="2.846" r="2.719"/></g><g transform="translate(0 73)"><circle cx="3.261"
                    cy="2.926" r="2.72"/><circle cx="15.296" cy="2.926" r="2.719"/><circle cx="27.333" cy="2.926" r="2.72"/><circle
                    cx="39.369" cy="2.926" r="2.72"/><circle cx="51.405" cy="2.926" r="2.72"/><circle cx="63.441" cy="2.926"
                    r="2.72"/><circle cx="75.479" cy="2.926" r="2.72"/><circle cx="87.514" cy="2.926" r="2.719"/></g><g
                    transform="translate(0 85)"><circle cx="3.261" cy="3.006" r="2.72"/><circle cx="15.296" cy="3.006"
                    r="2.719"/><circle cx="27.333" cy="3.006" r="2.72"/><circle cx="39.369" cy="3.006" r="2.72"/><circle
                    cx="51.405" cy="3.006" r="2.72"/><circle cx="63.441" cy="3.006" r="2.72"/><circle cx="75.479" cy="3.006"
                    r="2.72"/><circle cx="87.514" cy="3.006" r="2.719"/></g></g></g></g></svg>
                <svg viewBox="0 0 91 91" className="absolute bottom-0 right-0 z-0 w-32 h-32 -mb-12 -mr-12 text-indigo-500
                    fill-current"><g stroke="none" strokeWidth="1" fillRule="evenodd"><g fillRule="nonzero"><g><g><circle
                    cx="3.261" cy="3.445" r="2.72"/><circle cx="15.296" cy="3.445" r="2.719"/><circle cx="27.333" cy="3.445"
                    r="2.72"/><circle cx="39.369" cy="3.445" r="2.72"/><circle cx="51.405" cy="3.445" r="2.72"/><circle cx="63.441"
                    cy="3.445" r="2.72"/><circle cx="75.479" cy="3.445" r="2.72"/><circle cx="87.514" cy="3.445" r="2.719"/></g><g
                    transform="translate(0 12)"><circle cx="3.261" cy="3.525" r="2.72"/><circle cx="15.296" cy="3.525"
                    r="2.719"/><circle cx="27.333" cy="3.525" r="2.72"/><circle cx="39.369" cy="3.525" r="2.72"/><circle
                    cx="51.405" cy="3.525" r="2.72"/><circle cx="63.441" cy="3.525" r="2.72"/><circle cx="75.479" cy="3.525"
                    r="2.72"/><circle cx="87.514" cy="3.525" r="2.719"/></g><g transform="translate(0 24)"><circle cx="3.261"
                    cy="3.605" r="2.72"/><circle cx="15.296" cy="3.605" r="2.719"/><circle cx="27.333" cy="3.605" r="2.72"/><circle
                    cx="39.369" cy="3.605" r="2.72"/><circle cx="51.405" cy="3.605" r="2.72"/><circle cx="63.441" cy="3.605"
                    r="2.72"/><circle cx="75.479" cy="3.605" r="2.72"/><circle cx="87.514" cy="3.605" r="2.719"/></g><g
                    transform="translate(0 36)"><circle cx="3.261" cy="3.686" r="2.72"/><circle cx="15.296" cy="3.686"
                    r="2.719"/><circle cx="27.333" cy="3.686" r="2.72"/><circle cx="39.369" cy="3.686" r="2.72"/><circle
                    cx="51.405" cy="3.686" r="2.72"/><circle cx="63.441" cy="3.686" r="2.72"/><circle cx="75.479" cy="3.686"
                    r="2.72"/><circle cx="87.514" cy="3.686" r="2.719"/></g><g transform="translate(0 49)"><circle cx="3.261"
                    cy="2.767" r="2.72"/><circle cx="15.296" cy="2.767" r="2.719"/><circle cx="27.333" cy="2.767" r="2.72"/><circle
                    cx="39.369" cy="2.767" r="2.72"/><circle cx="51.405" cy="2.767" r="2.72"/><circle cx="63.441" cy="2.767"
                    r="2.72"/><circle cx="75.479" cy="2.767" r="2.72"/><circle cx="87.514" cy="2.767" r="2.719"/></g><g
                    transform="translate(0 61)"><circle cx="3.261" cy="2.846" r="2.72"/><circle cx="15.296" cy="2.846"
                    r="2.719"/><circle cx="27.333" cy="2.846" r="2.72"/><circle cx="39.369" cy="2.846" r="2.72"/><circle
                    cx="51.405" cy="2.846" r="2.72"/><circle cx="63.441" cy="2.846" r="2.72"/><circle cx="75.479" cy="2.846"
                    r="2.72"/><circle cx="87.514" cy="2.846" r="2.719"/></g><g transform="translate(0 73)"><circle cx="3.261"
                    cy="2.926" r="2.72"/><circle cx="15.296" cy="2.926" r="2.719"/><circle cx="27.333" cy="2.926" r="2.72"/><circle
                    cx="39.369" cy="2.926" r="2.72"/><circle cx="51.405" cy="2.926" r="2.72"/><circle cx="63.441" cy="2.926"
                    r="2.72"/><circle cx="75.479" cy="2.926" r="2.72"/><circle cx="87.514" cy="2.926" r="2.719"/></g><g
                    transform="translate(0 85)"><circle cx="3.261" cy="3.006" r="2.72"/><circle cx="15.296" cy="3.006"
                    r="2.719"/><circle cx="27.333" cy="3.006" r="2.72"/><circle cx="39.369" cy="3.006" r="2.72"/><circle
                    cx="51.405" cy="3.006" r="2.72"/><circle cx="63.441" cy="3.006" r="2.72"/><circle cx="75.479" cy="3.006"
                    r="2.72"/><circle cx="87.514" cy="3.006" r="2.719"/></g></g></g></g></svg>
              </div>
              <div className="w-full bg-cover relative max-w-md lg:max-w-2xl lg:w-7/12">
                <div className="flex flex-col items-center justify-center w-full h-full relative lg:pr-10">
                  <Image src="/assets/img/robot-checking-user-profile.png" alt="me" width="537" height="537" className="btn-"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </>
    )
  }
  