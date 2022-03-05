import express from 'express'
import { orderSubscription } from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

// import { getGameById, getGames } from '../controllers/gameController.js'

router.route('/subscription').post(protect, orderSubscription)

export default router
