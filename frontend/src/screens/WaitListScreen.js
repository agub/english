import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Container from '../components/common/Container'
import FormContainer from '../components/common/FormContainer'
import { listGames } from '../redux/actions/gameActions'
import { listWaitLists } from '../redux/actions/emplopyeeActions'
import StudentsWaitList from '../components/StudentsWaitList'
import Loader from '../components/common/Loader'

const WaitListScreen = () => {
	const dispatch = useDispatch()
	const { students, loading } = useSelector(
		(state) => state.employeeWaitLists
	)

	const { loading: gameLoading, games } = useSelector(
		(state) => state.gameList
	)

	useEffect(() => {
		dispatch(listWaitLists())
		if (games.length === 0) {
			dispatch(listGames())
		}
		// console.log(students)
	}, [dispatch])
	return (
		<Container>
			<FormContainer>
				{loading || gameLoading ? (
					<Loader />
				) : (
					students &&
					students.map((student, index) => (
						<Link
							to={`/teacher/waitList/${student.userId}`}
							key={student.userId}
						>
							<StudentsWaitList
								type='button'
								index={index + 1}
								games={games}
								// consoleType={student.info.consoleType}
								student={student.info}
							/>
						</Link>
					))
				)}
			</FormContainer>
		</Container>
	)
}

export default WaitListScreen

