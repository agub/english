import React from 'react'

const Button = ({ children, bgColor, textColor, hoverColor, type, size }) => {
	let buttonSize =
		size === 'sm' ? 'py-2 px-4' : size === 'md' ? 'py-3 px-6' : 'py-6 px-8'
	return (
		<button
			className={`${bgColor} hover:${hoverColor} ${buttonSize} font-bold flex justify-center items-center rounded focus:outline-none focus:shadow-outline shadow appearance-none`}
			type={type}
		>
			<h3 className={`text-center text-md ${textColor}`}>{children}</h3>
		</button>
	)
}

export default Button
