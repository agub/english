import React from 'react'
import { BsX } from 'react-icons/bs'

const Calender = () => {
	return (
		<>
			<p className='mt-4'>授業予定日</p>
			<table className='w-full'>
				<thead className='bg-gray-50 border'>
					<tr>
						<th className='text-sm font-light w-/7'>MON</th>
						<th className='text-sm font-light w-/7'>TUE</th>
						<th className='text-sm font-light w-/7'>WED</th>
						<th className='text-sm font-light w-/7'>THU</th>
						<th className='text-sm font-light w-/7'>FRI</th>
						<th className='text-sm font-light w-/7'>SAT</th>
						<th className='text-sm font-light w-/7'>SUN</th>
					</tr>
				</thead>
				<tbody className='h-5'>
					<tr className='border'>
						<td className='border'>
							<div className='flex justify-center items-center'>
								<BsX />
							</div>
						</td>
						<td className='border'>
							<div className='flex justify-center items-center'>
								<BsX />
							</div>
						</td>
						<td className='border'>
							<div className='flex justify-center items-center'>
								<BsX />
							</div>
						</td>
						<td className='border'>
							<div className='flex justify-center items-center'>
								<BsX />
							</div>
						</td>
						<td className='border'>
							<div className='flex justify-center items-center'>
								<BsX />
							</div>
						</td>

						<td className='flex justify-center py-1'>
							<div className='flex row-auto justify-center items-center'>
								<div className='bg-sky-200 rounded-full h-10 w-10'></div>
								<div>
									<div className='text-xs text-center'>
										19pm~20pm
									</div>
									<div className='text-xs text-center'>
										Teacher Name
									</div>
								</div>
							</div>
						</td>
						<td className='border'>
							<div className='flex justify-center items-center'>
								<BsX />
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</>
	)
}

export default Calender
