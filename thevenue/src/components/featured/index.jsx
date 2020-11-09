import React from 'react'
import HeaderSlider from './HeaderSlider'
import TimeUntill from './TimeUntill'

const Featured = () => {
	return (
		<div style={{ position: 'relative' }}>
			<HeaderSlider />
			<div className="artist_name">
				<div className="wrapper">Ariana Grande</div>
			</div>
			<TimeUntill />
		</div>
	)
}

export default Featured
