import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/common/Button'
import Container from '../components/common/Container'
import FormContainer from '../components/common/FormContainer'
import InputField from '../components/common/InputField'

const LoginScreen = () => {
	const [inputValue, setInputValue] = useState({ email: '', password: '' })
	const { email, password } = inputValue
	console.log(inputValue)
	const handleChange = (e) => {
		const { name, value } = e.target
		setInputValue((prev) => ({
			...prev,
			[name]: value,
		}))
	}
	const submitHandler = () => {
		console.log('submit')
	}

	return (
		<Container>
			<FormContainer onSubmit={submitHandler}>
				<div className='mb-4'>
					<InputField
						type='email'
						value={email}
						placeholder='Email'
						label='Email'
						name='email'
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
					<Button
						type='submit'
						bgColor='bg-blue-500'
						textColor='text-white'
						hoverColor='bg-blue-700'
						size='sm'
					>
						ログイン
					</Button>
					<Link
						className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800'
						to='#'
					>
						Forgot Password?
					</Link>
				</div>
			</FormContainer>
		</Container>
	)
}

export default LoginScreen
