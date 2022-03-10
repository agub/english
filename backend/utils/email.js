import nodemailer from 'nodemailer'

import dotenv from 'dotenv'

dotenv.config()

export async function sendEmail(mailObj) {
	const { from, recipients, subject, message, bcc } = mailObj
	return new Promise((resolve, reject) => {
		let transporter = nodemailer.createTransport({
			host: 'smtp.zoho.eu',
			secure: true,
			port: 465,
			auth: {
				user: 'info@umaishio.com',
				pass: process.env.ZOHO_PASSWORD,
			},
		})
		transporter.sendMail(
			{
				from: from, // sender address
				bcc: bcc ? bcc : null,
				to: recipients, // list of recipients
				subject: subject, // Subject line
				html: message, // plain text
			},
			(error, info) => {
				if (error) {
					console.log(error.response)
					reject(new Error(error.response))
				} else {
					console.log('Email sent: ' + info.response)
					resolve({ success: info.response })
				}
			}
		)
	})
}

// export const sendSampleEmail = async (obj) => {
// 	const { title, email, text } = obj
// 	const mailObj = {
// 		from: 'sample website <info@umaishio.com>',
// 		recipients: [email],
// 		subject: title,
// 		message: text,
// 	}
// 	try {
// 		const data = await sendEmail(mailObj)
// 		// console.log(data)
// 		return data
// 	} catch (error) {
// 		console.error(` ${error.message}`)
// 	}
// }
