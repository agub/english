import React from 'react'

const GameCard = ({ title, numTeachers }) => {
	return (
		<div className='p-3'>
			<div className='bg-slate-900 h-32 w-100 rounded'></div>

			<div>{title}</div>
			<div>{numTeachers}</div>
		</div>
	)
}

export default GameCard
