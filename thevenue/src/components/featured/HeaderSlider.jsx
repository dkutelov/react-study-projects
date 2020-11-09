import React, { Component } from 'react'
import Slider from 'react-slick'

import slide_one from '../../resources/images/slide_one.jpg'
import slide_two from '../../resources/images/slide_two.jpg'
import slide_three from '../../resources/images/slide_three.jpg'

class HeaderSlider extends Component {
	renderSlides = () => {
		const imagePaths = [
			slide_one,
			slide_two,
			slide_three
		]

		return imagePaths.map((imagePath, index) => (
			<div key={index}>
				<div
					className="carrousel_image"
					style={{ background: `url(${imagePath})`, height: `${window.innerHeight}px` }}
				/>
			</div>
		))
	}

	render () {
		const settings = {
			dots     : false,
			infinite : true,
			autoplay : true,
			speed    : 1000
		}
		return (
			<div className="carrousel_wrapper" style={{ overflow: 'hidden', height: `${window.innerHeight}px` }}>
				<Slider {...settings}>{this.renderSlides()}</Slider>
			</div>
		)
	}
}

export default HeaderSlider
