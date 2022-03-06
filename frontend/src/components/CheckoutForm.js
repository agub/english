import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
	useStripe,
	useElements,
	PaymentElement,
	CardElement,
} from '@stripe/react-stripe-js'

import FormContainer from './common/FormContainer'
import InputField from './common/InputField'
import { useDispatch, useSelector } from 'react-redux'
import { orderSetData, orderSubscription } from '../redux/actions/orderActions'
import CardInput from '../components/CardInput'
const CheckoutForm = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const [email, setEmail] = useState('')
	const [fullName, setFullName] = useState('')

	const stripe = useStripe()
	const elements = useElements()

	const orderStripe = useSelector((state) => state.orderStripe)
	const { data } = orderStripe

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	const handleSubmit = async (event) => {
		event.preventDefault()

		if (!stripe || !elements) {
			// Stripe.js has not yet loaded.
			// Make sure to disable form submission until Stripe.js has loaded.
			return
		}

		const result = await stripe.createPaymentMethod({
			type: 'card',
			card: elements.getElement(CardElement),
			billing_details: {
				email: email,
			},
		})

		if (result.error) {
			console.log('result Error')
		} else if (result && email && fullName) {
			dispatch(
				orderSubscription({
					'payment_method': result.paymentMethod.id,
					'email': email,
					'id': userInfo._id,
					'fullName': fullName,
				})
			)
		} else {
			console.log('missing text field')
		}
	}

	useEffect(() => {
		if (!userInfo) {
			navigate('/login')
		}
	}, [navigate, userInfo])

	useEffect(() => {
		if (data && data.client_secret && data.status) {
			console.log(data.client_secret)
			console.log(data.status)
			if (data.status === 'requires_action') {
				stripe
					.confirmCardPayment(data.client_secret)
					.then(function (result) {
						if (result.error) {
							console.log('There was an issue!')
							console.log(result.error)
							// Display error message in your UI.
							// The card was declined (i.e. insufficient funds, card has expired, etc)
						} else {
							console.log('You got the money!')
							dispatch(
								orderSetData({
									orderItem: data.orderItem,
									id: userInfo._id,
								})
							)
							// Show a success message to your customer
						}
					})
			} else {
				console.log('You got the money!')
				dispatch(
					orderSetData({
						orderItem: data.orderItem,
						id: userInfo._id,
					})
				)
				// No additional information was needed
				// Show a success message to your customer
			}
		}
	}, [data, dispatch, userInfo, stripe])

	return (
		<FormContainer>
			<div className='mb-4'>
				<InputField
					type='email'
					value={email}
					placeholder='Email'
					label='メールアドレス'
					name='email'
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>
			<div className='mb-4'>
				<InputField
					type='カード名義'
					value={fullName}
					placeholder='カード名義'
					label='カード名義'
					name='fullName'
					onChange={(e) => setFullName(e.target.value)}
				/>
			</div>
			<CardInput />
			<button onClick={handleSubmit}>pay</button>
		</FormContainer>
	)
}

export default CheckoutForm
