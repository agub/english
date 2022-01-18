import React from 'react'
import Container from '../components/Container'
import HomeComponent from '../components/HomeComponent'
import SwipeContainer from '../components/SwipeContainer'

const HomeScreen = () => {
	return (
		<>
			<HomeComponent />
			<Container>
				<h1>Popular games</h1>
				<SwipeContainer post />
				<h1>Popular teacher</h1>
				<SwipeContainer post />
			</Container>
		</>
	)
}

export default HomeScreen
