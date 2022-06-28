import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Container from '../components/common/Container'
import FormContainer from '../components/common/FormContainer'
import BackButton from '../components/common/BackButton'
import Message from '../components/common/Message'
import Loader from '../components/common/Loader'
import { listMyEvaluations } from '../redux/actions/evaluationActions'
import EvaluationHistory from '../components/EvaluationHistory'

const EvaluationHistoryListsScreen = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const { id } = useParams()
	const { userInfo } = useSelector((state) => state.userLogin)
	const { evaluation, loading, error } = useSelector(
		(state) => state.evaluationMyLists
	)

	useEffect(() => {
		if (!userInfo) {
			navigate('/login')
		}
		dispatch(listMyEvaluations(id))
	}, [dispatch, navigate, userInfo, id])

	return (
		<Container>
			<FormContainer>
				<Link to={`/teacher/student/${id}`}>
					<BackButton />
				</Link>
				{error && <Message variant='danger'>{error}</Message>}
				{loading && <Loader />}
				<h1 className='text-center'>評価の履歴</h1>
				<div>
					{evaluation &&
						evaluation.evaluations &&
						evaluation.evaluations.map((object) => (
							<Link
								key={object._id}
								to={`/teacher/student/${id}/evaluation/${object._id}`}
							>
								<EvaluationHistory
									evaluation={object}
									type='button'
								/>
							</Link>
						))}
				</div>
			</FormContainer>
		</Container>
	)
}

export default EvaluationHistoryListsScreen

