export const calcIsWinner = (teamName:string, winner: string , homeTeamName: string) => {
    if(winner === "DRAW") {
        return "DRAW"
    }

    if(homeTeamName === teamName) {
        const isWin =  winner === "HOME_TEAM" ? "WIN" : "LOSE"
        return isWin
    } else {
        const isWin =  winner === "AWAY_TEAM" ? "WIN" : "LOSE" 
        return isWin
    }
}