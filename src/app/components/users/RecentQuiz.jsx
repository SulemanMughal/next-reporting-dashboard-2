import Image from 'next/image'

export default function RecentQuiz(){
    return (
        <>

<div className="w-full col-span-1 max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
    <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Latest Quizes</h5>
        
   </div>
   <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
            <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                    <Image
                        src="/assets/img/ProxyShell_yg1wC76.jpg"
                        width={100}
                        height={100}
                        alt="Course"
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            Ocean Lotus
                        </p>
                    </div>
                    
                </div>
            </li>
            <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                    <Image
                        src="/assets/img/ProxyShell_yg1wC76.jpg"
                        width={100}
                        height={100}
                        alt="Course"
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        MITRE-T1110.003
                        </p>
                    </div>
                    
                </div>
            </li>
            <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                    <Image
                        src="/assets/img/ProxyShell_yg1wC76.jpg"
                        width={100}
                        height={100}
                        alt="Course"
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            MITRE-T1598.002
                        </p>
                    </div>
                    
                </div>
            </li>
            <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                    <Image
                        src="/assets/img/ProxyShell_yg1wC76.jpg"
                        width={100}
                        height={100}
                        alt="Course"
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            MITRE-1594
                        </p>
                    </div>
                    
                </div>
            </li>
            
        </ul>
   </div>
</div>

        </>
    )
}
