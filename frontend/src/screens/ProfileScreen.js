import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '../components/common/Container'
import FormContainer from '../components/common/FormContainer'
import Message from '../components/common/Message'
import HorizontalButton from '../components/common/HorizontalButton'
import Loader from '../components/common/Loader'
import Calender from '../components/Calender'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, userProfileUpdate } from '../redux/actions/userActions'
import { USER_PROFILE_UPDATE_RESET } from '../redux/constants/userConstants'
import ChangePassword from '../components/ChangePassword'
import ChangeDiscordId from '../components/ChangeDiscordId'
import ChangeAddress from '../components/ChangeAddress'
import { usePostalJp } from 'use-postal-jp'

const ProfileScreen = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const initialValue = {
		password: '',
		confirmPassword: '',
		newPassword: '',
		discordId: '',
		postalCode: '',
		address: '',
		prefecture: '',
		building: '',
	}

	const [inputValue, setInputValue] = useState(initialValue)
	const [errorText, setErrorText] = useState(null)
	const [component, setComponent] = useState('')
	const {
		password,
		confirmPassword,
		discordId,
		newPassword,
		postalCode,
		prefecture,
		address,
		building,
	} = inputValue
	const [autoAddress] = usePostalJp(postalCode, postalCode.length >= 7)

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
			if (
				user &&
				Object.keys(user).length === 0 &&
				Object.getPrototypeOf(user) === Object.prototype
			) {
				dispatch(getUserDetails('profile'))
			} else {
				console.log('user found')
			}
		}
		if (userUpdateLoading) {
			dispatch(getUserDetails('profile'))
		}
	}, [navigate, userInfo, user, dispatch, userUpdateLoading])

	useEffect(() => {
		if (autoAddress !== null && postalCode !== '') {
			setInputValue((prev) => ({
				...prev,
				prefecture: autoAddress.prefecture,
				address: autoAddress.address1 + autoAddress.address2,
			}))
		}
	}, [autoAddress, postalCode])

	useEffect(() => {
		if (component === '') {
			dispatch({ type: USER_PROFILE_UPDATE_RESET })
			setErrorText(null)
			setInputValue(initialValue)
		}
	}, [component, dispatch])

	const submitHandler = (e) => {
		dispatch({ type: USER_PROFILE_UPDATE_RESET })
		e.preventDefault()
		setErrorText(null)

		//Changing Password
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
				setErrorText('パスワードと確認パスワードが一致しません')
			}
		}
		//Changing discordId
		if (inputValue.discordId) {
			dispatch(userProfileUpdate({ id: user._id, discordId }))
			dispatch(getUserDetails('profile'))
			setInputValue(initialValue)
		}
		//Changing address
		if (inputValue.address && component === 'address') {
			dispatch(
				userProfileUpdate({
					id: user._id,
					postalCode,
					prefecture,
					address,
					building,
				})
			)
			dispatch(getUserDetails('profile'))
			setInputValue(initialValue)
		}
	}

	return (
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
				{success && <Message variant='info'>変更いたしました</Message>}
				{loading && <Loader />}
				{component === '' &&
					user &&
					user.info &&
					user.name &&
					user.homeAddress && (
						<>
							<h1>プロファイル</h1>
							<Calender />
							<p className='mt-4'>ユーザー情報</p>
							<HorizontalButton
								text='お名前:'
								type='box'
								result={
									user.name.lastName + user.name.firstName
								}
							/>
							<HorizontalButton
								text='メールアドレス:'
								type='box'
								result={user.email}
							/>
							<HorizontalButton
								text='Discordアカウント:'
								type='box'
								result={user.info.discordId}
							/>
							<HorizontalButton
								text='受講日:'
								type='box'
								result='データーモデルに追加'
							/>
							<HorizontalButton
								text='ご使用ゲーム:'
								type='box'
								result={user.info.gameTitle}
							/>
							<p className='mt-4'>一般</p>
							<HorizontalButton
								text='住所登録'
								type='button'
								result={
									user.homeAddress.address !== ''
										? '登録済み'
										: '未登録'
								}
								setState={() => setComponent('address')}
							/>
							<HorizontalButton
								text='お支払いプラン'
								type='button'
								result='定額'
							/>
							<HorizontalButton
								text='先生'
								type='button'
								result='Mr.John doe'
							/>

							<p className='mt-4'>設定</p>
							<HorizontalButton
								text='月額支払い設定'
								type='button'
								setState={() => setComponent('payment')}
							/>
							<HorizontalButton
								text='パスワードの変更'
								type='button'
								setState={() => setComponent('password')}
							/>
							<HorizontalButton
								text='Discordの名前変更'
								type='button'
								setState={() => setComponent('discord')}
							/>
						</>
					)}

				{component === 'password' && (
					<ChangePassword
						component={() => setComponent('')}
						passwordValue={password}
						passwordSetter={(e) =>
							setInputValue((prev) => ({
								...prev,
								password: e.target.value,
							}))
						}
						confirmPasswordValue={confirmPassword}
						confirmPasswordSetter={(e) =>
							setInputValue((prev) => ({
								...prev,
								confirmPassword: e.target.value,
							}))
						}
						newPasswordValue={newPassword}
						newPasswordSetter={(e) =>
							setInputValue((prev) => ({
								...prev,
								newPassword: e.target.value,
							}))
						}
						submitHandler={submitHandler}
					/>
				)}
				{component === 'discord' && user && user.info.discordId && (
					<ChangeDiscordId
						component={() => setComponent('')}
						discordIdValue={discordId}
						discordIdSetter={(e) =>
							setInputValue((prev) => ({
								...prev,
								discordId: e.target.value,
							}))
						}
						user={user}
					/>
				)}
				{component === 'payment' && (
					<>
						<h1>payment</h1>
						<button onClick={() => setComponent('')}>back</button>
					</>
				)}
				{component === 'address' && user && user.homeAddress && (
					<ChangeAddress
						component={() => setComponent('')}
						homeAddress={user.homeAddress}
						postalCodeValue={postalCode}
						postalCodeSetter={(e) =>
							setInputValue((prev) => ({
								...prev,
								postalCode: e.target.value,
							}))
						}
						prefectureValue={prefecture}
						prefectureSetter={(e) =>
							setInputValue((prev) => ({
								...prev,
								prefecture: e.target.value,
							}))
						}
						addressValue={address}
						addressSetter={(e) =>
							setInputValue((prev) => ({
								...prev,
								address: e.target.value,
							}))
						}
						buildingValue={building}
						buildingSetter={(e) =>
							setInputValue((prev) => ({
								...prev,
								building: e.target.value,
							}))
						}
						submitHandler={submitHandler}
					/>
				)}
			</FormContainer>
		</Container>
	)
}

export default ProfileScreen
