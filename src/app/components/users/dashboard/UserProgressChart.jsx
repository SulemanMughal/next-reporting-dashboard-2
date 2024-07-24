"use client"

import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// ChartJS.register(ArcElement, Tooltip, Legend);

import { useState, useEffect } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

// export const data = {
//   labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//   datasets: [
//     {
//       label: '# of Votes',
//       data: [12, 19, 3, 5, 2, 3],
//       backgroundColor: [
//         'rgba(255, 99, 132, 0.2)',
//         'rgba(54, 162, 235, 0.2)',
//         'rgba(255, 206, 86, 0.2)',
//         'rgba(75, 192, 192, 0.2)',
//         'rgba(153, 102, 255, 0.2)',
//         'rgba(255, 159, 64, 0.2)',
//       ],
//       borderColor: [
//         'rgba(255, 99, 132, 1)',
//         'rgba(54, 162, 235, 1)',
//         'rgba(255, 206, 86, 1)',
//         'rgba(75, 192, 192, 1)',
//         'rgba(153, 102, 255, 1)',
//         'rgba(255, 159, 64, 1)',
//       ],
//       borderWidth: 1,
//     },
//   ],
// };


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
  

export default function UserProgressChart({userName, userAnswersCategory}) {
    const [chartData, setChartData] = useState(null);
    const [chartOptions, setChartOptions] = useState({});
    const [chartLabels, setChartLabels] = useState(null);
    useEffect(() => {
        // console.debug(userAnswersCategory)
        let labels = []
        let data = []
        let backgroundColorArr = []
        userAnswersCategory.forEach((element, index) => {
            labels.push(element.scenarioName)
            data.push(element.totalObtainedPoints)
            backgroundColorArr.push(getRandomColor())
        })
        // console.debug(labels)
        setChartLabels(labels)
        setChartData({
            labels: labels,
            datasets: [
              {
                label: `${userName.toUpperCase()}`,
                data: data,
                backgroundColor: backgroundColorArr,
                borderWidth: 0.1,
                // weight: 0.03,
                // cutout: 120,
                radius : 100,
              },
            ],
          })

        // console.debug(labels)
          setChartOptions({
            plugins : {
                legend : {
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            {chartData && <Doughnut data={chartData} options={chartOptions} height={"400px"}  /> }
        </>
    )
    
}
