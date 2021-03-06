import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Container from '../components/common/Container'
import FormContainer from '../components/common/FormContainer'
import { listWaitLists } from '../redux/actions/employeeActions'
import { EMPLOYEE_WAIT_LISTS_RESET } from '../redux/constants/employeeConstant'
import BackButton from '../components/common/BackButton'
import Button from '../components/common/Button'
import { weeks } from '../utils/data'
import { listGames } from '../redux/actions/gameActions'
import Loader from '../components/common/Loader'
import InputField from '../components/common/InputField'

const WaitListScreen = () => {
	const [rank, setRank] = useState('')
	const [selectGame, setSelectGame] = useState('')
	const [comment, setComment] = useState('')

	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { id } = useParams()
	const { students, success, loading } = useSelector(
		(state) => state.employeeWaitLists
	)

	const { loading: gameLoading, games } = useSelector(
		(state) => state.gameList
	)

	const getPreferWeekValue = (originalArray, weeksData) =>
		originalArray
			.map((obj) => weeksData.find((week) => week.data === obj.week))
			.map((obj, index) => ({
				...obj,
				time: originalArray[index].time,
				rank: originalArray[index].rank,
			}))

	const getGameObject = (originalArray, gameData) =>
		originalArray.map((game) =>
			gameData.find((obj) => obj._id.toString() === game.toString())
		)

	const filteredStudent =
		students && students.filter((student) => student.userId === id)[0]

	const submitHandler = (e) => {
		e.preventDefault()
		console.log(rank)
		console.log('fire')
	}

	useEffect(() => {
		if (students && !success) {
			dispatch(listGames())
			// dispatch({ type: USER_WAIT_LISTS_RESET })
			dispatch(listWaitLists())
		}
	}, [dispatch, success, students])

	return (
		<Container>
			<FormContainer>
				<BackButton
					onClick={(e) => {
						e.preventDefault()
						dispatch({ type: EMPLOYEE_WAIT_LISTS_RESET })
						navigate('/teacher/waitList')
					}}
				/>
				{loading || gameLoading ? (
					<Loader />
				) : (
					games &&
					students &&
					filteredStudent &&
					filteredStudent.info.gameLists && (
						<>
							<div>
								<p>?????????: {filteredStudent.info.experience}</p>
								<p>??????: {filteredStudent.info.consoleType}</p>
								<p>???: {filteredStudent.info.age}???</p>
								<p>
									???????????????: <br></br>
									&nbsp; &nbsp;
									{filteredStudent &&
										games &&
										filteredStudent.info.gameLists &&
										getGameObject(
											filteredStudent.info.gameLists,
											games
										).map((obj) => (
											<span key={obj._id}>
												{obj.title},{' '}
											</span>
										))}
								</p>
							</div>
							<div className='mb-6 flex items-start flex-col'>
								<label className='block text-gray-700 text-sm font-bold mb-2'>
									????????????
								</label>
								{students &&
									filteredStudent &&
									getPreferWeekValue(
										filteredStudent.info.preferTime,
										weeks
									).map((student, index) => (
										<div key={index}>
											<input
												required
												name='preferWeek'
												value={student.rank}
												type='radio'
												onChange={(e) =>
													setRank(e.target.value)
												}
											/>
											<label>
												???{student.rank}??????:{' '}
												{student.title} {student.time}???
												~
											</label>
										</div>
									))}
							</div>
							<div className='mb-6'>
								<label className='block text-gray-700 text-sm font-bold mb-2'>
									???????????????
								</label>
								<select
									id='data'
									name='gameTitle'
									required
									value={selectGame}
									onChange={(e) =>
										setSelectGame(e.target.value)
									}
									className='shadow border w-full rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
								>
									<option hidden>????????????????????????</option>
									{filteredStudent &&
										games &&
										filteredStudent.info.gameLists &&
										getGameObject(
											filteredStudent.info.gameLists,
											games
										).map((item, key) => (
											<option key={key} value={item._id}>
												{item.title}
											</option>
										))}
								</select>
							</div>
							<div className='mb-6'>
								<InputField
									value={comment}
									type='textarea'
									placeholder='??????'
									label='?????????????????????'
									onChange={(e) =>
										setComment((prev) => ({
											comment: e.target.value,
										}))
									}
								/>
							</div>
							<Button
								onClick={submitHandler}
								type='submit'
								bgColor='bg-blue-500'
								textColor='text-white'
								hoverColor='bg-blue-700'
								size='sm'
							>
								APPLY
							</Button>
						</>
					)
				)}
			</FormContainer>
		</Container>
	)
}

export default WaitListScreen

