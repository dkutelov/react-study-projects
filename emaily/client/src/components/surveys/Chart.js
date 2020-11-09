import React from 'react'
import { RadialChart } from 'react-vis'

const Chart = ({ myData }) => {
	return (
		<div>
			<RadialChart
				className="pie-chart"
				data={myData}
				width={250}
				height={250}
				showLabels={true}
			/>
		</div>
	)
}

export default Chart
