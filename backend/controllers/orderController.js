import asyncHandler from 'express-async-handler'
import Stripe from 'stripe'
import User from '../models/userModel.js'
import Order from '../models/orderModel.js'

const stripe = Stripe(
	'sk_test_51JhBtOGBYewul3wwUYpHVr4ZH1sZPSEjpr6RuxG2k8wizhPEc9KpgVY7P1x2lpe8DQ5xvQ33Cz6oSL2A6YZqmjcr006jwUVrkj'
)

// @desc     Order subscription
// @route    GET/ api/orders/subscription
// @access   Private
const orderSubscription = asyncHandler(async (req, res) => {
	const { email, payment_method, id, fullName } = req.body
	const user = await User.findById(id)

	if (user) {
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

		const orderItem = {
			customerId: customer.id,
			payment_method: payment_method,
			orderId: subscription.id,
			plan: 'price_1KZnrnGBYewul3wwfNDo8yqn',
			price: subscription.plan.amount,
			email: email,
			fullName: fullName,
			isPaid: false,
			createdAt: new Date(subscription.current_period_start * 1000),
			isCancelled: false,
		}
		console.log(orderItem)

		const status =
			subscription['latest_invoice']['payment_intent']['status']
		const client_secret =
			subscription['latest_invoice']['payment_intent']['client_secret']

		res.json({
			'client_secret': client_secret,
			'status': status,
			orderItem,
		})
	} else {
		res.status(404)
		throw new Error('user not found')
	}
})

// @desc     Order setting on data
// @route    POST/ api/orders
// @access   Private
const orderDataSet = asyncHandler(async (req, res) => {
	const { orderItem, id } = req.body

	const hasOrder = await Order.findOne({ user: id })
	if (!hasOrder) {
		const newOrder = await Order.create({
			user: id,
			orderItems: [{ ...orderItem, isPaid: true }],
		})
		res.status(201).json({
			user: newOrder.id,
			orderItems: newOrder.orderItems,
		})
	} else if (hasOrder) {
		hasOrder.orderItems = [
			...hasOrder.orderItems,
			{ ...orderItem, isPaid: true },
		]
		const updateOrder = await hasOrder.save()
		res.status(201).json({
			user: updateOrder.id,
			orderItems: updateOrder.orderItems,
		})
	} else {
		res.status(400)
		throw new Error('orderItem is missing or data is enable to update')
	}
})

// @desc     Order setting on data
// @route    GET/ api/orders
// @access   Private
const listMyOrders = asyncHandler(async (req, res) => {
	const order = await Order.findOne({ user: req.user._id })

	if (order) {
		res.status(201).json(order.orderItems)
	} else {
		res.status(400)
		throw new Error('orderItem is missing or data is enable to update')
	}
})

// @desc     fetch subscription detail
// @route    PUT / api/orders/:id
// @access   Private
const unsubscribeById = asyncHandler(async (req, res) => {
	const order = await Order.findOne({ user: req.user._id })
	// const { orderId } = req.params.orderId
	console.log(req.params.orderId)

	if (order) {
		const unSub = await stripe.subscriptions.update(
			'sub_1KaZhhGBYewul3wwt8VtZw5F',
			{
				cancel_at_period_end: true,
			}
		)
		for (const item of order.orderItems) {
			if (item.orderId === 'sub_1KaZhhGBYewul3wwt8VtZw5F') {
				item.isCancelled = unSub.cancel_at_period_end ? true : false
				// item.isCancelled = false
				break
			}
		}
		await order.save()
		res.json(order)
	} else {
		res.status(400)
		throw new Error('orderItem is missing or data is enable to update')
	}
})

// @desc     fetch subscription detail
// @route    GET / api/orders/:id
// @access   Private
const getOrderById = asyncHandler(async (req, res) => {
	const subscription = await stripe.subscriptions.retrieve(
		'sub_1KaZhhGBYewul3wwt8VtZw5F'
	)
	if (subscription) {
		res.json(subscription)
	} else {
		throw new Error()
	}
})

export {
	orderSubscription,
	orderDataSet,
	listMyOrders,
	unsubscribeById,
	getOrderById,
}
