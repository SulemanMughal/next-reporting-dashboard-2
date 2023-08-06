"use client"
import { useEffect, useState } from "react"


import { Chart as ChartJS, BarElement, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(BarElement, Tooltip, Legend);




export default function CategoryBreakdown(){
    const [chartData, setChartData] = useState({
        datasets : []
    });

    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        setChartData({
            labels: ['SQL Injection', 'Brute Force', 'NAMP', 'SQL Injection', 'Phishing', 'Malware', 'Spyware', 'Ransomeware'],
            datasets: [
              {
                label: 'Scripts',
                data: [12, 19, 3, 5, 2, 3,15,12,15],
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(255, 172, 64, 0.2)',
                  'rgba(255, 102, 64, 0.2)',
                  'rgba(255, 112, 64, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',

                  'rgba(255, 172, 64, 1)',
                  'rgba(255, 102, 64, 1)',
                  'rgba(255, 112, 64, 1)',
                ],
                borderWidth: 1,
              },
            ],
          })
        setChartOptions({
          indexAxis: 'y' ,
            plugins : {
                legend : {
                  display : true,  
                  position : "bottom",
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
        // <div className="w-full col-span-3 relative lg:h-[70vh] h-[50vh] m-auto p-8 border rounded-lg bg-white overflow-hidden mb-0">
        //     <h1 className="text-2xl font-bold">Scripts Per Category</h1>
        //     <hr className="mt-5 h-0.5 border-t-0 bg-black opacity-30" /> 
        //     <Bar  data={chartData} options={chartOptions}  />   
        // </div>

<div className="w-full col-span-3 relative  h-[48vh]   p-8 pb-20 border rounded-lg bg-white overflow-hidden">
<h1 className="text-2xl font-bold">Scripts Per Category</h1>
<hr className="mt-5 h-0.5 border-t-0 bg-black opacity-30" />
    <Bar  data={chartData} options={chartOptions} height={200} width={200}  />
</div>
    )
}