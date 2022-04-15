import Customer from '../models/customerModel.js'
import Employee from '../models/employeeModel.js'

export const trigger = async (req, res) => {
	//get today's week date
	//search from roomModels

	const activeCustomer = await Customer.find({ isActive: true })

	console.log(activeCustomer)
	// console.log(`${new Date()} at Japan timezone`)
}

