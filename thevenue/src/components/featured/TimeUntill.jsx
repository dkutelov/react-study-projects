import React, { Component } from 'react'
import Slide from 'react-reveal/Slide'

const countdown_elements = [
	{
		label : 'days',
		tag   : 'days'
	},
	{
		label : 'hours',
		tag   : 'HS'
	},
	{
		label : 'minutes',
		tag   : 'min'
	},
	{
		label : 'seconds',
		tag   : 'sec'
	}
]

export class TimeUntill extends Component {
	state = {
		deadline : 'Oct, 16,2018',
		days     : '0',
		hours    : '0',
		minutes  : '0',
		seconds  : '0'
	}

	componentDidMount () {
		setInterval(() => this.getTimeUntill(this.state.deadline), 1000)
	}

	getTimeUntill (deadline) {
		const time = Date.parse(deadline) - Date.parse(new Date())
		if (time < 0) {
		}
		else {
			const seconds = Math.floor((time / 1000) % 60)
			const minutes = Math.floor((time / 1000 / 60) % 60)
			const hours = Math.floor((time / (1000 * 60 * 60)) % 24)
			const days = Math.floor(time / (1000 * 60 * 60 * 24))
			this.setState({ days, hours, minutes, seconds })
		}
	}

	renderCountdownElement = () => {
		return countdown_elements.map((element) => {
			return (
				<div key={element.tag} className="countdown_item">
					<div className="countdown_time">{this.state[`${element.label}`]}</div>
					<div className="countdown_tag">{element.tag}</div>
				</div>
			)
		})
	}

	render () {
		return (
			<Slide left delay={1000}>
				<div className="countdown_wrapper">
					<div className="countdown_top">Event starts in</div>
					<div className="countdown_bottom">{this.renderCountdownElement()}</div>
				</div>
			</Slide>
		)
	}
}

export default TimeUntill
