const dayjs = require("dayjs");
const BASE_URL = "https://api.football-data.org/v2"

const headers = new Headers()
if(typeof process.env.REACT_APP_TOKEN === "string"){
    headers.set('X-Auth-Token' , process.env.REACT_APP_TOKEN)
}

const today = dayjs().format("YYYY-MM-DD")

//　チーム名
const TEAM_NAME = "Real Madrid CF"

export const fetchMatches = async (teamName: string) => {
    const res =  await fetch(`${BASE_URL}/teams/?areas=2224`, {
        method: "GET",
        headers: headers
    })

    const resJson =  await res.json()
    const [team] = resJson.teams.filter((team: any) => team.name ===  teamName ) 

    console.log(team)

    const teamId = team.id
    const teamUrl = team.crestUrl

    const res_2 = await fetch(`${BASE_URL}/teams/${teamId}/matches`,{
        method: "GET" ,
        headers: headers
    })

    const resJson_2 = await res_2.json()
    

    const fetchMatches = resJson_2.matches.filter((match: any) => {
        return ( match.utcDate < today && match.competition.name === "Primera Division" )       
    })

    const fetchNextMatches = resJson_2.matches.filter((match: any) => {
        return ( match.utcDate >= today && match.competition.name === "Primera Division" )       
    })

    const fetchNextMatch = fetchNextMatches[0]

    return {
        matches: fetchMatches.slice(-5),
        nextMatch: fetchNextMatch,
        teamUrl: teamUrl
    }
}
