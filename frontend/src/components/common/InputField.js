import React from 'react'

const InputField = ({ value, label, name, placeholder, type, onChange }) => (
	<>
		{label && (
			<label className='block text-gray-700 text-sm font-bold mb-2'>
				{label}
			</label>
		)}
		<input
			type={type}
			value={value}
			name={name}
			className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
			placeholder={placeholder}
			onChange={onChange}
		/>
	</>
)

export default InputField
