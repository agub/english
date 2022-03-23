import express from 'express'

const router = express.Router()

import {
	getCustomers,
	getCustomerById,
} from '../controllers/customerController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/').get(getCustomers)
router.route('/:id').get(protect, getCustomerById)

export default router
