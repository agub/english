import React, { useEffect, useState } from 'react'
import BackButton from '../components/common/BackButton'
import Button from '../components/common/Button'
import InputField from '../components/common/InputField'
import { Link, useNavigate } from 'react-router-dom'
import Container from '../components/common/Container'
import FormContainer from '../components/common/FormContainer'
import Message from '../components/common/Message'
import Loader from '../components/common/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, userProfileUpdate } from '../redux/actions/userActions'
import { USER_PROFILE_UPDATE_RESET } from '../redux/constants/userConstants'

import IsObjectEmpty from '../components/common/IsObjectEmpty'

const ChangePasswordScreen = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const initialValue = {
		password: '',
		confirmPassword: '',
		newPassword: '',
	}

	const [inputValue, setInputValue] = useState(initialValue)
	const [errorText, setErrorText] = useState(null)
	const { password, confirmPassword, newPassword } = inputValue

	const userDetails = useSelector((state) => state.userDetails)
	const { loading, user, error } = userDetails

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin
	const userUpdate = useSelector((state) => state.userProfileUpdate)
	const {
		success,
		error: userUpdateError,
		loading: userUpdateLoading,
	} = userUpdate

	useEffect(() => {
		if (!userInfo) {
			navigate('/login')
		} else {
			if (IsObjectEmpty(user)) {
				setErrorText(null)
				dispatch(getUserDetails('profile'))
			}
		}
		// if (userUpdateLoading) dispatch(getUserDetails('profile'))
	}, [navigate, userInfo, user, dispatch])

	const submitHandler = (e) => {
		dispatch({ type: USER_PROFILE_UPDATE_RESET })
		e.preventDefault()
		setErrorText(null)
		console.log(user)
		//Changing Password___________________________________
		if (
			inputValue.password &&
			inputValue.newPassword &&
			inputValue.confirmPassword
		) {
			if (newPassword === confirmPassword) {
				dispatch(
					userProfileUpdate({ id: user._id, password, newPassword })
				)
				setErrorText(null)
				setInputValue(initialValue)
				dispatch(getUserDetails('profile'))
			} else {
				setErrorText('????????????????????????????????????????????????????????????')
			}
		}
	}
	return (
		<>
			<Container>
				<FormContainer onSubmit={submitHandler}>
					{errorText !== null && (
						<Message variant='danger'>{errorText}</Message>
					)}
					{(error || userUpdateError) && (
						<Message variant='danger'>
							{error || userUpdateError}
						</Message>
					)}
					{success && (
						<Message variant='info'>????????????????????????</Message>
					)}
					{(loading || userUpdateLoading) && <Loader />}
					<Link
						to={`/profile`}
						onClick={() =>
							dispatch({ type: USER_PROFILE_UPDATE_RESET })
						}
					>
						<BackButton />
					</Link>
					{user && (
						<>
							<h1 className='text-center'>????????????????????????</h1>
							<div className='mb-4'>
								<InputField
									type='password'
									value={password}
									placeholder='????????????????????????'
									label='????????????????????????'
									name='password'
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
									value={newPassword}
									placeholder='????????????????????????'
									label='????????????????????????'
									name='newPassword'
									onChange={(e) =>
										setInputValue((prev) => ({
											...prev,
											newPassword: e.target.value,
										}))
									}
								/>
							</div>
							<div className='mb-4'>
								<InputField
									type='password'
									value={confirmPassword}
									placeholder='??????????????????????????????'
									label='??????????????????????????????'
									name='confirmPassword'
									onChange={(e) =>
										setInputValue((prev) => ({
											...prev,
											confirmPassword: e.target.value,
										}))
									}
								/>
							</div>
							<div className='flex items-center justify-between'>
								<Button
									onClick={submitHandler}
									type='submit'
									bgColor='bg-blue-500'
									textColor='text-white'
									hoverColor='bg-blue-700'
									size='sm'
									disabled={loading || userUpdateLoading}
								>
									???????????????
								</Button>
							</div>
						</>
					)}
				</FormContainer>
			</Container>
		</>
	)
}

export default ChangePasswordScreen

