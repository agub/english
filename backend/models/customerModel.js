import mongoose from 'mongoose'

const customerSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	// description: {
	// 	type: String,
	// 	required: true,
	// },
})

const Customer = mongoose.model('Customer', customerSchema)

export default Customer
