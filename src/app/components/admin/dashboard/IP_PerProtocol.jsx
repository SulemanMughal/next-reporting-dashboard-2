"use client"


import {React, useState, useEffect} from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Bar } from 'react-chartjs-2';




ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  plugins: {
    legend : {
      labels : {
        color:"white"
      }
    },
    title: {
      display: false,
      text: 'Chart.js Bar Chart - Stacked',
    },
  },
  
  responsive: true,
  interaction: {
    mode: 'index' ,
    intersect: false,
  },
  scales: {
    x: {
      stacked: true,
      ticks : {
        color : "#ffffff"
      }
    },
    y: {
      stacked: true,
      ticks : {
        color : "#ffffff"
      }
    },
  },
};


var ColorScheme = require('color-scheme');



function getLabels(data) {
  let labels = []
  let ips = []
  let teams = []
  data.map((item) => {
      labels.push(item[2])
      ips.push(item[0])
      teams.push(item[1])
  })
  return [labels,ips, teams]
}


export default function IP_PerProtocol({ips_per_protocol_logs}) {

  
var s = new ColorScheme;
var colors = s.scheme('tetrade')
.distance(0.70)
.variation('soft')
.colors();

  const [logs, setLogs] = useState(null);
    useEffect(() => {
      setLogs({
        labels : getLabels(ips_per_protocol_logs)[0],
        datasets: [
          {
            label: 'IPs',
            data:getLabels(ips_per_protocol_logs)[1],
            backgroundColor: colors.map(i => '#' + i),
            stack: 'Stack 0',
          },
          {
            label: 'Teams',
            data: getLabels(ips_per_protocol_logs)[2],
            backgroundColor: colors.map(i => '#' + i),
            stack: 'Stack 1',
          }
        ],
      })
    
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  return (
    <div className="w-full col-span-3 relative  h-full 2xl:h-[60vh]   p-8 pb-20 border-none rounded-lg bg-deep-blue-violet text-white overflow-hidden">
        <h1 className="text-2xl ">Logs Comparison</h1>
        <hr className="mt-5 h-0.5 border-t-0 bg-white opacity-30" />
       {logs && <Bar options={options} data={logs}  height={"350"} /> } 
    </div>
  )
}
