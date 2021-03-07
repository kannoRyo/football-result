import React from 'react'

import algoliasearch from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch-dom';
import { SearchTeams } from './index'

import SearchIcon from '@material-ui/icons/Search'
import { Button } from '@material-ui/core';


type Props = {
	teamUrl: string,
	handleTeamName: (team: string) => void,
	handleOpen:() => void
}

const Header = ({teamUrl, handleTeamName, handleOpen}: Props)=>{	
	const searchClient = algoliasearch(
		String(process.env.REACT_APP_ALGOLIA_ID),
		String(process.env.REACT_APP_ALGOLIA_KEY)
	)

	return (
	<div className="header flex bg-blue-500 text-white px-4">
		<h2>FootBall DashBoard</h2>
		<div className="py-2 pl-4">
			<img src={teamUrl} alt="" width="40" height="40"/>
		</div>
		<div className="ml-12">
			<Button onClick={handleOpen} >
				<SearchIcon fontSize="large" />
			</Button>
		</div>
		{/* <InstantSearch
            indexName="LaLiga"
            searchClient={searchClient}
          >
            <SearchTeams handleTeamName={handleTeamName} />  
        </InstantSearch> */}
	</div>
)
}

export default Header
