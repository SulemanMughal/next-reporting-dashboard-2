import Dashboard from "@/app/components/admin/dashboard/Dashboard"
import { getTotalTeam , getTotalScripts , getTotalLogs , getTotalQuizes } from "@/app/lib/admin/dashboard"

export default async  function Home() {

  const total_teams = await getTotalTeam()
  const total_scripts = await getTotalScripts()
  const total_logs = await getTotalLogs()
  const total_quizes = await getTotalQuizes()

  return (
    <>
      <Dashboard  total_teams={total_teams} total_scripts={total_scripts} total_logs={total_logs}  total_quizes={total_quizes} />
    </>
  )
}
