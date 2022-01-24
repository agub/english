import React, { useState } from 'react'
import Button from '../components/common/Button'
import Container from '../components/common/Container'
import FormContainer from '../components/common/FormContainer'
import InputField from '../components/common/InputField'

const RegisterScreen = () => {
	const [inputValue, setInputValue] = useState({
		email: '',
		// ________________
		fullName: '',
		phoneNumber: '',
		age: '',
		consoleType: '',
		gameTitle: '',
		contactBy: '',
		experience: '',
		preferWeek: '',
		preferTime: '',
		rentMixer: '',
		// ________________
		password: '',
		confirmPassword: '',
		discordName: '',
	})
	const {
		email,
		fullName,
		phoneNumber,
		age,
		consoleType,
		gameTitle,
		preferTime,
		password,
		confirmPassword,
		discordName,
	} = inputValue

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
						name='email'
						placeholder='メールアドレス'
						label='メールアドレス'
						onChange={handleChange}
					/>
				</div>
				<div className='mb-4'>
					<InputField
						type='text'
						value={discordName}
						name='discordName'
						placeholder='Discord アカウント名'
						label='Discord アカウント名'
						onChange={handleChange}
					/>
				</div>
				<div className='mb-4'>
					<InputField
						type='password'
						value={password}
						name='password'
						placeholder='パスワード'
						label='パスワード'
						onChange={handleChange}
					/>
				</div>
				<div className='mb-4'>
					<InputField
						type='password'
						value={confirmPassword}
						name='confirmPassword'
						placeholder='パスワード確認'
						label='パスワード確認'
						onChange={handleChange}
					/>
				</div>
				<div className='flex items-center justify-center'>
					<Button
						type='submit'
						bgColor='bg-blue-500'
						textColor='text-white'
						hoverColor='bg-blue-700'
						size='sm'
					>
						ユーザー登録
					</Button>
				</div>
			</FormContainer>
		</Container>
	)
}

export default RegisterScreen
