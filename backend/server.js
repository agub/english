import express from 'express'
import dotenv from 'dotenv'
import connectDB from '../backend/config/db.js'
import colors from 'colors'
import cron from 'node-cron'
import { sample } from './scheduled/sample.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import gameRoutes from './routes/gameRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import roomRoutes from './routes/roomsRoutes.js'
import customerRoutes from './routes/customerRoutes.js'
import employeeRoutes from './routes/employeeRoutes.js'
// import games from './data/games.js'

dotenv.config()

connectDB()

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
	res.send('API IS RUNNING')
})

// cron.schedule('*/10 * * * * *', sample, {
// 	timezone: 'Japan',
// })

app.use('/api/games', gameRoutes)

app.use('/api/users', userRoutes)

app.use('/api/orders', orderRoutes)

app.use('/api/rooms', roomRoutes)

app.use('/api/customers', customerRoutes)

app.use('/api/employees', employeeRoutes)

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

