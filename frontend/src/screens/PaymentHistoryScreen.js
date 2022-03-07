import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { orderListMySub } from '../redux/actions/orderActions'

const PaymentHistoryScreen = ({ id }) => {
	const dispatch = useDispatch()

	const orderListMySubscription = useSelector(
		(state) => state.orderListMySubscription
	)
	const { orderItems } = orderListMySubscription

	useEffect(() => {
		console.log('fired on payment')
		dispatch(orderListMySub(id))
	}, [id, dispatch])
	return (
		<div>
			{orderItems &&
				orderItems.map((item, index) => (
					<div key={item._id}>
						<p>{index + 1}</p>
						<p>ID: {item.orderId}</p>
						<p>Price: {item.price}</p>
						<p>ステータス: {item.isPaid ? '支払い済み' : '未払'}</p>
					</div>
				))}
		</div>
	)
}

export default PaymentHistoryScreen
