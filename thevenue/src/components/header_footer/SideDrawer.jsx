import React from 'react'
import { scroller } from 'react-scroll'

import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'

const SideDrawer = ({ open, onClose }) => {
	const scrollToElement = (element) => {
		scroller.scrollTo(element, {
			duration : 1500,
			delay    : 100,
			smooth   : true,
			offset   : -150
		})
		onClose()
	}

	return (
		<Drawer anchor="right" open={open} onClose={() => onClose(false)}>
			<List component="nav">
				<ListItem button onClick={() => scrollToElement('featured')}>
					Event starts in
				</ListItem>
				<ListItem button onClick={() => scrollToElement('venue')}>
					Venue NFO
				</ListItem>
				<ListItem button onClick={() => scrollToElement('highlights')}>
					Highlights
				</ListItem>
				<ListItem button onClick={() => scrollToElement('pricing')}>
					Pricing
				</ListItem>
				<ListItem button onClick={() => scrollToElement('location')}>
					Location
				</ListItem>
			</List>
		</Drawer>
	)
}

export default SideDrawer
