import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
//import { StaticQuery, graphql } from 'gatsby'

import './bootstrap.min.css'
import './layout.css'

import Navbar from './globals/Navbar'
import Footer from './globals/footer'

const Layout = ({ children }) => (
	<Fragment>
		<Navbar />
		{children}
		<Footer />
	</Fragment>
)

Layout.propTypes = {
	children : PropTypes.node.isRequired
}

export default Layout
