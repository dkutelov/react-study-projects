import React from 'react'
import Img from 'gatsby-image'

function renderImage (image) {
	if (image) {
		return <Img fixed={image.fixed} />
	}
	else {
		return 'no image'
	}
}

const CoffeeItems = ({ items }) => {
	return items.map(({ node }) => (
		<div className="col-11 col-md-6 my-3 d-flex mx-auto" key={node.id}>
			<div>{renderImage(node.image)}</div>
			<div className="flex-grow-1 px-3">
				<div className="d-flex justify-content-between">
					<h6 className="mb-0">{node.title}</h6>
					<h6 className="mb-0 text-yellow">${node.price}</h6>
				</div>
				<p className="text-muted">
					<small>{node.description.description}</small>
				</p>
			</div>
		</div>
	))
}

export default CoffeeItems
