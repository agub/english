import express from 'express'
import {
	orderSubscription,
	orderDataSet,
	listMyOrders,
	getSubscriptionById,
} from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

// import { getGameById, getGames } from '../controllers/gameController.js'

router.route('/').post(protect, orderDataSet).get(protect, listMyOrders)
router.route('/subscription').post(protect, orderSubscription)
router.route('/:id').post(protect, getSubscriptionById)
// router.route('/subscription/:id').get(protect, orderListMySub)

export default router
