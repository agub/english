import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
// import { Link } from 'react-router-dom'
import Button from '../components/common/Button'
import Container from '../components/common/Container'
import FormContainer from '../components/common/FormContainer'
import InputField from '../components/common/InputField'
import Loader from '../components/common/Loader'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/common/Message'
import moment from 'moment'

const EvaluateScreen = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const numArray = [1, 2, 3, 4, 5]

	useEffect(() => {
		// if (!userId) {
		// 	navigate('/login')
		// 	return
		// }
		// }
	}, [dispatch, navigate])

	const { loading, success, error } = useSelector(
		(state) => state.userInterview
	)

	const [inputValue, setInputValue] = useState({
		conversation: '',
		effort: '',
		concentration: '',
		speaking: '',
		overall: '',
		comment: '',
	})

	const submitHandler = (e) => {
		e.preventDefault()
	}

	console.log(inputValue)

	return (
		<Container>
			<FormContainer onSubmit={submitHandler}>
				{error && <Message variant='danger'>{error}</Message>}
				{/* {errorText !== null && (
					<Message variant='danger'>{errorText}</Message>
				)} */}
				{/* {success && <Message variant='info'>無料体験応募完了</Message>} */}
				{loading && <Loader />}

				<div className='mb-6'>
					<label className='block text-gray-700 text-sm font-bold mb-2'>
						会話の上達率
					</label>
					<select
						id='conversation'
						name='conversation'
						required
						onChange={(e) => {
							setInputValue((prev) => ({
								...prev,
								conversation: parseInt(e.target.value),
							}))
						}}
						className='shadow border w-full rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					>
						<option hidden>選択してください</option>
						{numArray.map((item, key) => (
							<option key={key} value={item}>
								{item}
							</option>
						))}
					</select>
				</div>
				<div className='mb-6'>
					<label className='block text-gray-700 text-sm font-bold mb-2'>
						努力値
					</label>
					<select
						id='effort'
						name='effort'
						required
						onChange={(e) => {
							setInputValue((prev) => ({
								...prev,
								effort: parseInt(e.target.value),
							}))
						}}
						className='shadow border w-full rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					>
						<option hidden>選択してください</option>
						{numArray.map((item, key) => (
							<option key={key} value={item}>
								{item}
							</option>
						))}
					</select>
				</div>
				<div className='mb-6'>
					<label className='block text-gray-700 text-sm font-bold mb-2'>
						集中力
					</label>
					<select
						id='concentration'
						name='concentration'
						required
						onChange={(e) => {
							setInputValue((prev) => ({
								...prev,
								concentration: parseInt(e.target.value),
							}))
						}}
						className='shadow border w-full rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					>
						<option hidden>選択してください</option>
						{numArray.map((item, key) => (
							<option key={key} value={item}>
								{item}
							</option>
						))}
					</select>
				</div>
				<div className='mb-6'>
					<label className='block text-gray-700 text-sm font-bold mb-2'>
						発言力
					</label>
					<select
						id='speaking'
						name='speaking'
						required
						onChange={(e) => {
							setInputValue((prev) => ({
								...prev,
								speaking: parseInt(e.target.value),
							}))
						}}
						className='shadow border w-full rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					>
						<option hidden>選択してください</option>
						{numArray.map((item, key) => (
							<option key={key} value={item}>
								{item}
							</option>
						))}
					</select>
				</div>
				<div className='mb-6'>
					<label className='block text-gray-700 text-sm font-bold mb-2'>
						今月の総合評価
					</label>
					<select
						id='overall'
						name='overall'
						required
						onChange={(e) => {
							setInputValue((prev) => ({
								...prev,
								overall: parseInt(e.target.value),
							}))
						}}
						className='shadow border w-full rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					>
						<option hidden>選択してください</option>
						{numArray.map((item, key) => (
							<option key={key} value={item}>
								{item}
							</option>
						))}
					</select>
				</div>
				<div className='mb-6'>
					<InputField
						value={inputValue.comment}
						type='textarea'
						placeholder='コメント'
						label='コメント'
						onChange={(e) =>
							setInputValue((prev) => ({
								...prev,
								comment: e.target.value,
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
						今月の評価をつける
					</Button>
				</div>
			</FormContainer>
		</Container>
	)
}

export default EvaluateScreen

