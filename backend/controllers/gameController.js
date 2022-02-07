import express from 'express'
import asyncHandler from 'express-async-handler'

import Games from '../models/gameModel.js'

// @desc     Fetch all games
// @route    GET/ api/games
// @access   Public
const getGames = asyncHandler(async (req, res) => {
	const games = await Games.find({})
	res.json(games)
})

// @desc     Fetch a single game
// @route    GET/ api/products/:id
// @access   Public
const getGameById = asyncHandler(async (req, res) => {
	const game = await Games.findById(req.params.id)

	if (game) {
		res.json(game)
	} else {
		res.status(404)
		throw new Error('Game not found')
	}
})

export { getGames, getGameById }
