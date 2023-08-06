import TopCards from "@/app/components/TopCards"
import CategoryBreakdown from "@/app/components/CategoryBreakdown"
// import Timeline from "@/app/components/Timeline"
import TeamTable from "@/app/components/TeamTable"
import AttackTable from "@/app/components/AttackTable"
import AttakScriptTable from "@/app/components/AttakScriptTable"
import LogChart from "@/app/components/LogChart"
import LogLineChart from "@/app/components/LogLineChart"
import JobStatusChart from "@/app/components/JobStatusChart"
import JobTable from "@/app/components/JobTable"
import UserLogsTable from "@/app/components/users/UserLogsTable"


export default function Home() {
  return (
    <main className='bg-gray-100 min-h-screen'>
      <TopCards />
      <div className="p-4 grid  grid-cols-1 gap-4 place-items-center">
        <LogLineChart />
      </div>
      <div className="p-4 grid md:grid-cols-10 grid-cols-1 gap-4 place-items-start h-100">
        <AttackTable />
        <TeamTable />
        <LogChart />
      </div>
      <div className="p-4 grid md:grid-cols-8 grid-cols-1 gap-4">
        <AttakScriptTable />
        <CategoryBreakdown />
      </div>
      <div className="p-4 grid md:grid-cols-7 grid-cols-1 gap-4">
        <JobTable />
        <JobStatusChart />
      </div>
      <div className="p-4 grid grid-cols-3 gap-4 place-items-start h-100">
        <UserLogsTable />
      </div>
      
    </main>
  )
}
