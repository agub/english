import express from 'express'
import asyncHandler from 'express-async-handler'

import Employees from '../models/employeeModel.js'

// @desc     Fetch all employees
// @route    GET/ api/employees
// @access   Public
const getEmployees = asyncHandler(async (req, res) => {
	const employees = await Employees.find({})
	res.json('success employees')
})

export { getEmployees }
