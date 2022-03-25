export const experienceData = [
	{ value: 0, title: '全く話せない' },
	{ value: 1, title: '簡単な単語を知っている' },
	{ value: 2, title: '簡単な会話ができる' },
	{ value: 3, title: '会話ができる' },
	{ value: 4, title: 'それ以上' },
]

export const weeks = [
	{ title: '月曜日', data: 'monday' },
	{ title: '火曜日', data: 'tuesday' },
	{ title: '水曜日', data: 'wednesday' },
	{ title: '木曜日', data: 'thursday' },
	{ title: '金曜日', data: 'friday' },
	{ title: '土曜日', data: 'saturday' },
	{ title: '日曜日', data: 'sunday' },
]

export const consoleData = [
	{ title: 'Nintendo Switch', data: 'switch' },
	{ title: 'コンピューター', data: 'pc' },
	{ title: 'Playstation, Xbox', data: 'tv' },
]

const WAITING = 'WAITING'
const TRIAL = 'TRIAL'
const STARTED = 'STARTED'
const PAUSED = 'PAUSED'

export const statusType = {
	WAITING,
	TRIAL,
	STARTED,
	PAUSED,
}
