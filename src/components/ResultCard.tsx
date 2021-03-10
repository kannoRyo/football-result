import React from 'react'
import {Score, EnemyLogo, Spacer } from './index'
import {IsWin} from '../types/IsWin'

type Props = {
    result:{
        isWin: IsWin,
        score:{
            homeTeam: number,
            awayTeam: number

        },
        enemyUrl: string,
        enemyName: string
    }
}

const GameResult = ({result}: Props)=>{
	return (
        <>
            <div>
                <Score result={result} />
                <EnemyLogo logo={result.enemyUrl} name={result.enemyName} />
                <Spacer size={"small"} />
            </div>
        </>
)
}

export default GameResult