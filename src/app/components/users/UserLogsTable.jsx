// "use client"


// import {  useState, useEffect } from "react"
// import "gridjs/dist/theme/mermaid.css";
// import { Grid } from 'gridjs-react';

// const style = {
//     table: {
//       'border': '1px solid #64748b',
//     },
//     th: {
//       'background-color': 'rgba(0, 0, 0, 0.1)',
//       'color': '#94a3b8',
//       'border-bottom': '1px solid #64748b',
//       'text-align': 'center',
//       'border-top' : "0px"
//     },
//     td: {
//       'text-align': 'start',
//       'color': '#64748b',
//     'background-color': 'rgba(16,19,69, 97%)',
//     "border" : "0"  ,
//     "border-bottom" : "1px solid #64748b",
//     "padding"  : "1rem"
      
//     },
//     footer : {
//       'background-color': 'rgba(16,19,69, 97%)',
//       "border" : "1px solid #64748b"  ,
//       "border-top" : "0",
//       "color" : "white"
//     }
//   }


// export default function UserLogsTable({attack_history_logs}){
//     const [logs, setLogs] = useState(null)
//     useEffect(() => {
//       setLogs(attack_history_logs);
//     }, []);
//     return (
//         <>
//             <div className="w-full col-span-3 relative   p-8 border-none rounded-lg bg-card-custom h-100">
//                 {logs && <Grid data={logs} columns={[ "Timestamp", "Src", "Dst", "Protocol", "Msg", "Team-ID" ]} search={true} pagination={{ limit: 20, }}  style={style}/>}
//             </div>
//         </>
//     )
// }


"use client"


import axios from 'axios';
import {  useState, useEffect } from "react"
import "gridjs/dist/theme/mermaid.css";
import { Grid } from 'gridjs-react';

const style = {
    table: {
      'border': '1px solid #64748b',
      // color 
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
    //   'background-color': 'black',
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
    
    // paginationSummary  : {
    //   "color" : "white !important"
    // },
    // pagination : {
    //   "color" : "white !important"
    // }
  }



import encrypt from "@/app/lib/encrypt"
import decrypt from "@/app/lib/decrypt"

import { ThreeDots } from 'react-loader-spinner'
  

export default function UserLogsTable(){
    const [logs, setLogs] = useState(true)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/db_logs`, {
          headers: { 'Cache-Control': 'no-store' },
          params: { timestamp: new Date().getTime() },
        })
        .then(res => {
          const {...data } = decrypt(res.data.encryptedData)
            setLogs(data.logs);
            setError(null);
        })
        .catch(error => {
            console.error(error);
            setError(error);
        }).finally(() => {
            setLoading(false);

        });
    }, []);
    return (
        <>
            <div className="w-full col-span-3 relative   p-8 border-none rounded-lg bg-card-custom h-100">
            <h1 className="text-2xl text-white">Logs Details</h1>
            <hr className="my-5 h-0.5 border-t-0 bg-white opacity-30" />
            {loading ? (
              <>
                <div>
                  {/* <p className='text-white text-3xl font-bolder'>
                    Loading...  
                  </p> */}
                  <ThreeDots 
                    height="80" 
                    width="80" 
                    radius="9"
                    color="#4fa94d" 
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true}
                    />
                </div>
              </>
            ) : error ? (
              <>
                <div>Error: {error.message}</div>
              </>
            ) : (
              <>
                {logs && <Grid data={logs} columns={[ "Timestamp", "Src", "Dst", "Protocol", "Msg", "Team-ID" ]} search={true} pagination={{ limit: 20, }}  style={style}/>}
              </>
            )}
                
            </div>
        </>
    )
}