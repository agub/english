import classNames from 'classnames'
import React, { useEffect } from 'react'
import { FiChevronRight } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import Container from '../components/common/Container'
import FormContainer from '../components/common/FormContainer'
import { listWaitLists } from '../redux/actions/userActions'

const SeekerListsScreen = () => {
	const StudentsLists = ({
		setState,
		text,
		type,
		result,
		time,
		consoleType,
	}) => {
		return (
			<div
				className={classNames(`border-b bottom-1 p-2  rounded`, {
					'cursor-pointer hover:bg-gray-100': type === 'button',
					'': type === 'box',
				})}
				// className='border-b bottom-1 p-2 cursor-pointer hover:bg-gray-100 rounded'
				onClick={setState && setState}
			>
				<div className='whitespace-nowrap'>1,</div>

				<div className='whitespace-nowrap'>経験度: {text}</div>
				<div className='whitespace-nowrap'>機種: {consoleType}</div>

				<div className='flex justify-between items-center'>
					<div className='whitespace-nowrap'>時間: {time}</div>
					<div>
						{type === 'box' && result ? (
							result.slice(0, 20) +
							(result.length > 20 ? '...' : '')
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
	const dispatch = useDispatch()
	const { students } = useSelector((state) => state.userWaitLists)
	console.log(students)

	useEffect(() => {
		dispatch(listWaitLists())
	}, [dispatch])
	return (
		<Container>
			<FormContainer>
				<StudentsLists
					text='英語が少し話せる'
					type='button'
					time='木曜日 10pm ~, 金曜日 10pm ~'
					consoleType='Nintendo Switch'
				/>
			</FormContainer>
		</Container>
	)
}

export default SeekerListsScreen
