import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import Button from '../components/common/Button'
import Container from '../components/common/Container'
import FormContainer from '../components/common/FormContainer'
import InputField from '../components/common/InputField'
import Loader from '../components/common/Loader'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/common/Message'
import moment from 'moment'
import {
	evaluateStudent,
	listMyEvaluations,
} from '../redux/actions/evaluationActions'
import BackButton from '../components/common/BackButton'
import { EVALUATION_MY_LISTS_RESET } from '../redux/constants/evaluationConstants'

const EvaluateScreen = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const { userInfo } = useSelector((state) => state.userLogin)
	const { evaluation, loading, error } = useSelector(
		(state) => state.evaluationMyLists
	)

	const {
		error: evaluateError,
		loading: evaluateLoading,
		success,
	} = useSelector((state) => state.evaluationStudent)

	const filter =
		evaluation &&
		evaluation.evaluations &&
		evaluation.evaluations.some(
			(obj) =>
				moment(obj.createdAt).format('YYYYMM') ===
				moment().format('YYYYMM')
		)

	const numArray = [1, 2, 3, 4, 5]

	useEffect(() => {
		if (!userInfo) {
			navigate('/login')
			return
		}
		// }
		dispatch(listMyEvaluations(id))
	}, [dispatch, navigate, userInfo])

	const defaultState = {
		conversation: '',
		effort: '',
		concentration: '',
		speaking: '',
		overall: '',
		comment: '',
	}

	const [inputValue, setInputValue] = useState(defaultState)

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(evaluateStudent(id, inputValue))
		setInputValue(defaultState)
		console.log(inputValue)
	}

	return (
		<Container>
			<FormContainer onSubmit={submitHandler}>
				<Link to={`/teacher/student/${id}`}>
					<BackButton
						onClick={() => {
							dispatch({ type: EVALUATION_MY_LISTS_RESET })
						}}
					/>
				</Link>

				{(error || evaluateError) && (
					<Message variant='danger'>{error}</Message>
				)}
				{success && (
					<Message variant='info'>評価をいたしたました</Message>
				)}
				{loading || evaluateLoading ? (
					<Loader />
				) : filter ? (
					<Message variant='danger'>今月は評価済みです。</Message>
				) : (
					<>
						<h1>${moment().format('M')}月の評価</h1>
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
					</>
				)}
			</FormContainer>
		</Container>
	)
}

export default EvaluateScreen

