import { FaHackerrank } from "react-icons/fa6"


export default function GlobalRank(){
    return (
        <>

            <div className="w-full col-span-1 relative  m-auto p-0 border-none rounded-lg">
                <div  className="block max-w-sm p-6 bg-white  border border-gray-200 rounded-lg shadow ">
                    <div className="flex justify-between items-center">
                        <div>
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-blue-500 ">Global Rank</h5>
                            <p className="font-normal text-blue-500 mb-2 fw-bold"># 43180</p>
                        </div>
                        <span>
                            <FaHackerrank size={30}  className="text-black" />
                        </span>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div className="bg-blue-400 h-2.5 rounded-full" style={{width: "45%"}}></div>
                    </div>

                </div>
            </div>

            

        </>
    )
}
