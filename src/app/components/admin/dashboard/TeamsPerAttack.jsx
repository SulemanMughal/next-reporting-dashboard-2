"use client"
import { useEffect, useState } from "react"
var ColorScheme = require('color-scheme');

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import {  Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);



function getLabels(data) {
    let labels = []
    let teams = []
    let logs = []
    data.map((item) => {
        labels.push(item[1])
        teams.push(item[0])
        logs.push(item[2])
    })
    return [labels,teams, logs]
}



export default function TeamsPerAttack({teams_per_attack_logs}){
    const [chartData, setChartData] = useState({
        datasets : []
    });

    var s = new ColorScheme;
    var colors = s.scheme('tetrade')
    .variation('light')
    .distance(0.75)
    .colors();
    const [chartOptions, setChartOptions] = useState({});
    useEffect(() => {
        
        setChartData({
            labels: getLabels(teams_per_attack_logs)[0],
            datasets: [
                { 
                    label: 'Teams', 
                    data: getLabels(teams_per_attack_logs)[1], 
                    backgroundColor: colors.map(i => '#' + i) ,
                    borderColor : 0
                },
            ]
        })
        setChartOptions({
            radius : "90%",
            cutout: "55%",
            plugins : {
                legend : {
                    display : true,
                    position : "top",
                    lineWidth: 0,
                    labels: {
                        color: "white",
                    }
                },
                title : {
                    display : false,
                    text : "Daily Revenue",
                    
                }
            },
            maintainAspectRatio  : false,
            responsive : true
        })
    }, [])
    return (
        <div className="w-full col-span-3 relative  h-[60vh]   p-8 pb-20 border-none rounded-lg bg-card-custom  overflow-hidden text-white">
            <h1 className="text-2xl ">Teams Per Attack</h1>
            <hr className="mt-5 h-0.5 border-t-0 bg-white opacity-30" />
                <Pie  data={chartData} options={chartOptions} height={200} width={200}  />
        </div>
    )
}