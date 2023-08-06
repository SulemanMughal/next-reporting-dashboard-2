"use client"


import axios from 'axios';
import {  useState, useEffect } from "react"
import "gridjs/dist/theme/mermaid.css";
import { Grid } from 'gridjs-react';

export default function UserLogsTable(){
    const [logs, setLogs] = useState(null)
    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/db_logs`)
        .then(response => {
            setLogs(response.data);
        })
        .catch(error => {
            console.error(error);
        });
    }, []);
    return (
        <>
            <div className="w-full col-span-3 relative   p-8 border rounded-lg bg-white h-100">
                {logs && <Grid data={logs} columns={[ "Timestamp", "Src", "Dst", "Protocol", "Msg", "Team-ID" ]} search={true} pagination={{ limit: 20, }} />}
            </div>
        </>
    )
}