import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
const router = express.Router()

import {
	authUser,
	getUserProfile,
	registerUser,
	trialRegisterUser,
} from '../controllers/userController.js'

router.route('/trial').post(trialRegisterUser)
router.route('/').post(registerUser)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile)

export default router
