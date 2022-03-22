import mongoose from 'mongoose'

const employeeSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	// description: {
	// 	type: String,
	// 	required: true,
	// },
})

const Employee = mongoose.model('Employee', employeeSchema)

export default Employee
