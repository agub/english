import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Container from '../components/common/Container'
import ItemContainer from '../components/common/ItemContainer'
import Loader from '../components/common/Loader'
import Lists from '../components/Lists'
import { listGames } from '../redux/actions/gameActions'

const GameListsScreen = () => {
	const dispatch = useDispatch()

	const gameList = useSelector((state) => state.gameList)
	const { games, loading } = gameList

	useEffect(() => {
		dispatch(listGames())
	}, [dispatch])
	return (
		<Container>
			<h1>Game Lists</h1>
			{loading ? (
				<Loader />
			) : (
				<Lists>
					{games &&
						games.map((game) => (
							<Link to={`/games/${game._id}`} key={game._id}>
								<ItemContainer

								// item={game.title}
								// gameName={game.gameName}
								>
									{game.title}
								</ItemContainer>
							</Link>
						))}
				</Lists>
			)}
		</Container>
	)
}

export default GameListsScreen
