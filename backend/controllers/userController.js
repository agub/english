import express from 'express'
import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'

import User from '../models/userModel.js'

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public

const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body

	const user = await User.findOne({ email })

	if (user && (await user.matchPassword(password))) {
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

const trialRegisterUser = asyncHandler(async (req, res) => {
	const {
		email,
		// password,
		// addthisone
		name,
		info,

		rentMixer,
	} = req.body

	const userExists = await User.findOne({ email })

	if (userExists) {
		res.status(400)
		throw new Error('User already exist')
	}
	const user = await User.create({
		email,
		name,
		info,
		rentMixer,
	})
	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id),
		})
	} else {
		res.status(400)
		throw new Error('Invalid user data')
	}
})

// @desc    Register a user from trial
// @route   POST /api/users
// @access  Public

const registerUser = asyncHandler(async (req, res) => {
	const { email, password, discordId } = req.body

	const user = await User.findOne({ email })

	if (user && !user.password) {
		user.email = email || user.email
		if (password) {
			user.password = password
		}
		user.discordId = discordId
		const updatedUser = await user.save()

		res.status(201).json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: user.isAdmin,
			token: generateToken(updatedUser._id),
		})
	} else if (user) {
		res.status(400)
		throw new Error('このメールアドレスは登録済みです')
	} else {
		res.status(400)
		throw new Error(
			'トライヤルを申し込んだ時のメールアドレスをお使いください。'
		)
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
		throw new Error('User already exist')
	}
	const user = await User.create({
		email,
		password,
		name,
		info,
		isTeacher: true,
	})
	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			info: user.info,
			token: generateToken(user._id),
		})
	} else {
		res.status(400)
		throw new Error('Invalid user data')
	}
})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id)

	if (user) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			isTeacher: user.isTeacher,
			teacher: user.teacher,
			info: user.info,
			homeAddress: user.homeAddress,
			token: generateToken(user._id),
		})
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
		if (user) {
			user.info.discordId = discordId
			const updatedUser = await user.save()
			res.json({
				_id: updatedUser._id,
				name: updatedUser.name,
				email: updatedUser.email,
				isAdmin: updatedUser.isAdmin,
				info: updatedUser.info,
				token: generateToken(updatedUser._id),
			})
		} else {
			res.status(404)
			throw new Error('user not found')
		}
	}

	//update address
	if (postalCode && address && prefecture) {
		if (user) {
			user.homeAddress.postalCode = postalCode
			user.homeAddress.address = address
			user.homeAddress.prefecture = prefecture
			user.homeAddress.building = building

			const updatedUser = await user.save()

			res.json({
				_id: updatedUser._id,
				name: updatedUser.name,
				email: updatedUser.email,
				isAdmin: updatedUser.isAdmin,
				info: updatedUser.info,
				homeAddress: updatedUser.homeAddress,
				token: generateToken(updatedUser._id),
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
	if (teacher && teacher.isTeacher) {
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
// @route   PUT /api/users/contact
// @access  Private/Admin
const contactForm = asyncHandler(async (req, res) => {
	const { title, email, text } = req.body
	console.log(title, email, text)
	if (title) {
		res.json({ title, email, text })
	} else {
		res.status(404)
		throw new Error('title or email or text is missing')
	}
})

export {
	authUser,
	getUserProfile,
	registerUser,
	teacherRegisterUser,
	trialRegisterUser,
	updateUserProfile,
	getUsers,
	getUserById,
	updateUser,
	getTeacherById,
	contactForm,
}
