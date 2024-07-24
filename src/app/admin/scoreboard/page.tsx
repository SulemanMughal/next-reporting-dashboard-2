"use client"

import { BsSearch } from "react-icons/bs"
import CustomToaster from "@/app/components/CustomToaster"
import CustomTriangleLoader from "@/app/components/CustomTriangleLoader"
// import CountUp from 'react-countup';
import { useState , useEffect } from "react";
import axios from "axios";
import decrypt from "@/app/lib/decrypt"
import AOS from 'aos';
import 'aos/dist/aos.css';
import Link from "next/link";
import { GiFireShield } from "react-icons/gi";



function delay(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function millisecondsToTime(ms:any) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    if (days > 0) {
      return `${days} days ago`;
    } else if (hours > 0) {
      return `${hours} hours ago`;
    } else if (minutes > 0) {
      return `${minutes} minutes ago`;
    } else {
      return `${seconds} seconds ago`;
    }
}

function timeStampHumanReadableFormat(datetimeString:any){
    const datetime = new Date(datetimeString);
    const currentDate = new Date();
    const timeDifference = currentDate.valueOf() - datetime.valueOf();
    return  millisecondsToTime(timeDifference);
}



const PaginationBlock =  ({currentPage , totalPages , startIndex , endIndex , totalResults , handleCurrentPageChange , handlePreviousPage , handleNextPage , handleRecordsPerPage , total_number_records_per_page}) => {
    return (
        <>
            <div className="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center mt-5 mb-14 justify-end"  >
                <div  >
                    <nav role="navigation" aria-label="Pagination Navigation" className="flex items-center justify-between">
                        {(currentPage === totalPages) ? (
                            <>
                                <div role="status" aria-live="polite" className="text-sm text-gray-400 leading-5" title={`Page ${currentPage} of ${totalPages}`}>Showing <b>{startIndex}</b> to <b>{totalResults}</b> of <b>{totalResults}</b> results</div>
                            </>
                        ) : (
                            <>
                                <div role="status" aria-live="polite" className="text-sm text-gray-400 leading-5" title={`Page ${currentPage} of ${totalPages}`}>Showing <b>{startIndex}</b> to <b>{endIndex}</b> of <b>{totalResults}</b> results</div>
                            </>
                        )}
                    <div className="relative z-0 inline-flex rounded-md shadow-sm ml-4">
                        {
                        (totalPages > 4) ? (
                                <>
                                {
                                (currentPage === 1  ) ? ( 
                                    <>
                                    
                                    <button  tabIndex={0} role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-lg font-extrabold text-gray-900 bg-white border border-gray-300 cursor-default leading-5 select-none rounded-l-md " title={"Page " + currentPage} aria-label={"Page " + currentPage}>{currentPage}</button>
                                    <button onClick={() => handleCurrentPageChange(currentPage+1)} tabIndex={0} role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none " title={"Page " + (currentPage+1)} aria-label={"Page " + currentPage+1}>{currentPage+1}</button>
                                    <button onClick={() => handleCurrentPageChange(currentPage+2)} tabIndex={0} role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none " title={"Page " + (currentPage+2)} aria-label={"Page " + currentPage+2}>{currentPage+2}</button>
                                    <button   tabIndex={-1} className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none ">...</button>
                                    <button tabIndex={0} role="button" title={`Page ${totalPages}`} aria-label={`Page ${totalPages}`} onClick={() => handleCurrentPageChange(totalPages)} className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none " >{totalPages}</button>
                                    <button  onClick={() => handleNextPage(currentPage)} tabIndex={0} role="button" disabled={false} title="Next" aria-label="Next" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none rounded-r-md"  >Next</button>
                                    </>
                                ) : (
                                    ( currentPage === 2) ? (
                                    <>
                                        <button tabIndex={0} role="button" disabled={false} title="Previous" aria-label="Previous" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none rounded-l-md" onClick={() => handlePreviousPage(currentPage)}  >Previous</button>
                                        <button onClick={() => handleCurrentPageChange(currentPage-1)} tabIndex={0} role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none " title={"Page " + (currentPage - 1)} 
                                        aria-label={"Page " + (currentPage-1).toString()}>{currentPage-1}</button>
                                        <button  tabIndex={0} role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-lg font-extrabold text-gray-900 bg-white border border-gray-300 cursor-default leading-5 select-none " title={"Page " + currentPage} aria-label={"Page " + currentPage}>{currentPage}</button>
                                        <button onClick={() => handleCurrentPageChange(currentPage+1)} tabIndex={0} role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none " title={"Page " + (currentPage+1)} aria-label={"Page " + currentPage+1}>{currentPage+1}</button>
                                        <button   tabIndex={-1} className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none ">...</button>
                                        <button tabIndex={0}  onClick={() => handleCurrentPageChange(totalPages)} role="button" title={`Page ${totalPages}`} aria-label={`Page ${totalPages}`} className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none " >{totalPages}</button>
                                        <button  onClick={() => handleNextPage(currentPage)} tabIndex={0} role="button" disabled={false} title="Next" aria-label="Next" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none  rounded-r-md"  >Next</button>
                                    </>
                                    ) : (
                                    (( currentPage === 3) ? (
                                        <>
                                            <button tabIndex={0} role="button" disabled={false} title="Previous" aria-label="Previous" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none rounded-l-md" onClick={() => handlePreviousPage(currentPage)}  >Previous</button>
                                            <button onClick={() => handleCurrentPageChange(1)} tabIndex={0} role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none " title={"Page " + 1} aria-label={"Page " + 1}>{1}</button>
                                            <button   tabIndex={-1} className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none ">...</button>
                                            <button onClick={() => handleCurrentPageChange(currentPage-1)} tabIndex={0} role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none " title={("Page " + (currentPage-1)) || "Page - "} aria-label={"Page " + (currentPage-1)}>{currentPage-1}</button>
                                            <button  tabIndex={0} role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-lg font-extrabold text-gray-900 bg-white border border-gray-300 cursor-default leading-5 select-none " title={"Page " + currentPage} aria-label={"Page " + currentPage}>{currentPage}</button>
                                            <button onClick={() => handleCurrentPageChange(currentPage+1)} tabIndex={0} role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none " title={"Page " + (currentPage + 1)} aria-label={"Page " + currentPage+1}>{currentPage+1}</button>
                                            <button   tabIndex={-1} className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none ">...</button>
                                            <button tabIndex={0} role="button" title={`Page ${totalPages}`} aria-label={`Page ${totalPages}`} onClick={() => handleCurrentPageChange(totalPages)} className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none " >{totalPages}</button>
                                            <button  onClick={() => handleNextPage(currentPage)} tabIndex={0} role="button" disabled={false} title="Next" aria-label="Next" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none rounded-r-md"  >Next</button>
                                        </>
                                    ) : ((currentPage === totalPages) ? ( 
                                        <>
                                        <button tabIndex={0} role="button" disabled={false} title="Previous" aria-label="Previous" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none rounded-l-md" onClick={() => handlePreviousPage(currentPage)}  >Previous</button>
                                        <button onClick={() => handleCurrentPageChange(1)} tabIndex={0} role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none " title={"Page " + 1} aria-label={"Page " + 1}>{1}</button>
                                        <button   tabIndex={-1} className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none ">...</button>
                                        <button onClick={() => handleCurrentPageChange(currentPage-2)} tabIndex={0} role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none " title={"Page " + (currentPage-2)} aria-label={"Page " + (currentPage-2)}>{currentPage-2}</button>
                                        <button onClick={() => handleCurrentPageChange(currentPage-1)} tabIndex={0} role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none " title={"Page " + (currentPage-1)} aria-label={"Page " + (currentPage-1)}>{currentPage-1}</button>
                                        <button  tabIndex={0} role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-lg font-extrabold text-gray-900 bg-white border border-gray-300 cursor-default leading-5 select-none  rounded-r-md" title={"Page " + currentPage} aria-label={"Page " + currentPage}>{currentPage}</button>
                                        </>
                                    ) : (( currentPage === totalPages-1) ? ( 
                                        <>
                                        <button tabIndex={0} role="button" disabled={false} title="Previous" aria-label="Previous" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none rounded-l-md" onClick={() => handlePreviousPage(currentPage)}  >Previous</button>
                                        <button onClick={() => handleCurrentPageChange(1)} tabIndex={0} role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none " title={"Page " + 1} aria-label={"Page " + 1}>{1}</button>
                                        <button  tabIndex={-1} className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none ">...</button>
                                        <button onClick={() => handleCurrentPageChange(currentPage-1)} tabIndex={0} role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none " title={"Page " + (currentPage-1)} aria-label={"Page " + (currentPage-1)}>{currentPage-1}</button>
                                        <button  tabIndex={0} role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-lg font-extrabold text-gray-900 bg-white border border-gray-300 cursor-default leading-5 select-none " title={"Page " + currentPage} aria-label={"Page " + currentPage}>{currentPage}</button>
                                        <button tabIndex={0} role="button" title={`Page ${totalPages}`} aria-label={`Page ${totalPages}`}  onClick={() => handleCurrentPageChange(currentPage+1)} className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none "  >{totalPages}</button>
                                        <button  onClick={() => handleNextPage(currentPage)} tabIndex={0} role="button" disabled={false} title="Next" aria-label="Next" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none rounded-r-md"  >Next</button>
                                        </>
                                    ) : (( currentPage === totalPages-2) ? (
                                        <>
                                        <button tabIndex={0} role="button" disabled={false} title="Previous" aria-label="Previous" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none rounded-l-md" onClick={() => handlePreviousPage(currentPage)}  >Previous</button>
                                        <button onClick={() => handleCurrentPageChange(1)} tabIndex={0} role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none " title={"Page " + 1} aria-label={"Page " + 1}>{1}</button>
                                        <button  tabIndex={-1} className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none ">...</button>
                                        <button  tabIndex={0} role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-lg font-extrabold text-gray-900 bg-white border border-gray-300 cursor-default leading-5 select-none " title={"Page " + currentPage} aria-label={"Page " + currentPage}>{currentPage}</button>
                                        <button onClick={() => handleCurrentPageChange(currentPage+1)} tabIndex={0} role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none " title={"Page " + (currentPage+1)} aria-label={"Page " + currentPage+1}>{currentPage+1}</button>
                                        <button tabIndex={0} role="button" title={`Page ${totalPages}`} aria-label={`Page ${totalPages}`}  onClick={() => handleCurrentPageChange(currentPage+2)} className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none " >{totalPages}</button>
                                        <button  onClick={() => handleNextPage(currentPage)} tabIndex={0} role="button" disabled={false} title="Next" aria-label="Next" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none rounded-r-md"  >Next</button>
                                        </>
                                    ) : (
                                        (
                                        <>
                                            <button tabIndex={0} role="button" disabled={false} title="Previous" aria-label="Previous" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none rounded-l-md" onClick={() => handlePreviousPage(currentPage)}  >Previous</button>
                                            <button onClick={() => handleCurrentPageChange(1)} tabIndex={0} role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none " title={"Page " + 1} aria-label={"Page " + 1}>{1}</button>
                                            <button  onClick={() => handleCurrentPageChange(totalPages)} tabIndex={-1} className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none ">...</button>
                                            <button onClick={() => handleCurrentPageChange(currentPage-1)} tabIndex={0} role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none " title={"Page " + (currentPage-1)} aria-label={"Page " + (currentPage-1)}>{currentPage-1}</button>
                                            <button  tabIndex={0} role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-lg font-extrabold text-gray-900 bg-white border border-gray-300 cursor-default leading-5 select-none " title={"Page " + currentPage} aria-label={"Page " + currentPage}>{currentPage}</button>
                                            <button onClick={() => handleCurrentPageChange(currentPage+1)} tabIndex={0} role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none " title={"Page " + (currentPage+1)} aria-label={"Page " + currentPage+1}>{currentPage+1}</button>
                                            <button  onClick={() => handleCurrentPageChange(totalPages)} tabIndex={-1} className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none ">...</button>
                                            <button tabIndex={0} role="button" title={`Page ${totalPages}`} aria-label={`Page ${totalPages}`}  onClick={() => handleCurrentPageChange(totalPages)} className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none "  >{totalPages}</button>
                                            <button  onClick={() => handleNextPage(currentPage)} tabIndex={0} role="button" disabled={false} title="Next" aria-label="Next" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none rounded-r-md"  >Next</button>
                                        </>
                                        )
                                    ))
                                    )
                                    )
                                    )
                                    ))
                                }   
                                </>
                        ) : (
                            <>
                                {
                                (currentPage === 1  ) ? ( 
                                    <>
                                        
                                        {
                                            (totalPages === 4) ? (
                                                <>
                                                    <button  tabIndex={0} role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-lg font-extrabold text-gray-900 bg-white border border-gray-300 cursor-default leading-5 select-none rounded-l-md " title={"Page " + currentPage} aria-label={"Page " + currentPage} >{currentPage}</button>
                                                    <button onClick={() => handleCurrentPageChange(currentPage+1)} tabIndex={0} role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none" title={"Page " + (currentPage+1)} aria-label={"Page " + currentPage+1}>{currentPage+1}</button>
                                                    <button onClick={() => handleCurrentPageChange(currentPage+2)} tabIndex={0} role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none" title={"Page " + (currentPage+2)} aria-label={"Page " + currentPage+2}>{currentPage+2}</button>
                                                    <button onClick={() => handleCurrentPageChange(currentPage+3)} tabIndex={0} role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none" title={"Page " + (currentPage+3)} aria-label={"Page " + currentPage+3}>{currentPage+3}</button>
                                                    <button  onClick={() => handleNextPage(currentPage)} tabIndex={0} role="button" disabled={false} title="Next" aria-label="Next" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none rounded-r-md"  >Next</button>
                                                </>
                                            ) : (
                                                (totalPages === 3) ? (
                                                    <>
                                                    <button  tabIndex={0} role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-lg font-extrabold text-gray-900 bg-white border border-gray-300 cursor-default leading-5 select-none rounded-l-md " title={"Page " + currentPage} aria-label={"Page " + currentPage} >{currentPage}</button>
                                                        <button onClick={() => handleCurrentPageChange(currentPage+1)} tabIndex={0} role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none" title={"Page " + (currentPage+1)} aria-label={"Page " + currentPage+1}>{currentPage+1}</button>
                                                        <button onClick={() => handleCurrentPageChange(currentPage+2)} tabIndex={0} role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none" title={"Page " + (currentPage+2)} aria-label={"Page " + currentPage+2}>{currentPage+2}</button>
                                                        <button  onClick={() => handleNextPage(currentPage)} tabIndex={0} role="button" disabled={false} title="Next" aria-label="Next" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none rounded-r-md"  >Next</button>
                                                    </>
                                                ) : (
                                                    (totalPages === 2) ? (
                                                        <>
                                                        <button  tabIndex={0} role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-lg font-extrabold text-gray-900 bg-white border border-gray-300 cursor-default leading-5 select-none rounded-l-md " title={"Page " + currentPage} aria-label={"Page " + currentPage} >{currentPage}</button>
                                                            <button onClick={() => handleCurrentPageChange(currentPage+1)} tabIndex={0} role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none" title={"Page " + (currentPage+1)} aria-label={"Page " + currentPage+1}>{currentPage+1}</button>
                                                            <button  onClick={() => handleNextPage(currentPage)} tabIndex={0} role="button" disabled={false} title="Next" aria-label="Next" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none rounded-r-md"  >Next</button>
                                                        </>
                                                    ) : (
                                                        <button  tabIndex={0} role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-lg font-extrabold text-gray-900 bg-white border border-gray-300 cursor-default leading-5 select-none rounded-l-md  rounded-r-md  " title={"Page " + currentPage} aria-label={"Page " + currentPage} >{currentPage}</button>
                                                    )
                                                )
                                            )
                                        }
                                        
                                    </>
                                ) : (
                                    ( currentPage === 2) ? (
                                        <>
                                            {
                                                (totalPages === 4) ? (
                                                    <>
                                                        <button tabIndex={0} role="button" disabled={false} title="Previous" aria-label="Previous" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none rounded-l-md" onClick={() => handlePreviousPage(currentPage)}  >Previous</button>
                                                        <button onClick={() => handleCurrentPageChange(currentPage-1)} tabIndex={0} role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none" title={"Page " + (currentPage - 1)} aria-label={"Page " + (currentPage-1)}>{currentPage-1}</button>
                                                        <button  tabIndex={0} role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-lg font-extrabold text-gray-900 bg-white border border-gray-300 cursor-default leading-5 select-none" title={"Page " + currentPage} aria-label={"Page " + currentPage}>{currentPage}</button>
                                                        <button onClick={() => handleCurrentPageChange(currentPage+1)} tabIndex={0} role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none" title={"Page " + (currentPage+1)} aria-label={"Page " + currentPage+1}>{currentPage+1}</button>
                                                        <button onClick={() => handleCurrentPageChange(currentPage+2)} tabIndex={0} role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none" title={"Page " + (currentPage+2)} aria-label={"Page " + currentPage+2}>{currentPage+2}</button>
                                                        <button  onClick={() => handleNextPage(currentPage)} tabIndex={0} role="button" disabled={false} title="Next" aria-label="Next" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none rounded-r-md"  >Next</button>
                                                    </>
                                                ) : (
                                                    (totalPages === 3) ? (
                                                        <>
                                                            <button tabIndex={0} role="button" disabled={false} title="Previous" aria-label="Previous" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none rounded-l-md" onClick={() => handlePreviousPage(currentPage)}  >Previous</button>
                                                            <button onClick={() => handleCurrentPageChange(currentPage-1)} tabIndex={0} role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none" title={"Page " + (currentPage - 1)} aria-label={"Page " + (currentPage-1)}>{currentPage-1}</button>
                                                            <button  tabIndex={0} role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-lg font-extrabold text-gray-900 bg-white border border-gray-300 cursor-default leading-5 select-none" title={"Page " + currentPage} aria-label={"Page " + currentPage}>{currentPage}</button>
                                                            <button onClick={() => handleCurrentPageChange(currentPage+1)} tabIndex={0} role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none" title={"Page " + (currentPage+1)} aria-label={"Page " + currentPage+1}>{currentPage+1}</button>
                                                            <button  onClick={() => handleNextPage(currentPage)} tabIndex={0} role="button" disabled={false} title="Next" aria-label="Next" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none rounded-r-md"  >Next</button>
                                                        </>
                                                    ) : (
                                                            (totalPages === 2) ? (
                                                                <>
                                                                    <button tabIndex={0} role="button" disabled={false} title="Previous" aria-label="Previous" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none rounded-l-md" onClick={() => handlePreviousPage(currentPage)}  >Previous</button>
                                                                    <button onClick={() => handleCurrentPageChange(currentPage-1)} tabIndex={0} role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none" title={"Page " + (currentPage - 1)} aria-label={"Page " + (currentPage-1)}>{currentPage-1}</button>
                                                                    <button  tabIndex={0} role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-lg font-extrabold text-gray-900 bg-white border border-gray-300 cursor-default leading-5 select-none rounded-r-md" title={"Page " + currentPage} aria-label={"Page " + currentPage}>{currentPage}</button>
                                                                </>
                                                            ) : null
                                                    )
                                                )
                                            }
                                        </>
                                    ) : (
                                    (( currentPage === 3) ? (
                                        <>
                                            {
                                                (totalPages === 4) ? (
                                                    <>
                                                        <button tabIndex={0} role="button" disabled={false} title="Previous" aria-label="Previous" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none rounded-l-md" onClick={() => handlePreviousPage(currentPage)}  >Previous</button>
                                                        <button onClick={() => handleCurrentPageChange(1)} tabIndex={0} role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none" title={"Page " + 1} aria-label={"Page " + 1}>{1}</button>
                                                        <button onClick={() => handleCurrentPageChange(currentPage-1)} tabIndex={0} role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none" title={("Page " + (currentPage-1)) || "Page - "} aria-label={"Page " + (currentPage-1)}>{currentPage-1}</button>
                                                        <button  tabIndex={0} role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-lg font-extrabold text-gray-900 bg-white border border-gray-300 cursor-default leading-5 select-none" title={"Page " + currentPage} aria-label={"Page " + currentPage}>{currentPage}</button>
                                                        <button onClick={() => handleCurrentPageChange(currentPage+1)} tabIndex={0} role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none" title={"Page " + (currentPage + 1)} aria-label={"Page " + currentPage+1}>{currentPage+1}</button>
                                                        <button  onClick={() => handleNextPage(currentPage)} tabIndex={0} role="button" disabled={false} title="Next" aria-label="Next" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none rounded-r-md"  >Next</button>
                                                    </>
                                                ) : (totalPages === 3) ? (
                                                    <>
                                                        <button tabIndex={0} role="button" disabled={false} title="Previous" aria-label="Previous" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none rounded-l-md" onClick={() => handlePreviousPage(currentPage)}  >Previous</button>
                                                        <button onClick={() => handleCurrentPageChange(1)} tabIndex={0} role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none" title={"Page " + 1} aria-label={"Page " + 1}>{1}</button>
                                                        <button onClick={() => handleCurrentPageChange(currentPage-1)} tabIndex={0} role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none" title={("Page " + (currentPage-1)) || "Page - "} aria-label={"Page " + (currentPage-1)}>{currentPage-1}</button>
                                                        <button  tabIndex={0} role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-lg font-extrabold text-gray-900 bg-white border border-gray-300 cursor-default leading-5 select-none rounded-r-md" title={"Page " + currentPage} aria-label={"Page " + currentPage}>{currentPage}</button>
                                                    </>
                                                ) : null
                                            }
                                        </>
                                    ) : ((currentPage === totalPages) ? ( 
                                        <>
                                        <button tabIndex={0} role="button" disabled={false} title="Previous" aria-label="Previous" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none rounded-l-md" onClick={() => handlePreviousPage(currentPage)}  >Previous</button>
                                        <button onClick={() => handleCurrentPageChange(1)} tabIndex={0} role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none" title={"Page " + 1} aria-label={"Page " + 1}>{1}</button>
                                        <button onClick={() => handleCurrentPageChange(currentPage-2)} tabIndex={0} role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none" title={"Page " + (currentPage-2)} aria-label={"Page " + (currentPage-2)}>{currentPage-2}</button>
                                        <button onClick={() => handleCurrentPageChange(currentPage-1)} tabIndex={0} role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 select-none" title={"Page " + (currentPage-1)} aria-label={"Page " + (currentPage-1)}>{currentPage-1}</button>
                                        <button  tabIndex={0} role="button" className="relative inline-flex items-center px-4 py-2 -ml-px text-lg font-extrabold text-gray-900 bg-white border border-gray-300 cursor-default leading-5 select-none rounded-r-md" title={"Page " + currentPage} aria-label={"Page " + currentPage}>{currentPage}</button>
                                        </>
                                    ) : null
                                    )
                                    )
                                    ))
                                }   
                                </>
                        )
                        }
                        </div>
                    </nav>
                    
                </div>
                <div>
                    <select className="  p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ml-3" value={total_number_records_per_page} onChange={(e) => handleRecordsPerPage(e.target.value)}>
                        <option value="30" >30 Rows</option>
                        <option value="40" >40 Rows</option>
                        <option value="50" >50 Rows</option>
                        <option value="60">60 Rows</option>
                        <option value="70">70 Rows</option>
                        <option value="80">80 Rows</option>
                        <option value="90">90 Rows</option>
                        <option value="100">100 Rows</option>
                    </select>
                </div>
            </div>
        </>
    )
}

const SearchInput = () => {
    return (
      <div className="relative mx-3">
        <input
          type="text"
          placeholder="Search by user name"
          className="placeholder-columbia-blue outline-0  border border-2 border-transparent focus:border focus:border-2 focus:border-blue-900    text-white    w-full  pl-2 py-2 mt-2 mr-0 mb-0 ml-0 text-base block bg-deep-blue-violet  rounded-md flex justify-between items-center"
        />
        <button
          type="button"
          className="w-4 h-4 absolute inset-y-0 mt-5 mb-auto mr-3 right-0 text-white"
        >
            <BsSearch className="h-4 w-4 " />
        </button>
      </div>
    );
};

function FilterResetBtn(){
    return (
        <>
            <div>
                <button type="button" className=" bg-deep-blue-violet text-white py-2  pr-4  pl-4 mt-2  h-full border border-1 border-deep-blue-violet rounded-md mb-0 ml-0 " >Reset Filters</button>
            </div>
        </>

    )
}

function calculateTotalObtainedPoints(answers) {
    return answers?.reduce((total, answer) => total + answer.obtainedPoints, 0);
}

function LastSubmitAnswerCategory(answers:any) {
    let sortedAnswers :any = answers?.sort((a:any, b:any) =>  new Date(a.submittedAt).valueOf() - new Date(b.submittedAt).valueOf());
    return sortedAnswers ? sortedAnswers[0] : "";
}

// function TopHeader(){
//     return (
//         <>
//              <div className="mb-10 grid  auto-rows-fr gap-3 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 "   data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="500">
//                 <div className="intro-y col-span-1 flex flex-wrap sm:flex-nowrap items-center mt-2 pl-5 pr-5 pb-5 pt-5 bg-deep-blue-violet rounded box ">
//                 <div className="mr-auto col-span-3 text-lg text-gray-300 w-full">
//                     Total Submissions
//                     <div className="w-full h-9 mt-2 text-green-400 border-deep-indigo rounded">
//                         <b  style={{"color":"#55E6C1"}} className="text-4xl">
//                             <CountUp end={50}  duration={3} />  
//                         </b>
//                     </div>
//                 </div>
//                 </div>
//                 <div className="intro-y col-span-3 flex flex-wrap items-center mt-2 pl-5 pb-5 pt-5 bg-deep-blue-violet rounded box text-gray-300  justify-start" style={{"zIndex":"20"}}>
//                     {/* Normal */}
//                     <div className="intro-x items-center m-auto w-60 lg:w-1/6 text-gray-300 mb-5"  >
//                         <div className="box px-2 flex items-center zoom-in justify-start mx-4">
//                             <div className="w-18 h-18 flex-none image-fit overflow-hidden items-center">
//                                 <div className="relative inline-block text-left   rounded-0" data-headlessui-state="">
//                                 <div className="w-18 h-18 flex-none image-fit overflow-hidden items-center">
//                                 <div className="relative inline-block text-left   rounded-0" data-headlessui-state=""><div><button className="bg-green-700 text-white  text-4xl  font-bold py-4 px-5 rounded-full border border-4 border-double border-white" id="headlessui-menu-button-:r0:" type="button" aria-haspopup="menu" aria-expanded="false" data-headlessui-state="">{"N"}</button></div></div>
//                             </div>
//                                 </div>
//                             </div>
//                             <div className="ml-4 mr-auto">
//                                 <div className="font-bold mb-1 text-lg">{50}</div>
//                                 <div className="text-yellow-400 text-sm whitespace-nowrap">{"Normal Activities"} </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Medium */}
//                     <div className="intro-x items-center m-auto  w-60 lg:w-1/6 text-gray-300 mb-5"  >
//                         <div className="box px-2 flex items-center zoom-in justify-start mx-4">
//                             <div className="w-18 h-18 flex-none image-fit overflow-hidden items-center">
//                                 <div className="relative inline-block text-left   rounded-0" data-headlessui-state=""><div><button className="bg-orange-700 text-white  text-4xl  font-bold py-4 px-5 rounded-full border border-4 border-double border-white" id="headlessui-menu-button-:r0:" type="button" aria-haspopup="menu" aria-expanded="false" data-headlessui-state="">{"M"}</button></div></div>
//                             </div>
//                             <div className="ml-4 mr-auto">
//                                 <div className="font-bold mb-1 text-lg">{50}</div>
//                                 <div className="text-yellow-400 text-sm whitespace-nowrap">{"Medium Activities"} </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* High */}
//                     <div className="intro-x items-center m-auto  w-60 lg:w-1/6 text-gray-300 mb-5"  >
//                         <div className="box px-2 flex items-center zoom-in justify-start mx-4">
//                             <div className="w-18 h-18 flex-none image-fit overflow-hidden items-center">
//                                 <div className="relative inline-block text-left   rounded-0" data-headlessui-state=""><div><button className="bg-red-700 text-white  text-4xl  font-bold py-4 px-5 rounded-full border border-4 border-double border-white" id="headlessui-menu-button-:r0:" type="button" aria-haspopup="menu" aria-expanded="false" data-headlessui-state="">{"H"}</button></div></div>
//                             </div>
//                             <div className="ml-4 mr-auto">
//                                 <div className="font-bold mb-1 text-lg">{50}</div>
//                                 <div className="text-yellow-400 text-sm whitespace-nowrap">{"High Activities"} </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//              </div>
//         </>
//     )
// }



function TableTr({ item, index }){
    return (
        
        
        (<tr className="intro-x " style={{"zIndex": "40 !important"}} data-aos="zoom-in" data-aos-duration="1000" data-aos-delay={350}>
            <td className="text-center" style={{"border":"0px", "paddingLeft":"20px", "paddingRight":"0px"}}>
                <h3>{index}</h3>
            </td>
            <td className=" pl-20 flex items-center" >
                <div className="w-14 h-14 flex-none image-fit overflow-hidden items-center">
                    <div className="relative inline-block text-left   rounded-0" data-headlessui-state=""><div><button className="bg-white  text-black  text-md p-3 px-4 rounded-full border border-4 border-double border-blue-500 uppercase" id="headlessui-menu-button-:r0:" type="button" aria-haspopup="menu" aria-expanded="false" data-headlessui-state="">{item.user?.name.charAt(0)}</button></div></div>
                </div>
                <p  className="font-medium whitespace-nowrap pl-2 text-base uppercase">{item?.user?.name}</p>
            </td>
            <td className="w-40 table-report__action">
                <div className="flex mt-2 mb-2 justify-center">
                    <div  className="relative z-50 inline-flex items-center text-center">
                        <GiFireShield size={35} className="mr-3 text-orange-400"  />
                        <p className="text-center">{item?.team?.name}</p>
                    </div>
                </div>
            </td>
            <td className="text-center table-report__action text-base">
                <a href="#!" className="font-medium whitespace-nowrap text-gray-300 ">{ LastSubmitAnswerCategory(item?.team?.answers)?.question?.scenario?.category || ""}</a>
            </td>
            <td className="text-center table-report__action text-base">
                <div className="text-yellow-400  whitespace-nowrap py-1">{ LastSubmitAnswerCategory(item?.team?.answers)?.obtainedPoints ?  "+" + ` ${LastSubmitAnswerCategory(item?.team?.answers)?.obtainedPoints || 0}` + " Points" : ""}</div>    
            </td>
            <td className="w-40 table-report__action">
                <div className="flex mt-2 mb-2 justify-center">
                    <div  className="relative z-50 inline-flex items-center text-center">
                        <p className="text-center">{ timeStampHumanReadableFormat(LastSubmitAnswerCategory(item?.team?.answers)?.submittedAt) }</p>
                    </div>
                </div>
            </td>
            <td className="table-report__action w-56">
                <div className="flex justify-center items-center">
                    <Link className="flex items-center mr-3 text-gray-300" href={`/user/${item?.user?.id}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-eye w-4 h-4 mr-1"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                        View Profile 
                    </Link>
                </div>
            </td>
        </tr>) 
        
    )
}

function SubmissionsTable({data , startIndex}){
    return (
        <>
            <div className="intro-y col-span-12 overflow-auto lg:overflow-visible text-gray-400">
                <table className="table table-report -mt-2" >
                <thead data-aos="zoom-in" data-aos-duration="500" >
                    <tr className="text-white ">
                        <th className="text-center whitespace-nowrap uppercase" style={{"width":"0.5%", "border":"0px", "padding":"0px", "paddingLeft":"20px"}}>Sr. #</th>
                        <th className="whitespace-nowrap  text-start uppercase pl-20" >Profile</th>
                        <th className="whitespace-nowrap  text-center uppercase w-1/6">Team</th>
                        <th className="text-center whitespace-nowrap  uppercase">Latest Hit</th>
                        <th className="text-center whitespace-nowrap  uppercase">Points</th>
                        <th className="text-center whitespace-nowrap uppercase w-1/6">Timestamp</th>
                        <th className="text-center whitespace-nowrap uppercase">Action</th>
                    </tr>
                </thead>
                <tbody>
                    { data && data.map((item, index) => ( <TableTr  key={index} index={index+startIndex} item={item}/> ))}
                </tbody>
                </table>
            </div>
        </>
    )
}

export default   function Page(){
    const [loading, setLoading] = useState(true);
    // const [data, setData] = useState([])
    const [recordsPerPrage, setRecordsPerPage] = useState(50);
    const [currentPage, setCurrentPage] = useState(1);
    const [paginationData, setPaginationData] = useState(null);
    


    const DataFetch = () => {
        try {
            axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/submissions`,{
                params : {
                    page: currentPage,
                    recordsPerPrage : recordsPerPrage,
                }
            })
            .then((res) => {
                const {...fetched_data} = decrypt(res.data.encryptedData)
                if(fetched_data.status === true){
                    // setData(fetched_data.data)
                    setPaginationData(fetched_data.paginationData)
                } else {
                    // setData([])
                    setPaginationData([])
                }
            }).catch((err) => {
                console.log(err);
                // setData([])
                setPaginationData([])
            }).finally(() => {
                setLoading(false);
            });
          } catch (error) {
            console.error(error)
            // setData([])
            setPaginationData([])
          }
    }

    useEffect(() => {
        AOS.init();
        DataFetch()
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage , recordsPerPrage])  


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

    const handleRecordsPerPage = (recordsPerPrage) => {
        setLoading(true)
        delay(500).then(() => {
            setRecordsPerPage(recordsPerPrage)
        })
    }
    

    return (
        <>
            <CustomToaster />
            <div  className="p-4 mb-16">
                <div className="flex justify-between items-center mb-5 ">
                    <h1 className="text-white text-2xl font-bold">
                        Global Score Board
                    </h1>
                    <div className="flex justify-end items-center ">
                        <FilterResetBtn />
                        <SearchInput />
                    </div>
                </div>
                {/* Main Content */}
                { loading ? (
                    <CustomTriangleLoader
                        height="400"
                        width="400"
                        className="flex justify-center items-center xl:my-32"
                        
                    />
                ) : (
                    <>
                        {
                            paginationData && (
                                <>
                                    {/* <TopHeader   /> */}
                                    <SubmissionsTable data={paginationData?.resultsPerPage} startIndex={paginationData.startIndex}  /> 
                                    <PaginationBlock  
                                        currentPage={paginationData.currentPage} 
                                        totalPages={paginationData.totalPages}  
                                        startIndex={paginationData.startIndex}  
                                        endIndex={paginationData.endIndex}
                                        totalResults={paginationData.totalResults}
                                        total_number_records_per_page={paginationData.total_number_records_per_page}
                                        handleCurrentPageChange={handleCurrentPageChange}
                                        handlePreviousPage={handlePreviousPage}
                                        handleNextPage={handleNextPage}
                                        handleRecordsPerPage={handleRecordsPerPage}
                                    />
                                </>
                             )
                        }
                    </>
                ) }
            </div>
        </>
    )

}