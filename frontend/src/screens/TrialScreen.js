import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/common/Button'
import Container from '../components/common/Container'
import FormContainer from '../components/common/FormContainer'
import InputField from '../components/common/InputField'

const data = [
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

const TrialScreen = () => {
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
	})
	const { email, fullName, phoneNumber, age, gameTitle, preferTime } =
		inputValue

	console.log(inputValue)
	const handleChange = (e) => {
		const { name, value } = e.target
		setInputValue((prev) => ({
			...prev,
			[name]: value,
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
						onChange={handleChange}
					/>
				</div>
				{/* ______________________________________________________________________________________________________ */}
				<div className='mb-6'>
					<label className='block text-gray-700 text-sm font-bold mb-2'>
						使用ゲーム
					</label>
					<input
						required
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						type='text'
						list='data'
						name='gameTitle'
						value={gameTitle}
						onChange={handleChange}
					/>
					<datalist id='data'>
						{data.map((item, key) => (
							<option key={key} value={item.title} />
						))}
					</datalist>
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
							maxLength={2}
							onChange={handleChange}
							placeholder='XX'
							className='shadow appearance-none border rounded w-24 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						/>
						{preferTime < 12 ? 'am' : 'pm'}
						&nbsp; ~
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
						トライアルをリクエスト
					</Button>
				</div>
			</FormContainer>
		</Container>
	)
}

export default TrialScreen
