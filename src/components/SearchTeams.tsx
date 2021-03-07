import React from 'react'
import { SearchBox, Hits } from 'react-instantsearch/dom'


type Props = {
	handleTeamName: (team: string) => void
}

const SearchTeams = ({handleTeamName}: Props)=>{
	
	const Hit = ({hit}: any) => {
		return (
			<div className="pl-5">
				<button onClick={()=> handleTeamName(hit.teamName)} >
					{hit.teamName}
				</button>
			</div>
		)
	}

	return (
	<>
		<SearchBox translations={{placeholder: "Search for Teams"}} defaultRefinement={"Search"}  />
		<div  className="list-none">
			<Hits hitComponent={Hit}/>
		</div>
	</>
)
}

export default SearchTeams