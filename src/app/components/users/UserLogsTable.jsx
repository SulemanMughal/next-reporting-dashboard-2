"use client"


import axios from 'axios';
import {  useState, useEffect } from "react"
import "gridjs/dist/theme/mermaid.css";
import { Grid } from 'gridjs-react';

import encrypt from "@/app/lib/encrypt"
import decrypt from "@/app/lib/decrypt"
// import { Triangle } from 'react-loader-spinner'
import CustomTriangleLoader from "@/app/components/CustomTriangleLoader"
import { toast } from 'react-hot-toast';

const style = {
    table: {
      'border': '1px solid #64748b',
    },
    th: {
      'background-color': 'rgba(0, 0, 0, 0.1)',
      'color': '#94a3b8',
      'border-bottom': '1px solid #64748b',
      'text-align': 'center',
      'border-top' : "0px"
    },
    td: {
      'text-align': 'start',
      'color': '#64748b',
    'background-color': 'rgba(16,19,69, 97%)',
    "border" : "0"  ,
    "border-bottom" : "1px solid #64748b",
    "padding"  : "1rem"
    },
    footer : {
      'background-color': 'rgba(16,19,69, 97%)',
      "border" : "1px solid #64748b"  ,
      "border-top" : "0",
      "color" : "white"
    }
  }






// delay function
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


export default function UserLogsTable(){
    const [logs, setLogs] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalLogs, setTotalLogs] = useState(0);
    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(0);
    useEffect(() => {
        let encryptedData = encrypt({
          headers: { 'Cache-Control': 'no-store' },
          params: { timestamp: new Date().getTime() },
          page : currentPage
        })
        axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/db_logs`,{
          encryptedData
        })
        .then(res => {
          const {...data } = decrypt(res.data.encryptedData)
            if(data?.status === true){
              
              setLogs(data.logs);
                setTotalLogs(data.total_results);
                setTotalPages(data.total_pages);
                setCurrentPage(data.currentPage);
                setNextPage(data.nextPage);
                setPrevPage(data.prevPage);
                setStartIndex(data.startIndex);
                setEndIndex(data.endIndex);
                setError(null);  
            }  else { 
               toast.error(`There is an while fetching the logs. Please try again later.`)
            }
        })
        .catch(error => {
            console.error(error);
            setError(error);
            toast.error(`There is an while fetching the logs. Please try again later.`)
        }).finally(() => {
          setLoading(false);
        });
    }, [currentPage]);


    const handleCurrentPageChange = (page) => {
      setLoading(true)
      delay(500).then(() => {
        setCurrentPage(page)          
      })
    }

    const handlePreviousPage = (page) => {
      setLoading(true)
      delay(500).then(() => {
        setCurrentPage(page-1)          
      })
    }

    const handleNextPage = (page) => {
      setLoading(true)
      delay(500).then(() => {
        setCurrentPage(page+1)          
      })
    }

    
    return (
        <>
            <div className="w-full col-span-3 relative   p-8 border-none rounded-lg bg-card-custom h-100">
            <h1 className="text-2xl text-white">Logs Details</h1>
            <hr className="my-5 h-0.5 border-t-0 bg-white opacity-30" />
            {loading ? (
              <>
                <CustomTriangleLoader />
              </>
            ) : error ? (
              <>
                <div>
                  <p className="text-lg text-white">
                  Error: {error}
                </p></div>
              </>
            ) : (
              <>
                {logs && <Grid data={logs} columns={[ "Timestamp", "Src", "Dst", "Protocol", "Msg", "Response", "Team-ID" ]}   style={style}/>}
                {
                  logs && (
                    <div className="mt-4 border-0" 
                      style={{"backgroundColor": "rgba(16, 19, 69, 0.97)",   "color": "white"}}>
                        <div className="gridjs-pagination">
                          <div role="status" aria-live="polite" className="gridjs-summary" title={`Page ${currentPage} of ${totalPages}`}>Showing <b>{startIndex}</b> to <b>{endIndex}</b> of <b>{totalLogs}</b> results</div>
                          
                          <div className="gridjs-pages">
                            {
                              (totalPages > 4) ? (
                                <>
                                {
                                  (currentPage === 1  ) ? ( 
                                    <>
                                    
                                      <button  tabIndex="0" role="button" className="gridjs-currentPage" title={"Page " + currentPage} aria-label={"Page " + currentPage}>{currentPage}</button>
                                      <button onClick={() => handleCurrentPageChange(currentPage+1)} tabIndex="0" role="button" className="" title={"Page " + (currentPage+1)} aria-label={"Page " + currentPage+1}>{currentPage+1}</button>
                                      <button onClick={() => handleCurrentPageChange(currentPage+2)} tabIndex="0" role="button" className="" title={"Page " + (currentPage+2)} aria-label={"Page " + currentPage+2}>{currentPage+2}</button>
                                      <button   tabIndex="-1" className="gridjs-spread">...</button>
                                      <button tabIndex="0" role="button" title={`Page ${totalPages}`} aria-label={`Page ${totalPages}`} onClick={() => handleCurrentPageChange(totalPages)}  >{totalPages}</button>
                                      <button  onClick={() => handleNextPage(currentPage)} tabIndex="0" role="button" disabled="" title="Next" aria-label="Next" className=""  >Next</button>
                                    </>
                                  ) : (
                                    ( currentPage === 2) ? (
                                      <>
                                        <button tabIndex="0" role="button" disabled="" title="Previous" aria-label="Previous" className="" onClick={() => handlePreviousPage(currentPage)}  >Previous</button>
                                        <button onClick={() => handleCurrentPageChange(currentPage-1)} tabIndex="0" role="button" className="" title={"Page " + (currentPage - 1)} aria-label={"Page " + currentPage-1}>{currentPage-1}</button>
                                        <button  tabIndex="0" role="button" className="gridjs-currentPage" title={"Page " + currentPage} aria-label={"Page " + currentPage}>{currentPage}</button>
                                        <button onClick={() => handleCurrentPageChange(currentPage+1)} tabIndex="0" role="button" className="" title={"Page " + (currentPage+1)} aria-label={"Page " + currentPage+1}>{currentPage+1}</button>
                                        <button   tabIndex="-1" className="gridjs-spread">...</button>
                                        <button tabIndex="0"  onClick={() => handleCurrentPageChange(totalPages)} role="button" title={`Page ${totalPages}`} aria-label={`Page ${totalPages}`}  >{totalPages}</button>
                                        <button  onClick={() => handleNextPage(currentPage)} tabIndex="0" role="button" disabled="" title="Next" aria-label="Next" className=""  >Next</button>
                                      </>
                                    ) : (
                                      (( currentPage === 3) ? (
                                        <>
                                          <button tabIndex="0" role="button" disabled="" title="Previous" aria-label="Previous" className="" onClick={() => handlePreviousPage(currentPage)}  >Previous</button>
                                          <button onClick={() => handleCurrentPageChange(1)} tabIndex="0" role="button" className="" title={"Page " + 1} aria-label={"Page " + 1}>{1}</button>
                                          <button   tabIndex="-1" className="gridjs-spread">...</button>
                                          <button onClick={() => handleCurrentPageChange(currentPage-1)} tabIndex="0" role="button" className="" title={("Page " + (currentPage-1)) || "Page - "} aria-label={"Page " + currentPage-1}>{currentPage-1}</button>
                                          <button  tabIndex="0" role="button" className="gridjs-currentPage" title={"Page " + currentPage} aria-label={"Page " + currentPage}>{currentPage}</button>
                                          <button onClick={() => handleCurrentPageChange(currentPage+1)} tabIndex="0" role="button" className="" title={"Page " + (currentPage + 1)} aria-label={"Page " + currentPage+1}>{currentPage+1}</button>
                                          <button   tabIndex="-1" className="gridjs-spread">...</button>
                                          <button tabIndex="0" role="button" title={`Page ${totalPages}`} aria-label={`Page ${totalPages}`} onClick={() => handleCurrentPageChange(totalPages)}  >{totalPages}</button>
                                          <button  onClick={() => handleNextPage(currentPage)} tabIndex="0" role="button" disabled="" title="Next" aria-label="Next" className=""  >Next</button>
                                        </>
                                      ) : ((currentPage === totalPages) ? ( 
                                        <>
                                          <button tabIndex="0" role="button" disabled="" title="Previous" aria-label="Previous" className="" onClick={() => handlePreviousPage(currentPage)}  >Previous</button>
                                          <button onClick={() => handleCurrentPageChange(1)} tabIndex="0" role="button" className="" title={"Page " + 1} aria-label={"Page " + 1}>{1}</button>
                                          <button   tabIndex="-1" className="gridjs-spread">...</button>
                                          <button onClick={() => handleCurrentPageChange(currentPage-2)} tabIndex="0" role="button" className="" title={"Page " + (currentPage-2)} aria-label={"Page " + currentPage-2}>{currentPage-2}</button>
                                          <button onClick={() => handleCurrentPageChange(currentPage-1)} tabIndex="0" role="button" className="" title={"Page " + (currentPage-1)} aria-label={"Page " + currentPage-1}>{currentPage-1}</button>
                                          <button  tabIndex="0" role="button" className="gridjs-currentPage" title={"Page " + currentPage} aria-label={"Page " + currentPage}>{currentPage}</button>
                                        </>
                                      ) : (( currentPage === totalPages-1) ? ( 
                                        <>
                                          <button tabIndex="0" role="button" disabled="" title="Previous" aria-label="Previous" className="" onClick={() => handlePreviousPage(currentPage)}  >Previous</button>
                                          <button onClick={() => handleCurrentPageChange(1)} tabIndex="0" role="button" className="" title={"Page " + 1} aria-label={"Page " + 1}>{1}</button>
                                          <button  tabIndex="-1" className="gridjs-spread">...</button>
                                          <button onClick={() => handleCurrentPageChange(currentPage-1)} tabIndex="0" role="button" className="" title={"Page " + (currentPage-1)} aria-label={"Page " + currentPage-1}>{currentPage-1}</button>
                                          <button  tabIndex="0" role="button" className="gridjs-currentPage" title={"Page " + currentPage} aria-label={"Page " + currentPage}>{currentPage}</button>
                                          <button tabIndex="0" role="button" title={`Page ${totalPages}`} aria-label={`Page ${totalPages}`}  onClick={() => handleCurrentPageChange(currentPage+1)}  >{totalPages}</button>
                                          <button  onClick={() => handleNextPage(currentPage)} tabIndex="0" role="button" disabled="" title="Next" aria-label="Next" className=""  >Next</button>
                                        </>
                                      ) : (( currentPage === totalPages-2) ? (
                                        <>
                                          <button tabIndex="0" role="button" disabled="" title="Previous" aria-label="Previous" className="" onClick={() => handlePreviousPage(currentPage)}  >Previous</button>
                                          <button onClick={() => handleCurrentPageChange(1)} tabIndex="0" role="button" className="" title={"Page " + 1} aria-label={"Page " + 1}>{1}</button>
                                          <button  tabIndex="-1" className="gridjs-spread">...</button>
                                          <button  tabIndex="0" role="button" className="gridjs-currentPage" title={"Page " + currentPage} aria-label={"Page " + currentPage}>{currentPage}</button>
                                          <button onClick={() => handleCurrentPageChange(currentPage+1)} tabIndex="0" role="button" className="" title={"Page " + (currentPage+1)} aria-label={"Page " + currentPage+1}>{currentPage+1}</button>
                                          <button tabIndex="0" role="button" title={`Page ${totalPages}`} aria-label={`Page ${totalPages}`}  onClick={() => handleCurrentPageChange(currentPage+2)}  >{totalPages}</button>
                                          <button  onClick={() => handleNextPage(currentPage)} tabIndex="0" role="button" disabled="" title="Next" aria-label="Next" className=""  >Next</button>
                                        </>
                                      ) : (
                                        (
                                          <>
                                            <button tabIndex="0" role="button" disabled="" title="Previous" aria-label="Previous" className="" onClick={() => handlePreviousPage(currentPage)}  >Previous</button>
                                            <button onClick={() => handleCurrentPageChange(1)} tabIndex="0" role="button" className="" title={"Page " + 1} aria-label={"Page " + 1}>{1}</button>
                                            <button  onClick={() => handleCurrentPageChange(totalPages)} tabIndex="-1" className="gridjs-spread">...</button>
                                            <button onClick={() => handleCurrentPageChange(currentPage-1)} tabIndex="0" role="button" className="" title={"Page " + (currentPage-1)} aria-label={"Page " + currentPage-1}>{currentPage-1}</button>
                                            <button  tabIndex="0" role="button" className="gridjs-currentPage" title={"Page " + currentPage} aria-label={"Page " + currentPage}>{currentPage}</button>
                                            <button onClick={() => handleCurrentPageChange(currentPage+1)} tabIndex="0" role="button" className="" title={"Page " + (currentPage+1)} aria-label={"Page " + currentPage+1}>{currentPage+1}</button>
                                            <button  onClick={() => handleCurrentPageChange(totalPages)} tabIndex="-1" className="gridjs-spread">...</button>
                                            <button tabIndex="0" role="button" title={`Page ${totalPages}`} aria-label={`Page ${totalPages}`}  onClick={() => handleCurrentPageChange(totalPages)}  >{totalPages}</button>
                                            <button  onClick={() => handleNextPage(currentPage)} tabIndex="0" role="button" disabled="" title="Next" aria-label="Next" className=""  >Next</button>
                                          </>
                                        )
                                      ))
                                      )
                                      )
                                      )
                                    ))
                                }   
                                </>
                              ) : (null)
                            }
                            
                            
                            </div></div></div>
                            
                  )
                }
              </>
            )}
                
            </div>
        </>
    )
}