import React from 'react'

import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { PaymentElement } from '@stripe/react-stripe-js'
import CheckoutForm from '../components/CheckoutForm'
import Container from '../components/common/Container'

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
	'pk_test_51JhBtOGBYewul3wwX9GKU5LdkoUkISJoxiOoycUGKF72L1wGcBmvzzmF0h9iTJEvlUS6XfIqL9GdbE8hdlbLiLoN003DjXpJMQ'
)

const PaymentScreen = () => {
	const options = {
		// passing the client secret obtained from the server
		clientSecret: '{{CLIENT_SECRET}}',
	}

	return (
		<Container>
			<Elements stripe={stripePromise}>
				<CheckoutForm />
			</Elements>
		</Container>
	)
}

export default PaymentScreen
