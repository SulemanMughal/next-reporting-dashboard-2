import ScriptList from "@/app/components/admin/scripts/ScriptList"
import CustomToaster from "@/app/components/CustomToaster"
import {getAllScripts} from "@/app/lib/admin/scripts"
export default async  function Scripts() {
  const scripts = await getAllScripts()
  const data={
    scripts
  }

  return (
    <>
      <CustomToaster />
      <ScriptList  data={data} />
    </>
  )

}