import express from 'express'
import {
	orderSubscription,
	orderDataSet,
	orderListMySub,
} from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

// import { getGameById, getGames } from '../controllers/gameController.js'

router.route('/').post(protect, orderDataSet).get(protect, orderListMySub)
router.route('/subscription').post(protect, orderSubscription)
// router.route('/subscription/:id').get(protect, orderListMySub)

export default router
