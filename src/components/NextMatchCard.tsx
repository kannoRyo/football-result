import React from 'react'
import dayjs from 'dayjs'
import { daysArray } from '../utils/daysArray'

type Props = {
    nextMatch: any,
    nextMatchUrl: string
    teamName: string
}

const NextMatchCard = ({nextMatch, teamName, nextMatchUrl}: Props)=>{

	return (
    <div>
        <p className="p-3">次の試合</p>
        {
            nextMatch ? (
                <div className="flex pl-4 px-1 w-full">
                    <div className="w-1/3">
                        <img src={nextMatchUrl} alt="" height="80" width="80" className="py-3" />
                    </div>
                    <div className="w-2/3 pl-5">
                        <p>{nextMatch.enemyTeam}</p>
                        <p>{nextMatch.matchDate}({nextMatch.matchDay})</p>
                        <p>{nextMatch.matchTime}</p>
                    </div>
                </div>
            ) : (
                <p className="px-3" >情報なし</p>
            )
        }
    </div>
)
}

export default NextMatchCard
