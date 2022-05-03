import React, { useEffect, useState } from 'react'
import BackButton from '../components/common/BackButton'
import Button from '../components/common/Button'
import InputField from '../components/common/InputField'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Container from '../components/common/Container'
import FormContainer from '../components/common/FormContainer'
import Message from '../components/common/Message'
import Loader from '../components/common/Loader'
import { useDispatch, useSelector } from 'react-redux'
import {
	getUserDetails,
	updateUser,
	userProfileUpdate,
} from '../redux/actions/userActions'
import { USER_PROFILE_UPDATE_RESET } from '../redux/constants/userConstants'

import IsObjectEmpty from '../components/common/IsObjectEmpty'

const ChangeStatusScreen = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const { id } = useParams()

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
		e.preventDefault()
		setErrorText(null)
		if (
			user.hasMatched !== inputValue.hasMatched &&
			inputValue.teacher !== ''
		) {
			dispatch(
				updateUser({
					_id: id,
					hasMatched: inputValue.hasMatched,
					teacher: inputValue.teacher,
				})
			)
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
						<Message variant='info'>変更いたしました</Message>
					)}
					{(loading || userUpdateLoading) && <Loader />}
					<Link to={`/profile`}>
						<BackButton />
					</Link>
					{user && (
						<>
							<h1>need to add input for class time fasdfads</h1>
							<div className='mb-6 flex items-start flex-col'></div>
							<div className='flex items-center justify-between'>
								<Button
									onClick={submitHandler}
									type='submit'
									bgColor='bg-blue-500'
									textColor='text-white'
									hoverColor='bg-blue-700'
									size='sm'
								>
									変更を保存
								</Button>
							</div>
						</>
					)}
				</FormContainer>
			</Container>
		</>
	)
}

export default ChangeStatusScreen

