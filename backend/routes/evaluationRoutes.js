import express from 'express'
import { protect, admin } from '../middleware/authMiddleware.js'
const router = express.Router()
import { getEvaluate } from '../controllers/evaluationController.js'

router.route('/:id').get(protect, getEvaluate)

export default router

