import React from 'react'
import dayjs from 'dayjs'
import { daysArray } from '../utils/daysArray'

type Props = {
    nextMatch: {
        nextMatch: any,
        nextTeamUrl: string
    },
    teamName: string
}

const NextMatchCard = ({nextMatch, teamName}: Props)=>{
    const enemyName = nextMatch ? (nextMatch.nextMatch.homeTeam.name!== teamName) ? nextMatch.nextMatch.homeTeam.name : nextMatch.nextMatch.awayTeam : ""
    const matchTime = nextMatch ? dayjs(nextMatch.nextMatch.utcDate).format("HH:mm") : ""
    const matchDate =  nextMatch ? dayjs(nextMatch.nextMatch.utcDate).format("MM/DD") : ""
    const matchDay =  nextMatch ? daysArray[dayjs(nextMatch.nextMatch.utcDate).day()] : ""

    console.log(matchTime)

	return (
    <div>
        <p className="p-3">次の試合</p>
        {
            nextMatch ? (
                <div className="flex px-4 w-full">
                    <div className="w-1/3">
                        <img src={nextMatch.nextTeamUrl} alt="" height="80" width="80" className="py-3" />
                    </div>
                    <div className="w-2/3 pl-5">
                        <p>{enemyName}</p>
                        <p>{matchDate}({matchDay})</p>
                        <p>{matchTime}</p>
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
