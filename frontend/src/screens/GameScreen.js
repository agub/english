import React from 'react'
import { Link } from 'react-router-dom'
import Container from '../components/common/Container'
import ItemContainer from '../components/common/ItemContainer'
import Lists from '../components/Lists'
import PostCard from '../components/PostCard'
import posts from '../data/posts'

const GameScreen = () => {
	return (
		<Container>
			<h1>Game info</h1>
			<h1>title</h1>
			<h1>game description</h1>
			<h1>Difficulty to learn </h1>
			<h1>Number of teachers</h1>
			<h1>_______________________</h1>
			<h1>Filtered Teacher Lists by gameTitle</h1>
			<Lists>
				{posts.map((post) => (
					<ItemContainer key={post._id}>
						<Link to='/post'>
							<ItemContainer showPosts>
								<PostCard
									title={post.title}
									gameName={post.author}
								/>
							</ItemContainer>
						</Link>
					</ItemContainer>
				))}
			</Lists>
		</Container>
	)
}

export default GameScreen
