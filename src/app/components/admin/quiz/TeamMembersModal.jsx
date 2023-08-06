export default function TeamMembersModal({setShowModal, members}){
    return (
        <>        
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
            <div className="relative w-1/3  px-4 space-y-16 ">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-1xl font-semibold">
                    Team Members
                    </h3>
                    <button
                    className="absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 text-2xl w-10 h-10 rounded-full focus:outline-none text-white"
                   onClick={() => setShowModal(false)}
                    >✗</button>
                </div>
                <div className="relative p-6 flex-auto">
                    <ul class="max-w-md  ">
                        {members ? members.map((member, index) => (
                            <li class="pb-3 sm:pb-4">
                                <div class="flex items-center space-x-4">
                                    <div class="flex items-center justify-center 
                                            h-14 w-14 rounded-full bg-blue-600 ">
                                            <span class="text-white font-bold text-3xl p-8 ">
                                                {(Array.from(member.email)[0]).toString().toUpperCase()}
                                            </span>
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <p class="text-sm text-dark fw-bold truncate">
                                            {member.email}
                                        </p>
                                    </div>
                                    
                                </div>
                            </li>
                        )) :  <li class="pb-3 sm:pb-4">
                        <div class="flex items-center space-x-4">
                            <div class="flex-1 min-w-0">
                                <p class="text-sm font-medium text-gray-900 truncate ">
                                    No Member has joined yet.
                                </p>
                            </div>
                        </div>
                    </li> }
                        
                    </ul>
                </div>

                </div>
                    </div>
            
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}