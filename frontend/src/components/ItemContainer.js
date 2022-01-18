import React from 'react'

const ItemContainer = ({ children }) => {
	return (
		<div
			className='bg-slate-400 rounded shadow h-60 cursor-pointer'
			onClick={() => console.log('clicked')}
		>
			<div className='p-3'>
				<div className='bg-slate-900 h-32 w-100 rounded'></div>
				{children}
			</div>
		</div>
	)
}

export default ItemContainer
