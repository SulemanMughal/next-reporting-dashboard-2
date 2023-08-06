"use client"
import { useEffect, useState } from "react"

var ColorScheme = require('color-scheme');

import { Chart as ChartJS, BarElement, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import axios from "axios";
ChartJS.register(BarElement, Tooltip, Legend);



function getLabels(data) {
  let labels = []
  let logs = []
  data.map((item) => {
      labels.push(item[0])
      logs.push(item[1])
  })
  return [labels,logs]
}

export default function LogsPerProtocol(){
  const [chartData, setChartData] = useState({
    datasets : []
});

var s = new ColorScheme;
var colors = s.scheme('tetrade')
.distance(0.70)
.variation('soft')
.colors();
const [chartOptions, setChartOptions] = useState({});
useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/logs_per_protocol`)
    .then(response => {
        setChartData({
            labels: getLabels(response.data.logs_per_protocol_logs)[0],
            datasets: [
                { label: 'Logs', data: getLabels(response.data.logs_per_protocol_logs)[1], backgroundColor: colors.map(i => '#' + i.split("").reverse().join("")) },
            ]
        })
        setChartOptions({
            indexAxis: 'y',
            plugins : {
                legend : {
                    display : true,
                    position : "top",
                },
                title : {
                    display : false,
                    text : "Daily Revenue"
                }
            },
            maintainAspectRatio  : false,
            responsive : true
        })
    })
    .catch(error => {
        console.error(error);
    });

    
}, [])
    return (
      <div className="w-full col-span-3 relative  h-[60vh]   p-8 pb-20 border rounded-lg bg-white overflow-hidden">
        <h1 className="text-2xl ">Logs Per Protocol</h1>
        <hr className="mt-5 h-0.5 border-t-0 bg-black opacity-30" />
          <Bar  data={chartData} options={chartOptions} height={200} width={200}  />
      </div>
    )
}