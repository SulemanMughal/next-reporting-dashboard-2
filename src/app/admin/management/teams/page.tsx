"use client"

import toast, { Toaster } from 'react-hot-toast';
import CustomToaster from "@/app/components/CustomToaster";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useState, useEffect , useRef} from 'react';
import { AiOutlinePlus } from "react-icons/ai"
import SVGLoader from "@/app/components/SVGLoader"
import  { GiCancel } from "react-icons/gi"
import axios from "axios";
import encrypt from '@/app/lib/encrypt';
import decrypt from "@/app/lib/decrypt"


function SubmitBtn({isSubmit, setShowModal}){
    return (
      <>
        <div className="mt-8">
          {isSubmit ?  
          (
            <SVGLoader text={"Adding..."}   />
          )  : 
          (
            <>
                <div className="flex items-center justify-center p-3 ">
                    <button
                    className=" font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 w-6/12 justify-center rounded-md leading-6 bg-red-700  text-red-100 shadow-sm hover:bg-red-500 flex justify-start items-center"
                    type="button"
                    onClick={() => setShowModal(false)}
                    ><span>Cancel</span> <GiCancel  size={23} className="ml-2" /></button>
                    <button
                    type="submit"
                    className=" w-6/12 justify-center rounded-md bg-indigo-600 font-bold uppercase px-6 py-2 font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 flex justify-start items-center"
                    >
                    <span> Add</span> 
                    </button>
                </div>
                </>
          )
          }
        </div>
      </>
    )
  }


const GridComponent = ({columnDefs , rowData , defaultColDef , containerStyle , gridStyle, pagination , paginationPageSize}) => {
    return (
      <div style={containerStyle}>
        <div className="ag-theme-alpine"  style={gridStyle}>
            <AgGridReact columnDefs={columnDefs} rowData={rowData} defaultColDef={defaultColDef} pagination={pagination} paginationPageSize={paginationPageSize} />
        </div>
      </div>
    );
};


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



function NewTeamBtn({setShowModal}){
    return (
        <>
            <div >
                <button type="button" className=" bg-deep-blue-violet text-white py-2  pr-4  pl-4 mt-2  h-full border border-1 border-deep-blue-violet rounded-md mb-0 ml-0  flex items-center justify-start"  onClick={() => setShowModal(true)} >
                    <span>
                        <AiOutlinePlus  size={23}  className='mr-2'/>
                    </span>
                    New Team</button>
            </div>
        </>

    )
}


function NewTeamModelForm({setShowModal , refresh_data}){
    const name = useRef("");
    const [isSubmit, setSubmit] = useState(false)

    const submitHandler = async (event) => {
        event.preventDefault()
        if(name.current == "" ){
            toast.error(`All fields are required`)
        }
        else{
            try {
                setSubmit(true)
                const encryptedData = encrypt({name : name.current});
                const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/team`, {
                    data : encryptedData
                });
                setShowModal(false)
                const {...data } = decrypt(res.data.encryptedData)
                if(data.status === false){
                    toast.error(`${name.current} already exists`)    
                }
                else{
                    toast.success('Successfull, Team has been created')
                    refresh_data();
                }
            } catch (error) {
                setSubmit(false)
                console.error(error)
                toast.error(`Sorry, you can't create team. Please try again after sometime`)
            }
        }
      }

    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none" >
                <div className="relative w-1/5 px-4 space-y-16 ">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/* Header */}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl font-semibold">
                    Team Details
                  </h3>
                  <button
                    className="absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 text-2xl w-10 h-10 rounded-full focus:outline-none text-white"
                    onClick={() => setShowModal(false)}
                    >✗</button>
                </div>
                {/* Body*/}
                    <div className="relative p-6 flex-auto">
                        {/* Form */}
                        <form className="space-y-6" onSubmit={submitHandler}>
                            {/* Team Name */}
                            <div className="relative z-0 w-full mb-6 group">
                                <input type="text" id="text"
                                    name="name"
                                    
                                    onChange={(e) => (name.current = e.target.value)}
                                    autoComplete="off"
                                    required

                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                                <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
                            </div>
                            <SubmitBtn  isSubmit={isSubmit} setShowModal={setShowModal} />
                        </form>
                    </div>
                    </div>
                </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}

export default  function Page(  ){
    const [rowData, setRowData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const DataFetch = () => {
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/management/teams/`)
        .then(res => {
            const {...fetched_data } = decrypt(res.data.encryptedData)
            if(fetched_data?.status === true){
                setRowData(fetched_data?.teams);
            } else {
                setRowData([]);
            }
        })
        .catch(error => {
            console.log(error)
            setRowData([]);
        }).finally(() => {
        })
    }
    useEffect(() => {
        DataFetch();
    }, []);


    return (
       <>
            {/* Toast Message */}
            <CustomToaster />
            
            {/* Add New Team Modal Form */}
            {showModal ? <NewTeamModelForm setShowModal={setShowModal} refresh_data={DataFetch}   /> : null}
            <div  className="p-4 mb-16">
                {/* Header */}
                <div className="flex justify-between items-center mb-5 ">
                    <h1 className="text-white text-2xl font-bold">
                        Team Management
                    </h1>
                    <div className="flex justify-end items-center ">
                        <NewTeamBtn  setShowModal={setShowModal} />
                    </div>
                </div>
                {/* Main Content */}
                <GridComponent 
                    columnDefs={[ 
                        { headerName: 'Sr. No. #', valueGetter: "node.rowIndex + 1" }, 
                        { headerName: 'Name', field: 'name' }, 
                        { headerName: 'Total Members', field: '_count.users' }, 
                        // { headerName: 'Active', field: 'active' }, 
                        // { headerName: 'Role', field: 'role' }, 
                        // { headerName: 'Team', field: 'team.name' },
                        // { headerName: 'Country', field: 'country' },
                        { 
                          headerName: 'Created At', 
                          field: 'createdAt',
                          sort: 'desc',
                          cellRenderer: (data) => {
                            return formatISODateToHumanReadable(data.value)
                          }
                        },
                        // { 
                        //     headerName: 'Joining Date', 
                        //     field: 'joinedDate' , 
                        //     sort: 'desc',
                        //     cellRenderer: (data) => {
                        //         return formatISODateToHumanReadable(data.value)
                        //     }
                        // },
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
       </>
    )
    
}

