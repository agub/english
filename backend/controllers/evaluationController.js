import express from 'express'
import asyncHandler from 'express-async-handler'
import moment from 'moment'
import Evaluation from '../models/evaluationModel.js'

// @desc     get Evaluate
// @route    GET/ api/evaluate
// @access   Private
const getEvaluate = asyncHandler(async (req, res) => {
	if (
		req.user.userType === 'customer' &&
		req.params.id !== req.user._id.toString()
	) {
		res.status(401)
		throw new Error('Not authorized')
	}
	const evaluateLists = await Evaluation.findOne({ userId: req.params.id })
	res.status(201).json(evaluateLists)
})

// @desc     evaluate student
// @route    POST/ api/evaluate
// @access   Private
const evaluateStudent = asyncHandler(async (req, res) => {
	// console.log(req.user)
	if (req.user === 'customer') {
		res.status(401)
		throw new Error('unauthorized')
	}
	const newObject = { ...req.body, createdAt: new Date() }

	const evaluation = await Evaluation.findOne({ userId: req.params.id })

	if (evaluation.evaluations.length !== 0) {
		const startOfMonth = moment().clone().startOf('month')
		const endOfMonth = moment().clone().endOf('month')

		const index = evaluation.evaluations.length - 1
		const lastCreatedAt = moment(evaluation.evaluations[index].createdAt)
		if (
			lastCreatedAt.isBefore(endOfMonth) &&
			lastCreatedAt.isAfter(startOfMonth)
		) {
			res.status(400)
			throw new Error('既に今月は評価済みです')
		}
	}

	evaluation.evaluations = [...evaluation.evaluations, newObject]
	await evaluation.save()

	res.status(201).json(evaluation.evaluations)
})

export { getEvaluate, evaluateStudent }

