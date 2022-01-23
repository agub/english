import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Container from '../components/common/Container'
import InputField from '../components/common/InputField'

const Login = () => {
	const [inputValue, setInputValue] = useState({ userName: '', password: '' })
	const { userName, password } = inputValue

	const handleChange = (e) => {
		const { name, value } = e.target
		setInputValue((prev) => ({
			...prev,
			[name]: value,
		}))
		console.log(inputValue)
	}

	return (
		<Container>
			<div className='w-full max-w-lg m-auto'>
				<form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
					<div className='mb-4'>
						<InputField
							type='text'
							value={userName}
							placeholder='Username'
							label='User Name'
							name='userName'
							onChange={handleChange}
						/>
					</div>
					<div className='mb-6'>
						<InputField
							type='text'
							value={password}
							placeholder='Password'
							label='Password'
							name='password'
							onChange={handleChange}
						/>
						{/* <label className='block text-gray-700 text-sm font-bold mb-2'>
							Password
						</label>
						<input
							className='shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
							id='password'
							type='password'
							placeholder='******************'
						/>
						<p className='text-red-500 text-xs italic'>
							Please choose a password.
						</p> */}
					</div>
					<div className='flex items-center justify-between'>
						<button
							className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
							type='button'
						>
							Sign In
						</button>
						<Link
							className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800'
							to='#'
						>
							Forgot Password?
						</Link>
					</div>
				</form>
			</div>
		</Container>
	)
}

export default Login
