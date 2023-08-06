"use client"

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
  } from 'chart.js';
import { Line } from 'react-chartjs-2';

import { useEffect, useState } from "react"


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
  );
export default function Timeline(){
    const [chartData, setChartData] = useState({
        datasets : []
    });

    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        setChartData({
            labels : [
                '10', '11', '12', "13", "14",'15', '16', '17', "18", "19", "20", "21", "22"
            ],
            datasets : [
                {
                    label : 'Points',
                    data : [560,660,772, 739, 799, 850, 999, 1025, 1800, 2100, 2900, 3500, 4000],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        // 'rgba(54, 162, 235, 1)',
                        // 'rgba(255, 206, 86, 1)',
                    ],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        // 'rgba(54, 162, 235, 0.2)',
                        // 'rgba(255, 206, 86, 0.2)',
                    ],                
                }
            ]
        })
        setChartOptions({
            plugins : {
                legend : {
                    display : true,
                    position : "bottom",
                },
                title : {
                    display : false,
                    text : "Score over timeline"
                }
            },
            maintainAspectRatio  : false,
            responsive : true
        })
    }, [])
    return (
        <div className="w-full col-span-2 relative  lg:h-[70vh] h-[50vh] m-auto p-8 border rounded-lg bg-white overflow-hidden">
        <h1 className="text-2xl">Score per timeline</h1>
        <hr className="my-5 h-0.5 border-t-0 bg-black opacity-30" />
            <Line  data={chartData} options={chartOptions}  />
        </div>
    )
}
