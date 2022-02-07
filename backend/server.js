import express from 'express'
import dotenv from 'dotenv'
import connectDB from '../backend/config/db.js'
import colors from 'colors'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import gameRoutes from './routes/gameRoutes.js'
import userRoutes from './routes/userRoutes.js'
// import games from './data/games.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
	res.send('API IS RUNNING')
})

app.use('/api/games', gameRoutes)

app.use('/api/users', userRoutes)

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(
	PORT,
	console.log(
		`server is running  ${process.env.NODE_ENV} mode on PORT ${PORT} running`
			.yellow.bold
	)
)
