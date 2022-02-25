import React from 'react'
import BackButton from './common/BackButton'
import Button from './common/Button'
import InputField from './common/InputField'

const ChangeMatchStatus = ({
	component,
	currentState,
	discordIdValue,
	discordIdSetter,
	submitHandler,
	user,
}) => {
	const match = currentState === true && true
	const unMatch = currentState === true && false
	return (
		<>
			<BackButton onClick={component} />
			<div className='mb-6 flex items-start flex-col'>
				<label className='block text-gray-700 text-sm font-bold mb-2'>
					現ステイタス : {currentState ? '済み' : '未定'}
				</label>
				<div>
					<input
						required
						name='experience'
						disabled={unMatch}
						type='radio'
					/>
					<label>未定</label>
				</div>
				<div>
					<input
						required
						name='experience'
						disabled={match}
						type='radio'
					/>
					<label>マッチ済み</label>
				</div>
			</div>
			<div className='flex items-center justify-between'>
				<Button
					// onClick={submitHandler}
					type='submit'
					bgColor='bg-blue-500'
					textColor='text-white'
					hoverColor='bg-blue-700'
					size='sm'
				>
					変更を保存
				</Button>
			</div>
		</>
	)
}

export default ChangeMatchStatus
