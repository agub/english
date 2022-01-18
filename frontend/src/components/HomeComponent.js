import React from 'react'
import Container from './Container'

const HomeComponent = () => {
	return (
		<div className='w-screen h-40v bg-slate-800'>
			{/* <Container> */}
			<div className='flex justify-center items-center h-full'>
				<div className='bg-white w-64 h-8'>search bar</div>
				<div className='bg-white w-8 h-8 mx-5'></div>
			</div>
			{/* </Container> */}
		</div>
	)
}

export default HomeComponent
