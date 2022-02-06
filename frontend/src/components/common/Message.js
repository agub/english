import React from 'react'
import classnames from 'classnames'

const Message = ({ variant, children }) => {
	const title =
		variant === 'danger' ? 'エラー' : variant === 'info' ? 'お知らせ' : ''

	return (
		<div role='alert'>
			{variant && (
				<>
					<div
						className={classnames(
							`text-white font-bold rounded-t px-4 py-2`,
							{
								'bg-red-500': variant === 'danger',
								'bg-green-500': variant === 'info',
							}
						)}
					>
						{title}
					</div>
					<div
						className={classnames(
							`border border-t-0 rounded-b px-4 py-3`,
							{
								'border-red-400 bg-red-100 text-red-600':
									variant === 'danger',
								'border-green-400 bg-green-100 text-green-600':
									variant === 'info',
							}
						)}
					>
						{children}
					</div>
				</>
			)}
		</div>
	)
}

export default Message
