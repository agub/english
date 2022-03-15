import express from 'express'
import asyncHandler from 'express-async-handler'

import Room from '../models/roomModel.js'

// @desc     Fetch all games
// @route    GET/ api/games
// @access   Public
const getRooms = asyncHandler(async (req, res) => {
	const rooms = await Room.find({})
	res.json(rooms)
})

export { getRooms }
