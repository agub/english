import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
const router = express.Router()

import {
	getEmployees,
	getEmployeeById,
	addWorkHistory,
	getWaitLists,
	getMyStudentLists,
} from '../controllers/employeeController.js'

router.route('/').get(getEmployees)
router.route('/waitLists').get(protect, getWaitLists)
router.route('/studentLists').get(protect, getMyStudentLists)
router.route('/:id').get(getEmployeeById)

export default router

