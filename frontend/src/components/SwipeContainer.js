import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listGames } from '../redux/actions/gameActions'

import ItemContainer from './common/ItemContainer'
import GameCard from './GameCard'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'

const SwipeContainer = ({ showGames }) => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(listGames())
	}, [dispatch])

	const gamesList = useSelector((state) => state.gameList)
	const { loading, error, games } = gamesList

	const prevRef = React.useRef(null)
	const nextRef = React.useRef(null)

	return (
		<Swiper
			className='my-3'
			modules={[Navigation]}
			onInit={(swiper) => {
				swiper.params.navigation.prevEl = prevRef.current
				swiper.params.navigation.nextEl = nextRef.current
				swiper.navigation.init()
				swiper.navigation.update()
			}}
			spaceBetween={30}
			breakpoints={{
				// connected with css mediaquery
				640: {
					width: 640,
					slidesPerView: 2,
				},
				768: {
					width: 768,
					slidesPerView: 3,
				},
			}}
		>
			{loading ? (
				<h2>loading...</h2>
			) : error ? (
				<h3>{error}</h3>
			) : (
				showGames &&
				games.map((game) => (
					<SwiperSlide key={game._id}>
						<Link to={`/games/${game._id}`}>
							<ItemContainer>
								<GameCard
									title={game.title}
									numTeachers={game.numTeachers}
								/>
							</ItemContainer>
						</Link>
					</SwiperSlide>
				))
			)}

			{showGames && (
				<div className='flex justify-between'>
					<button ref={prevRef}>next</button>
					<button ref={nextRef}>prev</button>
				</div>
			)}
		</Swiper>
	)
}

export default SwipeContainer
