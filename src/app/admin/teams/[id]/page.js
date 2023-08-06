


import SortDropDown from "@/app/components/admin/quiz/SortDropDown"


import QuizCard from "@/app/components/admin/quiz/QuizCard"


import AnswerQuestion from "@/app/components/admin/quiz/AnswerQuestion"



async function getData(teamId){
    let res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/team/${teamId}`, { 
        method: "GET"
    }, {cache : 'no-store'});
    if(!res.ok){
        console.debug("Failed To Fetched")
    }
    return res.json()  
}


export default  async function Page({params}){
    const teamId = params.id
    const data = await getData(teamId)

    // console.debug(data?.answers)

    return (
        <>
             <main className='bg-gray-100 min-h-screen'>
             <div className="px-5 py-4 md:py-7">
                <div className="flex items-center justify-between">
                    <div className="inline-flex">
                        <h1 className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-5xl font-bold leading-normal text-gray-800  ">
                            {data?.name}
                        </h1>
                        <span className="inline-block  rounded-full px-5 py-1 text-md font-semibold bg-green-800 text-green-200 ml-3 mt-0 mb-4 ">{data?.quiz?.title}</span>
                    </div>
                        <div className="py-3 px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-none  cursor-pointer rounded">
                            <SortDropDown  list={["Ascending", "Descending"]}/>
                        </div>
                    </div>
                </div>
                <div className="p-4 grid  grid-cols-4 gap-4 place-items-center">
                    {data &&data?.answers.map((answer, index) => (
                        <AnswerQuestion  key={index} question={answer.question} obtained_points={answer?.obtainedPoints} submitAnswer={answer?.submitAnswer}  />
                        // console.debug(answer.question)
                    ))}
                </div>
             </main>
        </>
    )
}