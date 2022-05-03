import express from 'express'
import { protect, admin } from '../middleware/authMiddleware.js'
const router = express.Router()

import {
	authUser,
	getUserProfile,
	registerUser,
	verifyEmail,
	trialRegisterUser,
	teacherRegisterUser,
	updateUserProfile,
	getUsers,
	getUserById,
	updateUser,
	getTeacherById,
	contactForm,
	getWaitLists,
} from '../controllers/userController.js'

router.route('/interview').post(trialRegisterUser)

router.route('/teacher').post(teacherRegisterUser)
router.route('/teacher/:id').get(protect, getTeacherById)

router.route('/').post(registerUser).get(protect, admin, getUsers)
router.post('/login', authUser)
router
	.route('/profile')
	.get(protect, getUserProfile)
	.put(protect, updateUserProfile)

router.route('/waitLists').get(protect, getWaitLists)
router
	.route('/:id')
	.get(protect, admin, getUserById)
	.put(protect, admin, updateUser)

router.route('/contact').post(contactForm)
router.route('/verify/:id/:token').post(verifyEmail)

export default router

