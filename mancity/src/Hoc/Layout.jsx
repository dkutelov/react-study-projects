import React from 'react'

import Header from '../Components/Header_footer/Header'
import Footer from '../Components/Header_footer/Footer'

const Layout = ({ children }) => {
	return (
		<div>
			<Header />
			{children}
			<Footer />
		</div>
	)
}

export default Layout
