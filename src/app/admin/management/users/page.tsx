"use client"

import { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import axios from "axios";
import decrypt from "@/app/lib/decrypt"
// import './style.css';


const GridComponent = ({columnDefs , rowData , defaultColDef , containerStyle , gridStyle, pagination , paginationPageSize}) => {
    return (
      <div style={containerStyle}>
        <div className="ag-theme-alpine"  style={gridStyle}>
            <AgGridReact columnDefs={columnDefs} rowData={rowData} defaultColDef={defaultColDef} pagination={pagination} paginationPageSize={paginationPageSize} />
        </div>
      </div>
    );
};



function NewUserBtn(){
    return (
        <>
            <div>
                <button type="button" className=" bg-deep-blue-violet text-white py-2  pr-4  pl-4 mt-2  h-full border border-1 border-deep-blue-violet rounded-md mb-0 ml-0 " >New User</button>
            </div>
        </>

    )
}

function formatISODateToHumanReadable(isoDateString: string) {
        const date = new Date(isoDateString);
    
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        //   second: '2-digit',
        //   timeZoneName: 'short'
        };
    
        return date.toLocaleDateString('en-US', options);
    }

export default function Page(){
    const [rowData, setRowData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const DataFetch = () => {
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user`)
        .then(res => {
            const {...fetched_data } = decrypt(res.data.encryptedData)
            if(fetched_data?.status === true){
                setRowData(fetched_data?.users);
                setError(null);
            } else {
                setError(fetched_data?.error);
                setRowData([]);
            }
        })
        .catch(error => {
            console.log(error)
            setError(`Sorry! There is an error while fetching data.Please try again later`);
            setRowData([]);
        }).finally(() => {
            setLoading(false);
        })
    }

    
  useEffect(() => {
    DataFetch();
  }, []);

    return (
        <div  className="p-4 mb-16">
            {/* Header */}
            <div className="flex justify-between items-center mb-5 ">
                <h1 className="text-white text-2xl font-bold">
                    Users Management
                </h1>
                <div className="flex justify-end items-center ">
                    <NewUserBtn />
                </div>
            </div>
            {/* Main Content */}
            <GridComponent 
                columnDefs={[ 
                    { headerName: 'Sr. No. #', valueGetter: "node.rowIndex + 1" }, 
                    { headerName: 'Name', field: 'name' }, 
                    { headerName: 'Email', field: 'email' }, 
                    { headerName: 'Role', field: 'role' }, 
                    { headerName: 'Team', field: 'team.name' },
                    { headerName: 'Country', field: 'country' },
                    { 
                        headerName: 'Joining Date', 
                        field: 'joinedDate' , 
                        cellRenderer: (data) => {
                            // console.log(data.value)
                            
                            return formatISODateToHumanReadable(data.value)
                        }
                    },
                ]}  
                rowData={rowData}
                defaultColDef ={{
                    editable: false,
                    enableRowGroup: false,
                    enablePivot: false,
                    enableValue: false,
                    sortable: true,
                    resizable: true,
                    filter: true,
                    flex: 1,
                    minWidth: 100,
                }}
                containerStyle={{ width: '100%', height: '620px' }}
                gridStyle={{ height: '620px', width: '100%' }}
                pagination={true}
                paginationPageSize={30}
            />
        </div>
    )
}