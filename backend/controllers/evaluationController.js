import express from 'express'
import asyncHandler from 'express-async-handler'

import Evaluation from '../models/evaluationModel.js'

// @desc     get Evaluate
// @route    GET/ api/evaluate
// @access   Private
const getEvaluate = asyncHandler(async (req, res) => {
	// const evaluate = await Evaluation.findOne({
	// 	userId: req.user._id,
	// })
	// console.log(req.params)
	const evaluateLists = await Evaluation.find({ userId: req.params.id })
	res.status(201).json(evaluateLists.evaluations)
})

export { getEvaluate }

