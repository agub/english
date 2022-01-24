import express from 'express'
import dotenv from 'dotenv'
import connectDB from '../backend/config/db.js'
import colors from 'colors'

import games from './data/games.js'

dotenv.config()

connectDB()

const app = express()

app.get('/', (req, res) => {
	res.send('API IS RUNNING')
})
app.get('/api/games', (req, res) => {
	res.json(games)
})
app.get('/api/games/:id', (req, res) => {
	const game = games.find((game) => game._id === req.params.id)
	res.json(game)
})

const PORT = process.env.PORT || 5000
app.listen(
	PORT,
	console.log(
		`server is running  ${process.env.NODE_ENV} mode on PORT ${PORT} running`
			.yellow.bold
	)
)
