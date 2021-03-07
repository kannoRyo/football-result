const BASE_URL = "https://api.football-data.org/v2"

const headers = new Headers()
if(typeof process.env.REACT_APP_TOKEN === "string"){
    headers.set('X-Auth-Token' , process.env.REACT_APP_TOKEN)
}

export const fetchEnemyLogo = async(ids: number[], nextMatchId: number) => {
    const res = await fetch(`${BASE_URL}/teams/?areas=2224,2088,2072,2081,2114`, {
        method: "GET",
        headers: headers
    })

    const resJson = await res.json()
    // const teams = resJson.teams.filter((team: any) => ids.includes(team.id) )

    const teams = ids.map((id) => {
        const team =  resJson.teams.filter((team: any) => team.id === id)
        return team[0]
    })

    const [nextTeam] = resJson.teams.filter((team: any) => team.id === nextMatchId)
    const logoUrl = teams.map((team: any) => team.crestUrl)

    return {
        enemyUrls:logoUrl,
        nextTeam: nextTeam
    }
}