import React from 'react'
import Container from '../components/common/Container'
import HomeTop from '../components/HomeTop'
import SwipeContainer from '../components/SwipeContainer'

const HomeScreen = () => {
	return (
		<>
			<HomeTop />
			<Container>
				<h1>人気のゲーム</h1>
				<SwipeContainer showGames />
			</Container>
		</>
	)
}

export default HomeScreen
