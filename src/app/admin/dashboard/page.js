import AttakScriptTable from "@/app/components/AttakScriptTable"
import TeamsPerAttack from "@/app/components/admin/dashboard/TeamsPerAttack"
import LogLineChart from "@/app/components/LogLineChart"
import UserLogsTable from "@/app/components/users/UserLogsTable"
import LogsPerProtocol from "@/app/components/admin/dashboard/LogsPerProtocol"
import IP_PerProtocol from "@/app/components/admin/dashboard/IP_PerProtocol"
import TopTeamChart from "@/app/components/admin/dashboard/TopTeamChart"
import TeamCounter from "@/app/components/admin/dashboard/TeamCounter"
import ScriptCounter from "@/app/components/admin/dashboard/ScriptCounter"
import LogsCounter from "@/app/components/admin/dashboard/LogsCounter"
import QuizCounter from "@/app/components/admin/dashboard/QuizCounter"

export default async  function Home() {
  return (
    <main className='bg-gray-100 min-h-screen'>
       <div className="p-4 grid  grid-cols-4 gap-4 place-items-center justify-center mx-auto">
          <TeamCounter  />
          <ScriptCounter />
          <LogsCounter />
          <QuizCounter /> 
       </div>
      <div className="p-4 grid  grid-cols-1 gap-4 place-items-center">
        <LogLineChart />
      </div>
      <div className="p-4 grid md:grid-cols-9 grid-cols-1 gap-4 place-items-start h-100">
        <TeamsPerAttack />
        <LogsPerProtocol />
        <IP_PerProtocol />
      </div>
      <div className="p-4 grid grid-cols-3 gap-4 place-items-start h-100">
        <TopTeamChart />
        <AttakScriptTable />
      </div>
      <div className="p-4 grid grid-cols-3 gap-4 place-items-start h-100">
        <UserLogsTable />
      </div>
      
      
      {/* 
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
       */}
      
    </main>
  )
}
