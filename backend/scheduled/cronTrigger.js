import Customer from '../models/customerModel.js'
import Employee from '../models/employeeModel.js'
import Room from '../models/roomModel.js'
import moment from 'moment'
import { statusType } from '../utils/data.js'

export const trigger = async (req, res) => {
	const classLength = 75 //min
	const trialPeriod = 2 //weeks
	const cashbackPeriod = 3 //month
	const trialEndPeriod = 24 * 7 - 1 //hrs
	const unsubPeriod = 1 //month

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
	const todayClasses = await Room.find({
		'schedule.week': 5,
		//today's week
		isActive: true,
	})
	if (todayClasses.length !== 0) {
		todayClasses.map(async (singleClass) => {
			//maybe if lastIndex's createdAt is has todays date RETURN

			const employee = await Employee.findOne({
				userId: singleClass.teacher,
			})
			const historyIndex = employee.history.length - 1
			const lastRoomId = employee.history[historyIndex].roomId
			const lastCreatedAt = moment(
				employee.history[historyIndex].createdAt
			)
			const toDate = moment(new Date())
			const statusUpdateLength = toDate.diff(lastCreatedAt, 'hours', true)
			//passed 24hrs with same last id  RETURN
			if (
				(lastRoomId.toString() === singleClass._id.toString() &&
					statusUpdateLength > 24) ||
				lastRoomId.toString() !== singleClass._id.toString()
			) {
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
			}
		})
	}
	//status code change
	const activeClasses = await Room.find({
		isActive: true,
	})
	if (activeClasses.length !== 0) {
		activeClasses.map((activeClass) => {
			activeClass.students.map(async (student) => {
				const singleCustomer = await Customer.findOne({
					userId: student,
				})
				const statusIndex = singleCustomer.status.length - 1
				const currentStatus = singleCustomer.status[statusIndex].code
				//TRIAL => ACTIVE
				if (currentStatus === statusType.TRIAL) {
					const fromDate = moment(
						singleCustomer.status[statusIndex].createdAt
					)
					const toDate = moment(new Date())
					const statusUpdateLength = toDate.diff(fromDate, 'months')
					console.log(statusUpdateLength)

					//SEND EMAIL FOR CONTINUE THE SERVICE
					if (statusUpdateLength >= cashbackPeriod) {
						singleCustomer.status = [
							...singleCustomer.status,
							{
								code: statusType.ACTIVE,
								createdAt: new Date(),
							},
						]
						await singleCustomer.save()
					}
				}
				//TRIAL_END => CANCELLED

				// if (currentStatus === statusType.TRIAL_END) {
				// 	const fromDate = moment(
				// 		singleCustomer.status[statusIndex].createdAt
				// 	)
				// 	// const fromDate = moment('04-12-2022', 'MM-DD-YYYY')
				// 	const toDate = moment(new Date())
				// 	const statusUpdateLength = toDate.diff(fromDate, 'hours')
				// 	console.log(statusUpdateLength)
				// 	console.log(trialEndPeriod)
				// 	if (statusUpdateLength >= trialEndPeriod) {
				// 		singleCustomer.status = [
				// 			...singleCustomer.status,
				// 			{
				// 				code: statusType.CANCELLED,
				// 				createdAt: new Date(),
				// 			},
				// 		]
				// 		await singleCustomer.save()
				// 	}
				// }
				//UNSUB_PENDING => UNSUBBED
				if (currentStatus === statusType.UNSUB_PENDING) {
					const fromDate = moment(
						singleCustomer.status[statusIndex].createdAt
					)

					// const fromDate = moment('03-19-2022', 'MM-DD-YYYY')
					const toDate = moment(new Date())
					const statusUpdateLength = toDate.diff(
						fromDate,
						'month',
						true
					)
					if (statusUpdateLength >= unsubPeriod) {
						singleCustomer.status = [
							...singleCustomer.status,
							{
								code: statusType.UNSUBBED,
								createdAt: new Date(),
							},
						]
						await singleCustomer.save()
					}
				}
			})
		})
	}
}

