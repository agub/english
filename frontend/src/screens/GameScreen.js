import React from 'react'
import { Link } from 'react-router-dom'
import Container from '../components/common/Container'

const GameScreen = () => {
	return (
		<Container>
			<h1>Game info</h1>
			<h1>title</h1>
			<h1>game description</h1>
			<h1>Difficulty to learn </h1>
			<h1>Number of teachers</h1>
			<button className='bg-teal-400 w-64 h-16 flex justify-center items-center rounded'>
				<h1 className='text-center text-white'>See available</h1>
			</button>
		</Container>
	)
}

export default GameScreen
