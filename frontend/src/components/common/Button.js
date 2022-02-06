import React from 'react'
import classnames from 'classnames'

const Button = ({ children, bgColor, textColor, hoverColor, type, size }) => {
	return (
		<button
			className={classnames(
				`${bgColor} hover:${hoverColor} font-bold flex justify-center items-center rounded focus:outline-none focus:shadow-outline shadow appearance-none`,
				{
					'py-2 px-4': size === 'sm',
					'py-3 px-6': size === 'md',
				}
			)}
			type={type}
		>
			<h3 className={`text-center text-md ${textColor}`}>{children}</h3>
		</button>
	)
}

export default Button
