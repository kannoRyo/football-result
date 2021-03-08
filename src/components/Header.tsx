import React from 'react'

import SearchIcon from '@material-ui/icons/Search'
import { Button } from '@material-ui/core';


type Props = {
	teamUrl: string,
	teamName: string,
	handleOpen:() => void
}

const Header = ({teamUrl, teamName, handleOpen}: Props)=>{	
	return (
	<div className="header flex bg-blue-500 text-white px-4">
		<h2 className="text-lg leading-2 mt-4" >{teamName}</h2>
		<div className="py-3 pl-4">
			<img src={teamUrl} alt="" width="30" height="30" className="bg-blue-500"/>
		</div>
		<div style={{margin: "0 0 0 auto"}} >
			<Button onClick={handleOpen} >
				<SearchIcon fontSize="large" />
			</Button>
		</div>

	</div>
)
}

export default Header
