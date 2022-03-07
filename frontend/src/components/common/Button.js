import React from 'react'
import classnames from 'classnames'

const Button = ({
	id,
	children,
	bgColor,
	textColor,
	hoverColor,
	type,
	disabled,
	size,
}) => {
	return (
		<button
			id={id}
			disabled={disabled ? disabled : null}
			className={classnames(
				`${bgColor}  disabled:bg-slate-700 hover:${hoverColor} font-bold flex justify-center items-center rounded focus:outline-none focus:shadow-outline shadow appearance-none`,
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
