import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Button from '../components/common/Button'
import Container from '../components/common/Container'
import FormContainer from '../components/common/FormContainer'
import InputField from '../components/common/InputField'
import Message from '../components/common/Message'
import { useDispatch, useSelector } from 'react-redux'
import HorizontalButton from '../components/common/HorizontalButton'
import { getUserDetails, userProfileUpdate } from '../redux/actions/userActions'

const UserEditScreen = () => {
	const dispatch = useDispatch()
	const { id } = useParams()
	const [inputValue, setInputValue] = useState({
		hasMatched: false,
	})
	const [errorText, setErrorText] = useState(null)

	const { hasMatched } = inputValue

	const userRegister = useSelector((state) => state.userRegister)
	const { loading, success, error } = userRegister

	const userDetails = useSelector((state) => state.userDetails)
	const { user } = userDetails

	const submitHandler = (e) => {
		e.preventDefault()
		setErrorText(null)

		// dispatch(register(inputValue))
		setErrorText('パスワードと確認パスワードが一致しません')
	}

	useEffect(() => {
		if (
			user &&
			Object.keys(user).length === 0 &&
			Object.getPrototypeOf(user) === Object.prototype
		) {
			dispatch(getUserDetails(id))
		} else {
			console.log('user found')
		}
	}, [user, dispatch, id])

	return (
		<Container>
			<FormContainer onSubmit={submitHandler}>
				<HorizontalButton
					text='先生とのマッチ :'
					type='box'
					result={false ? '未定' : '確認済み'}
				/>
				<div className='flex justify-center'>
					<div className='form-check form-check-inline'>
						<input
							className='form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
							type='radio'
							name='inlineRadioOptions'
							id='inlineRadio1'
							value='option1'
						/>
						<label className='form-check-label inline-block text-gray-800'>
							未定
						</label>
					</div>
					<div className='form-check form-check-inline'>
						<input
							className='form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2'
							type='radio'
							name='inlineRadioOptions'
							id='inlineRadio3'
							value='option3'
							disabled
						/>
						<label className='form-check-label inline-block text-gray-800 opacity-50'>
							確認済み
						</label>
					</div>
				</div>

				{/* <div className='mb-4'>
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
				</div> */}

				<div className='flex items-center justify-center'>
					<Button
						type='submit'
						bgColor='bg-blue-500'
						textColor='text-white'
						hoverColor='bg-blue-700'
						size='sm'
					>
						ステイタスを変更する
					</Button>
				</div>
			</FormContainer>
		</Container>
	)
}

export default UserEditScreen
