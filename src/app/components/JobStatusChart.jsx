"use client"

import React from 'react';


// import axios from 'axios';


import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['Start', 'End', 'Processing'],
  datasets: [
    {
      label: '# of Jobs',
      data: [12, 19, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

export default function JobStatusChart(){
    return (
        // <div className="w-full col-span-2 relative  lg:h-[70vh] h-[50vh] m-auto p-8 border rounded-lg bg-white overflow-hidden">
        // <h1 className="text-2xl">Jobs Per Status</h1>
        // <hr className="mt-5 h-0.5 border-t-0 bg-black opacity-30" />
        // <Pie data={data} />
        // </div>


<div className="w-full col-span-2 relative  h-[48vh]   p-8 pb-20 border rounded-lg bg-white overflow-hidden">
<h1 className="text-2xl font-bold">Jobs Per Status</h1>
<hr className="mt-5 h-0.5 border-t-0 bg-black opacity-30" />
    <Pie  data={data}  height={200} width={200}  />
</div>
    )
    
}