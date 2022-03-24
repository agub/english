import express from 'express'
import asyncHandler from 'express-async-handler'

import Employees from '../models/employeeModel.js'

// @desc     Fetch all employees
// @route    GET/ api/employees
// @access   Public
const getEmployees = asyncHandler(async (req, res) => {
	const employees = await Employees.find({})
	res.json(employees)
})

// @desc     Fetch all customers
// @route    GET/ api/customers/:id
// @access   Private
const getEmployeeById = asyncHandler(async (req, res) => {
	const employee = await Employees.findOne({ userId: req.params.id })
	if (employee) {
		res.json(employee)
	} else {
		res.status(404)
		throw new Error('Employee not found')
	}
})

export { getEmployees, getEmployeeById }
