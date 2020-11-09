import React, { Component } from 'react'
import { ThemeProvider, injectGlobal } from 'styled-components'

import Meta from '../Meta'
import Header from '../header'
import { StyledPage, Inner, theme } from './styles'

class Page extends Component {
	render () {
		return (
			<ThemeProvider theme={theme}>
				<StyledPage>
					<Meta />
					<Header />
					<Inner>{this.props.children}</Inner>
				</StyledPage>
			</ThemeProvider>
		)
	}
}

export default Page
