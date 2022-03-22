import express from 'express'

const router = express.Router()

import { getCustomers } from '../controllers/customerController.js'

router.route('/').get(getCustomers)

// router.route('/:id').get(getGameById)

export default router
