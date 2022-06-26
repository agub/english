import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Container from '../components/common/Container'
import FormContainer from '../components/common/FormContainer'
import Loader from '../components/common/Loader'
import MyStudentList from '../components/MyStudentList'
import { listMyStudentLists } from '../redux/actions/emplopyeeActions'

const MyStudentListScreen = () => {
	const dispatch = useDispatch()
	const { students, loading } = useSelector(
		(state) => state.employeeMyStudentLists
	)
	useEffect(() => {
		dispatch(listMyStudentLists())
	}, [dispatch])

	return (
		<Container>
			<FormContainer>
				<h1>生徒一覧</h1>
				{loading ? (
					<Loader />
				) : (
					students &&
					students?.map((student, index) => (
						<Link
							to={`/teacher/waitList/${student.userId}`}
							key={student.userId}
						>
							<MyStudentList
								type='button'
								consoleType={student.info.consoleType}
								name={student.name}
								discordId={student.info.discordId}
								schedule={student.schedule}
							/>
						</Link>
					))
				)}
			</FormContainer>
		</Container>
	)
}

export default MyStudentListScreen

