export default function ScriptCard({script}){
    return (
        <>
            <div className="w-full col-span-1 relative  m-auto p-0 border-none rounded-lg h-full " data-aos="zoom-in" data-aos-duration="500" >
                <div className="  mx-2 my-2  bg-card-custom border-none rounded-lg shadow   h-80  h-full flex flex-col   transition ease-in-out delay-150   ">
                    <div className="px-5 pt-5  flex-1">
                        <div className="flex">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight whitespace-normal text-gray-400 ">{script.name}</h5>
                            
                        </div>
                        <span className="inline-block bg-none rounded-0 px-0 py-2 text-md font-semibold text-green-500 ">{script.script_category }</span>
                        <p className="mb-3 font-normal text-gray-500   ">{script.desc}</p>
                    </div>
                    {/* <div className="  pb-2 px-5">
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-green-500 mr-2 mb-2">{script.script_category }</span>
                    </div> */}
                </div>
            </div>
        </>
    )
}