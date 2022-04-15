import Customer from '../models/customerModel.js'
import Employee from '../models/employeeModel.js'
import Room from '../models/roomModel.js'
import moment from 'moment'

export const trigger = async (req, res) => {
	//get today's week date
	const d = new Date()
	console.log(d.getDay())
	function formatDate(date) {
		return moment(date).format('LLL')
	}
	console.log(
		`${formatDate(d.getTime())} - ${moment(formatDate(d.getTime())).add(
			30,
			'm'
		)}`
	)
	//search from roomModels which has same week
	// const activeClasses = await Room.find({
	// 	'schedule.week': d.getDay(),
	// 	isActive: true,
	// })
	// let teacherArray = []
	// activeClasses.map(async (singleClass) => {
	// 	teacherArray.push(singleClass.teacher)
	// 	const employee = await Employee.findOne({ userId: singleClass.teacher })
	// 	employee.history = [
	// 		...employee.history,
	// 		{
	// 			customerId: singleClass._id,
	// 			date: 'fasdfas',
	// 		},
	// 	]
	// 	await employee.save()
	// })

	// console.log(teachersList)

	// const activeCustomer = await Customer.find({ isActive: true })

	// console.log(activeCustomer)
	// console.log(`${new Date()} at Japan timezone`)
}

