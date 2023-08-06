export default function TeamListCard({team}){
    return (
        <div className="w-full col-span-1 relative  m-auto p-0 border-none rounded-lg">
            <div className="max-w-sm  mx-2 my-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-5">
                        <a href="#">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight whitespace-normal text-gray-900 dark:text-white">{team.name}</h5>
                        </a>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil."}</p>
                        {team.quizId ?  (
                            <>
                            
                            <div className=" pt-4 pb-2">
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{team.quizId}</span>
                            </div>
                        </>
                        ) : null}
                        
                    </div>
                </div>
        </div>
    )
}