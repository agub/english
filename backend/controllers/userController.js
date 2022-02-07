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
			fullName: user.fullName,
			email: user.email,
			token: generateToken(user._id),
		})
	} else {
		res.status
		throw new Error('invalid email or password')
	}

	//sign up!!!!
	// if (user) {
	// 	res.json({ email })
	// } else {
	// 	res.status
	// 	throw new Error('invalid email or password')
	// }
})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id)

	if (user) {
		res.json({
			_id: user._id,
			fullName: user.fullName,
			email: user.email,
			token: generateToken(user._id),
		})
	} else {
		res.status(404)
		throw new Error('user not found')
	}
})

export { authUser, getUserProfile }
