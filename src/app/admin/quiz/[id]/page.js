
import SortDropDown from "@/app/components/admin/quiz/SortDropDown"
import QuizQuestion from "@/app/components/admin/quiz/QuizQuestion"



async function getData(quizId){
    try{
        let res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/quiz/${quizId}`, { 
        method: "GET"
    }, {cache : 'no-store'});
    if(!res.ok){
        return ;
    }
    return res.json()
    }  catch (error){
        return ;    
    }
}




export default async  function Page({params}){
    const quizId = params.id
    const data = await getData(quizId)
    return (
        <>
            <main className="bg-gray-100 min-h-screen ">
                <div className="px-5 py-4 md:py-7">
                <div className="flex items-center justify-between">
                    <div className="inline-flex">
                        <h1 className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-5xl font-bold leading-normal text-gray-800 ">
                            {data?.results.title}  
                        </h1>
                        <span className="inline-block  rounded-full px-3 py-1 text-md font-semibold bg-green-800 text-green-200 ml-3 mt-0 mb-4 ">{data?.results.teams.length?   data?.results.teams[0].name : ""}</span>
                    </div>
                        <div className="py-3 px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-none  cursor-pointer rounded">
                            <SortDropDown  list={["Ascending", "Descending"]}/>
                        </div>
                    </div>
                </div>
                <div className="p-4 grid  grid-cols-4 gap-4 place-items-center">
                    {data?.results.questions.length && data?.results.questions.map((question, index) =>  <QuizQuestion key={index} question={question} />  )}
                </div>
            </main>
        </>
    )
}