import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import * as actions from '../actions'
import { history } from './App.js'
import Payments from './Payments'

class Header extends Component {
	renderContent() {
		switch (this.props.auth) {
			case null:
				return 'Still deciding'
			case false:
				return [
					<li key="auth-google">
						<a href="auth/google">Login with Google</a>
					</li>,
					<li key="auth-facebook">
						<a href="auth/facebook">Login with Facebook</a>
					</li>
				]
			default:
				return [
					<li key="payments">
						<Payments />
					</li>,
					<li key="credits" style={{ margin: '0 10px' }}>
						Credits: {this.props.auth.credits}
					</li>,
					<li
						key="logout"
						style={{ cursor: 'pointer', margin: '0 10px 0 0' }}
						onClick={() => {
							this.props.logoutUser()
							history.push('/')
						}}>
						Logout
					</li>
				]
		}
	}
	render() {
		return (
			<nav>
				<div className="nav-wrapper">
					<Link
						to={this.props.auth ? '/surveys' : '/'}
						className="left brand-logo">
						Emaily
					</Link>
					<ul id="nav-mobile" className="right hide-on-med-and-down">
						{this.renderContent()}
					</ul>
				</div>
			</nav>
		)
	}
}

const mapStateToProps = ({ auth }) => ({ auth })

export default connect(mapStateToProps, actions)(Header)
