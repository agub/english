import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Container from '../components/common/Container'
import FormContainer from '../components/common/FormContainer'
import BackButton from '../components/common/BackButton'
import Message from '../components/common/Message'
import Loader from '../components/common/Loader'
import { orderListMySub, orderUnsub } from '../redux/actions/orderActions'

const PaymentHistoryScreen = ({ userId }) => {
	const dispatch = useDispatch()

	const orderListMySubscription = useSelector(
		(state) => state.orderListMySubscription
	)
	const { orderItems, loading: orderListLoading } = orderListMySubscription
	const orderUnsubscribe = useSelector((state) => state.orderUnsubscribe)
	const { success, error, loading } = orderUnsubscribe

	const submitHandler = (e) => {
		e.preventDefault()
		console.log(e.currentTarget.id)
		dispatch(orderUnsub(e.currentTarget.id))
	}

	useEffect(() => {
		dispatch(orderListMySub(userId))
	}, [userId, dispatch, success])

	return (
		<Container>
			<FormContainer onSubmit={submitHandler}>
				<Link to={`/profile`}>
					<BackButton />
				</Link>
				{error && <Message variant='danger'>{error}</Message>}
				{(loading || orderListLoading) && <Loader />}
				<h1 className='text-center'>支払い履歴</h1>
				{orderItems &&
					orderItems.map((item) => (
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
									onClick={submitHandler}
								>
									キャンセルする
								</button>
							)}
							{/* <p>ステータス: {item.isPaid ? '支払い済み' : '未払'}</p> */}
						</div>
					))}
			</FormContainer>
		</Container>
	)
}

export default PaymentHistoryScreen
