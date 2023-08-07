import TotalSubmission from "@/app/components/users/TotalSubmission"
import TotalObtainedPoints from "@/app/components/users/TotalObtainedPoints"
import RightAnswers from "@/app/components/users/RightAnswers"
import TotalChallenges from "@/app/components/users/dashboard/TotalChallenges"
import QuizList from "@/app/components/users/dashboard/QuizList"

export default function UserDashboard(){

    return (
        <>
            <div className="p-4 grid  grid-cols-4 gap-4 place-items-center justify-center ">
                <TotalChallenges />
                <TotalSubmission />
                <TotalObtainedPoints />
                <RightAnswers />
            </div>
            <QuizList />
                
        </>
    )
}