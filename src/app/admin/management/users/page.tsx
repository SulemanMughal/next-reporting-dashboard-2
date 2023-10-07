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



// Submit Button
// const SubmitBtn = ({isSubmit, setShowModal }) => {
//     return (
//       <>
//         {isSubmit ? <button disabled type="button" className="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center w-full justify-center">
//                         <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
//                           <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
//                           <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
//                         </svg>
//                         Adding...
//                       </button> :
  
                    //     <>
                    //       <div className="flex items-center justify-center p-3 ">
                    // <button
                    // className=" font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 w-6/12 justify-center rounded-md leading-6 bg-red-700  text-red-100 shadow-sm hover:bg-red-500 flex justify-start items-center"
                    // type="button"
                    // onClick={() => setShowModal(false)}
                    // ><span>Cancel</span> <GiCancel  size={23} className="ml-2" /></button>
                    // <button
                    // type="submit"
                    // className=" w-6/12 justify-center rounded-md bg-indigo-600 font-bold uppercase px-6 py-2 font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 flex justify-start items-center"
                    // >
                    // <span> Add</span> 
                    // </button>
                    // </div>
                    //     </>
  
  
//                       }
//       </>
//     )
//   }


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