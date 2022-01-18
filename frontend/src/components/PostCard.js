import React from 'react'

const PostCard = ({ title, gameName }) => {
	return (
		<div className='p-3'>
			<div className='bg-slate-900 h-32 w-100 rounded'></div>
			<div>{title}</div>
			<div>{gameName}</div>
		</div>
	)
}

export default PostCard
