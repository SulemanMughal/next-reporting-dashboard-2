"use client"

import { useRef, useState, useEffect } from "react"

import axios from 'axios';

import  { MdAddTask } from "react-icons/md"









function TableTr({ job , index}) {

    const [status, setStatus] = useState("")

    useEffect(() => {
        axios.get(`/api/jobs/${job.job_id}`)
        .then(response => {
            setStatus(response.data.status )
        })
        .catch(error => {
            console.error(error);
        });
    });
    
    return (
      <>
        <tr tabIndex={0} className="focus:outline-none h-16 border border-gray-100 rounded" key={job.job_id}>
          <td className="text-center">
            <p className="text-base font-medium leading-none text-gray-700 mr-2">{index + 1}</p>
          </td>
          <td className="text-center">
            <p className="text-base font-medium leading-none text-gray-700 mr-2">{job.job_id}</p>
          </td>
          <td className="text-center">
            <p className="text-sm leading-none text-gray-600 ml-2">{job.team_no}</p>
          </td>
          <td className="text-center">
            <p className="text-sm leading-none text-gray-600 ml-2">{status}</p>
          </td>
        </tr>
        <tr className="h-3"></tr>
      </>
    )
  }



function JobsTable({ jobs }) {
    return (
      <>
        <div className="mt-7 overflow-x-auto">
          <table className="w-full whitespace-nowrap">
            <thead>
              <tr className="focus:outline-none h-16 border border-gray-100 rounded">
                <th >
                  Sr. No.
                </th>
                <th >
                  Job ID
                </th>
                <th>
                  Team No
                </th>
                <th>
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {jobs && jobs.map((job , index) => <TableTr job={job}  index={index} key={index} />)}
            </tbody>
          </table>
        </div>
      </>
    )
  }
  





export default function Jobs(){


    const [jobs, setJobs] = useState(null);

    useEffect(() => {
        axios.get('/api/jobs')
          .then(response => {
            setJobs(response.data.jobs);
          })
          .catch(error => {
            console.error(error);
          });
    }, []);

    return (
        <>
            <main className='bg-gray-100 min-h-screen'>
        <div className="sm:px-6 w-full">
          <div className="px-4 md:px-0 py-4 md:py-7">
            <div className="flex items-center justify-between">
              <p tabIndex={0} className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">Jobs</p>
              <div className="py-3 px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded">
                <p>Sort By:</p>
                <select aria-label="select" className="focus:text-indigo-600 focus:outline-none bg-transparent ml-1">
                  <option className="text-sm text-indigo-800">Latest</option>
                  <option className="text-sm text-indigo-800">Oldest</option>
                  <option className="text-sm text-indigo-800">Latest</option>
                </select>
              </div>
            </div>
          </div>
          <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
            <div className="sm:flex items-center justify-between">
              <div className="flex items-center">
                <a className="rounded-full focus:outline-none focus:ring-2  focus:bg-indigo-50 focus:ring-indigo-800" href="#!">
                  <div className="py-2 px-8 bg-indigo-100 text-indigo-700 rounded-full">
                    <p>All</p>
                  </div>
                </a>
              </div>
              {/* <button className="  block   bg-blue-200 rounded-full flex  items-center " onClick={modelHandler}  >
                {<MdAddTask size={28} className="font-bold bg-blue-700 text-white rounded-full p-1" />}<span className="pl-2 pr-4 text-blue-800 font-bold ">Add New Script</span>
              </button> */}
            </div>
            <JobsTable jobs={jobs} />
          </div>
        </div>
      </main>
        </>
    )
}