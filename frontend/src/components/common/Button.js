import React from 'react'

const Button = ({ children, bgColor, textColor }) => {
	return (
		<button
			className={`w-64 h-16 flex justify-center items-center rounded ${bgColor}`}
		>
			<h3 className={`text-center ${textColor}`}>{children}</h3>
		</button>
	)
}

export default Button
