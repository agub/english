import React from 'react'
import { useState } from 'react'
import { css } from '@emotion/react'
import FadeLoader from 'react-spinners/FadeLoader'

const override = css`
	display: block;
	width: '100px';
	height: '100px';
	margin: 0 auto;
`

const Loader = () => {
	const [loading, setLoading] = useState(true)
	const [color, setColor] = useState('#00000')

	return (
		<div className='sweet-loading'>
			<FadeLoader loading={loading} css={override} size={150} />
		</div>
	)
}

export default Loader
