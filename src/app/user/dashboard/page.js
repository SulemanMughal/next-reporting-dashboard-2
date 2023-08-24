import CustomToaster from "@/app/components/CustomToaster"
import TopStatistics from "@/app/components/users/dashboard/TopStatistics"


// export const revalidate = 10;


export default function UserDashboard(){
    return (
        <>
            <CustomToaster />
            <div className="mx-10 p-3 bg-midnight-blue rounded-3xl ">
                <TopStatistics />
            </div>
        </>
    )
}