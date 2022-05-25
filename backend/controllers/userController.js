import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import crypto from 'crypto'
import User from '../models/userModel.js'
import Room from '../models/roomModel.js'
import Customer from '../models/customerModel.js'
import Employee from '../models/employeeModel.js'
import { sendEmail } from '../utils/email.js'
import {
	contactMail,
	registerVerifyMail,
	trialMail,
	registerConfirmationMail,
	seekTeacherMail,
} from '../utils/mails.js'
import { statusType } from '../utils/data.js'

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public

const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body

	const user = await User.findOne({ email })

	if (user && (await user.matchPassword(password))) {
		// const room = await Room.findById(user.roomId)
		// console.log(room)
		// _______________contact sample___________________

		// const sendSampleEmail = async () => {
		// 	await sendEmail(
		// 		contactMail(
		// 			'afasfa',
		// 			'shintrfc@gmail.com',
		// 			'sample text is here with iterates'
		// 		)
		// 	)
		// }
		// sendSampleEmail()
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		})
	} else {
		res.status
		throw new Error('invalid email or password')
	}
})

// @desc    Register a trial new user
// @route   POST /api/users/trial
// @access  Public

const interviewRegisterUser = asyncHandler(async (req, res) => {
	const { email, name, info } = req.body

	const userExists = await User.findOne({ email })
	if (userExists) {
		res.status(400)
		throw new Error('User already exist')
	}
	try {
		const user = await User.create({
			email,
			name,
			userType: 'customer',
			status: statusType.PENDING_INTERVIEW,
			//fix me
			// info,
			//fix me
		})
		const newCustomer = await Customer.create({
			userId: user._id,
			info: info,
			// isActive: false,
			status: [
				{ code: statusType.PENDING_INTERVIEW, createdAt: new Date() },
			],
		})

		const newRoom = await Room.create({
			students: [user._id],
			teacher: null,
			candidate: null,
			game: null,
			isActive: false,
			schedule: {
				week: null,
				time: null,
			},
		})
		user.roomId = newRoom._id

		await user.save()

		await sendEmail(
			await trialMail({
				email: user.email,
				fullName: user.name.lastName + ' ' + user.name.firstName,
				//fix me
				info: newCustomer.info,
				//fix me
			})
		)
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id),
			userType: user.userType,
			roomId: newRoom._id,
		})
		// ________________seek teacher___________________
		// const teachers = await User.find({ isTeacher: true })
		// const teacherLists = teachers.map((teacher) => {
		// 	return {
		// 		teacherEmail: teacher.email,
		// 		teacherFullName:
		// 			teacher.name.lastName + ' ' + teacher.name.firstName,
		// 		info: user.info,
		// 	}
		// })
		// // _______________seek teacher___________________
		// const sendAllTeacher = async () => {
		// 	for (const item of teacherLists) {
		// 		await sendEmail(
		// 			await seekTeacherMail({
		// 				teacherEmail: item.teacherEmail,
		// 				teacherFullName: item.teacherFullName,
		// 				info: item.info,
		// 			})
		// 		)
		// 	}
		// }
		// sendAllTeacher()
		// sendMsg
	} catch (error) {
		res.status(400)
		throw new Error(error)
	}
})

// @desc    Register a user from trial
// @route   POST /api/users
// @access  Public

const registerUser = asyncHandler(async (req, res) => {
	const { email, password, discordId } = req.body
	try {
		const user = await User.findOne({ email })
		const customer = await Customer.findOne({ userId: user._id })
		const employee = await Employee.findOne({ userId: user._id })
		const emailVerificationToken = crypto.randomBytes(10).toString('hex')

		if (user && !user.password) {
			user.email = email || user.email

			if (employee && user.userType === 'employee') {
				employee.info.discordId = discordId
				await employee.save()
			}
			if (customer && user.userType === 'customer') {
				customer.info.discordId = discordId
				await customer.save()
			}

			// user.info.discordId = discordId
			user.verify = emailVerificationToken
			if (password) user.password = password

			const updatedUser = await user.save()

			await sendEmail(
				registerVerifyMail({
					email: updatedUser.email,
					fullName:
						updatedUser.name.lastName +
						' ' +
						updatedUser.name.firstName,
					id: updatedUser._id,
					verify: updatedUser.verify,
				})
			)
			res.send('success')
		} else if (user) {
			res.status(400)
			throw new Error('このメールアドレスは登録済みです')
		} else {
			res.status(400)
			throw new Error(
				'トライヤルを申し込んだ時のメールアドレスをお使いください。'
			)
		}
	} catch (error) {
		res.status(400)
		throw new Error(error)
	}
})

// @desc    Verify Email
// @route   POST /verify/:id/:token
// @access  Public
const verifyEmail = asyncHandler(async (req, res) => {
	try {
		const user = await User.findById(req.params.id)
		if (!user || user.verify !== req.params.token) {
			throw new Error()
		}
		user.verify = undefined
		const updatedUser = await user.save()
		await sendEmail(
			registerConfirmationMail({
				email: updatedUser.email,
				fullName:
					updatedUser.name.lastName +
					' ' +
					updatedUser.name.firstName,
			})
		)
		res.status(201).json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			info: updatedUser.info,
		})
	} catch (err) {
		res.status(400)
		throw new Error('認証中のエラー')
	}
})

// @desc    Register teacher
// @route   POST /api/users/teacher
// @access  Public
const teacherRegisterUser = asyncHandler(async (req, res) => {
	const { email, password, name, info } = req.body

	const userExists = await User.findOne({ email })
	if (userExists) {
		res.status(400)
		throw new Error('このメールアドレスは登録済みです')
	}
	try {
		const emailVerificationToken = crypto.randomBytes(10).toString('hex')
		const user = await User.create({
			email,
			password,
			name,
			userType: 'employee',
			verify: emailVerificationToken,
			isTeacher: true,
		})

		const newEmployee = await Employee.create({
			userId: user._id,
			info,
		})

		await sendEmail(
			registerVerifyMail({
				email: user.email,
				fullName: user.name.lastName + ' ' + user.name.firstName,
				id: user._id,
				verify: user.verify,
			})
		)
		if (user) {
			res.status(201).json({
				_id: user._id,
				name: user.name,
				email: user.email,
				info: newEmployee.info,
				userType: user.userType,
				token: generateToken(user._id),
			})
		}
	} catch (error) {
		res.status(400)
		throw new Error('アカウント作成エラー')
	}
})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id)
	const customer = await Customer.findOne({
		userId: req.user._id,
	})
	const employee = await Employee.findOne({
		userId: req.user._id,
	})

	if (user) {
		// if (!user.isTeacher) {
		if (user.userType === 'customer') {
			//userType
			res.json({
				_id: user._id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin,
				//fixme
				// isTeacher: user.isTeacher,
				//fixme
				status: user.status,
				userType: user.userType,
				teacher: user.teacher,
				info: customer.info,
				homeAddress: user.homeAddress,
				token: generateToken(user._id),
			})
		}
		if (user.userType === 'employee') {
			res.json({
				_id: user._id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin,
				//fixme
				// isTeacher: user.isTeacher,
				//fixme
				userType: user.userType,
				teacher: user.teacher,
				info: employee.info,
				homeAddress: user.homeAddress,
				token: generateToken(user._id),
			})
		}
	} else {
		res.status(404)
		throw new Error('user not found')
	}
})

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
	const {
		newPassword,
		password,
		discordId,
		postalCode,
		prefecture,
		address,
		building,
	} = req.body
	const user = await User.findById(req.user._id)

	if (user && password && newPassword) {
		if (await user.matchPassword(password)) {
			user.password = newPassword

			const updatedUser = await user.save()

			res.json({
				_id: updatedUser._id,
				name: updatedUser.name,
				email: updatedUser.email,
				isAdmin: updatedUser.isAdmin,
				token: generateToken(updatedUser._id),
			})
		} else {
			res.status(400)
			throw new Error('パスワードが異なります。')
		}
	}
	//update discord
	if (discordId) {
		const customer = await Customer.findOne({ userId: req.user._id })
		if (user && customer) {
			//Delete

			// user.info.discordId = discordId
			// const updatedUser = await user.save()
			// res.json({
			// 	_id: updatedUser._id,
			// 	name: updatedUser.name,
			// 	email: updatedUser.email,
			// 	isAdmin: updatedUser.isAdmin,
			// 	info: updatedUser.info,
			// 	token: generateToken(updatedUser._id),
			// })

			//Delete
			customer.info.discordId = discordId

			const updateCustomer = await customer.save()
			res.json({
				_id: user._id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin,
				info: updateCustomer.info,
				token: generateToken(user._id),
			})
		} else {
			res.status(404)
			throw new Error('user not found')
		}
	}

	//update address
	if (postalCode && address && prefecture) {
		const customer = await Customer.findOne({ userId: req.user._id })
		if (user) {
			//Delete
			// user.homeAddress.postalCode = postalCode
			// user.homeAddress.address = address
			// user.homeAddress.prefecture = prefecture
			// user.homeAddress.building = building
			// const updatedUser = await user.save()
			// res.json({
			// 	_id: updatedUser._id,
			// 	name: updatedUser.name,
			// 	email: updatedUser.email,
			// 	isAdmin: updatedUser.isAdmin,
			// 	info: updatedUser.info,
			// 	homeAddress: updatedUser.homeAddress,
			// 	token: generateToken(updatedUser._id),
			// })
			//Delete
			customer.homeAddress.postalCode = postalCode
			customer.homeAddress.address = address
			customer.homeAddress.prefecture = prefecture
			customer.homeAddress.building = building
			const updateCustomer = await customer.save()
			res.json({
				_id: user._id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin,
				info: updateCustomer.info,
				homeAddress: updateCustomer.homeAddress,
				token: generateToken(user._id),
			})
		} else {
			res.status(404)
			throw new Error('address error')
		}
	}
})

// @desc    Get all users
// @route   GET /api/users/
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
	const users = await User.find({})
	res.json(users)
})

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id).select('-password')
	const customer = await Customer.findOne({ userId: user._id })
	const employee = await Employee.findOne({ userId: user._id })
	if (user && customer) {
		const room = await Room.findById(user.roomId)
		res.json({ userData: user, customer, room })
		// console.log({ user, customer, room })
		return
	}
	if (user && employee) {
		const room = await Room.find({ teacher: user._id })
		res.json({ userData: user, employee, room })
		// console.log({ user, employee, room })
		return
	}
	res.status(404)
	throw new Error('user not found')
})

// @desc    Get user by ID
// @route   GET /api/teacher/:id
// @access  Private/Admin
const getTeacherById = asyncHandler(async (req, res) => {
	const teacher = await User.findById(req.params.id).select('-password')
	if (teacher && teacher.userType === 'employee') {
		res.json(teacher)
	} else {
		res.status(404)
		throw new Error('teacher is not found')
	}
})

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
	const { hasMatched, isActive, teacher, changeStatusTo, currentStatus } =
		req.body

	const user = await User.findById(req.params.id)
	const customer = await Customer.findOne({ userId: req.params.id })
	const room = await Room.findById(user.roomId)
	//fixme *input is writeable
	const existTeacher = await User.findById(teacher)
	console.log(req.body)

	if (user && room && existTeacher && existTeacher.userType === 'employee') {
		//__________TO TRIAL or ACTIVE____________
		if (
			(changeStatusTo === statusType.TRIAL ||
				changeStatusTo === statusType.ACTIVE) &&
			user.userType === 'customer' &&
			room.teacher === null
		) {
			const hasTrialEnd = customer.status.some((list) => {
				return list.code === statusType.TRIAL
			})

			if (hasTrialEnd) {
				customer.status = [
					...customer.status,
					{ code: statusType.ACTIVE, createdAt: new Date() },
				]
				user.status = statusType.ACTIVE
			} else {
				customer.status = [
					...customer.status,
					{ code: statusType.TRIAL, createdAt: new Date() },
				]
				user.status = statusType.TRIAL
			}

			await user.save()

			const updateCustomer = await customer.save()
			room.teacher = teacher
			room.isActive = true
			//fixme
			room.schedule.week = 5
			room.schedule.time = 10
			//fixme

			const updateRoom = await room.save()
			console.log(updateRoom)
			// sendMatched

			res.json({
				_id: user._id,
				name: user.name,
				email: user.email,
				status: updateCustomer.status,
				teacher: updateRoom.teacher,
				info: customer.info,
			})
			return
		}
		//__________TO CANCEL or PENDING____________
		if (
			(changeStatusTo === statusType.CANCELLED ||
				changeStatusTo === statusType.PENDING) &&
			user.userType === 'customer' &&
			room.teacher.toString() === teacher
		) {
			//fixme depending on situation...

			if (changeStatusTo === statusType.CANCELLED) {
				customer.status = [
					...customer.status,
					{ code: statusType.CANCELLED, createdAt: new Date() },
				]
				user.status = statusType.CANCELLED
			} else if (changeStatusTo === statusType.PENDING) {
				customer.status = [
					...customer.status,
					{ code: statusType.PENDING, createdAt: new Date() },
				]
				user.status = statusType.PENDING
			}

			await user.save()

			const updateCustomer = await customer.save()
			room.teacher = null
			room.isActive = false
			// room.schedule.week = 5
			// room.schedule.time = 10
			const updateRoom = await room.save()

			// console.log(updateRoom)
			// ______________________________________
			res.json({
				_id: user._id,
				name: user.name,
				email: user.email,
				status: updateCustomer.status,
				teacher: updateRoom.teacher,
				info: customer.info,
			})
			return
		}
		res.status(404)
		throw new Error('teacher or user is not found')
	}
})

// @desc    Update user
// @route   POST /api/users/contact
// @access  Private/Admin

const contactForm = asyncHandler(async (req, res) => {
	const { title, email, text } = req.body
	console.log(title, email, text)

	try {
		const data = await sendEmail(contactMail(title, email, text))
		res.json({ message: data })
	} catch (error) {
		res.status(400)
		throw new Error(error)
	}
})

// @desc    Get all users
// @route   GET /api/users/students
// @access  Private
const getWaitLists = asyncHandler(async (req, res) => {
	// should be on room controller??

	const waitingLists = await Customer.find({
		status: statusType.PENDING,
	})
	// const users = await User.find({})
	console.log(waitingLists)
	// const user = await User.findOne({ email: 'shintrfc@gmail.com' })
	res.send(waitingLists)
})

export {
	authUser,
	getUserProfile,
	registerUser,
	verifyEmail,
	teacherRegisterUser,
	interviewRegisterUser,
	updateUserProfile,
	getUsers,
	getUserById,
	updateUser,
	getTeacherById,
	contactForm,
	getWaitLists,
}

