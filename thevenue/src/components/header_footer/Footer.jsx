import React from 'react'
import Button from '@material-ui/core/Button'
import Fade from 'react-reveal/Fade'
import { animateScroll as scroll } from 'react-scroll'

const Footer = () => {
	return (
		<footer className="bck_red">
			<Fade delay={500}>
				<div className="font_righteous footer_logo_venue">The Venue</div>
				<div className="footer_copyright">The venue. All rights reserved</div>
			</Fade>
			<div>
				<Button
					variant="contained"
					size="small"
					style={{
						background : '#333333',
						color      : '#ffffff'
					}}
					onClick={() =>
						scroll.scrollToTop({
							duration : 750,
							delay    : 100,
							smooth   : true,
							offset   : 0
						})}>
					Back to top
				</Button>
			</div>
		</footer>
	)
}

export default Footer
