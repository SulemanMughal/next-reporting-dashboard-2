"use client"
import { useEffect, useState } from "react"

import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
  );


export default function SkillsTracker(){
    const [chartData, setChartData] = useState({
        datasets : []
    });

    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        setChartData({
            labels: ['Misc', 'Network', 'Crypto', 'Forensic', 'Web', 'OSINT'],
            datasets: [
              {
                label: '',
                data: [2, 9, 3, 5, 8, 7],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
              },
            ],
          })
        setChartOptions({
            plugins : {
                legend : {
                  display  : false,
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
        <>
             <div className="w-full col-span-3 relative  lg:h-[70vh] h-[50vh] m-auto p-8 border rounded-lg bg-white overflow-hidden">
                <h1 className="2xl:text-2xl text-1xl">Category Score</h1>
                <hr className="my-5  h-0.5 border-t-0 bg-black opacity-30" /> 
                <Radar  data={chartData} options={chartOptions}  />   
             </div>
        </>
    )
}