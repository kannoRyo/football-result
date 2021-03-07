import React from 'react'
import { Dialog, DialogTitle } from '@material-ui/core'
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch-dom';
import { SearchTeams } from './index'

type Props = {
    open: boolean,
    handleClose: () => void,
    handleTeamName: (team: string) => void
}

const SelectTeamDialog = ({open, handleClose, handleTeamName}: Props)=>{
    const searchClient = algoliasearch(
		String(process.env.REACT_APP_ALGOLIA_ID),
		String(process.env.REACT_APP_ALGOLIA_KEY)
	)
	return (
        <Dialog open={open} onClose={handleClose} >
            <DialogTitle>タイトル</DialogTitle>
            <InstantSearch
            indexName="LaLiga"
            searchClient={searchClient}
              >
                <SearchTeams handleTeamName={handleTeamName} />  
            </InstantSearch>
        </Dialog>
)
}

export default SelectTeamDialog