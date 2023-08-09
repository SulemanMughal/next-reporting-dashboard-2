import SortDropDown from "@/app/components/admin/quiz/SortDropDown"
import QuizList from "@/app/components/admin/quiz/QuizList"
import FilterBtn from "@/app/components/admin/quiz/FilterBtn"
import AddQuizBtn from "@/app/components/admin/quiz/AddQuizBtn"



export default function Page(){
    return (
        <>
             <div className="px-5 py-4 md:py-7  ">
                    <div className="flex items-center justify-between ">
                    <h1 className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-5xl font-bold leading-normal text-white"> Quizes</h1>
                        <div className="py-3 px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-none  cursor-pointer rounded">
                            <AddQuizBtn />
                            <SortDropDown />
                            <FilterBtn />
                        </div>
                    </div>
                </div>
                <div className="p-4 grid gap-4 auto-rows-fr grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 ">
                    <QuizList />
                </div>
        </>
    )
}
