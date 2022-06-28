import classNames from 'classnames'
import moment from 'moment'
import { FiChevronRight } from 'react-icons/fi'
const Evaluation = ({ evaluation, type }) => {
	return (
		<div
			className={classNames(`border-b bottom-1 p-2  rounded`, {
				'cursor-pointer hover:bg-gray-100': type === 'button',
				'': type === 'box',
			})}
			// className='border-b bottom-1 p-2 cursor-pointer hover:bg-gray-100 rounded'
		>
			<div className='flex justify-between items-center'>
				<div>{moment(evaluation.createdAt).format('YYYY, MMMM')}</div>
				<FiChevronRight />
			</div>
		</div>
	)
}
export default Evaluation

