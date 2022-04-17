import Customer from '../models/customerModel.js'
import Employee from '../models/employeeModel.js'
import Room from '../models/roomModel.js'
import moment from 'moment'

export const trigger = async (req, res) => {
	const classLength = 75 //min
	let d = new Date()

	function formatDate(date) {
		return moment(date).format('LLL')
	}
	//convert classTime
	const getClassWeek = (startDate, weekNum, hoursNum, minuteNum) => {
		let month = d.getMonth()

		d.setDate(startDate)

		// Get the first weekday in the month
		while (d.getDay() !== weekNum) {
			d.setDate(d.getDate() + 1)
		}
		// Get all the other weekday in the month
		while (d.getMonth() === month) {
			d.setHours(hoursNum)
			d.setMinutes(minuteNum)
			// classInMonth.push(formatDate(new Date(d.getTime())))
			return `${formatDate(new Date(d.getTime()))} - ${formatDate(
				moment(new Date(d.getTime())).add(classLength, 'm')
			)}`
			break
			// d.setDate(d.getDate() + 7)
		}
	}

	//search from roomModels which has same week
	const activeClasses = await Room.find({
		'schedule.week': 5,
		//today's week
		isActive: true,
	})

	// let teacherArray = []

	if (activeClasses.length !== 0) {
		activeClasses.map(async (singleClass) => {
			// teacherArray.push(singleClass.teacher)
			const employee = await Employee.findOne({
				userId: singleClass.teacher,
			})
			employee.history = [
				...employee.history,
				{
					roomId: singleClass._id,
					date: getClassWeek(
						17, //today's date
						4, //today's week
						singleClass.schedule.time,
						0
					).toString(),
					createdAt: new Date(),
				},
			]
			await employee.save()
			console.log('employ history has saved')
		})
	}
}

