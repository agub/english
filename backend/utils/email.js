import asyncHandler from 'express-async-handler'
import nodemailer from 'nodemailer'

// import dotenv from 'dotenv'

// dotenv.config()

const sendEmail = asyncHandler(async (mailObj) => {
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

export const sendSampleEmail = asyncHandler(async (email) => {
	console.log(2)
	const mailObj = {
		from: 'sample website <info@umaishio.com>',
		recipients: [email],
		subject: 'sample',
		message: `しん
		<br/>
		sample message
		</p>`,
	}

	await sendEmail(mailObj).then((res) => {
		console.log(res)
		console.log(3)
	})

	return mailObj
})
