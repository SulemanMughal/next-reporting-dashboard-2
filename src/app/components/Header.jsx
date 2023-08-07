import Link from "next/link"
// import Image from "next/image"


import SigninButton from "./SigninButton"



export default function Header(){
  return (        
    <nav className=" border-gray-200  sticky top-0 z-20" style={{backgroundColor:"rgba(16,19,69, 96%)"}}>
      <div className="flex flex-wrap justify-between items-center  w-full px-4 py-2">
        <Link href="/" className="flex items-center">
            <span className="self-center text-3xl font-semibold whitespace-nowrap  font-bolder text-white" style={{color : "#35c2f1"}}>NeoRix</span>
        </Link>
        <div className="flex md:order-2">
          <SigninButton />
          
          <button data-collapse-toggle="navbar-cta" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 " aria-controls="navbar-cta" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
        </button>
      </div>
      </div>
    </nav>

  )
}