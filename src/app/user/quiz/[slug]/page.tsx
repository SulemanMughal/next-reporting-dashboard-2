
import CustomToaster from "@/app/components/CustomToaster"
import QuizDetails from "@/app/components/users/quiz/QuizDetails"

export default async function Page({ params }: { params: { slug: string } }){

    
    return (
        <>
            <CustomToaster />
            <div className="mx-10 p-3 bg-midnight-blue rounded-3xl mb-10">
                <QuizDetails params={params}  />
            </div>
        </>
    )
}