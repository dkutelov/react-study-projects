import React, { Component } from 'react'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import MenuIcon from '@material-ui/icons/Menu'
import IconButton from '@material-ui/core/IconButton'

import SideDrawer from './SideDrawer'

export class Header extends Component {
	state = {
		openDrawer : false,
		showHeader : false
	}

	componentDidMount () {
		window.addEventListener('scroll', this.handleScroll)
	}

	componentWillUnmount () {
		window.removeEventListener('scroll', this.handleScroll)
	}

	handleScroll = () => {
		if (window.scrollY > 0) {
			this.setState({ showHeader: true })
		}
		else {
			this.setState({ showHeader: false })
		}
	}

	toggleDrawer = (value) => {
		this.setState({ openDrawer: value })
	}

	render () {
		return (
			<AppBar
				postion="fixed"
				style={{
					backgroundColor : this.state.showHeader ? '#2f2f2f' : 'transparent',
					boxShadow       : 'none',
					padding         : '10px 0'
				}}>
				<Toolbar>
					<div className="header_logo">
						<div className="font_righteous header_logo_venue">The Venue</div>
						<div className="header_logo_title">Musical Events</div>
					</div>

					<IconButton area-label="menu" color="inherit" onClick={() => this.toggleDrawer(true)}>
						<MenuIcon />
					</IconButton>

					<SideDrawer open={this.state.openDrawer} onClose={(value) => this.toggleDrawer(value)} />
				</Toolbar>
			</AppBar>
		)
	}
}

export default Header
