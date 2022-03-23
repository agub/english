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
			userType: user.userType,
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

const trialRegisterUser = asyncHandler(async (req, res) => {
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
			//fix me
			// info,
			//fix me
		})
		const newCustomer = await Customer.create({
			userId: user._id,
			info: info,
		})

		const newRoom = await Room.create({
			students: [user._id],
			teacher: null,
			candidate: null,
			game: null,
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
				token: user.verify,
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
				isTeacher: user.isTeacher,
				//fixme
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
				isTeacher: user.isTeacher,
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
	if (user) {
		res.json(user)
	} else {
		res.status(404)
		throw new Error('user not found')
	}
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
	const { hasMatched, teacher } = req.body
	const user = await User.findById(req.params.id)

	// ___________________new___________________
	const room = await Room.findById(user.roomId)
	// ______________________________________

	//fixme *input is writeable
	const existTeacher = await User.findById(teacher)

	console.log(req.body)
	//Confirm match with teacher && adding user to students[]_______________
	if (user && teacher) {
		if (existTeacher) {
			user.teacher = teacher || null
			user.hasMatched = hasMatched
			const existStudent = existTeacher.students.some(
				(obj) => obj.toString() === user.teacher.toString()
			)
			if (!existStudent) {
				existTeacher.students = [...existTeacher.students, user._id]
			}

			await existTeacher.save()
			const updatedUser = await user.save()
			// _________________new_____________________

			room.teacher = teacher
			// teacher should be inside of room.candidate?
			// !!!!!!!!!!!!Need add gameTitle!!!!
			const newRoom = await room.save()

			console.log(newRoom)
			// ______________________________________
			// sendMatched

			res.json({
				_id: updatedUser._id,
				name: updatedUser.name,
				email: updatedUser.email,
				hasMatched: updatedUser.hasMatched,
				teacher: updatedUser.teacher,
				info: updatedUser.info,
			})
		} else {
			res.status(404)
			throw new Error('teacher is not found')
		}
	}
	//Unmatch with teacher && excluding student from students[] _______________
	if (user) {
		if (!existTeacher) {
			const formerTeacher = await User.findById(user.teacher)
			const existStudent = formerTeacher.students.some(
				(obj) => obj.toString() === user._id.toString()
			)
			if (existStudent) {
				formerTeacher.students = formerTeacher.students.filter(
					(obj) => obj.toString() !== user._id.toString()
				)
			}
			user.hasMatched = hasMatched
			user.teacher = null

			await formerTeacher.save()
			const updatedUser = await user.save()

			// __________________new ____________________

			room.teacher = null
			const updateRoom = await room.save()

			console.log(updateRoom)
			// ______________________________________

			res.json({
				_id: updatedUser._id,
				name: updatedUser.name,
				email: updatedUser.email,
				hasMatched: updatedUser.hasMatched,
				teacher: updatedUser.teacher,
				info: updatedUser.info,
			})
		}
	} else {
		res.status(404)
		throw new Error('user or teacher is not found')
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

	const waitingLists = await User.find({
		// isTeacher: false,
		userType: 'employee',
		hasMatched: false,
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
	trialRegisterUser,
	updateUserProfile,
	getUsers,
	getUserById,
	updateUser,
	getTeacherById,
	contactForm,
	getWaitLists,
}
