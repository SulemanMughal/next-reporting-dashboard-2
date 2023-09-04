"use client"
import { useEffect, useState } from "react"

var ColorScheme = require('color-scheme');

import { Chart as ChartJS, BarElement, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
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


export default function LogsPerProtocol({logs_per_protocol_logs}){
  const [chartData, setChartData] = useState({
    datasets : []
});

var s = new ColorScheme;
var colors = s.scheme('tetrade')
.distance(0.70)
.variation('light')
.colors();
const [chartOptions, setChartOptions] = useState({});
useEffect(() => {

    setChartData({
      labels: getLabels(logs_per_protocol_logs)[0],
      datasets: [
          { label: 'Logs', data: getLabels(logs_per_protocol_logs)[1], backgroundColor: colors.map(i => '#' + i) },
      ]
  })
  setChartOptions({
      indexAxis: 'y',
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
      plugins : {
          legend : {
              display : true,
              position : "top",
              labels: {
                  color: 'white'
              }
          },
          title : {
              display : false,
              text : "Daily Revenue"
          }
      },
      maintainAspectRatio  : false,
      responsive : true
  })

    
}, [])
    return (
      <div className="w-full col-span-3 relative  h-full 2xl:h-[60vh]    p-8 pb-20 border-none rounded-lg bg-deep-blue-violet text-white overflow-hidden">
        <h1 className="text-2xl ">Logs Per Protocol</h1>
        <hr className="mt-5 h-0.5 border-t-0 bg-white opacity-30" />
        <Bar  data={chartData} options={chartOptions}  height={"350"}/>
      </div>
    )
}