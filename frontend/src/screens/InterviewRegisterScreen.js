import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
import Button from '../components/common/Button'
import Container from '../components/common/Container'
import FormContainer from '../components/common/FormContainer'
import InputField from '../components/common/InputField'

import { useDispatch, useSelector } from 'react-redux'
import { listGames } from '../redux/actions/gameActions'
import { interview } from '../redux/actions/userActions'
import Message from '../components/common/Message'
import weeks from '../data/weeks'
import consoleData from '../data/consoleData'
import experienceData from '../data/experienceData'
import { RiDeleteBack2Fill } from 'react-icons/ri'
import { MdOutlineAddCircleOutline } from 'react-icons/md'

const InterviewRegisterScreen = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(listGames())
	}, [dispatch])

	const gamesList = useSelector((state) => state.gameList)
	const { loading, games } = gamesList

	const {
		loading: interviewLoading,
		success,
		error,
	} = useSelector((state) => state.userInterview)

	const [inputValue, setInputValue] = useState({
		email: '',
		name: {
			lastName: '',
			firstName: '',
			kanaLastName: '',
			kanaFirstName: '',
		},
		info: {
			phoneNumber: '',
			age: '',
			// gameTitle: '',
			consoleType: '',
			contactBy: '',
			experience: '',
			gameLists: [],
			rentMixer: '',
			preferTime: [
				{ week: '', time: '', rank: 1 },
				{ week: '', time: '', rank: 2 },
			],
			discordId: null,
		},
	})

	const [errorText, setErrorText] = useState(null)

	const [prefer, setPrefer] = useState({ week: '', time: '', rank: 1 })
	const [secPrefer, setSecPrefer] = useState({ week: '', time: '', rank: 2 })

	const [game1, setGame1] = useState({ id: '', active: true })
	const [game2, setGame2] = useState({ id: '', active: false })
	const [game3, setGame3] = useState({ id: '', active: false })

	function addGames(value, index) {
		if (index === 1) {
			setGame2({ id: '', active: true })
		} else if (index === 2) {
			setGame3({ id: '', active: true })
		}
	}

	function deleteGame(index) {
		if (index === 1) {
			setGame1({ id: game2.id, active: true })
			setGame2({ active: game3.active, id: game3.id })
			setGame3({ id: '', active: false })
		} else if (index === 2) {
			setGame2({ active: game3.active, id: game3.id })
			setGame3({ id: '', active: false })
		} else if (index === 3) {
			setGame3({ id: '', active: false })
		}
	}

	useEffect(() => {
		setInputValue((prev) => ({
			...prev,
			info: {
				...prev.info,
				preferTime: [prefer, secPrefer],
			},
		}))
		const array = [game1.id, game2.id, game3.id]
		const filteredGames = array.filter((obj) => obj !== '')
		let uniqueGames = [...new Set(filteredGames)]
		setInputValue((prev) => ({
			...prev,
			info: {
				...prev.info,
				gameLists: [...uniqueGames],
			},
		}))
	}, [prefer, secPrefer, game1, game2, game3])

	const submitHandler = (e) => {
		e.preventDefault()
		setErrorText(null)
		if (inputValue.info.gameLists.length === 0) {
			setErrorText('使用ゲームを正しく選択してください')
		} else {
			dispatch(interview(inputValue))
		}
	}

	console.log(inputValue)

	return (
		<Container>
			<FormContainer onSubmit={submitHandler}>
				{error && <Message variant='danger'>{error}</Message>}
				{errorText !== null && (
					<Message variant='danger'>{errorText}</Message>
				)}
				{success && <Message variant='info'>無料体験応募完了</Message>}
				<div className='mb-4'>
					<InputField
						type='email'
						value={inputValue.email}
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
						value={inputValue.info.phoneNumber}
						type='number'
						placeholder='電話番号'
						label='電話番号'
						onChange={(e) =>
							setInputValue((prev) => ({
								...prev,
								info: {
									...prev.info,
									phoneNumber: e.target.value,
								},
							}))
						}
					/>
				</div>
				<div className='mb-6'>
					<InputField
						value={inputValue.info.age || ''}
						name='age'
						type='number'
						placeholder='参加する方のご年齢'
						label='参加する方のご年齢'
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
				{/* ______________________________________________________________________________________________________ */}
				{/* <div className='mb-6'>
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
				</div> */}

				{/* ______________________________________________________________________________________________________ */}
				<div className='mb-6'>
					<label className='block text-gray-700 text-sm font-bold mb-2'>
						使用ゲーム
					</label>
					{game1.active && (
						<>
							<div className='flex flex-row'>
								<select
									id='data'
									name='gameTitle'
									required
									value={game1.id}
									onChange={(e) =>
										setGame1((prev) => ({
											...prev,
											id: e.target.value,
										}))
									}
									className='shadow border w-full rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
								>
									<option hidden>選択してください</option>
									{!loading &&
										games.map((item, key) => (
											<option key={key} value={item._id}>
												{item.title}
											</option>
										))}
								</select>
								{!game2.active ? (
									<button
										type='button'
										onClick={(e) => addGames(game1, 1)}
										className='p-2'
									>
										<MdOutlineAddCircleOutline />
									</button>
								) : (
									<button
										type='button'
										onClick={(e) => deleteGame(1)}
										className='p-2'
									>
										<RiDeleteBack2Fill />
									</button>
								)}
							</div>
						</>
					)}

					{game2.active && (
						<>
							<div className='flex flex-row'>
								<select
									id='data'
									name='gameTitle'
									value={game2.id}
									onChange={(e) =>
										setGame2((prev) => ({
											...prev,
											id: e.target.value,
										}))
									}
									className='shadow border w-full rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
								>
									<option hidden>選択してください</option>
									{!loading &&
										games.map((item, key) => (
											<option key={key} value={item._id}>
												{item.title}
											</option>
										))}
								</select>
								{!game3.active ? (
									<button
										type='button'
										onClick={(e) => addGames(game2, 2)}
										className='p-2'
									>
										<MdOutlineAddCircleOutline />
									</button>
								) : (
									<button
										type='button'
										onClick={(e) => deleteGame(2)}
										className='p-2'
									>
										<RiDeleteBack2Fill />
									</button>
								)}
							</div>
						</>
					)}

					{game3.active && (
						<>
							<div className='flex flex-row'>
								<select
									id='data'
									name='gameTitle'
									value={game3.id}
									onChange={(e) =>
										setGame3((prev) => ({
											...prev,
											id: e.target.value,
										}))
									}
									className='shadow border w-full rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
								>
									<option hidden>選択してください</option>
									{!loading &&
										games.map((item, key) => (
											<option key={key} value={item._id}>
												{item.title}
											</option>
										))}
								</select>
								{!game1.active || !game2.active ? (
									<button
										type='button'
										onClick={(e) => addGames(game3, 3)}
										className='p-2'
									>
										<MdOutlineAddCircleOutline />
									</button>
								) : (
									<button
										type='button'
										onClick={(e) => deleteGame(3)}
										className='p-2'
									>
										<RiDeleteBack2Fill />
									</button>
								)}
							</div>
						</>
					)}
				</div>
				{/* ______________________________________________________________________________________________________ */}
				<div className='mb-6 flex items-start flex-col'>
					<label className='block text-gray-700 text-sm font-bold mb-2'>
						お使いの機種
					</label>
					{consoleData.map((console, key) => (
						<div key={key}>
							<input
								required
								name='consoleType'
								value={console.data}
								type='radio'
								onChange={(e) => {
									setInputValue((prev) => ({
										...prev,
										info: {
											...prev.info,
											consoleType: e.target.value,
										},
									}))
								}}
							/>
							<label>{console.title}</label>
						</div>
					))}
				</div>

				{/* ______________________________________________________________________________________________________ */}
				<div className='mb-6 flex items-start flex-col'>
					<label className='block text-gray-700 text-sm font-bold mb-2'>
						連絡方法
					</label>
					<div>
						<input
							required
							name='contactBy'
							value='email'
							type='radio'
							onChange={(e) => {
								setInputValue((prev) => ({
									...prev,
									info: {
										...prev.info,
										contactBy: e.target.value,
									},
								}))
							}}
						/>
						<label>Emailで連絡</label>
					</div>
					<div>
						<input
							required
							name='contactBy'
							value='phone'
							type='radio'
							onChange={(e) => {
								setInputValue((prev) => ({
									...prev,
									info: {
										...prev.info,
										contactBy: e.target.value,
									},
								}))
							}}
						/>
						<label>電話で連絡</label>
					</div>
				</div>
				{/* ______________________________________________________________________________________________________ */}
				<div className='mb-6 flex items-start flex-col'>
					<label className='block text-gray-700 text-sm font-bold mb-2'>
						英会話のレベル
					</label>
					{experienceData.map((data, key) => (
						<div key={key}>
							<input
								required
								name='experience'
								value={data.value}
								type='radio'
								onChange={(e) =>
									setInputValue((prev) => ({
										...prev,
										info: {
											...prev.info,
											experience: parseInt(
												e.target.value
											),
										},
									}))
								}
							/>
							<label>{data.title}</label>
						</div>
					))}
				</div>
				{/* ______________________________________________________________________________________________________ */}
				<div className='mb-6 flex items-start flex-col'>
					<label className='block text-gray-700 text-sm font-bold mb-2'>
						ご希望の曜日と時間
					</label>
					<p className='text-sm'>第1希望</p>
					<div className='flex flex-row'>
						<select
							name='week'
							// onChange={preferHandleChange}
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
				{/* ______________________________________________________________________________________________________ */}
				{(inputValue.info.consoleType === 'tv' ||
					inputValue.info.consoleType === 'switch') && (
					<div className='mb-6 flex items-start flex-col'>
						<label className='block text-gray-700 text-sm font-bold mb-2'>
							パソコン以外での受講者はヘットフォンで先生との会話とゲームの音声の同時再生する端末が必要になります。
							<br />
							ゲームの端末以外に、パソコンまたは携帯電話でDiscord(専用通話アプリ)を使いながら受講するために
							の機械はお持ちですか? &nbsp;
							例:ボイスミキサー、スプリッターなど
						</label>
						<div>
							<input
								required
								name='rentMixer'
								value={'no_need'}
								type='radio'
								onChange={(e) => {
									setInputValue((prev) => ({
										...prev,
										info: {
											...prev.info,
											rentMixer: e.target.value,
										},
									}))
								}}
							/>
							<label>持っている or 自分で購入する</label>
						</div>
						<div>
							<input
								required
								name='rentMixer'
								value={'rent_mixer'}
								type='radio'
								onChange={(e) => {
									setInputValue((prev) => ({
										...prev,
										info: {
											...prev.info,
											rentMixer: e.target.value,
										},
									}))
								}}
							/>
							<label>レンタルする ¥500</label>
						</div>
						<div>
							<input
								required
								name='rentMixer'
								value={'required_additional_info'}
								type='radio'
								onChange={(e) => {
									setInputValue((prev) => ({
										...prev,
										info: {
											...prev.info,
											rentMixer: e.target.value,
										},
									}))
								}}
							/>
							<label>わからない</label>
						</div>
					</div>
				)}

				<div className='flex items-center justify-center'>
					<Button
						type='submit'
						bgColor='bg-blue-500'
						textColor='text-white'
						hoverColor='bg-blue-700'
						size='sm'
					>
						トライアルをリクエスト
					</Button>
				</div>
			</FormContainer>
		</Container>
	)
}

export default InterviewRegisterScreen

