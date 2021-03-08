const BASE_URL = "https://api.football-data.org/v2"

const headers = new Headers()
if(typeof process.env.REACT_APP_TOKEN === "string"){
    headers.set('X-Auth-Token' , process.env.REACT_APP_TOKEN)
}

export const fetchLeague = async(teamName: string, competitionId: number) => {
    const res = await fetch(`${BASE_URL}/competitions/${competitionId}/standings`,{
        method: "GET",
        headers: headers
    })
    const resJson = await res.json()
    const [team] = resJson.standings[0].table.filter((table: any, i: number)=> table.team.name === teamName )

    const position = team.position
    const playedGames = team.playedGames
    const points = team.points
    const won = team.won
    const draw = team.draw
    const lost = team.lost
    const goalsFor = team.goalsFor
    const goalsAgainst = team.goalsAgainst

    return {
        position: position,
        playedGames: playedGames,
        points: points,
        won: won,
        draw: draw,
        lost: lost,
        goalsFor: goalsFor,
        goalsAgainst: goalsAgainst
    }
}
