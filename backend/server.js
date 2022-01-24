const express = require('express')
const games = require('./data/games')

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

app.listen(5000, console.log('PORT 5000 running'))
