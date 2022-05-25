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
import { USER_UPDATE_RESET } from '../redux/constants/userConstants'
import { getUserDetails, updateUser } from '../redux/actions/userActions'
import { statusType } from '../data/data'

import IsObjectEmpty from '../components/common/IsObjectEmpty'

const ChangeInterviewStatusScreen = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const { id } = useParams()

	const initialValue = {
		confirmStatus: null,
	}
	const [inputValue, setInputValue] = useState(initialValue)
	const [errorText, setErrorText] = useState(null)

	const userDetails = useSelector((state) => state.userDetails)
	const { loading, user, error } = userDetails

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin
	// const userUpdate = useSelector((state) => state.userProfileUpdate)
	const userUpdate = useSelector((state) => state.userUpdate)
	const {
		success,
		error: userUpdateError,
		loading: userUpdateLoading,
	} = userUpdate

	useEffect(() => {
		console.log(inputValue)
		if (!userInfo) {
			navigate('/login')
			return
		}
		if (IsObjectEmpty(user)) {
			setErrorText(null)
			// dispatch(getUserDetails('profile'))
			dispatch(getUserDetails(id))
			return
		}
		if (
			user &&
			user.userDetails &&
			inputValue.confirmStatus === null &&
			user.userDetails.status === statusType.PENDING_INTERVIEW
		) {
			setInputValue((prev) => ({
				...prev,
				confirmStatus: '',
			}))
			return
		}
		if (success) {
			dispatch({ type: USER_UPDATE_RESET })
			navigate('/admin/userlist')
			return
		}
		// if (userUpdateLoading) dispatch(getUserDetails('profile'))
	}, [navigate, id, userInfo, user, dispatch, inputValue, success])

	const submitHandler = (e) => {
		e.preventDefault()
		setErrorText(null)

		if (user.userData.status !== '') {
			// dispatch(
			// 	updateUser({
			// 		_id: id,
			// 		// hasMatched: inputValue.hasMatched,
			// 		teacher: inputValue.teacher,
			// 	})
			// )
			console.log(user)
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
					<Link to={`/admin/${id}/edit`}>
						<BackButton />
					</Link>
					{user && user.room && (
						<>
							<div className='flex items-center justify-between'>
								<Button
									onClick={submitHandler}
									type='submit'
									bgColor='bg-blue-500'
									textColor='text-white'
									hoverColor='bg-blue-700'
									size='sm'
								>
									設定を変更する
								</Button>
							</div>
						</>
					)}
				</FormContainer>
			</Container>
		</>
	)
}

export default ChangeInterviewStatusScreen

