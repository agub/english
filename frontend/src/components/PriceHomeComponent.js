import React from 'react'
import PricePlans from './PricePlans'

const PriceHomeComponent = () => {
	return (
		<div className='grid grid-cols-12'>
			<div className='md:col-span-7  col-span-12'>
				<div>title</div>

				<div className='col-span-5  md:hidden'>
					<PricePlans />
				</div>
				<div>
					description
					<br />
					description
					<br />
					description
					<br />
					description
					<br />
					description
					<br />
					description
					<br />
					description
				</div>
			</div>
			<div className='col-span-5  hidden md:block'>
				<PricePlans />
			</div>
		</div>
	)
}

export default PriceHomeComponent
