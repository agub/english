import React, { useState } from 'react'
import {
	useStripe,
	useElements,
	PaymentElement,
	CardElement,
} from '@stripe/react-stripe-js'

import axios from 'axios'
import FormContainer from './common/FormContainer'
import InputField from './common/InputField'

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
	const [email, setEmail] = useState('')

	const stripe = useStripe()
	const elements = useElements()

	const handleSubmit = async (event) => {
		// event.preventDefault()
		if (!stripe || !elements) {
			// Stripe.js has not yet loaded.
			// Make sure to disable form submission until Stripe.js has loaded.
			return
		}

		const result = await stripe.createPaymentMethod({
			payment_method: {
				type: 'card',
				card: elements.getElement(CardElement),
				billing_details: {
					email: email,
				},
			},
		})

		const res = await axios.post('user/????', {
			'payment_method': result.paymentMethod.id,
			'email': email,
		})
		console.log(res.data)

		// const res = await axios.post('http://localhost:3000/pay', {
		// 	email: email,
		// })
		// const clientSecret = res.data['client_secret']

		// const result = await stripe.confirmCardPayment(clientSecret, {
		// 	payment_method: {
		// 		card: elements.getElement(CardElement),
		// 		billing_details: {
		// 			email: email,
		// 		},
		// 	},
		// })

		// if (result.error) {
		// 	// Show error to your customer (e.g., insufficient funds)
		// 	console.log(result.error.message)
		// } else {
		// 	// The payment has been processed!
		// 	if (result.paymentIntent.status === 'succeeded') {
		// 		console.log('Money is in the bank!')
		// 		// Show a success message to your customer
		// 		// There's a risk of the customer closing the window before callback
		// 		// execution. Set up a webhook or plugin to listen for the
		// 		// payment_intent.succeeded event that handles any business critical
		// 		// post-payment actions.
		// 	}
		// }
	}
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
