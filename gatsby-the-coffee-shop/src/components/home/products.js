import React from 'react'

import Title from '../globals/title'
import Product from './product'

const Products = ({ products }) => {
	return (
		<section className="products py-5">
			<div className="container">
				<Title title="our products" />
				<div className="row">{products.map(({ node }) => <Product key={node.id} product={node} />)}</div>
			</div>
		</section>
	)
}

export default Products
