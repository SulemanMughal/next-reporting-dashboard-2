import Dashboard from "@/app/components/admin/dashboard/Dashboard"
import { getTotalTeam , getTotalScripts , getTotalLogs , getTotalQuizes, getLogsPerHour , getTeamsPerAttack , getLogsPerProtocol, getIPsPerProtocol , getTopTeams, getLatestScripts , getAttackHistoryLogs } from "@/app/lib/admin/dashboard"

export const revalidate = 0;

export const dynamic = 'force-dynamic';

export default async  function Page() {

  const total_teams = await getTotalTeam()
  const total_scripts = await getTotalScripts()
  const total_logs = await getTotalLogs()
  const total_quizes = await getTotalQuizes()
  const logs_by_hour = await getLogsPerHour()
  const teams_per_attack_logs = await getTeamsPerAttack()
  const logs_per_protocol_logs = await getLogsPerProtocol()
  const ips_per_protocol_logs = await getIPsPerProtocol()
  const top_teams = await getTopTeams()
  const latest_scripts = await getLatestScripts()
  // const attack_history_logs = await getAttackHistoryLogs()


  const data={
    total_teams,
    total_scripts,
    total_logs,
    total_quizes,
    logs_by_hour,
    teams_per_attack_logs,
    logs_per_protocol_logs,
    ips_per_protocol_logs,
    top_teams,
    latest_scripts,
    // attack_history_logs
  }
  return (
    <>
     {data && <Dashboard  data={data} /> }  
    </>
  )
}
