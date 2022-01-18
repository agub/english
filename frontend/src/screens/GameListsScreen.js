import React from 'react'
import Container from '../components/Container'
import ItemContainer from '../components/ItemContainer'
import Lists from '../components/Lists'
import posts from '../posts'

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
