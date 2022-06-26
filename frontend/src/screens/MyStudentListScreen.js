import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import BackButton from '../components/common/BackButton'
import Container from '../components/common/Container'
import FormContainer from '../components/common/FormContainer'
import Loader from '../components/common/Loader'
import MyStudentList from '../components/MyStudentList'
import { listMyStudentLists } from '../redux/actions/employeeActions'

const MyStudentListScreen = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { students, loading } = useSelector(
		(state) => state.employeeMyStudentLists
	)
	const { userInfo } = useSelector((state) => state.userLogin)

	useEffect(() => {
		if (!userInfo) {
			navigate('/login')
		}
		dispatch(listMyStudentLists())
	}, [dispatch, userInfo])

	return (
		<Container>
			<FormContainer>
				<Link to={`/profile`}>
					<BackButton />
				</Link>
				<h1>生徒一覧</h1>
				{loading ? (
					<Loader />
				) : (
					students &&
					students?.map((student, index) => (
						<Link
							to={`/teacher/student/${student.userId}`}
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

