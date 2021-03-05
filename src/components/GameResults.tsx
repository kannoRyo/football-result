import React from 'react'
import {ResultCard } from './index'
// import { isWin } from '../types/isWin'

const GameResults = ({results}: any)=>{
	return (
        <>
            <div className="bg-gray-50 text-gray-700 border border-gray-300  font-semibold w-11/12 mx-auto rounded-lg" >
                <p className="p-3">直近5試合の成績</p>
                <div className="flex flex-row justify-between mx-4" >
                    {  
                        results && results.map( (result: any, i: any) => (
                        <ResultCard key={i.toString()} result={result} />
                    ))
                    }
                </div>
            </div>
        </>
)
}

export default GameResults