import React from 'react'
import Button from './common/Button'
import InputField from './common/InputField'

const ChangePassword = ({
	passwordValue,
	passwordSetter,
	newPasswordValue,
	newPasswordSetter,
	confirmPasswordValue,
	confirmPasswordSetter,
	component,
	submitHandler,
}) => {
	return (
		<>
			<button
				onClick={component}
				className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800'
			>
				戻る
			</button>
			<h1 className='text-center'>パスワードを変更</h1>
			<div className='mb-4'>
				<InputField
					type='password'
					value={passwordValue}
					placeholder='現在のパスワード'
					label='現在のパスワード'
					name='password'
					onChange={passwordSetter}
				/>
			</div>
			<div className='mb-4'>
				<InputField
					type='password'
					value={newPasswordValue}
					placeholder='新しいパスワード'
					label='新しいパスワード'
					name='newPassword'
					onChange={newPasswordSetter}
				/>
			</div>
			<div className='mb-4'>
				<InputField
					type='password'
					value={confirmPasswordValue}
					placeholder='新しい確認パスワード'
					label='新しい確認パスワード'
					name='confirmPassword'
					onChange={confirmPasswordSetter}
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

export default ChangePassword
