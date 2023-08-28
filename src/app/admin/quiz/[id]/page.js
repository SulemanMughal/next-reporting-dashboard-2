

import QuizPage from "@/app/components/admin/quiz/QuizPage"

export default   function Page({params}){
    const quizId = params.id
    
    return (
        <>
            <QuizPage quizId={quizId} />
        </>
    )
}