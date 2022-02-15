import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/common/Button'
import Container from '../components/common/Container'
import FormContainer from '../components/common/FormContainer'
import InputField from '../components/common/InputField'
import Message from '../components/common/Message'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, userProfileUpdate } from '../redux/actions/userActions'
import HorizontalButton from '../components/common/HorizontalButton'
import Loader from '../components/common/Loader'
import { USER_PROFILE_UPDATE_RESET } from '../redux/constants/userConstants'

const ProfileScreen = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const [inputValue, setInputValue] = useState({
		password: '',
		confirmPassword: '',
		newPassword: '',
		discordId: '',
	})
	const [errorText, setErrorText] = useState(null)

	const [component, setComponent] = useState('')

	const { password, confirmPassword, discordId, newPassword } = inputValue

	const userDetails = useSelector((state) => state.userDetails)
	const { loading, user, error } = userDetails

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	const userUpdate = useSelector((state) => state.userProfileUpdate)
	const { success, error: userUpdateError } = userUpdate

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
	}, [navigate, userInfo, user, dispatch])

	useEffect(() => {
		if (component === '') {
			dispatch({ type: USER_PROFILE_UPDATE_RESET })
			setErrorText(null)
			setInputValue({
				password: '',
				confirmPassword: '',
				newPassword: '',
				discordId: '',
			})
		}
	}, [component, dispatch])

	const submitHandler = (e) => {
		dispatch({ type: USER_PROFILE_UPDATE_RESET })
		e.preventDefault()
		setErrorText(null)
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
				setInputValue({
					password: '',
					confirmPassword: '',
					newPassword: '',
					discordId: '',
				})
				dispatch(getUserDetails('profile'))
			} else {
				setErrorText('パスワードと確認パスワードが一致しません')
			}
		}

		if (inputValue.discordId) {
			dispatch(userProfileUpdate({ id: user._id, discordId }))
			dispatch(getUserDetails('profile'))
			setInputValue({
				password: '',
				confirmPassword: '',
				newPassword: '',
				discordId: '',
			})
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
				{component === '' && user && user.info && user.name && (
					<>
						<p>ユーザー情報</p>
						<HorizontalButton
							text='お名前'
							type='box'
							result={user.name.lastName + user.name.firstName}
						/>
						<HorizontalButton
							text='メールアドレス'
							type='box'
							result={user.email}
						/>
						<HorizontalButton
							text='Discordアカウント'
							type='box'
							result={user.info.discordId}
						/>
						<HorizontalButton
							text='受講日'
							type='box'
							result='データーモデルに追加'
						/>
						<HorizontalButton
							text='ご使用ゲーム'
							type='box'
							result={user.info.gameTitle}
						/>

						<p>設定</p>
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
						<HorizontalButton
							text='その他の設定'
							type='button'
							setState={() => setComponent('other')}
						/>
					</>
				)}

				{component === 'password' && (
					<>
						<button
							onClick={() => setComponent('')}
							className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800'
						>
							戻る
						</button>
						<h1 className='text-center'>パスワードを変更</h1>
						<div className='mb-4'>
							<InputField
								type='password'
								value={password}
								placeholder='現在のパスワード'
								label='現在のパスワード'
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
								placeholder='新しいパスワード'
								label='新しいパスワード'
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
								placeholder='新しい確認パスワード'
								label='新しい確認パスワード'
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
							>
								変更を保存
							</Button>
						</div>
					</>
				)}
				{component === 'discord' && user && user.info.discordId && (
					<>
						<button
							onClick={() => setComponent('')}
							className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800'
						>
							戻る
						</button>
						<h1 className='text-center'>Discordの名前変更</h1>

						<div className='mb-4'>
							<InputField
								type='text'
								value={discordId}
								placeholder={user.info.discordId}
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
							>
								変更を保存
							</Button>
						</div>
					</>
				)}
				{component === 'other' && (
					<>
						<h1>setting</h1>
						<button onClick={() => setComponent('')}>back</button>
					</>
				)}
			</FormContainer>
		</Container>
	)
}

export default ProfileScreen
