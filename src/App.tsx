import React, {useState, useEffect} from 'react';
import './assets/css/App.css';
import './assets/css/style.css'
import { fetchLeague } from './api/fetchLeague';
import { fetchMatches } from './api/fetchMatches';
import { fetchResults } from './api/fetchResults';

import { Header, GameResults, Spacer, NextMatchCard, LeaguePosition, LeagueData } from './components/index'
import { isWin } from './types/isWin';

type Results = {
  results:{
      isWin: isWin,
      score:{
          homeTeam: number,
          awayTeam: number

      },
      enemyUrl: string,
      enemyName: string
  }[]
}

const App = () => {
  const [results, setResults] = useState<Results| undefined>()
  const [league, setLeague] = useState<any>()
  const [teamName, setTeamName] = useState("FC Barcelona")
  const [nextMatch, setNextMact] = useState<any>()
  const [teamUrl, setTeamUrl] = useState<string>("")

  useEffect(() => {
      ( async ()=>{
          const {matches, nextMatch, teamUrl} = await fetchMatches()    
          const nextMatchId =  (nextMatch.homeTeam.name!== teamName) ? nextMatch.homeTeam.id : nextMatch.awayTeam.id
          const {results, nextTeamUrl} = await fetchResults(matches, teamName, nextMatchId)
          const league =  await fetchLeague(teamName)

          console.log(teamUrl)

          setLeague(league)
          setResults(results)
          setNextMact({
            nextMatch: nextMatch,
            nextTeamUrl: nextTeamUrl
          })
          setTeamUrl(teamUrl)
      })()
  },[])

  const { position, playedGames, } = (league) ? league : ""

  return (
    <div className="c-section"> 
      <div className="c-box bg-gray-50">
        <Header teamUrl={teamUrl} />
        <Spacer
          size={"medium"}
        />
        <div className="flex w-11/12 mx-auto gap-3">
          <div className="bg-gray-50 text-gray-700 border border-gray-300  font-semibold w-3/5 mx-auto rounded-lg h-36">
              <NextMatchCard
                nextMatch={nextMatch}   
                teamName={teamName}       
              />
          </div>
          <div className="bg-gray-50 text-gray-700 border border-gray-300  font-semibold w-2/5 mx-auto rounded-lg h-36">
              <LeaguePosition
                position={position}
                playedGames={playedGames}
              />
          </div>
        </div>
        <Spacer
            size={"medium"}
        />
        <LeagueData
          league={league}
        />
        <Spacer
            size={"medium"}
        />
        <GameResults 
          results={results}
        />
      </div>
    </div>
  );
}

export default App;
