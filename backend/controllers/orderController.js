import express from 'express'
import asyncHandler from 'express-async-handler'
import Stripe from 'stripe'

const stripe = Stripe(
	'sk_test_51JhBtOGBYewul3wwUYpHVr4ZH1sZPSEjpr6RuxG2k8wizhPEc9KpgVY7P1x2lpe8DQ5xvQ33Cz6oSL2A6YZqmjcr006jwUVrkj'
)
// @desc     Order subscription
// @route    GET/ api/orders/subscription
// @access   Public
const orderSubscription = asyncHandler(async (req, res) => {
	const { email, payment_method } = req.body
	const customer = await stripe.customers.create({
		payment_method: payment_method,
		email: email,
		invoice_settings: {
			default_payment_method: payment_method,
		},
	})

	const subscription = await stripe.subscriptions.create({
		customer: customer.id,
		items: [{ plan: 'price_1KZnrnGBYewul3wwfNDo8yqn' }],
		expand: ['latest_invoice.payment_intent'],
	})

	const status = subscription['latest_invoice']['payment_intent']['status']
	const client_secret =
		subscription['latest_invoice']['payment_intent']['client_secret']

	res.json({ 'client_secret': client_secret, 'status': status })
})

export { orderSubscription }
