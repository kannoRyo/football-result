import React from 'react'

type Props = {
	teamUrl: string
}

const Header = ({teamUrl}: Props)=>{	
	console.log(teamUrl)
	return (
	<div className="header flex bg-blue-500 text-white px-4">
		<h2>FootBall DashBoard</h2>
		<div className="py-2 pl-4">
			<img src={teamUrl} alt="" width="40" height="40"/>
		</div>
	</div>
)
}

export default Header
