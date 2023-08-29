"use client"

// import QuizList from "@/app/components/admin/quiz/QuizList"
import axios from "axios"
import { useState , useEffect , useRef } from "react"
import CreateQuizModal from "@/app/components/admin/quiz/CreateQuizModal"
import CustomToaster from "@/app/components/CustomToaster"
import { MdQuiz } from "react-icons/md"
import { BsSearch } from "react-icons/bs"
import CustomTriangleLoader from "@/app/components/CustomTriangleLoader"
import QuizCard from "@/app/components/admin/quiz/QuizCard"
import AOS from 'aos';
import 'aos/dist/aos.css';
import decrypt from "@/app/lib/decrypt"
import { toast } from "react-hot-toast"

function FilterResetBtn(){
    return (
        <button type="button" className=" bg-deep-blue-violet text-white py-2  pr-4  pl-4 mt-2  h-full border border-1 border-deep-blue-violet rounded-md mb-0 mx-2  " >Reset Filters</button>
    )
}


const SearchInput = ({ searchTerm , handleSearch}) => {
    return (
      <div className="relative ">
        <input
          type="text"
          placeholder="Search by title"
          className="placeholder-columbia-blue outline-0  border border-2 border-transparent focus:border focus:border-2 focus:border-blue-900    text-white    w-full  pl-2 py-2 mt-2 mr-0 mb-0 ml-0 text-base block bg-deep-blue-violet  rounded-md flex justify-between items-center"
          
          onChange={(e) => searchTerm.current =  e.target.value}
        />
        <button
          type="button"
          className="w-4 h-4 absolute inset-y-0 mt-5 mb-auto mr-3 right-0 text-white"
          onClick={(e) => handleSearch(e)}
        >
            <BsSearch className="h-4 w-4 "   />
        </button>
      </div>
    );
};


function AddQuizBtn(){

    const [showModal, setShowModal] = useState(false)

    return (
        <>
            
            {showModal && <CreateQuizModal  setShowModal={setShowModal} /> }
            <button className="bg-deep-blue-violet text-white py-2  pr-4  pl-4 mt-2 h-full border border-1 border-deep-blue-violet rounded-md mb-0 ml-0 flex justify-start items-center"  onClick={() => setShowModal(true)} >
                <MdQuiz  size={23} className="mr-2" />   Add New Quiz
            </button>
        </>
    )
}


export default function Page(){
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null)
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState(null)

    let searchInput = useRef("")


    const DataFetch = () => {
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/quiz/`)
        .then(res => {
            const {...data } = decrypt(res.data.encryptedData)
            if(data?.status === true) {
                if(data?.results === null || data?.results === undefined ||  data?.results.length === 0){
                    setData(null)
                } else{
                    setData(data?.results)
                    setFilteredData(data?.results)
                
                }
                setError(null);
                
            } else {
                setData(null)
                setError(data?.error);
                toast.error(data?.error)
            }
        })
        .catch(error => {
            setError(error);
            setLoading(false);
            toast.error(`There is an error while fetching quizes. Please try again after some time.`)
        }).finally(() => {
            setLoading(false);
        })
    }
    useEffect(() => {
        AOS.init();
        DataFetch()
    }, [])


    const handleSearch = (e) => {
        e.preventDefault();
        if(data === null || data === undefined || data?.length === 0){
            return;
        }
        else{
            if(searchInput.current === null || searchInput.current === undefined || searchInput.current === ''){
                setFilteredData(data)
            } else {
                setFilteredData(data.filter(item =>
                    item.title.toLowerCase().includes(searchInput.current.toLowerCase())
                ))
            }
            
        }
    }


    const handleChangeSearchTerm = (e) => {
        e.preventDefault()
        setSearchTerm(e.target.value)
        searchInput.current = e.target.value
    }





    const handleResetFilter = (e) => {
        e.preventDefault()
        searchInput.current = ""
        setSearchTerm("")
        setFilteredData(data)
    }
    
    return (
        <>
            <CustomToaster />
            <div className="">
                <div className="flex items-center justify-between p-5 pb-0 mb-5  ">
                    <h1 className="text-white text-2xl font-bold"> Quizes</h1>
                    <div className=" flex justify-end items-center">
                        <AddQuizBtn />
                        {/* <FilterResetBtn /> */}
                        (
                            <button type="button" className=" bg-deep-blue-violet text-white py-2  pr-4  pl-4 mt-2  h-full border border-1 border-deep-blue-violet rounded-md mb-0 mx-2  "  
                                onClick={(e) => handleResetFilter(e)}
                            >Reset Filters</button>
                        )
                        {/* <SearchInput  searchTerm={searchTerm} handleSearch={handleSearch} /> */}
                        (
                            <div className="relative ">
                                <input
                                type="text"
                                placeholder="Search by title"
                                className="placeholder-columbia-blue outline-0  border border-2 border-transparent focus:border focus:border-2 focus:border-blue-900    text-white    w-full  pl-2 py-2 mt-2 mr-0 mb-0 ml-0 text-base block bg-deep-blue-violet  rounded-md flex justify-between items-center"
                                value={searchTerm}
                                onChange={(e) => handleChangeSearchTerm(e)}
                                />
                                <button
                                type="button"
                                className="w-4 h-4 absolute inset-y-0 mt-5 mb-auto mr-3 right-0 text-white"
                                onClick={(e) => handleSearch(e)}
                                >
                                    <BsSearch className="h-4 w-4 "   />
                                </button>
                            </div>
                        );
                    </div>
                </div>
                <div className="p-4 grid gap-4 auto-rows-fr grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 ">
                    {loading ? (
                        <>
                            <div  className="col-span-4 ">
                                <CustomTriangleLoader />
                            </div>
                        </>
                    ) : error ? (
                        <>
                            <div>Error: {error.message}</div>
                        </>
                    ) : (
                        <>
                            {filteredData && filteredData.map((quiz, index) => (
                                <QuizCard  key={index} quiz={quiz} setData={setData}  />
                            ))}
                        </>
                    )}
                </div>
            </div>
        </>
    )
}
