import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Container from '../components/common/Container'
import FormContainer from '../components/common/FormContainer'
import Message from '../components/common/Message'
import HorizontalButton from '../components/common/HorizontalButton'
import BackButton from '../components/common/BackButton'
import Loader from '../components/common/Loader'

import { useDispatch, useSelector } from 'react-redux'

import { listMyStudentLists } from '../redux/actions/employeeActions'

const MyStudentScreen = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { id } = useParams()
	const { userInfo } = useSelector((state) => state.userLogin)

	const { students, loading, error } = useSelector(
		(state) => state.employeeMyStudentLists
	)
	const filteredStudent =
		students && students.filter((student) => student.userId === id)[0]

	useEffect(() => {
		if (!userInfo) {
			navigate('/login')
			return
		}
		dispatch(listMyStudentLists())
	}, [navigate, userInfo, dispatch])

	return (
		<Container>
			<FormContainer>
				<Link to={`/teacher/students`}>
					<BackButton />
				</Link>
				{error && <Message variant='danger'>{error}</Message>}
				{loading ? (
					<Loader />
				) : (
					students &&
					filteredStudent && (
						<div>
							<p className='mt-4'>ユーザー情報</p>
							<HorizontalButton
								text='お名前:'
								type='box'
								result={
									filteredStudent.name?.firstName +
									' ' +
									filteredStudent.name?.lastName
								}
							/>
							<p className='mt-4'>設定</p>

							<Link to={`/teacher/student/${id}/evaluations`}>
								<HorizontalButton
									text='過去の評価履歴'
									type='button'
								/>
							</Link>
							<Link to={`/teacher/student/${id}/evaluate`}>
								<HorizontalButton
									text='xxの評価をつける'
									type='button'
								/>
							</Link>
						</div>
					)
				)}
				{/* </>
				)} */}
			</FormContainer>
		</Container>
	)
}

export default MyStudentScreen

