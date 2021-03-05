import React, {useEffect, useState} from 'react'
import {ResultCard} from './index'
import { fetchMatches } from '../api/fetchMatches'
import { fetchEnemyLogo } from '../api/fetchEnemyLogo'
import {calcIsWinner} from '../utils/calcIsWinner'
import { fetchResults } from '../api/fetchResults'


const GameResults = ()=>{
    const [results, setResults] = useState<any[]>()
    const [teamName, setTeamName] = useState("FC Barcelona")
 
    useEffect(() => {
        ( async ()=>{
            const matches = await fetchMatches()    
            const results = await fetchResults(matches, teamName)
            setResults(results)
        })()
    },[])

	return (
        <>
            <div className="bg-white text-gray-700 border border-gray-300 font-semibold w-11/12 mx-auto rounded" >
                <p className="p-3">直近5試合の成績</p>
                <div className="flex flex-row justify-between mx-4" >
                    {  
                        results && results.map( (result, i) => (
                        <ResultCard key={i.toString()} result={result} />
                    ))
                    }
                </div>
            </div>
        </>
)
}

export default GameResults