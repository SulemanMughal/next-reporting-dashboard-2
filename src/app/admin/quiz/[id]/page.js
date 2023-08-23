

import QuizPage from "@/app/components/admin/quiz/QuizPage"

export default   function Page({params}){
    const quizId = params.id
    
    return (
        <>
            <div className="mx-10 mb-10 p-3 bg-midnight-blue rounded-3xl ">
                <QuizPage quizId={quizId} />
            </div>
        </>
    )
}