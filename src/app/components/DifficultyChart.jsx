"use client"
import { useEffect, useState } from "react"

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';



ChartJS.register(ArcElement, Tooltip, Legend);


export default function DifficultyChart(){
    const [chartData, setChartData] = useState({
        datasets : []
    });

    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        setChartData({
            labels : [
                'Easy', 'Medium', 'Hard'
            ],
            datasets : [
                {
                    label : 'Solved ',
                    data : [15,18,20],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                    ],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                    ],                
                }
            ]
        })
        setChartOptions({
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
    }, [])
    return (
        <div className="w-full col-span-2 relative lg:h-[70vh] h-[50vh] m-auto p-8 border rounded-lg bg-white overflow-hidden">
            <h1 className="2xl:text-2xl text-1xl">Solves Per Difficulty</h1>
            <hr className="my-5 h-0.5 border-t-0 bg-black opacity-30" />
                <Doughnut  data={chartData} options={chartOptions}  />
        </div>
    )
}