import express from 'express'
import asyncHandler from 'express-async-handler'
import Room from '../models/roomModel.js'

// @desc     Fetch all rooms
// @route    GET/ api/rooms
// @access   Public
const getRooms = asyncHandler(async (req, res) => {
	const rooms = await Room.find({})
	res.json(rooms)
})

export { getRooms }

