import React, {useState, useEffect} from 'react';

// css
import './assets/css/App.css';
import './assets/css/style.css'

// fetch API
import { fetchLeague } from './api/fetchLeague';
import { fetchMatches } from './api/fetchMatches';
import { fetchResults } from './api/fetchResults';


import { Header, GameResults, Spacer, NextMatchCard, LeaguePosition, LeagueData, SelectTeamDialog, Loader } from './components/index'

// types
import { Results } from './types/Results'
import { League } from './types/League'

import dayjs from 'dayjs';
import { daysArray } from './utils/daysArray';
import {leagueNameArr} from './utils/leagueNameArr'
import {leagueObject} from './utils/leagueObject'

//　チーム名
const TEAM_NAME = "FC Barcelona"

const App = () => {
  const [results, setResults] = useState<Results| undefined>()
  const [league, setLeague] = useState<any>()
  const [teamName, setTeamName] = useState(TEAM_NAME)
  const [nextMatch, setNextMatch] = useState<any>()
  const [nextMatchUrl, setNextMatchUrl] = useState<any>()
  const [teamUrl, setTeamUrl] = useState<string>("")
  const [open, setOpen]=useState<boolean>(false)
  const [leagueName, setLeagueName] = useState<League>("Primera Division")
  const [isLoading, setIsLoading] = useState(true)

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
        document.addEventListener( "touchmove", (e: TouchEvent) => {
          e.preventDefault()
        }, {passive: false})

        setIsLoading(true)
        const selectedLeague = leagueObject[leagueName] 

        const {matches, nextMatch, teamUrl} = await fetchMatches(teamName, selectedLeague.area, leagueName)    
        const nextMatchId =  (nextMatch.homeTeam.name!== teamName) ? nextMatch.homeTeam.id : nextMatch.awayTeam.id
        const {results, nextTeamUrl} = await fetchResults(matches, teamName, nextMatchId)
        const league =  await fetchLeague(teamName, selectedLeague.competition)
  
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

  // fetch完了するまではLoad画面になる
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


