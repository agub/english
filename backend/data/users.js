import bcrypt from 'bcryptjs'

const users = [
	{
		// user who finished register trial
		email: 'trial@gmail.com',
		name: {
			lastName: '渡来',
			firstName: '遊佐',
			kanaLastName: 'トライ',
			kanaFirstName: 'ユウザ',
		},
		info: {
			age: 27,
			consoleType: 'pc',
			contactBy: 'phone',
			experience: 4,
			gameTitle: 'Minecraft (マインクラフト)',
			phoneNumber: '0903325124',
			preferTime: [
				{ week: 'thursday', time: 14, rank: 1 },
				{ week: 'thursday', time: 13, rank: 2 },
			],
			rentMixer: true,
		},
	},
	{
		// user who finished register
		email: 'shintrfc@gmail.com',
		password: bcrypt.hashSync('123456', 10),
		name: {
			lastName: '鈴木',
			firstName: '慎一郎',
			kanaLastName: 'スズキ',
			kanaFirstName: 'シンイチロウ',
		},
		info: {
			age: 27,
			consoleType: 'ps4',
			contactBy: 'phone',
			experience: 2,
			discordId: 'adsfafa',
			gameTitle: 'Among Us (アモングアス)',
			phoneNumber: '0503931359',
			preferTime: [
				{ week: 'wednesday', time: 15, rank: 1 },
				{ week: 'wednesday', time: 17, rank: 2 },
			],
			rentMixer: false,
		},
	},
	{
		// user who finished register as a teacher
		email: 'example@gmail.com',
		password: bcrypt.hashSync('123456', 10),
		name: {
			lastName: '後藤',
			firstName: 'ひかり',
			kanaLastName: 'ゴトウ',
			kanaFirstName: 'ヒカリ',
		},
		info: {
			age: 10,
			gender: 'female',
			consoleType: 'pc',
			gameTitle: 'Minecraft (マインクラフト)',
			discordId: 'adsfafa',
			phoneNumber: '09022414152',
			preferTime: [
				{ week: 'friday', time: 15, rank: 1 },
				{ week: 'saturday', time: 12, rank: 2 },
			],
			rentMixer: 'false',
		},
		isTeacher: true,
	},
]

export default users
