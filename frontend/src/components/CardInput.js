import React from 'react'
import { CardElement } from '@stripe/react-stripe-js'

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

	return (
		<>
			<label className='block text-gray-700 text-sm font-bold mb-2'>
				カード番号
			</label>
			<CardElement
				className='shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
				options={CARD_ELEMENT_OPTIONS}
			/>
		</>
	)
}

export default CardInput
