import React from 'react'

const ItemContainer = ({ children }) => {
	return (
		<div
			className='bg-slate-400 rounded shadow h-60 cursor-pointer'
			onClick={() => console.log('clicked')}
		>
			{children}
		</div>
	)
}

export default ItemContainer
