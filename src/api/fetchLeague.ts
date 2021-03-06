const BASE_URL = "https://api.football-data.org/v2"

const headers = new Headers()
if(typeof process.env.REACT_APP_TOKEN === "string"){
    headers.set('X-Auth-Token' , process.env.REACT_APP_TOKEN)
}

export const fetchLeague = async(teamName: string) => {
    const res = await fetch(`${BASE_URL}/competitions/2014/standings`,{
        method: "GET",
        headers: headers
    })
    const resJson = await res.json()
    const [team] = resJson.standings[0].table.filter((table: any, i: number)=> table.team.name === teamName )

    const position = team.position
    const playedGames = team.playedGames
    const won = team.won
    const draw = team.draw
    const lost = team.lost

    return {
        position: position,
        playedGames: playedGames,
        won: won,
        draw: draw,
        lost: lost,
    }
}
