import React, {useState, useEffect} from 'react';
import './assets/css/App.css';
import './assets/css/style.css'
import { fetchLeague } from './api/fetchLeague';
import { fetchMatches } from './api/fetchMatches';
import { fetchResults } from './api/fetchResults';

import { Header, GameResults, Spacer, NextMatchCard, LeaguePosition, LeagueData, SearchTeams, SelectTeamDialog } from './components/index'
import { isWin } from './types/isWin';
import dayjs from 'dayjs';
import { daysArray } from './utils/daysArray';

import algoliasearch from 'algoliasearch/lite';

import { InstantSearch } from 'react-instantsearch-dom';



//　チーム名
const TEAM_NAME = "Club Atlético de Madrid"

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
  const [teamName, setTeamName] = useState(TEAM_NAME)
  const [nextMatch, setNextMatch] = useState<any>()
  const [nextMatchUrl, setNextMatchUrl] = useState<any>()
  const [teamUrl, setTeamUrl] = useState<string>("")
  const [open, setOpen]=useState<boolean>(false)

  const handleTeamName = (team: string) => {
    setTeamName(team)
    setOpen(false)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  useEffect(() => {
    ( async ()=>{
      const {matches, nextMatch, teamUrl} = await fetchMatches(teamName)    
      const nextMatchId =  (nextMatch.homeTeam.name!== teamName) ? nextMatch.homeTeam.id : nextMatch.awayTeam.id
      const {results, nextTeamUrl} = await fetchResults(matches, teamName, nextMatchId)
      const league =  await fetchLeague(teamName)
    
          setLeague(league)
          setResults(results)
          setNextMatch({
            enemyTeam: (nextMatch.homeTeam.name!== teamName) ? nextMatch.homeTeam.name : nextMatch.awayTeam.name ,
            matchTime: dayjs(nextMatch.utcDate).format("HH:mm"),
            matchDate: dayjs(nextMatch.utcDate).format("MM/DD"),
            matchDay: daysArray[dayjs(nextMatch.utcDate).day()]
          })
          setNextMatchUrl(nextTeamUrl)
          setTeamUrl(teamUrl)
      })()
  },[teamName])

  console.log(open)

  const { position, playedGames, } = (league) ? league : ""

  return (
    <div className="c-section"> 
      <div className="c-box bg-gray-50">
        <Header 
          teamUrl={teamUrl} 
          handleTeamName={handleTeamName} 
          handleOpen={handleOpen}
        />
        <Spacer
          size={"large"}
        />
        <div className="flex w-11/12 mx-auto">
          <div className="bg-gray-50 text-gray-700 border border-gray-300  font-semibold w-3/5 mx-auto rounded-lg h-36 mr-2" >
              <NextMatchCard
                nextMatch={nextMatch}   
                teamName={teamName}      
                nextMatchUrl={nextMatchUrl} 
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
      <SelectTeamDialog 
        open={open}
        handleClose={handleClose}
        handleTeamName={handleTeamName}
      />
    </div>
  );
}

export default App;
