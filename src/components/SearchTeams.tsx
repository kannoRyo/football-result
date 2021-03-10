import React from 'react'
import { SearchBox, Hits } from 'react-instantsearch/dom'

type Props = {
	handleTeamName: (team: string) => void
}

const SearchTeams = ({handleTeamName}: Props)=>{
	
	const Hit = ({hit}: any) => {
		return (
			<div className="w-70">
				<button className="w-60 mx-10 py-3 rounded-xl bg-gray-200 hover:bg-blue-500 text-gray-700 hover:text-white font-extrabold cursor-pointer" style={{border: "1px solid #ccc"}} onClick={()=> handleTeamName(hit.teamName)} >
					{hit.teamName}
				</button>
			</div>
		)
	}

	return (
	<>
		<div className="mx-5 mt-4  ">
			<SearchBox translations={{placeholder: "Search for Teams"}}  autoFocus={true} />
		</div>
		<div  className="list-none">
			<Hits hitComponent={Hit}/>
		</div>
	</>
)
}

export default SearchTeams