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
      <div className="mx-10 mb-10 p-3 bg-midnight-blue rounded-3xl">
        <ScriptList  data={data} />
      </div>
    </>
  )

}