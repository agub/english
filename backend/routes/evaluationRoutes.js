import express from 'express'
import { protect, admin } from '../middleware/authMiddleware.js'
const router = express.Router()
import {
	getEvaluate,
	evaluateStudent,
} from '../controllers/evaluationController.js'

router.route('/:id').get(protect, getEvaluate).post(protect, evaluateStudent)

export default router

