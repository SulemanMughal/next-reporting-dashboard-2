"use client"

import React, {useState, useEffect} from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  indexAxis: 'y' ,
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
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom' ,
      labels : {
        color : "white"
      }
    },
    title: {
      display: false,
      text: 'Chart.js Horizontal Bar Chart',
    },
  },
};

function getLabels(data) {
  let teams = []
  let ids = []
  let submissions = []
  let points = []
  data.map((item) => {
    // console.debug(item)
    points.push(item.obtainedPoints)
    ids.push(item.teamId)
    submissions.push(item.submission)
    teams.push(item.name)
  })
  return [points,ids, submissions, teams]
}



export default function TopTeamChart({top_teams}) {
  const [teams, setTeams] = useState(null);
  useEffect(() => {

    setTeams({
      labels : getLabels(top_teams)[3],
      datasets: [
        {
          label: 'Solved Questions',
          data: getLabels(top_teams)[2],
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          stack: 'Stack 0'
        },
        {
          label: 'Obtained Points',
          data:  getLabels(top_teams)[0],
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
          stack: 'Stack 0'
        },
      ],
    })

  }, []);
    return (
      <div className="w-full col-span-2 relative  h-[80vh]   p-8 pb-20 border-none rounded-lg bg-card-custom overflow-hidden text-white">
        <h1 className="text-2xl ">Top Teams</h1>
        <hr className="mt-5 h-0.5 border-t-0 bg-white opacity-30" />
        {teams && <Bar options={options} data={teams}  /> }  
      </div>
    )
}
