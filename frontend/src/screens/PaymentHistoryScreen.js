import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { orderListMySub, orderUnsub } from '../redux/actions/orderActions'
import Button from '../components/common/Button'
import Container from '../components/common/Container'
import FormContainer from '../components/common/FormContainer'

const PaymentHistoryScreen = ({ userId }) => {
	const dispatch = useDispatch()

	const orderListMySubscription = useSelector(
		(state) => state.orderListMySubscription
	)
	const { orderItems } = orderListMySubscription

	const orderUnsubscribe = useSelector((state) => state.orderUnsubscribe)
	const { success, error } = orderUnsubscribe
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
				{orderItems &&
					orderItems.map((item) => (
						<div key={item._id}>
							<p>ID: {item.orderId}</p>
							<p>月額: ¥{item.price}</p>
							<p>
								ステイタス:{' '}
								{item.isCancelled ? 'キャンセル済み' : '継続'}
							</p>
							<button
								className='border'
								id={item.orderId}
								onClick={submitHandler}
							>
								キャンセルする
							</button>
							{/* <p>ステータス: {item.isPaid ? '支払い済み' : '未払'}</p> */}
						</div>
					))}
			</FormContainer>
		</Container>
	)
}

export default PaymentHistoryScreen
