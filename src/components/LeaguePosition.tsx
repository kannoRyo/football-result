import React from 'react'
import {Spacer} from './index'

type Props = {
    position: number,
    playedGames: number
}

const LeaguePosition = ({position, playedGames}: Props)=>{

	return (
        <>
        <p className="px-3 pt-3 pb-2">現在の順位</p>
        {
            position ? (
                <div>
                    <div className="pl-11">
                        <h2 className="m-0" ><span className="text-6xl pr-2" >{position}</span>位</h2>
                    </div>
                    <p className="text-sm text-center py-1" >({playedGames}節時点)</p>
                </div>
            ) : (
                <p className="p-3"　>情報なし</p>
            )
        }
        </>
)
}

export default LeaguePosition
