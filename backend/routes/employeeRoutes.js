import express from 'express'

const router = express.Router()

import { getEmployees } from '../controllers/employeeController.js'

router.route('/').get(getEmployees)

// router.route('/:id').get(getGameById)

export default router
