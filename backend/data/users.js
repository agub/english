import bcrypt from 'bcryptjs'

const users = [
	{
		// user who finished register trial
		email: 'shintrfc@gmail.com',
		name: {
			lastName: '鈴木',
			firstName: '慎一郎',
			kanaLastName: 'スズキ',
			kanaFirstName: 'シンイチロウ',
		},
		password: bcrypt.hashSync('123456', 10),
		info: {
			age: 27,
			consoleType: 'ps4',
			contactBy: 'phone',
			experience: 2,
			gameTitle: 'あつまれどうぶつの森',
			phoneNumber: '0503931359',
			preferTime: [
				{ week: 'wednesday', time: 15, rank: 1 },
				{ week: 'wednesday', time: 17, rank: 2 },
			],
			rentMixer: 'false',
		},
	},
	{
		// user who finished register as a teacher
		email: 'example@gmail.com',
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
			contactBy: 'phone',
			experience: 0,
			gameTitle: 'あつまれどうぶつの森',
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
