export const experienceData = [
	{ value: 0, title: '全く話せない' },
	{ value: 1, title: '簡単な単語を知っている' },
	{ value: 2, title: '簡単な会話ができる' },
	{ value: 3, title: '会話ができる' },
	{ value: 4, title: 'それ以上' },
]

export const weeks = [
	{ title: '月曜日', data: 'monday', value: 1 },
	{ title: '火曜日', data: 'tuesday', value: 2 },
	{ title: '水曜日', data: 'wednesday', value: 3 },
	{ title: '木曜日', data: 'thursday', value: 4 },
	{ title: '金曜日', data: 'friday', value: 5 },
	{ title: '土曜日', data: 'saturday', value: 6 },
	{ title: '日曜日', data: 'sunday', value: 0 },
]

export const consoleData = [
	{ title: 'Nintendo Switch', data: 'switch' },
	{ title: 'コンピューター', data: 'pc' },
	{ title: 'Playstation, Xbox', data: 'tv' },
]

const PENDING = 'PENDING'
const TRIAL = 'TRIAL'
const TRIAL_END = 'TRIAL_END'
const CANCELLED = 'CANCELLED'
const ACTIVE = 'ACTIVE'
const UNSUB_PENDING = 'UNSUB_PENDING'
const UNSUBBED = 'UNSUBBED'

const PENDING_INTERVIEW = 'PENDING_INTERVIEW'
const INTERVIEWED = 'INTERVIEWED'

export const statusType = {
	PENDING,
	TRIAL,
	TRIAL_END,
	CANCELLED,
	ACTIVE,
	UNSUB_PENDING,
	UNSUBBED,
	PENDING_INTERVIEW,
	INTERVIEWED,
}

// const WAITING = 'WAITING'
// const TRIAL = 'TRIAL'
// const STARTED = 'STARTED'
// const PAUSED = 'PAUSED'

// export const statusType = {
// 	WAITING,
// 	TRIAL,
// 	STARTED,
// 	PAUSED,
// }

