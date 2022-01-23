import React from 'react'

const Tabs = ({ color }) => {
	const [openTab, setOpenTab] = React.useState(1)
	return (
		<>
			<div className='flex flex-wrap border-solid border rounded'>
				<div className='w-full'>
					<ul
						className='flex mb-0 list-none flex-wrap  flex-row'
						role='tablist'
					>
						<li className='-mb-px w-1/3 last:mr-0 flex-auto text-center border-r border-solid'>
							<a
								className={
									'text-xs font-bold uppercase  py-3  rounded block leading-normal ' +
									(openTab === 1
										? 'text-white bg-gray-600'
										: 'text-' + color + '-600 bg-white')
								}
								onClick={(e) => {
									e.preventDefault()
									setOpenTab(1)
								}}
								data-toggle='tab'
								href='#link1'
								role='tablist'
							>
								トライアル
							</a>
						</li>
						<li className='-mb-px w-1/3 last:mr-0 flex-auto text-center'>
							<a
								className={
									'text-xs font-bold uppercase py-3 rounded block leading-normal ' +
									(openTab === 2
										? 'text-white bg-gray-600'
										: 'text-' + color + '-600 bg-white')
								}
								onClick={(e) => {
									e.preventDefault()
									setOpenTab(2)
								}}
								data-toggle='tab'
								href='#link2'
								role='tablist'
							>
								Plan B
							</a>
						</li>
						<li className='-mb-px w-1/3 last:mr-0 flex-auto text-center border-l border-solid'>
							<a
								className={
									'text-xs font-bold uppercase py-3  rounded block leading-normal ' +
									(openTab === 3
										? 'text-white bg-gray-600'
										: 'text-' + color + '-600 bg-white')
								}
								onClick={(e) => {
									e.preventDefault()
									setOpenTab(3)
								}}
								data-toggle='tab'
								href='#link3'
								role='tablist'
							>
								Plan C
							</a>
						</li>
					</ul>
					<div className='relative flex flex-col min-w-0 break-words bg-white w-full mb-6 border-t'>
						<div className='px-4 py-5 flex-auto'>
							<div className='tab-content tab-space'>
								<div
									className={
										openTab === 1 ? 'block' : 'hidden'
									}
									id='link1'
								>
									<p>Trial plan only works for *****</p>
								</div>
								<div
									className={
										openTab === 2 ? 'block' : 'hidden'
									}
									id='link2'
								>
									<p>Standard plan. class is once per week</p>
								</div>
								<div
									className={
										openTab === 3 ? 'block' : 'hidden'
									}
									id='link3'
								>
									<p>For the details, contact us.</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
const PricePlans = () => {
	return <Tabs color='blueGray' />
}

export default PricePlans
