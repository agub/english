import React from 'react'
import posts from '../posts'
import ItemContainer from '../components/ItemContainer'
import Lists from '../components/Lists'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'

import 'swiper/css'
import 'swiper/css/navigation'

const HomeScreen = () => {
	const prevRef = React.useRef(null)
	const nextRef = React.useRef(null)
	return (
		<>
			{/* <Lists> */}
			<Swiper
				className='my-3'
				onInit={(swiper) => {
					swiper.params.navigation.prevEl = prevRef.current
					swiper.params.navigation.nextEl = nextRef.current
					swiper.navigation.init()
					swiper.navigation.update()
				}}
				modules={[Navigation]}
				spaceBetween={30}
				slidesPerView={5}
				onSlideChange={() => console.log('slide change')}
				onSwiper={(swiper) => console.log(swiper)}
			>
				{posts.map((post) => (
					<>
						<SwiperSlide>
							<ItemContainer
								item={post.title}
								gameName={post.gameName}
							/>
						</SwiperSlide>
					</>
				))}
				<div className='flex justify-between'>
					<button ref={nextRef}>Next</button>
					<button ref={prevRef}>Prev</button>
				</div>
			</Swiper>
			{/* </Lists> */}
		</>
	)
}

export default HomeScreen
