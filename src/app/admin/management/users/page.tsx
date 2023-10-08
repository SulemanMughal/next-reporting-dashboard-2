"use client"

import { useState, useEffect , useRef} from 'react';
import { AgGridReact } from 'ag-grid-react';
import  { GiCancel } from "react-icons/gi"
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import axios from "axios";
import decrypt from "@/app/lib/decrypt"
import encrypt from "@/app/lib/encrypt"
import { AiOutlinePlus } from "react-icons/ai"
import toast from 'react-hot-toast';
import CustomToaster from "@/app/components/CustomToaster";
import SVGLoader from "@/app/components/SVGLoader"
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



function NewUserBtn({setShowModal}){
    return (
        <>
            <div >
                <button type="button" className=" bg-deep-blue-violet text-white py-2  pr-4  pl-4 mt-2  h-full border border-1 border-deep-blue-violet rounded-md mb-0 ml-0  flex items-center justify-start"  onClick={() => setShowModal(true)} >
                    <span>
                        <AiOutlinePlus  size={23}  className='mr-2'/>
                    </span>
                    New User</button>
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
  


// Add New User Modal Form
function NewUserModalForm({setShowModal , refresh_data}){

    const [isSubmit, setSubmit] = useState(false)
    const name = useRef("")
    const email = useRef("");
    const pass = useRef("");
    const role = useRef("");



    const submitHandler = async (event) => {
        event.preventDefault()
        if (name.current == "" || email.current == "" || pass.current == "" || role.current == "") {
          toast.error(`All fields are required`)
        } else {
            try {
                    setSubmit(true)
                    const encryptedData = encrypt({
                        email : email.current,
                        password : pass.current,
                        name : name.current,
                        role : role.current
                    })
                    await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user`, {
                        encryptedData
                    });
                    setShowModal(false)
                    refresh_data()
                    toast.success('Successfully, Add A New User')
            } catch (error) {
                setSubmit(false)
                console.error(error)
                toast.error(`Please try again after some time`)
            }
        }
      }

    return (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-2/5 px-4 space-y-16 ">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl font-semibold">
                    Details
                  </h3>
                  <button
                    className="absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 text-2xl w-10 h-10 rounded-full focus:outline-none text-white"
                    onClick={() => setShowModal(false)}
                    >✗</button>
                </div>
                <div className="relative p-6 flex-auto">
                  <form className="space-y-6" onSubmit={submitHandler}>
                    
                    {/* name */}
                    <div className="relative z-0 w-full mb-6 group">
                      <label htmlFor="desc" className="block mb-2 text-sm font-medium text-gray-900 ">Display Name</label>
                      <input type="text"   onChange={(e) => (name.current = e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5    " placeholder="Display Name"  required></input>
                    </div>
                    
                    {/* email */}
                    <div className="relative z-0 w-full mb-6 group">
                      <label htmlFor="desc" className="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
                      <input type="email"   onChange={(e) => (email.current = e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5    " placeholder="Email"  required></input>
                    </div>

                    {/* password */}
                    <div className="relative z-0 w-full mb-6 group">
                      <label htmlFor="desc" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                      <input type="password"   onChange={(e) => (pass.current = e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5    " placeholder="Password"  required></input>
                    </div>

                    {/* role */}
                    <div className="relative z-0 w-full mb-6 group">
                        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
                        <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " onChange={(e) => role.current = e.target.value} defaultValue="none">
                        <option disabled value={"none"}>Role</option>
                        <option value="user">Normal User</option>
                        <option value="admin">Admin</option>
                        </select>
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

export default function Page(){
    const [rowData, setRowData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const DataFetch = () => {
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user`, {
          params : {
            role : "both"
          }
        })
        .then(res => {
            const {...fetched_data } = decrypt(res.data.encryptedData)
            if(fetched_data?.status === true){
                setRowData(fetched_data?.users);
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
            {/* Add New User Modal Form */}
            {showModal ? <NewUserModalForm setShowModal={setShowModal} refresh_data={DataFetch}   /> : null}
            <div  className="p-4 mb-16">
                {/* Header */}
                <div className="flex justify-between items-center mb-5 ">
                    <h1 className="text-white text-2xl font-bold">
                        Users Management
                    </h1>
                    <div className="flex justify-end items-center ">
                        <NewUserBtn  setShowModal={setShowModal} />
                    </div>
                </div>
                {/* Main Content */}
                <GridComponent 
                    columnDefs={[ 
                        { headerName: 'Sr. No. #', valueGetter: "node.rowIndex + 1" }, 
                        { headerName: 'Name', field: 'name' }, 
                        { headerName: 'Email', field: 'email' }, 
                        { headerName: 'Active', field: 'active' }, 
                        { headerName: 'Role', field: 'role' }, 
                        { headerName: 'Team', field: 'team.name' },
                        { headerName: 'Country', field: 'country' },
                        { 
                          headerName: 'Last Login', 
                          field: 'lastLogin',
                          cellRenderer: (data) => {
                            return formatISODateToHumanReadable(data.value)
                          }
                        },
                        { 
                            headerName: 'Joining Date', 
                            field: 'joinedDate' , 
                            sort: 'desc',
                            cellRenderer: (data) => {
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
        </>
    )
}