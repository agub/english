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

const ChangeDiscordIdScreen = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const initialValue = {
		discordId: '',
	}

	const [inputValue, setInputValue] = useState(initialValue)

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
				dispatch(getUserDetails('profile'))
			} else {
				console.log('user found')
			}
		}
	}, [navigate, userInfo, user, dispatch])

	const submitHandler = (e) => {
		dispatch({ type: USER_PROFILE_UPDATE_RESET })
		e.preventDefault()
		//Changing discordId___________________________________
		if (inputValue.discordId) {
			dispatch(
				userProfileUpdate({
					id: user._id,
					discordId: inputValue.discordId,
				})
			)
			dispatch(getUserDetails('profile'))
			setInputValue(initialValue)
		}
	}

	return (
		<>
			<Container>
				<FormContainer onSubmit={submitHandler}>
					<Link
						to={`/profile`}
						onClick={() =>
							dispatch({ type: USER_PROFILE_UPDATE_RESET })
						}
					>
						<BackButton />
					</Link>
					{(error || userUpdateError) && (
						<Message variant='danger'>
							{error || userUpdateError}
						</Message>
					)}
					{(loading || userUpdateLoading) && <Loader />}
					{success && (
						<Message variant='info'>変更いたしました</Message>
					)}
					{/* {user && (
						<> */}
					<h1 className='text-center'>Discordの名前変更</h1>
					<div className='mb-4'>
						<InputField
							type='text'
							value={inputValue.discordId}
							label='新しいDiscordのアカウント名'
							name='discordId'
							onChange={(e) =>
								setInputValue((prev) => ({
									...prev,
									discordId: e.target.value,
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
							変更を保存
						</Button>
					</div>
					{/* </>
					)} */}
				</FormContainer>
			</Container>
		</>
	)
}

export default ChangeDiscordIdScreen

