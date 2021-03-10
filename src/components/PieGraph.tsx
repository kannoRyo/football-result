import React from 'react'
import { Pie } from 'react-chartjs-2'

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