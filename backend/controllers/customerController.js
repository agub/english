import express from 'express'
import asyncHandler from 'express-async-handler'

import Customers from '../models/customerModel.js'

// @desc     Fetch all customers
// @route    GET/ api/customers
// @access   Public
const getCustomers = asyncHandler(async (req, res) => {
	const customers = await Customers.find({})
	res.json('success customers')
})

export { getCustomers }
