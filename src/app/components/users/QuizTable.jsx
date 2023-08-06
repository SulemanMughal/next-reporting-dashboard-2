
export default function QuizTable(){
    return (
        <>
            <div className="w-full relative col-span-2    p-8 border rounded-lg bg-white h-100">
            <table className="whitespace-nowrap w-full h-100">
                <thead>
                    <tr className="focus:outline-none h-16 border border-gray-100 rounded">
                        <th>
                            Quizes
                        </th>
                        <th>
                            Total Questions
                        </th>
                        <th>
                            Solved
                        </th>
                        <th>
                            Obtained Points
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="focus:outline-none h-16 border border-gray-100 rounded">
                        <td className="text-center">
                            <p className="text-base font-medium leading-none text-gray-700 mr-2">{"Quiz 1"}</p>
                        </td>
                        <td className="text-center">
                            <p className="text-base font-medium leading-none text-gray-700 mr-2">{"20"}</p>
                        </td>
                        <td className="text-center">
                            <p className="text-base font-medium leading-none text-gray-700 mr-2">{"10"}</p>
                        </td>
                        <td className="text-center">
                            <p className="text-base font-medium leading-none text-gray-700 mr-2">{"1500"}</p>
                        </td>
                        
                    </tr>
                    <tr className="focus:outline-none h-16 border border-gray-100 rounded">
                        <td className="text-center">
                            <p className="text-base font-medium leading-none text-gray-700 mr-2">{"Quiz 2"}</p>
                        </td>
                        <td className="text-center">
                            <p className="text-base font-medium leading-none text-gray-700 mr-2">{"30"}</p>
                        </td>
                        <td className="text-center">
                            <p className="text-base font-medium leading-none text-gray-700 mr-2">{"20"}</p>
                        </td>
                        <td className="text-center">
                            <p className="text-base font-medium leading-none text-gray-700 mr-2">{"1100"}</p>
                        </td>
                        
                    </tr>
                </tbody>
            </table>
            </div>
        </>
    )
}