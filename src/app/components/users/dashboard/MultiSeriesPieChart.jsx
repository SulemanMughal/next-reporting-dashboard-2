"use client"


import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useState, useEffect } from 'react';




ChartJS.register(ArcElement, Tooltip, Legend);



const colors = [
    "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd",
    "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf",
    "#aec7e8", "#ffbb78", "#98df8a", "#ff9896", "#c5b0d5",
    "#c49c94", "#f7b6d2", "#c7c7c7", "#dbdb8d", "#9edae5",
    "#c7c7c7", "#f7b6d2", "#c49c94", "#dbdb8d", "#9edae5",
    "#c7c7c7", "#f7b6d2", "#c49c94", "#dbdb8d", "#9edae5",
    "#c7c7c7", "#f7b6d2", "#c49c94", "#dbdb8d", "#9edae5",
    "#c7c7c7", "#f7b6d2", "#c49c94", "#dbdb8d", "#9edae5",
    "#c7c7c7", "#f7b6d2", "#c49c94", "#dbdb8d", "#9edae5",
    "#c7c7c7", "#f7b6d2", "#c49c94", "#dbdb8d", "#9edae5",
    "#c7c7c7", "#f7b6d2", "#c49c94", "#dbdb8d", "#9edae5"
  ];

function getRandomColor() {
    return colors[Math.floor(Math.random() * 49)]
}
  

export default function MultiSeriesPieChart({userName , userAnswersCategory}) {
    const [chartData, setChartData] = useState(null);
    const [chartOptions, setChartOptions] = useState({});
    useEffect(() => {
        let datasets = []
        userAnswersCategory.forEach((element, index) => {
            datasets.push({
                label: element.scenarioName,
                data: [element.totalObtainedPoints , element.totalPoints-element.totalObtainedPoints ],
                backgroundColor: [
                    `${getRandomColor()}`,
                    'rgba(0, 0, 0, 0.2)',
                ],
                borderWidth: 0,
                weight: 0.03,
                cutout: 120,
                radius  : `${(200/userAnswersCategory.length) - ((index+1)*4)}%`,
            })
        })
        setChartData({
            labels : [userName.toUpperCase()],
            datasets : datasets
        })
        setChartOptions({
            plugins : {
                legend : {
                    position : "top",
                },
                title : {
                    display : true,
                    text : "Daily Revenue"
                }
            },
            maintainAspectRatio  : false,
            responsive : true
        })
    }, [userName , userAnswersCategory])
  
    return (
        <>
            <div style={{height:"450px"}}>
                {chartData &&  <Doughnut data={chartData} options={chartOptions} />} 
            </div>
        </>
    );
}