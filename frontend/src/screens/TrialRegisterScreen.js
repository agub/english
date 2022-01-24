import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// import games from '../data/games'
import Button from '../components/common/Button'
import Container from '../components/common/Container'
import FormContainer from '../components/common/FormContainer'
import InputField from '../components/common/InputField'

const games = [
	{ title: 'Apex' },
	{ title: 'あつ森' },
	{ title: 'Minecraft (マインクラフト）' },
	{ title: 'Call of duty (コールオブデゥーティー)' },
	{ title: 'Monster Hunter (モンスターハンター)' },
	{ title: 'Fortnite (フォートナイト)' },
]
const weeks = [
	{ title: '月曜日', data: 'monday' },
	{ title: '火曜日', data: 'tuesday' },
	{ title: '水曜日', data: 'wednesday' },
	{ title: '木曜日', data: 'thursday' },
	{ title: '金曜日', data: 'friday' },
	{ title: '土曜日', data: 'saturday' },
	{ title: '日曜日', data: 'sunday' },
]

const consoleData = [
	{ title: 'Nintendo Switch', data: 'switch' },
	{ title: 'コンピューター', data: 'pc' },
	{ title: 'PS4', data: 'ps4' },
]

const experienceData = [
	{ value: 0, title: '全く話せない' },
	{ value: 1, title: '簡単な単語を知っている' },
	{ value: 2, title: '簡単な会話ができる' },
	{ value: 3, title: '会話ができる' },
	{ value: 4, title: 'それ以上' },
]

const TrialRegisterScreen = () => {
	const [inputValue, setInputValue] = useState({
		email: '',
		fullName: '',
		phoneNumber: '',
		age: '',
		consoleType: '',
		gameTitle: '',
		contactBy: '',
		experience: '',
		preferWeek: '',
		preferTime: '',
		rentMixer: '',
	})
	const {
		email,
		fullName,
		phoneNumber,
		age,
		consoleType,
		gameTitle,
		preferTime,
	} = inputValue

	console.log(inputValue)
	const handleChange = (e) => {
		const { name, value } = e.target
		setInputValue((prev) => ({
			...prev,
			[name]: value,
			// age: Number(value),
			// gameTitle: value,
		}))
	}
	const submitHandler = () => {
		console.log('submit')
	}

	return (
		<Container>
			<FormContainer onSubmit={submitHandler}>
				<div className='mb-4'>
					<InputField
						type='email'
						value={email}
						name='email'
						placeholder='メールアドレス'
						label='メールアドレス'
						onChange={handleChange}
					/>
				</div>
				<div className='mb-6'>
					<InputField
						value={fullName}
						name='fullName'
						type='text'
						placeholder='参加する方のお名前'
						label='参加する方のお名前'
						onChange={handleChange}
					/>
				</div>
				<div className='mb-6'>
					<InputField
						value={phoneNumber}
						name='phoneNumber'
						type='number'
						placeholder='電話番号'
						label='電話番号'
						onChange={handleChange}
					/>
				</div>
				<div className='mb-6'>
					<InputField
						value={age}
						name='age'
						type='number'
						placeholder='参加する方のご年齢'
						label='参加する方のご年齢'
						max='99'
						onChange={handleChange}
					/>
				</div>
				{/* ______________________________________________________________________________________________________ */}
				<div className='mb-6'>
					<label className='block text-gray-700 text-sm font-bold mb-2'>
						使用ゲーム
					</label>
					{/* <input
						required
						className='shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						// type='text'
						list='data'
						name='gameTitle'
						value={gameTitle}
						onChange={handleChange}
					/> */}
					<select
						id='data'
						name='gameTitle'
						value={gameTitle}
						onChange={handleChange}
						className='shadow border w-full rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					>
						{games.map((item, key) => (
							<option key={key} value={item.title}>
								{item.title}
							</option>
						))}
					</select>
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
								onChange={handleChange}
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
							onChange={handleChange}
						/>
						<label>Emailで連絡</label>
					</div>
					<div>
						<input
							required
							name='contactBy'
							value='phone'
							type='radio'
							onChange={handleChange}
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
								onChange={handleChange}
							/>
							<label>{data.title}</label>
						</div>
					))}
				</div>
				{/* ______________________________________________________________________________________________________ */}
				<div className='mb-6 flex items-start flex-col'>
					<label className='block text-gray-700 text-sm font-bold mb-2'>
						希望する曜日と時間
					</label>
					{weeks.map((day, key) => (
						<div key={key}>
							<input
								required
								name='preferWeek'
								value={day.data}
								type='radio'
								onChange={handleChange}
							/>
							<label>{day.title}</label>
						</div>
					))}
					<div>
						<input
							required
							value={preferTime}
							name='preferTime'
							type='number'
							max='24'
							onChange={handleChange}
							placeholder='XX'
							className='shadow appearance-none border rounded w-24 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						/>
						{preferTime < 12 ? 'am' : 'pm'}
						&nbsp; ~
					</div>
					*24時間表記でお願いします。
				</div>
				{/* ______________________________________________________________________________________________________ */}
				{(consoleType === 'ps4' || consoleType === 'switch') && (
					<div className='mb-6 flex items-start flex-col'>
						<label className='block text-gray-700 text-sm font-bold mb-2'>
							パソコン以外での受講者はヘットフォンで先生との会話とゲームの音声の同時再生する端末が必要になります。
							<br />
							ゲームの端末以外に、パソコンまたは携帯電話でDiscord(専用通話アプリ)を使いながら受講するために
							の機械はお持ちですか？ &nbsp;
							*ボイスミキサー、スプリッターなど
						</label>
						<div>
							<input
								required
								name='rentMixer'
								value={false}
								type='radio'
								onChange={handleChange}
							/>
							<label>持っている or 自分で購入する</label>
						</div>
						<div>
							<input
								required
								name='rentMixer'
								value={true}
								type='radio'
								onChange={handleChange}
							/>
							<label>レンタルする ¥500</label>
						</div>
						<div>
							<input
								required
								name='rentMixer'
								value={undefined}
								type='radio'
								onChange={handleChange}
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

export default TrialRegisterScreen
