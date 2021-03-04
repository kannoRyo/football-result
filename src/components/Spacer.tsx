import React from 'react'

type Props = {
    size: "small" | "medium" | "large"
}

const Spacer = ({size}: Props)=>{
    const space = {
        "small" : 10,
        "medium": 20,
        "large": 35
    }

    const marginSize = space[size]

	return (
        <div 
            style={{height: `${marginSize}px`  }}
        />
)
}

export default Spacer   