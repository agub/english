import React from 'react'

const ItemContainer = ({ title, gameName }) => {
	return (
		<div
			className='bg-slate-400 rounded shadow h-60'
			onClick={() => console.log('clicked')}
		>
			<div className='p-3'>
				<div className='bg-slate-900 h-32 w-100 rounded'></div>
				<div>{title}</div>
				<div>{gameName}</div>
			</div>
		</div>
	)
}

export default ItemContainer
