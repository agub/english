import express from 'express'

const router = express.Router()

import { getGameById, getGames } from '../controllers/gameController.js'

router.route('/').get(getGames)

router.route('/:id').get(getGameById)

export default router
