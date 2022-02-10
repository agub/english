import React from 'react'
import classnames from 'classnames'

const InputField = ({
	value,
	label,
	name,
	placeholder,
	type,
	onChange,
	max,
	size,
}) => (
	<>
		{label && (
			<label className='block text-gray-700 text-sm font-bold mb-2'>
				{label}
			</label>
		)}
		<input
			max={max}
			required
			type={type}
			value={value}
			name={name}
			// className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
			className={classnames(
				`shadow appearance-none border rounded ${
					!size ? 'w-full' : 'w-1/3'
				} py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`
			)}
			placeholder={placeholder}
			onChange={onChange}
		/>
	</>
)

export default InputField
