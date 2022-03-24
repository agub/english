import express from 'express'

const router = express.Router()

import {
	getEmployees,
	getEmployeeById,
} from '../controllers/employeeController.js'

router.route('/').get(getEmployees)

router.route('/:id').get(getEmployeeById)

export default router
