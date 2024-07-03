{ parseInt(top_user.mostPoints.points) !== 0 ? (
    <>
        <div className="mt-1">
            <a href="#!">
                <div className="intro-x">
                    <div className=" mb-3 flex items-center zoom-in">
                        <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                            <Image  width={"50"} height={"50"} alt="LonerVamp" src="/assets/img/48Gxpjc6W9oVa1mwbSu5TX1VmaFJxxeNp2MiI7dC.png" />
                        </div>
                        <div className="ml-4  ">
                            <div className="font-medium text-gray-300 uppercase">{top_user.mostPoints.user}</div>
                        </div>
                        <div className="text-green-500 text-lg font-bold  ml-4">{top_user.mostPoints.points + " Pts"}</div>
                    </div>
                </div>
            </a>
        </div>
    </>
) : (
    <div className="mt-1">
        <a href="#!">
            <div className="intro-x">
                <div className=" mb-3 flex items-center zoom-in">
                    <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                        <Image  width={"50"} height={"50"} alt="LonerVamp" src="/assets/img/48Gxpjc6W9oVa1mwbSu5TX1VmaFJxxeNp2MiI7dC.png" />
                    </div>
                    <div className="ml-4  ">
                        <div className="font-medium text-gray-300 uppercase">{"No User"}</div>
                    </div>
                    {/* <div className="text-green-500 text-lg font-bold  ml-4">{top_user.mostPoints.points + " Pts"}</div> */}
                </div>
            </div>
        </a>
    </div>
)}