import React from 'react'
import Container from '../components/common/Container'
import Contact from '../components/Contact'
import HomeTop from '../components/HomeTop'
import SwipeContainer from '../components/SwipeContainer'
import PricePlans from '../components/PricePlans'
import PriceHomeComponent from '../components/PriceHomeComponent'

const HomeScreen = () => {
	return (
		<>
			<HomeTop />
			<Container>
				<h1 className='text-center'>Something Important</h1>
				<PriceHomeComponent />
				<h1>人気のゲーム</h1>
				<SwipeContainer showGames />
				<div>Review</div>
				<div>Q & A</div>
			</Container>
			<Contact />
		</>
	)
}

export default HomeScreen
