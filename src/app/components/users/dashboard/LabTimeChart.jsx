"use client"

import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

const options = {
    legend: {
        display: true
    },
    scales: {
        x: {
            ticks: {
                fontSize: '12',
                fontColor: '#718096'
            },
            gird: {
                display :false,
                color: '#718096',
                zeroLineColor: '#718096',
                tickBorderDash: [5, 5],
            }
        },
        y: {
            ticks: {
                fontSize: '12',
                fontColor: '#718096',
                // callback: function(value, index, values) {
                //     return value
                // }
            },
            grid: {
                display :true,
                color: '#718096',
                zeroLineColor: '#718096',
                tickBorderDash: [5, 5],
                // zeroLineBorderDash:  [2, 2],
                // drawBorder: false
            },
            border: {
                dash: [2,2],
            },
        }
    },
    elements: {
        line: {
            tension: 0.5
        }
    }
};
  

  const labels =  ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  var gaussian = require('gaussian');



// calculate mean for an array
function mean(arr) {
    return arr.reduce((a, b) => a + b, 0) / arr.length;
}


// calculate standard deviation for an array
function std(arr) {
    const mu = mean(arr);
    const diffArr = arr.map(a => (a - mu) ** 2);
    return Math.sqrt(diffArr.reduce((a, b) => a + b, 0) / arr.length);
}


// calculate variance for an array
function variance(arr) {
    const mu = mean(arr);
    const diffArr = arr.map(a => (a - mu) ** 2);
    return diffArr.reduce((a, b) => a + b, 0) / arr.length;
}


// an arran of numbers of size 12 of random numbers
// const arr = Array.from({ length: 12 }, () => Math.floor(Math.random() * 100));


// loop over the array and calculate the mean
// const mean = arr => arr.reduce((a, b) => a + b, 0) / arr.length;

// loop over an array and create an array of the differences
// const diffArr = arr.map(a => (a - mu) ** 2);




// Labs Time Chart
export default function LabTimeChart(){

    // const arr = Array.from({ length: 12 }, () => Math.floor(Math.random() * 100))


    // console.debug(arr )

    // // // console.debug(arr)
    // var distribution = gaussian(mean(arr), std(arr), variance(arr) );
    // console.debug(distribution)
    
    // // const normalNumbersWithMeanAndStd = Array.from({ length: 12 }, () => Math.floor(Math.random() * 100))
    
    // // let new_arr = [];




    // arr.map( (element) => (  element, console.debug(distribution.ppf(element))));

    // const mean = 58.25;
    // const variance = 32.42202183701689;
    // const standardDeviation = 5.694033880915787;
  
    // // Calculate Gaussian distribution values for data points
    // const dataPoints = [6, 88, 67, 98, 23, 37, 45, 14, 59, 8, 97, 19];
    // const gaussianValues = dataPoints.map((x) => {
    //   const coefficient = 1 / (Math.sqrt(2 * Math.PI * variance));
    //   const exponent = -((x - mean) ** 2) / (2 * variance);
    //   return coefficient * Math.exp(exponent);
    // });

    // console.debug( arr, new_arr  )
    const logs = {
        labels,
        datasets: [
            {
                label: 'Lab Time',
                data:  [0,0,0,0,0,0,0,4,0,0,0,0],  
                borderWidth: 2,
                borderColor: '#3160D8',
                backgroundColor: 'transparent',
                pointBorderColor: 'transparent'
            },
            {
                label: 'Hits',
                data:  [0,0,0,0,0,0,0,0,4,0,0,0],
                borderWidth: 2,
                borderDash: [2, 2],
                borderColor: '#BCBABA',
                backgroundColor: 'transparent',
                pointBorderColor: 'transparent'
            }
        ],
      }

    return (
        <>
            <div  className='col-span-6'>
        <div className="intro-y block sm:flex items-center h-10  py-10">
            <h2 className="text-lg font-medium truncate mr-5 text-white">
                Lab Time
            </h2>
                        <div className="sm:ml-auto mt-3 sm:mt-0 relative text-gray-700 text-gray-300">
                    <select className="appearance-none placeholder-gray-300 outline-0  border border-2 border-deep-blue-violet focus:border focus:border-2 focus:border-blue-900  text-gray-300    w-full p-2 pl-4 pr-8   m-0 mt-2 text-base block bg-deep-indigo  rounded-md shadow-sm" >
                        <option value="" disabled="">Year</option>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-5 w-5 mt-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
                </div>
                </div>
        <div className="intro-y box p-5 mt-14 sm:mt-5 bg-deep-blue-violet rounded-lg">
            <div className="flex flex-col xl:flex-row xl:items-center mb-5">
                <div className="flex">
                    <div>
                        <div className="text-theme-20 text-gray-300 text-lg xl:text-xl font-bold">4</div>
                        <div className="text-gray-400 text-gray-400">Hits</div>
                    </div>
                    <div className="w-px h-12 border border-r border-dashed border-gray-300 border-dark-5 mx-4 xl:mx-6"></div>
                    <div>
                        <div className="text-gray-400 text-gray-400 text-lg xl:text-xl font-medium">0 Hours</div>
                        <div className="text-gray-400 text-gray-400">Avg. lab time per month</div>
                    </div>
                </div>
            </div>

            <div >
                {  logs &&    <Line options={options} data={logs}   height={318} width={650} /> }

            </div>

            
        </div>
        
        
                </div>
        </>
    )
}