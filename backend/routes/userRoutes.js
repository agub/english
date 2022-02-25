import express from 'express'
import { protect, admin } from '../middleware/authMiddleware.js'
const router = express.Router()

import {
	authUser,
	getUserProfile,
	registerUser,
	trialRegisterUser,
	updateUserProfile,
	getUsers,
	getUserById,
	updateUser,
} from '../controllers/userController.js'

router.route('/trial').post(trialRegisterUser)
router.route('/').post(registerUser).get(protect, admin, getUsers)
router.post('/login', authUser)
router
	.route('/profile')
	.get(protect, getUserProfile)
	.put(protect, updateUserProfile)
router
	.route('/:id')
	.get(protect, admin, getUserById)
	.put(protect, admin, updateUser)

export default router
