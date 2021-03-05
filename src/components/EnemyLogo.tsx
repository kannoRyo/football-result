import React from 'react'

type Props = {
	logo: string,
	name: string
}

const EnemyLogo = ({logo, name}: Props)=>{

	return (
		<img src={logo} alt={name} height="28" width="28" className="mx-auto h-7 leading-7"  />
)
}

export default EnemyLogo
