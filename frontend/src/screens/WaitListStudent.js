import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Container from '../components/common/Container'
import FormContainer from '../components/common/FormContainer'
import { listWaitLists } from '../redux/actions/userActions'
import { USER_WAIT_LISTS_RESET } from '../redux/constants/userConstants'
import BackButton from '../components/common/BackButton'
import weeks from '../data/weeks'
import { listGames } from '../redux/actions/gameActions'

const WaitListScreen = () => {
	const [rank, setRank] = useState('')
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { id } = useParams()
	const { students, success } = useSelector((state) => state.userWaitLists)

	const filteredStudent =
		students && students.filter((student) => student._id === id)[0]

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

	const submitHandler = (e) => {
		e.preventDefault()
		console.log(rank)
		console.log('fire')
	}

	useEffect(() => {
		if (students && students.length === 0 && !success) {
			dispatch(listGames())
			dispatch({ type: USER_WAIT_LISTS_RESET })
			dispatch(listWaitLists())
		}

		if (filteredStudent && filteredStudent.info && games) {
			console.log(getGameObject(filteredStudent.info.gameLists, games))
		}
	}, [dispatch, success, students, games])

	return (
		<Container>
			<FormContainer>
				<BackButton
					onClick={(e) => {
						e.preventDefault()
						navigate('/teacher/waitList')
					}}
				/>
				{students && filteredStudent && games && (
					<div>
						<p>経験度: {filteredStudent.info.experience}</p>
						<p>機種: {filteredStudent.info.consoleType}</p>
						<p>歳: {filteredStudent.info.age}歳</p>
						<p>
							使用ゲーム: <br></br>
							&nbsp; &nbsp;
							{getGameObject(
								filteredStudent.info.gameLists,
								games
							).map((game) => (
								<span key={game._id}>{game.title}, </span>
							))}
						</p>
					</div>
				)}
				<div className='mb-6 flex items-start flex-col'>
					<label className='block text-gray-700 text-sm font-bold mb-2'>
						希望時間
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
									onChange={(e) => setRank(e.target.value)}
								/>
								<label>
									第{student.rank}希望: {student.title}{' '}
									{student.time}時 ~
								</label>
							</div>
						))}
				</div>
				<button type='submit' onClick={submitHandler}>
					応募
				</button>
			</FormContainer>
		</Container>
	)
}

export default WaitListScreen
