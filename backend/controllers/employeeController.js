import express from 'express'
import asyncHandler from 'express-async-handler'
import schedule from 'node-schedule'
import cron from 'node-cron'
import { statusType } from '../utils/data.js'
import Employees from '../models/employeeModel.js'
import Room from '../models/roomModel.js'
import Customer from '../models/customerModel.js'
import User from '../models/userModel.js'

// @desc     Fetch all employees
// @route    GET/ api/employees
// @access   Public
const getEmployees = asyncHandler(async (req, res) => {
	const employees = await Employees.find({})
	res.json(employees)
})

// @desc     Fetch a employee
// @route    GET/ api/employees/:id
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

// @desc     Fetch all customers
// @route    GET/ api/employees/:id
// @access   Private
const addWorkHistory = asyncHandler(async (req, res) => {
	cron.schedule('* * * * *', () => {
		console.log('running a task every minute')
	})

	res.json('addWorkHistory')
})

// @desc    Get all pending users
// @route   GET /api/employee/waitLists
// @access  Private/teacher
const getWaitLists = asyncHandler(async (req, res) => {
	const allCustomers = await Customer.find({
		'status.code': statusType.PENDING,
		// userType: 'customer',
	})
	let pendingCustomers = []
	const getData = (originalArray) => {
		for (const data of originalArray) {
			const statusIndex = data.status.length - 1
			if (data.status[statusIndex].code === statusType.PENDING)
				pendingCustomers.push(data)
		}
	}
	getData(allCustomers)
	if (pendingCustomers.length === 0) {
		res.status(400)
		throw new Error('先生を募集している生徒が見当たりません')
	}
	res.status(200).send(pendingCustomers)
})

// @desc    Get all my students
// @route   GET /api/employee/studentLists
// @access  Private/teacher
const getMyStudentLists = asyncHandler(async (req, res) => {
	if (req.user.userType === 'customer') {
		res.status(401)
		throw new Error('Not authorized')
	}
	const myClassRooms = await Room.find({ teacher: req.user._id })
	if (!myClassRooms && myClassRooms === []) {
		res.status(400)
		throw new Error('userId is not in use')
	}

	let myStudents = []
	for (const singleClass of myClassRooms) {
		for (const data of singleClass.students) {
			const studentInfo = await Customer.findOne({ userId: data })
			const userInfo = await User.findOne({ _id: data })
			myStudents.push({
				schedule: singleClass.schedule,
				userId: studentInfo.userId,
				info: studentInfo.info,
				name: userInfo.name,
			})
		}
	}
	res.status(200).json(myStudents)
})

// @desc    apply as a candidate
// @route   GET /api/employee/apply/:id
// @access  Private/teacher
const postCandidate = asyncHandler(async (req, res) => {
	const userId = 'fasdfaaafaf'
	const object = {
		teacherId: '',
		rank: 1,
		comment: '',
	}

	// if (req.user.userType === 'customer') {
	// 	res.status(401)
	// 	throw new Error('Not authorized')
	// }
	// const myClassRooms = await Room.find({ teacher: req.user._id })
	// if (!myClassRooms && myClassRooms === []) {
	// 	res.status(400)
	// 	throw new Error('userId is not in use')
	// }

	// let myStudents = []
	// for (const singleClass of myClassRooms) {
	// 	for (const data of singleClass.students) {
	// 		const studentInfo = await Customer.findOne({ userId: data })
	// 		const userInfo = await User.findOne({ _id: data })
	// 		myStudents.push({
	// 			schedule: singleClass.schedule,
	// 			userId: studentInfo.userId,
	// 			info: studentInfo.info,
	// 			name: userInfo.name,
	// 		})
	// 	}
	// }
	console.log('fired')
	res.status(200).json(object)
})

export {
	getEmployees,
	getEmployeeById,
	addWorkHistory,
	getWaitLists,
	getMyStudentLists,
	postCandidate,
}

