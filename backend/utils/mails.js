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
		// message: text,
	}
}

export const registerVerifyMail = (object) => {
	const { email, fullName, id, token } = object
	console.log(`${process.env.API_URI}/verify/${id}/${token}`)
	return {
		from: 'xxx会社 <info@umaishio.com>',
		recipients: [email],
		subject: 'xxx会社の登録のご案内',
		message: /*html*/ `<p>
			${fullName}様
			<br />
			xxx会社のご登録ありがとうございます。
			<br />
			<a href="${process.env.API_URI}/verify/${id}/${token}">こちら</a
			>をクリック後、会員登録が完了いたします。
			<br />
			※会員登録に心当たりがない場合は、こちらの対応は不要となります。
			<br />
			<br />
			またアクセスできない場合は、以下のURLからアクセスください。
			<br />
			${process.env.API_URI}/verify/${id}/${token}
		</p>`,
	}
}

export const trialMail = async (object) => {
	const { email, fullName, info } = object
	const games = await Games.find({})
	return {
		from: 'xxx会社 <info@umaishio.com>',
		recipients: [email],
		subject: 'xxx会社無料体験のご案内',
		message: /*html*/ `<p>
			${fullName}様
			<br />
			xxx会社の無料体験を申し込みいただきありがとうございます。
			<br />
			お客様のご都合に合う先生を探します。お時間に約x週間程度を必要としています。
			<br />
			<br />
			【申し込み内容】
			<br />
			<br />
			・お名前: ${fullName} 様
			<br />
			・年齢: ${info.age}歳
			<br />
			・電話番号: ${info.phoneNumber}
			<br />
			・英会話のレベル: ${getExperienceValue(info.experience, experienceData)}
				<br />
			・希望時間: ${getPreferWeekValue(info.preferTime, weeks)
				.map(
					(obj) => /*html*/ ` <br />
							<span>&nbsp;&nbsp;&nbsp;- 第${obj.rank}希望: ${obj.title} ${obj.time}時 ~</span>`
				)
				.join('')}
			<br />
			・お使いの機種: ${getConsoleType(info.consoleType, consoleData)}
			<br />
			・使用ゲーム: 
			<br /> 
			${getGameObject(info.gameLists, games)
				.map(
					(item) =>
						/*html*/ ` <span> &nbsp;&nbsp;&nbsp;- ${item.title}</span><br /> `
				)
				.join('')}
			<br />
			<br />
			<br />
		</p>`,
	}
}

export const registerConfirmationMail = (object) => {
	const { email, fullName } = object

	return {
		from: 'xxx会社 <info@umaishio.com>',
		recipients: [email],
		subject: 'xxx会社の登録のご案内',
		message: /*html*/ `<p>
			${fullName}様
			<br />
			xxx会社の本登録が完了いたしました。
			<br />
			<a href="${process.env.API_URI}/profile">こちら</a
			>からプロフィールなどの設定を変更が可能です。
			<br />
			xxx会社
		</p>`,
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
		message: /*html*/ `<p>
			${teacherFullName}様
			<br />
			先生募集中のご案内です。
			<br />
			ただいま先生の募集をしています。
			<br />
			【生徒内容】
			<br />
			<br />
			・年齢: ${info.age}歳
			<br />
			・英会話のレベル: ${getExperienceValue(info.experience, experienceData)}
				<br />
			・希望時間: ${getPreferWeekValue(info.preferTime, weeks)
				.map(
					(obj) => /*html*/ ` <br />
							<span>&nbsp;&nbsp;&nbsp;- 第${obj.rank}希望: ${obj.title} ${obj.time}時 ~</span>`
				)
				.join('')}
			<br />
			・お使いの機種: ${getConsoleType(info.consoleType, consoleData)}
			<br />
			・使用ゲーム: 
			<br /> 
			${getGameObject(info.gameLists, games)
				.map(
					(item) =>
						/*html*/ ` <span> &nbsp;&nbsp;&nbsp;- ${item.title}</span><br /> `
				)
				.join('')}
			<br />
		</p>`,
	}
}
