import React, { useEffect, useState } from 'react'
import Button from '../components/common/Button'
import Container from '../components/common/Container'
import FormContainer from '../components/common/FormContainer'
import InputField from '../components/common/InputField'
import Message from '../components/common/Message'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../redux/actions/userActions'
import { listGames } from '../redux/actions/gameActions'
import weeks from '../data/weeks'

const TeacherRegisterScreen = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(listGames())
	}, [dispatch])

	const [inputValue, setInputValue] = useState({
		email: '',
		password: '',
		confirmPassword: '',
		name: {
			lastName: '',
			firstName: '',
			kanaLastName: '',
			kanaFirstName: '',
		},
		info: {
			discordId: '',
			gender: '',
			age: '',
			preferTime: [
				{ week: '', time: '', rank: 1 },
				{ week: '', time: '', rank: 2 },
			],
		},
	})

	const [errorText, setErrorText] = useState(null)
	console.log(inputValue)

	const { email, password, confirmPassword, discordId } = inputValue

	const userRegister = useSelector((state) => state.userRegister)
	const { loading, success, error } = userRegister

	const gamesList = useSelector((state) => state.gameList)
	const { loading: gameLoading, games } = gamesList

	const [prefer, setPrefer] = useState({ week: '', time: '', rank: 1 })
	const [secPrefer, setSecPrefer] = useState({ week: '', time: '', rank: 2 })

	useEffect(() => {
		setInputValue((prev) => ({
			...prev,
			info: {
				...prev.info,
				preferTime: [prefer, secPrefer],
			},
		}))
	}, [prefer, secPrefer])

	const submitHandler = (e) => {
		e.preventDefault()
		setErrorText(null)
		if (password === confirmPassword) {
			dispatch(register(inputValue))
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
				<div className='mb-4'>
					<InputField
						type='email'
						value={email}
						name='email'
						placeholder='メールアドレス'
						label='メールアドレス'
						onChange={(e) =>
							setInputValue((prev) => ({
								...prev,
								email: e.target.value,
							}))
						}
					/>
				</div>
				<div className='mb-4'>
					<InputField
						type='text'
						value={discordId}
						name='discordId'
						placeholder='Discord アカウント名'
						label='Discord アカウント名'
						onChange={(e) =>
							setInputValue((prev) => ({
								...prev,
								info: {
									...prev.info,
									discordId: e.target.value,
								},
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
				<div className='mb-4'>
					<InputField
						type='password'
						value={confirmPassword}
						name='confirmPassword'
						placeholder='パスワード確認'
						label='パスワード確認'
						onChange={(e) =>
							setInputValue((prev) => ({
								...prev,
								confirmPassword: e.target.value,
							}))
						}
					/>
				</div>
				<div className='mb-6'>
					<div className='flex justify-between'>
						<div>
							<InputField
								value={inputValue.name.lastName}
								type='text'
								placeholder='鈴木'
								label='名字'
								onChange={(e) =>
									setInputValue((prev) => ({
										...prev,
										name: {
											...prev.name,
											lastName: e.target.value,
										},
									}))
								}
							/>
						</div>
						<div>
							<InputField
								value={inputValue.name.firstName}
								type='text'
								placeholder='太朗'
								label='お名前'
								onChange={(e) =>
									setInputValue((prev) => ({
										...prev,
										name: {
											...prev.name,
											firstName: e.target.value,
										},
									}))
								}
							/>
						</div>
					</div>
				</div>
				<div className='mb-6'>
					<div className='flex justify-between'>
						<div>
							<InputField
								value={inputValue.name.kanaLastName}
								type='text'
								placeholder='スズキ'
								label='フリガナ'
								onChange={(e) =>
									setInputValue((prev) => ({
										...prev,
										name: {
											...prev.name,
											kanaLastName: e.target.value,
										},
									}))
								}
							/>
						</div>
						<div>
							<InputField
								value={inputValue.name.kanaFirstName}
								type='text'
								placeholder='タロウ'
								label='&nbsp;'
								onChange={(e) =>
									setInputValue((prev) => ({
										...prev,
										name: {
											...prev.name,
											kanaFirstName: e.target.value,
										},
									}))
								}
							/>
						</div>
					</div>
				</div>
				<div className='mb-6'>
					<InputField
						value={inputValue.info.age || ''}
						name='age'
						type='number'
						placeholder='ご年齢'
						label='ご年齢'
						max='99'
						onChange={(e) => {
							setInputValue((prev) => ({
								...prev,
								info: {
									...prev.info,
									age: parseInt(e.target.value),
								},
							}))
						}}
					/>
				</div>
				<div className='mb-6 flex items-start flex-col'>
					<label className='block text-gray-700 text-sm font-bold mb-2'>
						性別
					</label>
					<div>
						<input
							required
							name='gender'
							value='male'
							type='radio'
							onChange={(e) => {
								setInputValue((prev) => ({
									...prev,
									info: {
										...prev.info,
										gender: e.target.value,
									},
								}))
							}}
						/>
						<label>男性</label>
					</div>
					<div>
						<input
							required
							name='gender'
							value='female'
							type='radio'
							onChange={(e) => {
								setInputValue((prev) => ({
									...prev,
									info: {
										...prev.info,
										gender: e.target.value,
									},
								}))
							}}
						/>
						<label>女性</label>
					</div>
				</div>
				<div className='mb-6'>
					<label className='block text-gray-700 text-sm font-bold mb-2'>
						使用ゲーム
					</label>
					<select
						id='data'
						name='gameTitle'
						value={inputValue.info.gameTitle}
						onChange={(e) => {
							setInputValue((prev) => ({
								...prev,
								info: {
									...prev.info,
									gameTitle: e.target.value,
								},
							}))
						}}
						className='shadow border w-full rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					>
						<option hidden>選択してください</option>
						{!loading &&
							games.map((item, key) => (
								<option key={key} value={item.title}>
									{item.title}
								</option>
							))}
					</select>
				</div>
				<div className='mb-6 flex items-start flex-col'>
					<label className='block text-gray-700 text-sm font-bold mb-2'>
						ご希望の曜日と時間
					</label>
					<p className='text-sm'>第1希望</p>
					<div className='flex flex-row'>
						<select
							name='week'
							onChange={(e) =>
								setPrefer((prev) => ({
									...prev,
									week: e.target.value,
									rank: 1,
								}))
							}
							className='shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						>
							<option hidden>選択してください</option>
							{weeks.map((day, key) => (
								<option key={key} value={day.data}>
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
								onChange={(e) =>
									setPrefer((prev) => ({
										...prev,
										time: parseInt(e.target.value),
										rank: 1,
									}))
								}
								placeholder='XX'
							/>
							{inputValue.info.preferTime[0].time < 12
								? 'am'
								: 'pm'}
							&nbsp; ~
						</div>
					</div>
					<p className='text-sm'>第2希望</p>
					<div className='flex flex-row'>
						<select
							name='week'
							// value={preferWeek}
							// onChange={preferHandleChange}
							onChange={(e) =>
								setSecPrefer((prev) => ({
									...prev,
									week: e.target.value,
									rank: 2,
								}))
							}
							className='shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						>
							<option hidden>選択してください</option>
							{weeks.map((day, key) => (
								<option key={key} value={day.data}>
									{day.title}
								</option>
							))}
						</select>

						{/* ______________________________ */}
						<div className='flex justify-around items-center'>
							<input
								required
								// value={preferTime}
								// name='preferTime'
								type='number'
								max='24'
								name='time'
								// onChange={preferHandleChange}
								onChange={(e) => {
									setSecPrefer((prev) => ({
										...prev,
										time: parseInt(e.target.value),
										rank: 2,
									}))
								}}
								placeholder='XX'
								className='shadow appearance-none border rounded w-16 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
							/>
							<div>
								{inputValue.info.preferTime[1].time < 12
									? 'am'
									: 'pm'}
								&nbsp; ~
							</div>
						</div>
					</div>
					*24時間表記でお願いします。
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
				</div>
			</FormContainer>
		</Container>
	)
}

export default TeacherRegisterScreen
