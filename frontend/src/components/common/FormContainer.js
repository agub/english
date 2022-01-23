import React from 'react'

const FormContainer = ({ children, onSubmit }) => {
	return (
		<div className='w-full max-w-lg m-auto'>
			<form
				onSubmit={onSubmit}
				className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
			>
				{children}
			</form>
		</div>
	)
}

export default FormContainer
