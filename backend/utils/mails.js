import dotenv from 'dotenv'
import { experienceData, weeks, consoleData } from '../utils/data.js'
import {
	getConsoleType,
	getExperienceValue,
	getGameObject,
	getPreferWeekValue,
} from '../utils/reuseable.js'
import Games from '../models/gameModel.js'
import User from '../models/userModel.js'

dotenv.config()

// const mailObj = {
// 	from: 'sample website <info@umaishio.com>',
// 	recipients: [email],
// 	subject: title,
// 	message: text,
// }

export const contactMail = (title, email, text) => {
	return {
		from: 'sample website <info@umaishio.com>',
		recipients: [email],
		subject: title,
		directly: '../views/contactMail.handlebars',
		iterates: { text },
	}
}

export const registerVerifyMail = (object) => {
	const { email, fullName, id, verify } = object
	console.log(`${process.env.API_URI}/verify/${id}/${verify}`)
	return {
		from: 'xxx会社 <info@umaishio.com>',
		recipients: [email],
		subject: 'xxx会社の登録のご案内',
		directly: '../views/registerVerifyMail.handlebars',
		iterates: {
			fullName: fullName,
			URI: process.env.API_URI,
			verify: verify,
			id: id,
		},
	}
}

export const trialMail = async (object) => {
	const { email, fullName, info } = object
	const games = await Games.find({})
	return {
		from: 'xxx会社 <info@umaishio.com>',
		recipients: [email],
		subject: 'xxx会社無料体験のご案内',
		directly: '../views/trialMail.handlebars',
		iterates: {
			fullName: fullName,
			age: info.age,
			phoneNumber: info.phoneNumber,
			experience: getExperienceValue(info.experience, experienceData),
			preferWeek: getPreferWeekValue(info.preferTime, weeks),
			consoleType: getConsoleType(info.consoleType, consoleData),
			gameLists: getGameObject(info.gameLists, games),
		},
	}
}

export const registerConfirmationMail = (object) => {
	const { email, fullName } = object

	return {
		from: 'xxx会社 <info@umaishio.com>',
		recipients: [email],
		subject: 'xxx会社の登録のご案内',
		directly: '../views/registerConfirmationMail.handlebars',
		iterates: { fullName: fullName, URI: process.env.API_URI },
	}
}

export const seekTeacherMail = async (object) => {
	const { teacherEmail, teacherFullName, info } = object
	const games = await Games.find({})

	return {
		from: 'xxx会社 <info@umaishio.com>',
		// bcc: [...teacherLists, 'info@umaishio.com'],
		recipients: [teacherEmail],
		subject: '先生募集中: xxx会社のからのご案内',
		directly: '../views/seekTeacherMail.handlebars',
		iterates: {
			teacherFullName: teacherFullName,
			age: info.age,
			phoneNumber: info.phoneNumber,
			experience: getExperienceValue(info.experience, experienceData),
			preferWeek: getPreferWeekValue(info.preferTime, weeks),
			consoleType: getConsoleType(info.consoleType, consoleData),
			gameLists: getGameObject(info.gameLists, games),
		},
	}
}
