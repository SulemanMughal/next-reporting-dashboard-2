import Dashboard from "@/app/components/admin/dashboard/Dashboard"
import { getTotalTeam , getTotalScripts , getTotalLogs , getTotalQuizes } from "@/app/lib/admin/dashboard"





export const revalidate = 0;

export default async  function Page() {

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

// export async function getServerSideProps() {
//   const total_teams = await getTotalTeam()
//   const total_scripts = await getTotalScripts()
//   const total_logs = await getTotalLogs()
//   const total_quizes = await getTotalQuizes()


//   // console.debug(total_teams, total_logs)

//   const data = {
//     total_teams : total_teams,
//     total_scripts : total_scripts,
//     total_logs : total_logs,
//     total_quizes : total_quizes
//   }

//   // console.debug(data)

//   console.debug("server side props")

//   return { props: { data } }
// }