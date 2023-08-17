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
    }, []);


    


    return (
        <>
          <div className="w-full col-span-1 relative   h-[60vh]  m-auto  p-8 pb-20  border-none  rounded-lg  bg-card-custom" >
            <h1 className="text-2xl text-white">Logs Timeline</h1>
            <hr className="my-5 h-0.5 border-t-0 bg-white opacity-30" />
            {  logs &&    <Line options={options} data={logs}   height={350} /> }
          </div>
        </>
    )
}