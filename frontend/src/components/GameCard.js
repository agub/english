import React from 'react'

const GameCard = ({ title, numTeachers }) => {
	return (
		<>
			<div>{title}</div>
			<div>{numTeachers}</div>
		</>
	)
}

export default GameCard
