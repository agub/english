import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Container from '../components/common/Container'
import FormContainer from '../components/common/FormContainer'
import BackButton from '../components/common/BackButton'
import Message from '../components/common/Message'
import Loader from '../components/common/Loader'
import { orderListMySub, orderUnsub } from '../redux/actions/orderActions'
import { listMyEvaluations } from '../redux/actions/evaluationActions'
import Evaluation from '../components/Evaluation'

const EvaluationHistory = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { id } = useParams()

	const { userInfo } = useSelector((state) => state.userLogin)
	const { evaluation } = useSelector((state) => state.evaluationMyLists)
	console.log(evaluation.evaluations)
	// const submitHandler = (e) => {
	// 	e.preventDefault()
	// 	console.log(e.currentTarget.id)
	// 	dispatch(orderUnsub(e.currentTarget.id))
	// }

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
				{/* {error && <Message variant='danger'>{error}</Message>} */}
				{/* {(loading || orderListLoading) && <Loader />} */}
				<h1 className='text-center'>評価の履歴</h1>
				{/* <Evaluation /> */}
				<p>
					{evaluation &&
						evaluation.evaluations &&
						evaluation.evaluations.map((object) => (
							<Evaluation evaluation={object} type='button' />
						))}
				</p>
			</FormContainer>
		</Container>
	)
}

export default EvaluationHistory

