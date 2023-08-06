import  { GiTargetPrize } from "react-icons/gi"


export default function UserRank(){
    return (
        <>

            <div className="w-full col-span-1 relative  m-auto p-0 border-none rounded-lg">
                <div  className="block max-w-sm p-6 bg-blue-500 border border-gray-200 rounded-lg shadow ">
                    <div className="flex justify-between items-center">
                        <div>
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">Rookie</h5>
                            <p className="font-normal text-white mb-2">0% towards Novice</p>
                        </div>
                        <span>
                            <GiTargetPrize size={30}  className="text-white" />
                        </span>
                    </div>
                    
                    
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div className="bg-yellow-300 h-2.5 rounded-full" style={{width: "45%"}}></div>
                    </div>

                </div>
            </div>

            

        </>
    )
}