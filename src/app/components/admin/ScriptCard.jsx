export default function ScriptCard({script}){
    return (
        <>
            <div className="component component-CerCheckBox ">
                <div className="max-w-sm  mx-2 my-2 bg-white border border-gray-200 rounded-lg shadow   h-80  h-full flex flex-col   transition ease-in-out delay-150   ">
                    <div className="px-5 pt-5  flex-1">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight whitespace-normal text-gray-900 ">{script.name}</h5>
                        <p className="mb-3 font-normal text-gray-700   ">{script.desc}</p>
                    </div>
                    <div className="  pb-2 px-5">
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{script.script_category }</span>
                    </div>
                </div>
            </div>
        </>
    )
}