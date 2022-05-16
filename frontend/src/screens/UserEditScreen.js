import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
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
		teacher: '',
	})

	const [component, setComponent] = useState('')

	const [errorText, setErrorText] = useState(null)

	const { hasMatched } = inputValue

	const userDetails = useSelector((state) => state.userDetails)
	const { user, loading, error } = userDetails

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	const userUpdate = useSelector((state) => state.userUpdate)
	const {
		loading: loadingUpdate,
		error: errorUpdate,
		success: successUpdate,
	} = userUpdate

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

	useEffect(() => {
		if (!userInfo) {
			navigate('/login')
		} else {
			if (successUpdate) {
				dispatch({ type: USER_UPDATE_RESET })
				navigate('/admin/userlist')
			} else {
				if (IsObjectEmpty(user)) {
					dispatch(getUserDetails(id))
				} else {
					setInputValue({ hasMatched: user.room.isActive })
				}
			}
		}
	}, [user, dispatch, id, successUpdate, navigate, userInfo])

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
							{user && user.userData && user.userData.name && (
								<>
									<p>
										{user.userData.name.lastName +
											' ' +
											user.userData.name.firstName}
										様の設定
									</p>
									<Link to={`/admin/${id}/edit/status`}>
										<HorizontalButton
											text='マッチステイタス変更 :'
											type='button'
											// setState={() => setComponent('match')}
											result={
												user.room.isActive
													? 'アクティブ'
													: '未定'
											}
										/>
									</Link>
								</>
							)}
						</>
					)
				)}

				{/* {user && component === 'match' && (
					<ChangeMatchStatus
						userState={user}
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
						// teacherValue={inputValue.teacher}
						teacherSetter={(e) =>
							setInputValue((prev) => ({
								...prev,
								teacher: e.target.value,
							}))
						}
					/>
				)} */}
			</FormContainer>
		</Container>
	)
}

export default UserEditScreen

