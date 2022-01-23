import React from 'react'
import { Link } from 'react-router-dom'
import Button from './common/Button'

const HomeTop = () => {
	return (
		<div className='w-screen h-40v bg-slate-800'>
			<div className='flex justify-center items-center h-full'>
				{/* <div className='bg-white w-64 h-8'>search bar</div> */}
				<Link to='/register'>
					<Button
						bgColor='bg-cyan-500'
						textColor='text-white'
						hoverColor='bg-blue-700'
						type='button'
						size='md'
					>
						無料カウンセリング
					</Button>
				</Link>
			</div>
		</div>
	)
}

export default HomeTop
