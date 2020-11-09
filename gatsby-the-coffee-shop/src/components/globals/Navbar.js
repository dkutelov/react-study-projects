import React, { Component } from 'react'
import { Link } from 'gatsby'

import { IoMdCart } from 'react-icons/io'
import logo from '../../images/logo.svg'

export default class Navbar extends Component {
	state = {
		navbarOpen    : false,
		navbarClasses : 'collapse navbar-collapse',
		links         : [
			{ id: 1, path: '/', text: 'home' },
			{ id: 2, path: '/about', text: 'about' },
			{ id: 3, path: '/contact', text: 'contact' }
		]
	}

	navbarHandler = () => {
		const { navbarOpen } = this.state

		navbarOpen
			? this.setState((prevState) => ({
					navbarOpen    : !prevState.navbarOpen,
					navbarClasses : 'collapse navbar-collapse'
				}))
			: this.setState((prevState) => ({
					navbarOpen    : !prevState.navbarOpen,
					navbarClasses : 'collapse navbar-collapse show'
				}))
	}
	render () {
		const { links, navbarClasses } = this.state
		return (
			<nav className="navbar navbar-expand-sm bg-light navbar-light">
				<Link to="/" className="navbar-brand d-block ml-md-2">
					<img className="mr-2" width="30px" src={logo} alt="The coffee shop logo" />
					The Coffee Shop Company
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					onClick={this.navbarHandler}
					aria-label="link to mobile menu">
					<span className="navbar-toggler-icon" />
				</button>
				<div className={navbarClasses}>
					<ul className="navbar-nav ml-auto mr-md-2">
						{links.map((link) => (
							<li className="nav-item" key={link.id}>
								<Link className="nav-link text-capitalize px-3" to={link.path}>
									{link.text}
								</Link>
							</li>
						))}
					</ul>
				</div>
				<div className="ml-sm-2 mr-md-2 cart-icon-wrapper">
					<IoMdCart className="cart-icon snipcart-checkout" />
				</div>
			</nav>
		)
	}
}
