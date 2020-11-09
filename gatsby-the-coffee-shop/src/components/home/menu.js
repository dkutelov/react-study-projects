import React, { Component } from 'react'

import Title from '../globals/title'
import CoffeeItems from './coffeeItems'

class Menu extends Component {
	static reduceCategories (items) {
		return items.reduce(
			(acc, { node }, index) => {
				if (!acc.includes(node.category)) {
					acc = [
						...acc,
						node.category
					]
				}
				return acc
			},
			[
				'all'
			]
		)
	}

	state = {
		items       : this.props.coffeeItems,
		coffeeItems : this.props.coffeeItems,
		categories  : this.constructor.reduceCategories(this.props.coffeeItems)
	}

	handleCategoryFilter = (category) => {
		let coffeeItems = [
			...this.state.items
		]
		if (category !== 'all') {
			coffeeItems = coffeeItems.filter(({ node }) => node.category === category)
		}
		this.setState(() => ({
			coffeeItems
		}))
	}

	renderCategorySelectors = () => {
		const { categories } = this.state
		return categories.map((category) => (
			<button
				onClick={() => this.handleCategoryFilter(category)}
				key={category}
				className="btn text-uppercase btn-yellow m-1 m-md-3"
				aria-label={`filter to see only ${category}`}>
				{category}
			</button>
		))
	}

	render () {
		const { coffeeItems, items } = this.state

		return (
			<section className="menu py-5">
				<div className="container">
					<Title title="our menu" />
					<div className="row mb-5">
						<div className="col col-md-10 mx-auto text-center">{this.renderCategorySelectors()}</div>
					</div>

					<div className="row">
						{items.length > 0 ? (
							<CoffeeItems items={coffeeItems} />
						) : (
							<div className="col-10 col-sm-6 mx-auto text-center text-capitalize">
								<h1>There are no items to show</h1>
							</div>
						)}
					</div>
				</div>
			</section>
		)
	}
}

//const categories = Menu.reduceCategories()

export default Menu
