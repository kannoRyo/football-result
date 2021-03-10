import {IsWin} from './IsWin'

export type Results = {
    results:{
        isWin: IsWin,
        score:{
          homeTeam: number,
          awayTeam: number
          
        },
        enemyUrl: string,
        enemyName: string
      }[]    
}