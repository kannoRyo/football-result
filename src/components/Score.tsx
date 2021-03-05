import React from 'react'
import {isWin} from '../types/isWin'
import {Spacer} from './index'

type Props = {
    result:{
        isWin: isWin,
        score:{
            homeTeam: number,
            awayTeam: number

		},
		enemyUrl: string
    }
}

const resultScore = ({result}: Props)=>{	
	const bgColor = ( result.isWin === "WIN" ) ? "bg-green-400" : ( result.isWin === "LOSE" ) ? "bg-red-400" : "bg-gray-400"

	return (
		<>
			<div className={`text-white text-xs rounded p-1 px-2 ${bgColor}`}>
				<p>{`${result.score.homeTeam} - ${result.score.awayTeam}` }</p>
			</div>
			<Spacer
				size={"small"}
			/>
		</>
)
}

export default resultScore