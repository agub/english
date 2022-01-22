import React from 'react'
import Container from '../components/common/Container'
import PostSwiper from '../components/PostSwiper'
import PricePlans from '../components/PricePlans'
import user from '../data/user'

const PostScreen = () => {
	const URL = 'https://www.youtube.com/embed/meTpMP0J5E8'

	console.log(user)
	return (
		<Container>
			<div className='grid grid-cols-12'>
				<div className='md:col-span-7  col-span-12'>
					<div>title</div>
					<PostSwiper URL={URL} />
					<div className='col-span-5  md:hidden'>
						{/* <PricePlans /> */}

						<div className='bg-teal-400 w-64 h-16 flex justify-center items-center rounded'>
							<h1 className='text-center text-white'>
								See available
							</h1>
						</div>
					</div>
					<div>
						description with quill editor
						<br />
						description with quill editor
						<br /> description with quill editor
						<br /> description with quill editor
						<br /> description with quill editor
						<br />
					</div>
					<div>account details</div>
					{user.map((person) => (
						<div key={person._id}>
							<p>name: {person.name}</p>
							<p>nationality: {person.nationality}</p>
							{/* <p>reviews: {person.numReviews}</p> */}
						</div>
					))}
				</div>
				<div className='col-span-5  hidden md:block'>
					{/* <PricePlans /> */}

					<div className='bg-teal-400 w-64 h-16 flex justify-center items-center rounded'>
						<h1 className='text-center text-white'>
							See available
						</h1>
					</div>
				</div>
			</div>
		</Container>
	)
}

export default PostScreen
