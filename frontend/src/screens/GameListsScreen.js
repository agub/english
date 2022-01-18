import React from 'react'
import Container from '../components/common/Container'
import ItemContainer from '../components/common/ItemContainer'
import Lists from '../components/Lists'
import posts from '../data/posts'

const GameListsScreen = () => {
	return (
		<Container>
			<h1>Game Lists</h1>
			<Lists>
				{posts.map((post) => (
					<ItemContainer
						key={post._id}
						item={post.title}
						gameName={post.gameName}
					/>
				))}
			</Lists>
		</Container>
	)
}

export default GameListsScreen
