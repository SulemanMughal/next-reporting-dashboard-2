"use client"


import { useState } from "react"








function Tr({data , index}){

    // console.debug(data)

    return (
        <>
            <tr className="focus:outline-none h-16 border border-gray-100 rounded">
                <td className="text-center">
                    <p className="text-base font-medium leading-none text-gray-700 mr-2">{index}</p>
                </td>
                <td className="text-center">
                    <p className="text-base font-medium leading-none text-gray-700 mr-2">{data.title}</p>
                </td>
                <td className="text-center">
                    <p className="text-base font-medium leading-none text-gray-700 mr-2">{data.teams.length ? data.teams[0].name : "none"}</p>
                </td>
                <td className="text-center">
                    <p className="text-base font-medium leading-none text-gray-700 mr-2">{data._count.questions}</p>
                </td>
                <td className="text-center">
                    <p className="text-base font-medium leading-none text-gray-700 mr-2">{"10"}</p>
                </td>
                <td className="text-center">
                    <p className="text-base font-medium leading-none text-gray-700 mr-2">{"10"}</p>
                </td>
                <td className="text-center">
                    <p className="text-base font-medium leading-none text-gray-700 mr-2">{"350"}</p>
                </td>
                
            </tr>
        </>
    )
}



function TableData({quizes}){
    return (
        <div className="w-full relative col-span-2    p-8 border rounded-lg bg-white h-100">
            <table className="whitespace-nowrap w-full h-100">
                <thead>
                    <tr className="focus:outline-none h-16 border border-gray-100 rounded">
                        <th>
                            Sr. No.
                        </th>
                        <th>
                            Quiz 
                        </th>
                        <th>
                            Team
                        </th>
                        <th>
                            Total Questions
                        </th>
                        <th>
                            Solved Questions
                        </th>
                        <th>
                            Correct/Wrong
                        </th>
                        <th>
                            Obtained Points
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {quizes.map((quiz ,  index) =>  <Tr key={index} data={quiz} index={index} /> ) }
                </tbody>
            </table>
        </div>
    )
}


export default function QuizTable({data}){
    const [quizList, setQuizList] = useState(data.results)
    return (
        <div className="w-full col-span-3 relative   p-8 ">
            {quizList && <TableData  quizes={quizList} />}
        </div>
    )
}