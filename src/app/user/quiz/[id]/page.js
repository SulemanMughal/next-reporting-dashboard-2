

import { AiOutlineFileZip } from "react-icons/ai"

function QuizFileInfo(){
    return (
        <>
            <div className="p-4 grid  grid-cols-6 gap-4 place-items-center justify-center  ">
                <div className="w-full col-span-2 relative  m-auto p-0  rounded-0">
                    <div className="flex  items-center justify-start px-0 place-items-start text-start">
                        <div className="px-0">
                            <AiOutlineFileZip className="text-gray-300" size={40} />
                        </div>
                        <div className="ml-2">
                            <h3 className="mb-0 pb-0 text-sm  text-gray-400">The Report II.zip</h3>
                            <p className="mt-0 pb-0  text-sm text-gray-400">20 MB</p>
                        </div>
                    </div>
                </div>
                <div className="w-full col-span-2 relative  m-auto p-0  rounded-0 text-start justify-center">
                    <h3 className="text-gray-400">Password</h3>
                    <p className="text-gray-400">blt0</p>
                </div>
                <div className="w-full col-span-2 relative  m-auto p-0  rounded-0 text-center justify-center">
                    <button className="theme-bg-color hover:bg-blue-700 text-white font-bold py-2 px-4 border-none rounded">
                        Download File
                    </button>
                </div>
            </div>
            
        </>
    )
}


function QuizInfoList(){
    return (
        <>
            <div className="p-4 grid  grid-cols-8 gap-4 place-items-center justify-center  ">
                <div className="w-full col-span-2 relative  m-auto p-0  rounded-0">
                    <h3 className="text-gray-400">Points</h3>
                    <p className="text-orange-400">20</p>
                </div>
                <div className="w-full col-span-2 relative  m-auto p-0  rounded-0">
                    <h3 className="text-gray-400">Difficulty</h3>
                    <p className="text-orange-600">Medium</p>
                </div>
                <div className="w-full col-span-2 relative  m-auto p-0  rounded-0">
                    <h3 className="text-gray-400">Solves</h3>
                    <p className="text-green-600">20</p>
                </div>
                <div className="w-full col-span-2 relative  m-auto p-0  rounded-0">
                    <h3 className="text-gray-400">OS</h3>
                    <p className="text-green-600">Windows/Linux</p>
                </div>
            </div>
            <hr className="my-1 h-1  opacity-100  border border-1 border-t-0 border-l-0 border-r-0 border-dashed bg-none" />
        </>
        
    )
}


function QuizStatus(){
    return (
        <span className="inline-block  rounded-full px-3   py-1 text-sm font-semibold bg-indigo-600 text-indigo-100 mr-2 my-2">{"PDF Reader"}</span>
    )
}



function Question(){
    return (
        <>
            <div className="my-2">
                <h1 className="text-lg text-gray-400 mb-2">
                    {"Question 1) Submit the name of the units/teams (in short form) that are responsible for maintaining network and other IT equipment, incident detection and response, and security compliance and risk measurement (Format: Team1, Team2, Team3) "}
                </h1>
                <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-5/6 px-3 h-full">
                    <input className=" block w-full btn-flag-submit text-white   rounded py-3 px-4 mb-3 focus:outline-none focus:border-none focus:inset-0  focus:ring-0 focus:shadow-none shadow-none" id="grid-first-name" type="text" placeholder="Format: Team 1 , Team 2" style={{"boxShadow": "inset 0 0px 0 #ddd"}} />
                </div>
                <div className="w-full md:w-1/6 px-3 h-full">
                    <button className="btn-flag-submit block w-full  text-white font-bold  rounded py-3">
                        Submit
                    </button>
                </div>
                </div>
            </div>
        </>
    )
}


function QuestionList(){
    return (
        <>
            <div  className="block  p-6 bg-card-custom rounded-lg shadow ">
                <h5 className="mb-4 text-3xl font-bold tracking-tight text-gray-300 ">{"Challenge Submission"}</h5>
                {
                    [...Array(5)].map((e, i) => <Question key={i} />)
                }
            </div>
        </>
    )
}

function Details(){
    return (
        <div  className="block  p-6 bg-card-custom rounded-lg shadow ">
            <h5 className="mb-2 text-3xl font-bold tracking-tight text-gray-300">{"Sample Quiz - 1"}</h5>
            <p className="font-normal text-gray-400 mb-2 text-md">
                {"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. "}    
            </p>
            <QuizStatus />
            <QuizInfoList />
            <QuizFileInfo />
        </div>
    )
}


function ScenarioDescription(){
    return (
        <>
            <div  className="block  p-6 theme-bg-color-2 rounded-lg shadow mb-5">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">{"Scenario"}</h5>
            <p className="font-normal text-white mb-2 text-md">
                {"This challenge is an extension for an existing 'The Report' challenge where you are working in a newly established SOC where there is still a lot of work to do to make it a fully functional one. As part of the SOC improvement process, you were assigned a task to study a report released by MITRE and suggest some useful outcomes for your SOC. Note: Answer the questions with the answers as the way you see in the document to avoid formatting issues. Report Link: https://www.mitre.org/sites/default/files/publications/11-strategies-of-a-world-class-cybersecurity-operations-center.pdf"}    
            </p>
        </div>
        </>
    )
}



export default function QuizDetails(){
    return (
        <>
            <div className="p-4 grid  grid-cols-5 gap-4 items-start justify-center ">
                <div className="w-full col-span-2 relative   p-0  rounded-0 ">
                    <Details />
                </div>
                <div className="w-full col-span-3 relative   p-0  rounded-0">
                    <ScenarioDescription />
                    <QuestionList />
                </div>
                
            </div>
        </>
    )
}