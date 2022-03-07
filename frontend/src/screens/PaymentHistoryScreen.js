import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { orderListMySub } from '../redux/actions/orderActions'
import Button from '../components/common/Button'

const PaymentHistoryScreen = ({ id }) => {
	const dispatch = useDispatch()

	const orderListMySubscription = useSelector(
		(state) => state.orderListMySubscription
	)
	const { orderItems } = orderListMySubscription

	const submitHandler = (e) => {
		e.preventDefault()

		// dispatch(orderUnsub)
	}

	useEffect(() => {
		console.log('fired on payment')
		dispatch(orderListMySub(id))
	}, [id, dispatch])
	return (
		<div>
			{orderItems &&
				orderItems.map((item) => (
					<div key={item._id}>
						<p>ID: {item.orderId}</p>
						<p>月額: ¥{item.price}</p>
						<p>
							ステイタス:{' '}
							{item.isCancelled ? 'キャンセル済み' : '継続'}
						</p>
						{/* <p>ステータス: {item.isPaid ? '支払い済み' : '未払'}</p> */}
						<Button
							onClick={submitHandler}
							type='submit'
							bgColor='bg-blue-500'
							textColor='text-white'
							hoverColor='bg-blue-700'
							size='sm'
						>
							キャンセルする
						</Button>
					</div>
				))}
		</div>
	)
}

export default PaymentHistoryScreen
