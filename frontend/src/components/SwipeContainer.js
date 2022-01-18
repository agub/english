import React from 'react'
import ItemContainer from '../components/ItemContainer'
import GameCard from './GameCard'
import PostCard from './PostCard'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'

import posts from '../posts'
import games from '../games'

const SwipeContainer = ({ showPosts, showGames }) => {
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
			{showGames &&
				games.map((game) => (
					<SwiperSlide key={game._id}>
						<ItemContainer>
							<GameCard
								title={game.title}
								numTeachers={game.numTeachers}
							/>
						</ItemContainer>
					</SwiperSlide>
				))}
			{showGames && (
				<div className='flex justify-between'>
					<button ref={prevRef}>next</button>
					<button ref={nextRef}>prev</button>
				</div>
			)}

			{showPosts &&
				posts.map((post) => (
					<SwiperSlide key={post._id}>
						<ItemContainer showPosts>
							<PostCard
								title={post.title}
								gameName={post.author}
							/>
						</ItemContainer>
					</SwiperSlide>
				))}
			{showPosts && (
				<div className='flex justify-between'>
					<button ref={prevRef}>next</button>
					<button ref={nextRef}>prev</button>
				</div>
			)}
		</Swiper>
	)
}

export default SwipeContainer