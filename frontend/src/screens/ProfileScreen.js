import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/common/Button'
import Container from '../components/common/Container'
import FormContainer from '../components/common/FormContainer'
import InputField from '../components/common/InputField'
import Message from '../components/common/Message'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails } from '../redux/actions/userActions'
import GetUserInfo from '../components/function/GetUserInfo'
import HorizontalButton from '../components/common/HorizontalButton'
import e from 'express'

const ProfileScreen = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const [inputValue, setInputValue] = useState({
		password: '',
		confirmPassword: '',
		discordId: '',
	})
	const [errorText, setErrorText] = useState(null)

	const [component, setComponent] = useState('')

	const { password, confirmPassword, discordId } = inputValue

	const userDetails = useSelector((state) => state.userDetails)
	const { loading, user, error } = userDetails

	const { userInfo } = GetUserInfo()

	useEffect(() => {
		if (!userInfo) {
			navigate('/login')
		} else {
			// dispatch(getUserDetails('profile'))
		}
	}, [userInfo, navigate, dispatch])

	const submitHandler = (e) => {
		e.preventDefault()
		setErrorText(null)
		if (password === confirmPassword) {
			//update dispatch
		} else {
			setErrorText('パスワードと確認パスワードが一致しません')
		}
	}

	return (
		<Container>
			<FormContainer onSubmit={submitHandler}>
				{errorText !== null && (
					<Message variant='danger'>{errorText}</Message>
				)}
				{error && <Message variant='danger'>{error}</Message>}

				{component === '' && (
					<>
						{/* <h1>鈴木 慎一郎 </h1> */}

						{/* <p>メールアドレス: shintrfc@gmail.com</p>
						<p>受講日: 毎週火曜 18PM</p>
						<p>先生: John Doe</p>
						<p>ご使用ゲーム: Minecraft(マインクラフト)</p> */}
						<p>ユーザー情報</p>
						<HorizontalButton
							text='お名前'
							type='box'
							result='鈴木 慎一郎'
						/>
						<HorizontalButton
							text='メールアドレス'
							type='box'
							result='shintrfc@gmail.com'
						/>
						<HorizontalButton
							text='Discordアカウント'
							type='box'
							result='agub'
						/>
						<HorizontalButton
							text='受講日'
							type='box'
							result='毎週火曜 18PM'
						/>
						<HorizontalButton
							text='ご使用ゲーム'
							type='box'
							result='Minecraft(マインクラフト)'
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
						<h1>password setting</h1>
						<button onClick={() => setComponent('')}>back</button>
					</>
				)}
				{component === 'discord' && (
					<>
						<h1>discord setting</h1>
						<button onClick={() => setComponent('')}>back</button>
					</>
				)}
				{component === 'other' && (
					<>
						<h1>discord setting</h1>
						<button onClick={() => setComponent('')}>back</button>
					</>
				)}

				{/* <div className='mb-4'>
					<InputField
						type='text'
						value={discordId}
						name='discordName'
						placeholder='Discord アカウント名'
						label='Discord アカウント名'
						onChange={(e) =>
							setInputValue((prev) => ({
								...prev,
								discordId: e.target.value,
							}))
						}
					/>
				</div>
				<div className='mb-4'>
					<InputField
						type='password'
						value={password}
						name='password'
						placeholder='パスワード'
						label='パスワード'
						onChange={(e) =>
							setInputValue((prev) => ({
								...prev,
								password: e.target.value,
							}))
						}
					/>
				</div>

				<div className='flex items-center justify-center'>
					<Button
						type='submit'
						bgColor='bg-blue-500'
						textColor='text-white'
						hoverColor='bg-blue-700'
						size='sm'
					>
						ユーザー登録
					</Button>
				</div> */}
			</FormContainer>
		</Container>
	)
}

export default ProfileScreen
