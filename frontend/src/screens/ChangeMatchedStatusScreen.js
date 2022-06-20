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
import { weeks } from '../utils/data'

import IsObjectEmpty from '../components/common/IsObjectEmpty'
import { statusType } from '../utils/data'

const ChangeMatchedStatusScreen = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const { id } = useParams()

	const initialValue = {
		isActive: null,
		teacher: null,
		changeStatusTo: null,
		currentStatus: null,
		time: null,
		week: null,
		hour: null,
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
		if (user && inputValue.isActive === null) {
			setInputValue((prev) => ({
				...prev,
				isActive: user.room.isActive,
			}))
			return
		}
		if (user && inputValue.teacher === null && user.room.teacher !== null) {
			setInputValue((prev) => ({
				...prev,
				teacher: user.room.teacher,
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

		if (
			user.room.isActive !== inputValue.isActive &&
			inputValue.teacher !== null
		) {
			dispatch(
				updateUser({
					_id: id,
					changeStatusTo: inputValue.changeStatusTo,
					currentStatus: user.userData.status,
					teacher: inputValue.teacher,
					week: inputValue.week,
					time: inputValue.time,
					hour: inputValue.hour,
				})
			)
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
							<div className='mb-6 flex items-start flex-col'>
								<label className='block text-gray-700 text-sm font-bold mb-2'>
									現ステイタス :{' '}
									{user.room.isActive ? 'マッチ済み' : '未定'}
								</label>
								<div>
									<input
										required
										disabled={!user.room.isActive}
										name='statusTo'
										onChange={() =>
											setInputValue((prev) => ({
												...prev,
												isActive: false,
												changeStatusTo:
													statusType.CANCELLED,
											}))
										}
										type='radio'
									/>
									<label>キャンセル</label>
								</div>
								<div>
									<input
										required
										name='statusTo'
										disabled={!user.room.isActive}
										onChange={() =>
											setInputValue((prev) => ({
												...prev,
												isActive: false,
												changeStatusTo:
													statusType.PENDING,
											}))
										}
										type='radio'
									/>
									<label>新しい先生を希望</label>
								</div>
								<div>
									<input
										required
										name='statusTo'
										disabled={user.room.isActive}
										onChange={() =>
											setInputValue((prev) => ({
												...prev,
												isActive: true,
												changeStatusTo:
													user.customer.status
														.length <= 3
														? statusType.TRIAL
														: statusType.ACTIVE,
											}))
										}
										type='radio'
									/>
									<label>マッチ完了にする</label>
								</div>
							</div>
							<div className='mb-4'>
								<InputField
									type='text'
									// value={teacherValue}
									placeholder={
										user.room.teacher
											? user.room.teacher
											: null
									}
									label={
										user.room.teacher
											? '確認のために先生のIDを入力してください'
											: 'マッチする先生のID'
									}
									name='teacherId'
									onChange={(e) =>
										setInputValue((prev) => ({
											...prev,
											teacher: e.target.value,
										}))
									}
									// notRequired={user.room.isActive}
								/>
							</div>
							{user &&
								(user.userData.status === statusType.PENDING ||
									user.userData.status ===
										statusType.CANCELLED ||
									user.userData.status ===
										statusType.UNSUBBED) && (
									<div className='mb-6 flex items-start flex-col'>
										<label className='block text-gray-700 text-sm font-bold mb-2'>
											授業の曜日と時間
										</label>
										<div className='flex flex-row'>
											<select
												name='week'
												className='shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
												onChange={(e) =>
													setInputValue((prev) => ({
														...prev,
														week: parseInt(
															e.target.value
														),
													}))
												}
											>
												<option hidden>
													選択してください
												</option>
												{weeks.map((day, key) => (
													<option
														key={key}
														value={day.value}
													>
														{day.title}
													</option>
												))}
											</select>
											{/* ______________________________ */}
											<div>
												<input
													required
													// value={preferTime[0].time}
													name='time'
													type='number'
													max='24'
													className='shadow appearance-none border rounded w-16 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
													// onChange={preferHandleChange}
													onChange={(e) => {
														setInputValue(
															(prev) => ({
																...prev,
																time: parseInt(
																	e.target
																		.value
																),
															})
														)
													}}
													placeholder='XX'
												/>
												:
												<input
													required
													// value={preferTime[0].time}
													name='hour'
													type='number'
													max='59'
													className='shadow appearance-none border rounded w-16 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
													// onChange={preferHandleChange}
													onChange={(e) => {
														setInputValue(
															(prev) => ({
																...prev,
																hour: parseInt(
																	e.target
																		.value
																),
															})
														)
													}}
													placeholder='XX'
												/>
												{inputValue.time < 12
													? 'am'
													: 'pm'}
												&nbsp; ~
											</div>
										</div>
										*24時間表記でお願いします。
									</div>
								)}
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

export default ChangeMatchedStatusScreen

