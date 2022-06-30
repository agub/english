import express from 'express'
import { protect, employeeAccess } from '../middleware/authMiddleware.js'
const router = express.Router()

import {
	getEmployees,
	getEmployeeById,
	addWorkHistory,
	getWaitLists,
	getMyStudentLists,
	postCandidate,
} from '../controllers/employeeController.js'

router.route('/').get(getEmployees)
router.route('/waitLists').get(protect, getWaitLists)
router.route('/studentLists').get(protect, getMyStudentLists)
router.route('/:id').get(getEmployeeById)
router.route('/apply/:id').post(protect, employeeAccess, postCandidate)

export default router

