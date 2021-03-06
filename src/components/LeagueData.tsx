import React from 'react'
import { PieGraph } from './index'

type Props = {
    league: {
        position: number,
        playedGames: number,
        points: number,
        won: number,
        draw: number,
        lost: number,
        goalsFor: number,
        goalsAgainst: number
    }
}

const LeagueData = ({league}: Props)=>{
        const points =  league ? league.points : 0
        const won =  league ? league.won : 0
        const draw =  league ? league.draw : 0
        const lost =  league ? league.lost : 0
        const goalsFor =  league ? league.goalsFor : 0
        const goalsAgainst =  league ? league.goalsAgainst : 0

        const dataArr = [won, lost, draw]

	return (
        <div className="bg-gray-50 text-gray-700 border border-gray-300  font-semibold w-11/12 mx-auto rounded-lg h-64" >
            <p className="p-3">リーグデータ</p>
            <div className="flex justify-between px-12 pt-1 pb-2" >
                <p>得点: {goalsFor}点</p>
                <p>失点: {goalsAgainst}点</p>
                <p>得失点: {goalsFor - goalsAgainst}点</p>
            </div>
            <div className="flex w-full px-1" >
                <div className="w-4/5">
                    <PieGraph
                        labels={["won", "lost", "draw"]}
                        dataArr={dataArr}
                    />
                </div>
                <div className="w-1/5 ">
                    <p className="mt-12 mb-1" >勝点</p>
                    <p>{points}点</p>
                </div>
            </div>
        </div>
)
}

export default LeagueData