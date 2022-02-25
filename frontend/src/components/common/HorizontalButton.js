import React from 'react'
import classnames from 'classnames'
import { FiChevronRight } from 'react-icons/fi'

const HorizontalButton = ({ setState, text, type, result }) => {
	return (
		<div
			className={classnames(`border-b bottom-1 p-2  rounded`, {
				'cursor-pointer hover:bg-gray-100': type === 'button',
				'': type === 'box',
			})}
			// className='border-b bottom-1 p-2 cursor-pointer hover:bg-gray-100 rounded'
			onClick={setState && setState}
		>
			<div className='flex justify-between items-center'>
				<div className='whitespace-nowrap'>{text}</div>
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

export default HorizontalButton
