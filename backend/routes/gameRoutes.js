import express from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router()

import Games from '../models/gameModel.js'

// @desc     Fetch all games
// @route    GET/ api/games
// @access   Public
router.get(
	'/',
	asyncHandler(async (req, res) => {
		const games = await Games.find({})
		res.json(games)
	})
)

// @desc     Fetch a single game
// @route    GET/ api/products/:id
// @access   Public
router.get(
	'/:id',
	asyncHandler(async (req, res) => {
		const game = await Games.findById(req.params.id)

		if (game) {
			res.json(game)
		} else {
			res.status(404)
			throw new Error('Game not found')
		}
	})
)

export default router
