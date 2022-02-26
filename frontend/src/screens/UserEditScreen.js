import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Container from '../components/common/Container'
import FormContainer from '../components/common/FormContainer'
import Message from '../components/common/Message'
import { useDispatch, useSelector } from 'react-redux'
import HorizontalButton from '../components/common/HorizontalButton'
import { getUserDetails, updateUser } from '../redux/actions/userActions'
import { USER_UPDATE_RESET } from '../redux/constants/userConstants'

import ChangeMatchStatus from '../components/ChangeMatchStatus'
import Loader from '../components/common/Loader'
import BackButton from '../components/common/BackButton'
import IsObjectEmpty from '../components/common/IsObjectEmpty'

const UserEditScreen = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { id } = useParams()

	const [inputValue, setInputValue] = useState({
		hasMatched: false,
	})

	const [component, setComponent] = useState('')

	const [errorText, setErrorText] = useState(null)

	const { hasMatched } = inputValue

	// const userRegister = useSelector((state) => state.userRegister)
	// const { loading, success, error } = userRegister

	const userDetails = useSelector((state) => state.userDetails)
	const { user, loading, error } = userDetails

	const userUpdate = useSelector((state) => state.userUpdate)
	const {
		loading: loadingUpdate,
		error: errorUpdate,
		success: successUpdate,
	} = userUpdate

	const submitHandler = (e) => {
		e.preventDefault()
		setErrorText(null)
		if (user.hasMatched !== inputValue.hasMatched) {
			dispatch(updateUser({ _id: id, hasMatched: inputValue.hasMatched }))
		}
		// dispatch(register(inputValue))
		// setErrorText('パスワードと確認パスワードが一致しません')
	}

	useEffect(() => {
		if (successUpdate) {
			dispatch({ type: USER_UPDATE_RESET })
			navigate('/admin/userlist')
		} else {
			if (IsObjectEmpty(user)) {
				dispatch(getUserDetails(id))
			} else {
				setInputValue({ hasMatched: user.hasMatched })
			}
		}
	}, [user, dispatch, id, successUpdate, navigate])

	console.log(inputValue)
	return (
		<Container>
			<FormContainer onSubmit={submitHandler}>
				{loadingUpdate && <Loader />}
				{errorUpdate && (
					<Message variant='danger'>{errorUpdate}</Message>
				)}
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant='danger'>{error}</Message>
				) : (
					component === '' && (
						<>
							<BackButton
								onClick={(e) => {
									e.preventDefault()
									navigate('/admin/userlist')
								}}
							/>
							{user && user.name && (
								<p>
									{user.name.lastName +
										' ' +
										user.name.firstName}
									様の設定
								</p>
							)}
							<HorizontalButton
								text='マッチステイタス変更 :'
								type='button'
								setState={() => setComponent('match')}
								result={user.hasMatched ? '済み' : '未定'}
							/>
						</>
					)
				)}

				{user && component === 'match' && (
					<ChangeMatchStatus
						currentState={user.hasMatched}
						component={() => setComponent('')}
						submitHandler={submitHandler}
						matchSetter={() =>
							setInputValue((prev) => ({
								...prev,
								hasMatched: true,
							}))
						}
						unMatchSetter={() =>
							setInputValue((prev) => ({
								...prev,
								hasMatched: false,
							}))
						}
					/>
				)}
			</FormContainer>
		</Container>
	)
}

export default UserEditScreen
