import React from 'react'
import BackButton from './common/BackButton'
import Button from './common/Button'
import InputField from './common/InputField'

const ChangeDiscordId = ({
	component,
	discordIdValue,
	discordIdSetter,
	submitHandler,
	user,
}) => {
	return (
		<>
			<BackButton onClick={component} />
			<h1 className='text-center'>Discordの名前変更</h1>

			<div className='mb-4'>
				<InputField
					type='text'
					value={discordIdValue}
					placeholder={user.info.discordId}
					label='新しいDiscordのアカウント名'
					name='discordId'
					onChange={discordIdSetter}
				/>
			</div>
			<div className='flex items-center justify-between'>
				<Button
					onClick={submitHandler}
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

export default ChangeDiscordId