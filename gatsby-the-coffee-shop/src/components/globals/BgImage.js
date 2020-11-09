import React from 'react'
import BackgroundImage from 'gatsby-background-image'

const BgImage = ({ img, styleClass, title, children }) => (
	<BackgroundImage className={styleClass} fluid={img}>
		<h1 className="title text-white text-uppercase text-center display-4 font-weight-bold title-background">
			{title}
		</h1>
		{children}
	</BackgroundImage>
)

BgImage.defaultProps = {
	title      : 'default title',
	styleClass : 'default-background'
}

export default BgImage
