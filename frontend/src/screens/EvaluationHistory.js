import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Container from '../components/common/Container'
import FormContainer from '../components/common/FormContainer'
import BackButton from '../components/common/BackButton'
import Message from '../components/common/Message'
import Loader from '../components/common/Loader'
import { orderListMySub, orderUnsub } from '../redux/actions/orderActions'
import { listMyEvaluations } from '../redux/actions/evaluationActions'

const EvaluationHistory = () => {
	const dispatch = useDispatch()
	const { id } = useParams()

	const { userInfo } = useSelector((state) => state.userLogin)

	const { evaluations } = useSelector((state) => state.evaluationMyLists)

	// const submitHandler = (e) => {
	// 	e.preventDefault()
	// 	console.log(e.currentTarget.id)
	// 	dispatch(orderUnsub(e.currentTarget.id))
	// }

	useEffect(() => {
		dispatch(listMyEvaluations(userInfo._id))

		// console.log(userInfo._id)
	}, [dispatch, userInfo])

	return (
		<Container>
			<FormContainer>
				<Link to={`/teacher/student/${id}`}>
					<BackButton />
				</Link>
				{/* {error && <Message variant='danger'>{error}</Message>} */}
				{/* {(loading || orderListLoading) && <Loader />} */}
				<h1 className='text-center'>評価</h1>
				{/* {evaluations?.map((item) => (
					<div className='border-b bottom-1 p-2' key={item._id}>
						<p>ID: {item.orderId}</p>
						<p>月額: ¥{item.price}</p>
						<p>
							ステイタス:{' '}
							{item.isCancelled ? 'キャンセル済み' : '継続'}
						</p>
						{!item.isCancelled && (
							<button
								className='border'
								id={item.orderId}
								// onClick={submitHandler}
							>
								キャンセルする
							</button>
						)}
					</div>
				))} */}
			</FormContainer>
		</Container>
	)
}

export default EvaluationHistory

