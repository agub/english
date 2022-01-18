import React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'

const PostSwiper = ({ URL }) => {
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
			spaceBetween={50}
			slidesPerView={1}
		>
			<SwiperSlide>
				<div className='h-30v sm:w-10/12 m-auto'>
					<iframe
						width='100%'
						height='100%'
						title='YouTube video player'
						src={URL}
						frameBorder='0'
						allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
						allowFullScreen
					></iframe>
				</div>
			</SwiperSlide>
			<SwiperSlide>Picture 1</SwiperSlide>
			<SwiperSlide>Picture 2</SwiperSlide>
			<SwiperSlide>Picture 3</SwiperSlide>
			<SwiperSlide>Picture 4</SwiperSlide>
			{/* <div className='flex justify-center'> */}
			<div className='flex justify-around'>
				<button ref={prevRef}>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='h-6 w-6'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M15 19l-7-7 7-7'
						/>
					</svg>
				</button>
				<button ref={nextRef}>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='h-6 w-6'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M9 5l7 7-7 7'
						/>
					</svg>
				</button>
			</div>
			{/* </div> */}
		</Swiper>
	)
}

export default PostSwiper
