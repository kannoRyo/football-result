import React from 'react'
import { Pie } from 'react-chartjs-2'

const dataa: any = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
        options: {
            responsive: true,
            legend: {
                display: false
            }
        }
      },
    ],
}

const PieGraph = ({labels, dataArr}: any)=>{
    
    const data: any = {
        labels: labels,
        datasets: [
          {
            label: '# of Votes',
            data: dataArr,
            backgroundColor: [
              'rgba(75, 192, 192, 0.3)',
              'rgba(255, 99, 132, 0.3)',
              'rgba(170, 170, 170, 0.3)',
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(170, 170, 170, 1)',
            ],
            borderWidth: 1,
            options: {
                responsive: true,
                legend: {
                    display: false
                }
            }
          },
        ],
    }

	return (
        <div>
            <Pie data={data}  />
        </div>
)
}

export default PieGraph