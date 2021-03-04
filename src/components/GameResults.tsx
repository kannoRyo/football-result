import React, {useEffect, useState} from 'react'
import {GameResult} from './index'
import { fetchMatches } from '../api/fetchMatches'


const GameResults = ()=>{
    const [matches, setMatches] = useState()

    console.log(matches)

    useEffect(() => {
        ( async ()=>{
            const matches = await fetchMatches()
            setMatches(matches)
        })()
    },[])

	return (
        <>
            <div className="bg-white text-gray-700 border border-gray-300 font-semibold w-11/12 mx-auto rounded" >
                <p className="p-3">直近5試合の成績</p>
                <div className="flex flex-row justify-between mx-4" >
                    <GameResult />
                    <GameResult />
                    <GameResult />
                    <GameResult />
                    <GameResult />
                </div>
            </div>
        </>
)
}

export default GameResults