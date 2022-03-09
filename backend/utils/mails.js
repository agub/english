import dotenv from 'dotenv'

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
		message: text,
	}
}

export const registerVerifyMail = (object) => {
	const { email, fullName, id, token } = object
	console.log(`${process.env.API_URI}/verify/${id}/${token}`)
	return {
		from: 'xxx会社 <info@umaishio.com>',
		recipients: [email],
		subject: 'xxx会社の登録のご案内',
		message: `<p>${fullName}様
		<br/>
		xxx会社のご登録ありがとうございます。
		<br/>
		<a href="${process.env.API_URI}/verify/${id}/${token}">こちら</a>をクリック後、会員登録が完了いたします。
		<br/>
		※会員登録に心当たりがない場合は、こちらの対応は不要となります。
		<br/>
		<br/>
		またアクセスできない場合は、以下のURLからアクセスください。
		<br/>
		${process.env.API_URI}/verify/${id}/${token}
		</p>`,
	}
}
