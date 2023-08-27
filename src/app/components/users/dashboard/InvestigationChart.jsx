"use client"

import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


export const data = {
    labels: [
        "Incident Response",
        "Digital Forensics",
        "Security Operations",
        "Reverse Engineering",
        "OSINT",
        "Threat Hunting",
        "Threat Intelligence"
    ],
    datasets: [
        {
            data: [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            ],
            backgroundColor: [
                "#2ecc71",
                "#3498db",
                "#e74c3c",
                "#9b59b6",
                "#f1c40f",
                "#cf6a87",
                "#c7ecee",
                null
            ],
            hoverBackgroundColor: [
                "#2ecc71",
                "#3498db",
                "#e74c3c",
                "#9b59b6",
                "#f1c40f",
                "#cf6a87",
                "#c7ecee",
                null
            ],
            borderWidth: 3,
            borderColor: '#101345'
        },
    ],
  };
  

export default function InvestigationChart(){
    return (
        <>
            <div  className='col-span-3'>
    <div className="intro-y flex items-center h-10 mt-5">
        <h2 className="text-lg font-medium truncate mr-5 text-white">
            Investigations
        </h2>
        <div className="sm:ml-auto mt-3 sm:mt-0 relative text-gray-700 text-gray-300">
            <select className="appearance-none placeholder-gray-300 outline-0  border border-2 border-deep-blue-violet focus:border focus:border-2 focus:border-blue-900  text-gray-300    w-full p-2 pl-4 pr-8   m-0 mt-2 text-base block bg-deep-indigo  rounded-md shadow-sm" model="selectedYear">
                <option value="" disabled="">Year</option>
                                    <option value="2023">2023</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-5 w-5 mt-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
        </div>
    </div>
    <div  className="intro-y box p-5 mt-10 bg-deep-blue-violet rounded-lg"><div className="chartjs-size-monitor"><div className="chartjs-size-monitor-expand"><div className=""></div></div><div className="chartjs-size-monitor-shrink"><div className=""></div></div></div>
        <div className="chartjs-size-monitor">
            <div className="chartjs-size-monitor-expand">
                <div className=""></div>
            </div>
            <div className="chartjs-size-monitor-shrink">
                <div className=""></div>
            </div>
        </div>
        {/* <canvas ignore="" x-ref="chart" className="mt-3 chartjs-render-monitor" height="257" width="277" style="display: block; width: 277px; height: 257px;"></canvas> */}

         <Pie data={data} height={"257"} width={"277"} options={{
            plugins: {

            
                            legend: {
                                display: false
                            }
                        }
         }} />


        <div className="mt-20 text-gray-300 text-sm">

                        
                
                <div className="flex items-center ">
                    <div className="w-2 h-2 rounded-full mr-3" style={{"background-color": "#2ecc71"}}></div>
                    <span className="truncate">Incident Response</span> 
                    <div className="h-px flex-1 border border-r border-dashed border-gray-300 mx-3 xl:hidden"></div>
                    <span className="font-medium xl:ml-auto">0%</span> 
                </div>

                        
                
                <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full mr-3" style={{"background-color" : "#3498db"}}></div>
                    <span className="truncate">Digital Forensics</span> 
                    <div className="h-px flex-1 border border-r border-dashed border-gray-300 mx-3 xl:hidden"></div>
                    <span className="font-medium xl:ml-auto">0%</span> 
                </div>

                        
                
                <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full mr-3" style={{"background-color": "#e74c3c"}}></div>
                    <span className="truncate">Security Operations</span> 
                    <div className="h-px flex-1 border border-r border-dashed border-gray-300 mx-3 xl:hidden"></div>
                    <span className="font-medium xl:ml-auto">0%</span> 
                </div>

                        
                
                <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full mr-3" style={{"background-color": "#9b59b6"}}></div>
                    <span className="truncate">Reverse Engineering</span> 
                    <div className="h-px flex-1 border border-r border-dashed border-gray-300 mx-3 xl:hidden"></div>
                    <span className="font-medium xl:ml-auto">0%</span> 
                </div>

                        
                
                <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full mr-3" style={{"background-color": "#f1c40f"}}></div>
                    <span className="truncate">OSINT</span> 
                    <div className="h-px flex-1 border border-r border-dashed border-gray-300 mx-3 xl:hidden"></div>
                    <span className="font-medium xl:ml-auto">0%</span> 
                </div>

                        
                
                <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full mr-3" style={{"background-color": "#cf6a87"}}></div>
                    <span className="truncate">Threat Hunting</span> 
                    <div className="h-px flex-1 border border-r border-dashed border-gray-300 mx-3 xl:hidden"></div>
                    <span className="font-medium xl:ml-auto">0%</span> 
                </div>

                        
                
                <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full mr-3" style={{"background-color": "#c7ecee"}}></div>
                    <span className="truncate">Threat Intelligence</span> 
                    <div className="h-px flex-1 border border-r border-dashed border-gray-300 mx-3 xl:hidden"></div>
                    <span className="font-medium xl:ml-auto">0%</span> 
                </div>

            
        </div>
    </div>
    
    
</div>
        </>
    )
}