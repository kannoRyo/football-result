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
    
    const searchClient = algoliasearch(
		String(process.env.REACT_APP_ALGOLIA_ID),
		String(process.env.REACT_APP_ALGOLIA_KEY)
	)
	return (
        <Dialog open={open} onClose={handleClose} >
            <div>
                <div className="my-5 mx-8" >
                    <Select
                        value={leagueName}
                        onChange={(e: React.ChangeEvent<{name?: string | undefined; value: unknown;}>) => handleLeague(e)}
                        fullWidth={true}
                    >
                        {
                            leagueNameArr.map((league: any) => (
                                <MenuItem value={league} >{league}</MenuItem>
                            ))
                        }
                    </Select>
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