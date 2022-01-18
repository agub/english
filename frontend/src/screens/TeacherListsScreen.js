import React from 'react'
import { Link } from 'react-router-dom'
import Container from '../components/common/Container'
import ItemContainer from '../components/common/ItemContainer'
import Lists from '../components/Lists'
import PostCard from '../components/PostCard'
import posts from '../data/posts'

const TeacherlistsScreen = () => {
	return (
		<Container>
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

export default TeacherlistsScreen
