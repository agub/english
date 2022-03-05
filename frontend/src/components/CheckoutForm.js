import React, { useState, useEffect } from 'react'
import {
	useStripe,
	useElements,
	PaymentElement,
	CardElement,
} from '@stripe/react-stripe-js'
import axios from 'axios'
import FormContainer from './common/FormContainer'
import InputField from './common/InputField'
import { useDispatch, useSelector } from 'react-redux'
import { orderSubscription } from '../redux/actions/orderActions'

const CardInput = () => {
	const CARD_ELEMENT_OPTIONS = {
		style: {
			base: {
				'color': '#32325d',
				'fontFamily': '"Helvetica Neue", Helvetica, sans-serif',
				'fontSmoothing': 'antialiased',
				'fontSize': '16px',
				'::placeholder': {
					color: '#aab7c4',
				},
			},
			invalid: {
				color: '#fa755a',
				iconColor: '#fa755a',
			},
		},
	}

	return <CardElement options={CARD_ELEMENT_OPTIONS} />
}

const CheckoutForm = () => {
	const dispatch = useDispatch()
	const [email, setEmail] = useState('')
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
		} else {
			dispatch(
				orderSubscription({
					'payment_method': result.paymentMethod.id,
					'email': email,
					'id': userInfo._id,
				})
			)
		}
	}

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
							console.log(data.orderItem)
							// Show a success message to your customer
						}
					})
			} else {
				console.log('You got the money!')
				console.log(data.orderItem)
				// No additional information was needed
				// Show a success message to your customer
			}
		}
	}, [data])
	return (
		<FormContainer>
			<CardInput />
			<div className='mb-4'>
				<InputField
					type='email'
					value={email}
					placeholder='Email'
					label=''
					name='email'
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>
			<button onClick={handleSubmit}>pay</button>
		</FormContainer>
	)
}

export default CheckoutForm
