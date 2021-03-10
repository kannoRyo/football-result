import React from 'react'
import { Dialog, Select, MenuItem } from '@material-ui/core'
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch-dom';
import { SearchTeams } from './index'

type Props = {
    open: boolean,
    leagueName: any,
    leagueNameArr: string[],
    handleClose: () => void,
    handleLeague: (e:  React.ChangeEvent<{name?: string | undefined; value: unknown;}>) => void,
    handleTeamName: (team: string) => void
}

const SelectTeamDialog = ({open, handleClose, handleTeamName, leagueNameArr, leagueName, handleLeague}: Props)=>{
    
    // algolia設定
    const searchClient = algoliasearch(
		String(process.env.REACT_APP_ALGOLIA_ID),
		String(process.env.REACT_APP_ALGOLIA_KEY)
    )
    
	return (
        <Dialog open={open} onClose={handleClose} style={{top: "-60px"}} >
            <div> 
                <div className="my-5 mx-8" >
                    <Select
                        value={leagueName}
                        onChange={(e: React.ChangeEvent<{name?: string | undefined; value: unknown;}>) => handleLeague(e)}
                        fullWidth={true}
                    >
                        {
                            leagueNameArr.map((league: any, i: number) => (
                                <MenuItem value={league} key={i.toString()} >{league}</MenuItem>
                            ))
                        }
                    </Select>
                    {
                        (leagueName === "Primera Division") && (
                            <p　className="pt-2"　>＊日本語検索可</p>
                        )
                    }
                </div>
                <InstantSearch
                    indexName={leagueName}
                    searchClient={searchClient}
                >
                    <SearchTeams handleTeamName={handleTeamName} />  
                </InstantSearch>
            </div>
        </Dialog>
)
}

export default SelectTeamDialog