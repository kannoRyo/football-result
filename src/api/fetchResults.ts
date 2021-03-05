import { calcIsWinner } from "../utils/calcIsWinner"
import { fetchEnemyLogo } from "./fetchEnemyLogo"

export const fetchResults = async (matches: any, teamName: any) => {
    const scores = matches.map((match: any)=>{
        return match.score
    })

    const homeTeamName = matches.map((match: any)=>{
        return match.homeTeam.name
    })

    const enemyTeamsId =  matches.map( (match: any) => {
        const enemy = (match.homeTeam.name!== teamName) ? match.homeTeam : match.awayTeam
        return enemy.id
    })

    const enemyTeamsName =  matches.map( (match: any) => {
        const enemy = (match.homeTeam.name!== teamName) ? match.homeTeam : match.awayTeam
        return enemy.name
    })

    const enemyUrls = await fetchEnemyLogo(enemyTeamsId)

    const isWins = scores.map((score: any, i: number) => {
        return calcIsWinner(teamName, score.winner, homeTeamName[i])
    })

    return isWins.map((isWin: string, i: number) => {
        return {
            isWin: isWin,
            score: scores[i].fullTime,
            enemyUrl: enemyUrls[i],
            enemyName: enemyTeamsName[i]
        }
    })
}