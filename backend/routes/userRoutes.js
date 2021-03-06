import express from 'express'
import { protect, admin } from '../middleware/authMiddleware.js'
const router = express.Router()

import {
	authUser,
	getUserProfile,
	registerUser,
	verifyEmail,
	interviewRegisterUser,
	teacherRegisterUser,
	updateUserProfile,
	getUsers,
	getUserById,
	updateUser,
	updateInterview,
	deleteUser,
	getTeacherById,
	contactForm,
} from '../controllers/userController.js'

router.route('/interview').post(interviewRegisterUser)

router.route('/teacher').post(teacherRegisterUser)
router.route('/teacher/:id').get(protect, getTeacherById)

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

router.route('/:id/delete').put(protect, admin, deleteUser)

router.route('/:id/interview').put(protect, admin, updateInterview)

router.route('/contact').post(contactForm)
router.route('/verify/:id/:token').post(verifyEmail)

export default router

