import asyncHandler from 'express-async-handler'
import nodemailer from 'nodemailer'

// import dotenv from 'dotenv'

// dotenv.config()

export const sendEmail = asyncHandler(async (mailObj) => {
	const { from, recipients, subject, message } = mailObj

	try {
		// Create a transporter
		let transporter = nodemailer.createTransport({
			host: 'smtp.zoho.eu',
			secure: true,
			port: 465,
			auth: {
				user: 'info@umaishio.com',
				pass: 'ie1H74CCqNbB',
			},
		})

		// send mail with defined transport object
		let mailStatus = await transporter.sendMail({
			from: from, // sender address
			to: recipients, // list of recipients
			subject: subject, // Subject line
			html: message, // plain text
		})

		console.log(`Message sent: ${mailStatus.messageId}`)
		return `Message sent: ${mailStatus.messageId}`
	} catch (error) {
		console.error(
			`Something went wrong in the sendmail method. Error: ${error.message}`
		)
	}
})

export const sendSampleEmail = async (obj) => {
	const { title, email, text } = obj
	const mailObj = {
		from: 'sample website <info@umaishio.com>',
		recipients: [email],
		subject: title,
		message: text,
	}
	try {
		await sendEmail(mailObj)
		return
	} catch (error) {
		console.error(
			`Something went wrong in the sendmail method. Error: ${error.message}`
		)
	}
}
