import React from 'react'
import Container from '../components/common/Container'
import HomeTop from '../components/HomeTop'
import SwipeContainer from '../components/SwipeContainer'

const HomeScreen = () => {
	return (
		<>
			<HomeTop />
			<Container>
				<h1>Popular games</h1>
				<SwipeContainer showGames />
				<h1>Popular teacher</h1>
				<SwipeContainer showPosts />
			</Container>
		</>
	)
}

export default HomeScreen
