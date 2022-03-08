import classNames from 'classnames'

export const SampleAnimation = (props) => {
	const animationClass = classNames({
		'transition-height duration-500 ease-in-out h-0': true,
		'h-20': props.hidden,
	})

	return <div className={animationClass}>aaaaassasa</div>
}
