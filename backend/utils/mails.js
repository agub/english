import dotenv from 'dotenv'
import { experienceData, weeks, consoleData } from '../utils/data.js'
import Games from '../models/gameModel.js'

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
	//__________getExperienceData from Number__________
	const getExperienceValue = () => {
		for (const data of experienceData) {
			if (data.value === info.experience) return data.title
		}
	}
	//__________getPreferWeek from weeks number__________
	const preferWeek = info.preferTime.map((obj) =>
		weeks.find((week) => week.data === obj.week)
	)
	const convertedWeek = preferWeek.map((obj, index) => ({
		...obj,
		time: info.preferTime[index].time,
		rank: info.preferTime[index].rank,
	}))
	//__________getConsoleType from data__________
	const consoleType = consoleData.filter(
		(obj) => obj.data === info.consoleType
	)[0].title
	//__________getGameTitle from Games__________
	const games = await Games.find({})
	const getGameObject = info.gameLists.map((game) =>
		games.find((obj) => obj._id.toString() === game.toString())
	)

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
			・英会話のレベル: ${getExperienceValue()}
			<br />
			・希望時間: ${convertedWeek
				.map((obj) => {
					return /*html*/ ` <br />
							<span>&nbsp;&nbsp;&nbsp;- 第${obj.rank}希望: ${obj.title} ${obj.time}時 ~</span>`
				})
				.join('')}
			<br />
			・お使いの機種: ${consoleType}
			<br />
			・使用ゲーム: 
			<br /> 
			${getGameObject
				.map((item) => {
					return /*html*/ ` <span> &nbsp;&nbsp;&nbsp;- ${item.title}</span><br /> `
				})
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
