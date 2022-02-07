import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listGameDetails } from '../redux/actions/gameActions'

import { Link } from 'react-router-dom'
import Container from '../components/common/Container'

const GameScreen = () => {
	const { id } = useParams()
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(listGameDetails(id))
	}, [id, dispatch])

	const gameDetails = useSelector((state) => state.gameDetails)

	const { game } = gameDetails

	return (
		<Container>
			<h1>
				Game info: {game.title}, id:{game._id}
			</h1>
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
