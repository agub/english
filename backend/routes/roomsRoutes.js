import express from 'express'

const router = express.Router()

import { getRooms } from '../controllers/roomController.js'
// import { getGameById, getGames } from '../controllers/gameController.js'

router.route('/').get(getRooms)

// router.route('/:id').get(getGameById)

export default router
