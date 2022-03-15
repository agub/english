import React from 'react'
import classNames from 'classnames'
import { FiChevronRight } from 'react-icons/fi'
import weeks from '../data/weeks'

const StudentsWaitList = ({
	setState,
	text,
	type,
	result,
	time,
	consoleType,
	student,
	games,
	index,
}) => {
	const getPreferWeekValue = (originalArray, weeksData) =>
		originalArray
			.map((obj) => weeksData.find((week) => week.data === obj.week))
			.map((obj, index) => ({
				...obj,
				time: originalArray[index].time,
				rank: originalArray[index].rank,
			}))

	const getGameObject = (originalArray, gameData) =>
		originalArray.map((game) =>
			gameData.find((obj) => obj._id.toString() === game.toString())
		)

	return (
		<div
			className={classNames(`border-b bottom-1 p-2  rounded`, {
				'cursor-pointer hover:bg-gray-100': type === 'button',
				'': type === 'box',
			})}
			// className='border-b bottom-1 p-2 cursor-pointer hover:bg-gray-100 rounded'
			onClick={setState && setState}
		>
			<div>{index}, </div>
			<div>機種: {consoleType}</div>
			<div>
				時間:
				{student &&
					getPreferWeekValue(student.preferTime, weeks).map(
						(obj, index) => (
							<span key={index}>
								{obj.title} {obj.time}時 ~,
							</span>
						)
					)}
			</div>
			<div className='flex justify-between items-center'>
				<div>
					ゲーム: <br />
					<div className='px-3'>
						{student &&
							getGameObject(student.gameLists, games).map(
								(obj) => (
									<span key={obj._id}>{obj.title}, </span>
								)
							)}
					</div>
				</div>
				<div>
					{type === 'box' && result ? (
						result.slice(0, 20) + (result.length > 20 ? '...' : '')
					) : (
						<div className='flex items-center'>
							{result} &nbsp;
							<FiChevronRight />
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default StudentsWaitList
