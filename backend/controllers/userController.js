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

// @desc    Register a new user
// @route   POST /api/users/login
// @access  Public

const registerUser = asyncHandler(async (req, res) => {
	const {
		email,
		password,
		// addthisone
		fullName,
		age,
		consoleType,
		contactBy,
		experience,
		gameTitle,
		phoneNumber,
		preferTime,
		rentMixer,
	} = req.body

	const userExists = await User.findOne({ email })

	if (userExists) {
		res.status(400)
		throw new Error('User already exist')
	}
	const user = await User.create({
		fullName,
		email,
		password,
		// addthisone
		age,
		consoleType,
		contactBy,
		experience,
		gameTitle,
		phoneNumber,
		preferTime,
		rentMixer,
	})
	if (user) {
		res.status(201).json({
			_id: user._id,
			fullName: user.fullName,
			email: user.email,
			token: generateToken(user._id),
		})
	} else {
		res.status(400)
		throw new Error('Invalid user data')
	}
})

// @desc    Register a trial new user
// @route   POST /api/users/trial
// @access  Public

const trialRegisterUser = asyncHandler(async (req, res) => {
	const {
		email,
		password,
		// addthisone
		fullName,
		age,
		consoleType,
		contactBy,
		experience,
		gameTitle,
		phoneNumber,
		preferTime,
		rentMixer,
	} = req.body

	const userExists = await User.findOne({ email })

	if (userExists) {
		res.status(400)
		throw new Error('User already exist')
	}
	const user = await User.create({
		fullName,
		email,
		password,
		// addthisone
		age,
		consoleType,
		contactBy,
		experience,
		gameTitle,
		phoneNumber,
		preferTime,
		rentMixer,
	})
	if (user) {
		res.status(201).json({
			_id: user._id,
			fullName: user.fullName,
			email: user.email,
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
			fullName: user.fullName,
			email: user.email,
			token: generateToken(user._id),
		})
	} else {
		res.status(404)
		throw new Error('user not found')
	}
})

export { authUser, getUserProfile, registerUser }
