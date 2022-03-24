import express from 'express'
import asyncHandler from 'express-async-handler'

import Customers from '../models/customerModel.js'

// @desc     Fetch all customers
// @route    GET/ api/customers
// @access   Public
const getCustomers = asyncHandler(async (req, res) => {
	const customers = await Customers.find({})
	res.json(customers)
})

// @desc     Fetch all customers
// @route    GET/ api/customers/:id
// @access   Private
const getCustomerById = asyncHandler(async (req, res) => {
	const customer = await Customers.findOne({ userId: req.params.id })
	if (customer) {
		res.json(customer)
	} else {
		res.status(404)
		throw new Error('Customer not found')
	}
})

export { getCustomers, getCustomerById }
