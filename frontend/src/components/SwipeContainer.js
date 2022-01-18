import React from 'react'
import posts from '../posts'
import ItemContainer from '../components/ItemContainer'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'

import 'swiper/css'
import 'swiper/css/navigation'

const SwipeContainer = ({ post }) => {
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
			{post &&
				posts.map((post) => (
					<SwiperSlide key={post._id}>
						<ItemContainer
							item={post.title}
							gameName={post.gameName}
						/>
					</SwiperSlide>
				))}
			<div className='flex justify-between'>
				<button ref={prevRef}>next</button>
				<button ref={nextRef}>prev</button>
			</div>
		</Swiper>
	)
}

export default SwipeContainer
