import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../components/common/Button'
import Container from '../components/common/Container'
import FormContainer from '../components/common/FormContainer'
import Loader from '../components/common/Loader'
import Message from '../components/common/Message'
import { sendMessage } from '../redux/actions/userActions'
import { USER_CONTACT_RESET } from '../redux/constants/userConstants'

const ContactScreen = () => {
	const dispatch = useDispatch()

	const initialValue = {
		title: '',
		email: '',
		text: '',
	}
	const [inputValue, setInputValue] = useState(initialValue)
	const [error, setError] = useState('')

	const { loading, success } = useSelector((state) => state.userContact)

	const submitHandler = (e) => {
		e.preventDefault()
		setError('')
		if (
			inputValue.text === '' ||
			inputValue.email === '' ||
			inputValue === ''
		) {
			setError('正しく入力してください')
			return
		}
		dispatch(sendMessage(inputValue))
	}

	useEffect(() => {
		if (success) {
			setInputValue(initialValue)
		}
		if (error) {
			dispatch({ type: USER_CONTACT_RESET })
		}
	}, [dispatch, success, error])

	useEffect(() => {
		dispatch({ type: USER_CONTACT_RESET })
	}, [dispatch])

	return (
		<Container>
			<FormContainer onSubmit={submitHandler}>
				{error && <Message variant='danger'>{error}</Message>}
				{loading && <Loader />}
				{success && <Message variant='info'>送信しましました</Message>}
				<h1>問い合わせフォーム</h1>
				<p>title or select form</p>
				<input
					className='form-control
        block
        w-full
        text-base
        px-3
        py-1.5
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded'
					value={inputValue.title}
					onChange={(e) =>
						setInputValue((prev) => ({
							...prev,
							title: e.target.value,
						}))
					}
				/>
				<p>email</p>
				<input
					className='form-control
        block
        w-full
        text-base
        px-3
        py-1.5
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
					value={inputValue.email}
					onChange={(e) =>
						setInputValue((prev) => ({
							...prev,
							email: e.target.value,
						}))
					}
				/>
				<p>内容</p>
				<textarea
					className='form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
					rows='5'
					value={inputValue.text}
					onChange={(e) =>
						setInputValue((prev) => ({
							...prev,
							text: e.target.value,
						}))
					}
				/>
				<Button
					onClick={submitHandler}
					type='submit'
					bgColor='bg-blue-500'
					textColor='text-white'
					hoverColor='bg-blue-700'
					size='sm'
				>
					送信
				</Button>
			</FormContainer>
		</Container>
	)
}

export default ContactScreen
