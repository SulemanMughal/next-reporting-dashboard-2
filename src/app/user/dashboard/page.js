
import CustomToaster from "@/app/components/CustomToaster"
import TopStatistics from "@/app/components/users/dashboard/TopStatistics"
import Link from "next/link"

import { AiFillHome } from "react-icons/ai"

import { FaPuzzlePiece } from "react-icons/fa"

import { MdLeaderboard } from "react-icons/md"

const TopNavBar = () => {
    return (
        <nav className="bg-transparent text-gray-400 pt-4 pb-0" id="user_dashboard">
            <div className="container mx-auto flex items-center justify-between">
                
                <ul className="flex space-x-4 mb-0">
                <li >
                    <Link href={"#"} className="flex  items-center justify-start active  p-3 px-5 rounded-3xl rounded-b-none">
                        <AiFillHome  size={30}/> <p className="pl-2 text-xl  pt-1 pb-0 my-0">Home</p>    
                    </Link>
                </li>
                <li >
                    <Link href={"#"} className="flex  items-center justify-start  mx-5 p-3 px-5 rounded-3xl rounded-b-none">
                        <FaPuzzlePiece  size={30}/> <p className="pl-2 text-xl  pt-1 pb-0 my-0">Challenges</p>    
                    </Link>
                </li>
                <li >
                    <Link href={"#"} className="flex  items-center justify-start  p-3 px-5 rounded-3xl rounded-b-none">
                        <MdLeaderboard  size={30}/> <p className="pl-2 text-xl  pt-1 pb-0 my-0">Leaderboard</p>    
                    </Link>
                </li>
                {/* <li >
                    <Link href={"#"} className="flex  items-center justify-start active mx-5 p-3 px-5 rounded-3xl rounded-b-none">
                        <AiFillHome  size={30}/> <p className="pl-2 text-xl  pt-1 pb-0 my-0">Home</p>    
                    </Link>
                </li>
                <li><a href="#" className="text-white hover:underline">About</a></li>
                <li><a href="#" className="text-white hover:underline">Services</a></li>
                <li><a href="#" className="text-white hover:underline">Contact</a></li> */}
                </ul>
            </div>
        </nav>

    )
}

export default function UserDashboard(){
    return (
        <>
            <CustomToaster />
            <TopNavBar />
            <div className="mx-10 p-3 bg-midnight-blue rounded-3xl ">
                <TopStatistics />
            </div>
        </>
    )
}