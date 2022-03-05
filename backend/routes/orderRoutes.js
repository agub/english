import express from 'express'
import {
	orderSubscription,
	orderDataSet,
} from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

// import { getGameById, getGames } from '../controllers/gameController.js'

router.route('/').post(protect, orderDataSet)
router.route('/subscription').post(protect, orderSubscription)

export default router
