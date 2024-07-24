"use client"


import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';


import { Line } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
);


const options = {
  labels: {
    fontColor: "blue",
    fontSize: 18
  },
  scales : {
    x: {
      
      ticks : {
        color : "#ffffff"
      }
    },
    y: {
      
      ticks : {
        color : "#ffffff"
      }
    }
  },
  elements: {
    line: {
        tension: 0.5
    }
},
  responsive: true,
  maintainAspectRatio  : false,
  plugins: {
    legend: {
      position: 'top' ,
      labels: {
        color: 'white'
      }
    },
    title: {
      display: false,
      position : 'bottom',
      text: `${new Date().toJSON().slice(0, 10)}`,
      padding: {
          top: 10,
          bottom: 10
      },
      font: {
        size: 24,
        style: 'italic',
        family: 'Helvetica Neue'
      }
    },
  },
};



const labels = ['00', '01', '02', '03', '04', '05', '06', '07' , '08' , '09' , '10' , '11', '12', '13', '14', '15', '16', '17', '18','19', '20', '21' , '22' , '23'];


function getLogValues(arr){
  let arr_logs = []
  labels.map((label, index) => {
    for(let sub_index = 0 ; sub_index < arr.length ; sub_index++){
      try {
        if(label === arr[sub_index]?.[1]){
          arr_logs[index] = arr[sub_index]?.[0]
          break
        } else{
          arr_logs[index] = 0
        }
      } catch (error) {
        
      }
    }
  })
  return arr_logs
}


function ChartOptionButton(){
  return (
    <>
      <div className='relative flex justify-between items-center'>
      <select name="signupfrom" id="signupfrom" className="appearance-none placeholder-gray-400 outline-0  border border-2 border-deep-blue-violet focus:border focus:border-2 focus:border-blue-900  text-gray-400     p-3 pl-4 pr-8   m-0 mt-2 text-base block bg-deep-indigo  rounded-md shadow-sm" defaultValue={"1"}>
      <option  value="1">All</option>
      <option value="2">Live</option>
      </select>
      <div className="absolute inset-y-0  mt-2 right-0 flex items-center pr-3 pointer-events-none">
        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>
      </div>
    </>
  )
}






export default function LogLineChart({logs_by_hour}){
    const [logs, setLogs] = useState(null);
    useEffect(() => {
      setLogs({
        labels,
        datasets: [{
          fill: true,
          label: 'Logs # ',
          data:getLogValues(logs_by_hour),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: (context) => {
            const ctx = context.chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 0, 400);
            gradient.addColorStop(0, 'rgba(255, 99, 132, 0.55)'); 
            gradient.addColorStop(1, 'rgba(255, 99, 132, 0.0)');
            return gradient;
          },
        }],
      })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    


    return (
        <>
          <div className="w-full col-span-1 relative   h-[60vh]  m-auto  p-8 pb-20  border-none  rounded-lg  bg-card-custom" >
            <div className='flex justify-between'>
              <h1 className="text-2xl text-white">Logs Timeline</h1>
              <ChartOptionButton />
            </div>
            <hr className="my-5 h-0.5 border-t-0 bg-white opacity-30" />
            {  logs &&    <Line options={options} data={logs}   height={350} /> }
          </div>
        </>
    )
}