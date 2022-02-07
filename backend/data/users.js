import bcrypt from 'bcryptjs'

const users = [
	{
		email: 'shintrfc@gmail.com',
		fullName: '鈴木 慎一郎',
		age: 27,
		password: bcrypt.hashSync('123456', 10),
		consoleType: 'ps4',
		contactBy: 'phone',
		experience: 2,
		gameTitle: 'fasf',
		phoneNumber: '0503931359',
		preferTime: [
			{ week: 'wednesday', time: 15, rank: 1 },
			{ week: 'wednesday', time: 17, rank: 2 },
		],
		rentMixer: 'false',
	},
	{
		email: 'coolemail@gmail.com',
		fullName: 'ベックス',
		age: 10,
		consoleType: 'pc',
		contactBy: 'phone',
		experience: 0,
		gameTitle: 'sdafawea',
		phoneNumber: '09022414152',
		preferTime: [
			{ week: 'friday', time: 15, rank: 1 },
			{ week: 'saturday', time: 12, rank: 2 },
		],
		rentMixer: 'false',
	},
]

export default users
