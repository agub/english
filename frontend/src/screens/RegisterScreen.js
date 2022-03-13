import React, { useEffect, useState } from 'react'
import Button from '../components/common/Button'
import Container from '../components/common/Container'
import FormContainer from '../components/common/FormContainer'
import InputField from '../components/common/InputField'
import Message from '../components/common/Message'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../redux/actions/userActions'

const RegisterScreen = () => {
	const [inputValue, setInputValue] = useState({
		email: '',
		password: '',
		discordId: '',
		confirmPassword: '',
	})

	const [errorText, setErrorText] = useState(null)

	const { email, password, confirmPassword, discordId } = inputValue

	const userRegister = useSelector((state) => state.userRegister)
	const { loading, success, error } = userRegister

	console.log(inputValue)

	const dispatch = useDispatch()

	const checkPasswordLength = (password) => {
		if (password.length >= 6) {
			return true
		} else {
			return false
		}
	}

	const submitHandler = (e) => {
		e.preventDefault()
		setErrorText(null)
		if (password !== confirmPassword) {
			setErrorText('パスワードと確認パスワードが一致しません')
			return
		}
		if (!checkPasswordLength(password)) {
			setErrorText('パスワードは6桁以上必要です')
			return
		}
		if (inputValue.email && inputValue.password && inputValue.discordId)
			dispatch(register(inputValue))
		// console.log('fired')
	}

	return (
		<Container>
			<FormContainer onSubmit={submitHandler}>
				{errorText !== null && (
					<Message variant='danger'>{errorText}</Message>
				)}
				{error && <Message variant='danger'>{error}</Message>}
				<div className='mb-4'>
					<InputField
						type='email'
						value={email}
						name='email'
						placeholder='メールアドレス'
						label='メールアドレス'
						onChange={(e) =>
							setInputValue((prev) => ({
								...prev,
								email: e.target.value,
							}))
						}
					/>
				</div>
				<div className='mb-4'>
					<InputField
						type='text'
						value={discordId}
						name='discordName'
						placeholder='Discord アカウント名'
						label='Discord アカウント名'
						onChange={(e) =>
							setInputValue((prev) => ({
								...prev,
								discordId: e.target.value,
							}))
						}
					/>
				</div>
				<div className='mb-4'>
					<InputField
						type='password'
						value={password}
						name='password'
						placeholder='パスワード'
						label='パスワード'
						onChange={(e) =>
							setInputValue((prev) => ({
								...prev,
								password: e.target.value,
							}))
						}
					/>
				</div>
				<div className='mb-4'>
					<InputField
						type='password'
						value={confirmPassword}
						name='confirmPassword'
						placeholder='パスワード確認'
						label='パスワード確認'
						onChange={(e) =>
							setInputValue((prev) => ({
								...prev,
								confirmPassword: e.target.value,
							}))
						}
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
