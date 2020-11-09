import React, { Component } from 'react'
import Fade from 'react-reveal/Fade'
import Slide from 'react-reveal/Slide'
import MyButton from '../utils/MyButton'

export class Discount extends Component {
	state = {
		discountStart : 0,
		discountEnd   : 30
	}

	componentDidUpdate () {
		setTimeout(() => {
			this.porcentage()
		}, 30)
	}

	porcentage = () => {
		if (this.state.discountStart < this.state.discountEnd) {
			this.setState({ discountStart: this.state.discountStart + 1 })
		}
	}

	render () {
		return (
			<div className="center_wrapper">
				<div className="discount_wrapper">
					<Fade onReveal={() => this.porcentage()}>
						<div className="discount_porcentage">
							<span>{this.state.discountStart} %</span>
							<span>OFF</span>
						</div>
					</Fade>
					<Slide right>
						<div className="discount_description">
							<h3>Purchase tickets for 20th of June</h3>
							<p>
								Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing
								industries for previewing layouts and visual mockups. Lorem ipsum is placeholder text
								commonly used in the graphic, print, and publishing industries for previewing layouts
								and visual mockups.
							</p>
							<MyButton text="Purchase Ticket" bck="#ffa800" color="#ffffff" link="http://google.com" />
						</div>
					</Slide>
				</div>
			</div>
		)
	}
}

export default Discount
