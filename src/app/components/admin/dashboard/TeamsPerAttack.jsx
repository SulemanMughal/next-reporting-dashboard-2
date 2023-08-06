"use client"
import { useEffect, useState } from "react"
var ColorScheme = require('color-scheme');

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut, Pie } from 'react-chartjs-2';
import axios from "axios";
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

export default function TeamsPerAttack(){
    const [chartData, setChartData] = useState({
        datasets : []
    });

    var s = new ColorScheme;
    var colors = s.scheme('tetrade')
    .distance(0.75)
    .colors();
    const [chartOptions, setChartOptions] = useState({});
    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/teams_per_attack`)
        .then(response => {
            setChartData({
                labels: getLabels(response.data.teams_per_attack_logs)[0],
                datasets: [
                    { label: 'Teams', data: getLabels(response.data.teams_per_attack_logs)[1], backgroundColor: colors.map(i => '#' + i) },
                ]
            })
            setChartOptions({
                radius : "90%",
                cutout: "55%",
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
            <h1 className="text-2xl ">Teams Per Attack</h1>
            <hr className="mt-5 h-0.5 border-t-0 bg-black opacity-30" />
                <Pie  data={chartData} options={chartOptions} height={200} width={200}  />
        </div>
    )
}