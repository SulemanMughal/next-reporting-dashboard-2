
import CustomToaster from "@/app/components/CustomToaster"
import QuizDetails from "@/app/components/users/quiz/QuizDetails"

export default async function Page({ params }: { params: { slug: string } }){

    
    return (
        <>
            <CustomToaster />
            <QuizDetails params={params}  />
        </>
    )
}