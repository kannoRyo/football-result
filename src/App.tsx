import React, {useState, useEffect} from 'react';
import './assets/css/App.css';
import './assets/css/style.css'
import { fetchLeague } from './api/fetchLeague';
import { fetchMatches } from './api/fetchMatches';
import { fetchResults } from './api/fetchResults';

import { Header, GameResults, Spacer, NextMatchCard, LeaguePosition, LeagueData, SearchTeams, SelectTeamDialog, Loader } from './components/index'
import { isWin } from './types/isWin';
import dayjs from 'dayjs';
import { daysArray } from './utils/daysArray';
import {leagueNameArr} from './utils/leagueNameArr'
import {leagueObject} from './utils/leagueObject'
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

type LEAGUE = "Primera Division" | "Bundesliga" | "Premier League" | "Serie A"

const App = () => {
  const [results, setResults] = useState<Results| undefined>()
  const [league, setLeague] = useState<any>()
  const [teamName, setTeamName] = useState(TEAM_NAME)
  const [nextMatch, setNextMatch] = useState<any>()
  const [nextMatchUrl, setNextMatchUrl] = useState<any>()
  const [teamUrl, setTeamUrl] = useState<string>("")
  const [open, setOpen]=useState<boolean>(false)
  const [isLoading, setIsLoading] = useState(true)
  // const [areaId, setAreaId] = useState()
  const [leagueName, setLeagueName] = useState<LEAGUE>("Primera Division")

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

  const handleLeague = (e:  React.ChangeEvent<{name?: string | undefined; value: unknown;}>) => {
    const league:any = e.target.value
    setLeagueName(league)
  }
  
  const { position, playedGames, } = (league) ? league : ""

  useEffect(() => {
    ( async ()=>{
        setIsLoading(true)
        const leagueOb = leagueObject[leagueName] 
        const {matches, nextMatch, teamUrl} = await fetchMatches(teamName, leagueOb.area, leagueName)    
        const nextMatchId =  (nextMatch.homeTeam.name!== teamName) ? nextMatch.homeTeam.id : nextMatch.awayTeam.id
        const {results, nextTeamUrl} = await fetchResults(matches, teamName, nextMatchId)
        const league =  await fetchLeague(teamName, leagueOb.competition)
  
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
        setIsLoading(false)
      })()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[teamName])

  return (
    <>
    {
      (isLoading) ? (
        <Loader />
      ) : (
        <div className="c-section"> 
          <div className="c-box bg-gray-50">
            <Header 
              teamName={teamName}
              teamUrl={teamUrl} 
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
            leagueNameArr={leagueNameArr}
            leagueName={leagueName}
            handleLeague={handleLeague}
          />
        </div> 
      )
    }
    </>
  );
}

export default App;


