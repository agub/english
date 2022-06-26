import classNames from 'classnames'
import { weeks } from '../utils/data'
const MyStudentList = ({ type, consoleType, name, discordId, schedule }) => {
	const weekConverter = (weekNum, data) => {
		for (const obj of data) {
			if (obj.value === weekNum) {
				return obj.title
			}
		}
	}
	return (
		<div
			className={classNames(`border-b bottom-1 p-2  rounded`, {
				'cursor-pointer hover:bg-gray-100': type === 'button',
				'': type === 'box',
			})}
			// className='border-b bottom-1 p-2 cursor-pointer hover:bg-gray-100 rounded'
		>
			<div>機種: {consoleType}</div>
			<div>名前: {name.firstName + ' ' + name.lastName}</div>
			<div>Discord名: {discordId}</div>
			<div>授業日: 毎週{weekConverter(schedule.week, weeks)}</div>
			<div>
				授業時間: {schedule.hour}:{schedule.time}~
			</div>
		</div>
	)
}
export default MyStudentList

