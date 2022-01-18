import React from 'react'

const PostCard = ({ title, gameName }) => {
	return (
		<>
			<div>{title}</div>
			<div>{gameName}</div>
		</>
	)
}

export default PostCard
