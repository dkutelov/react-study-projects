import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import { FaAlignRight } from 'react-icons/fa'

import { styles } from '../../../utils'
import logo from '../../../images/logo.svg'

export default function NavbarHeader ({ toggleNavbar }) {
	return (
		<HeaderWrapper>
			<Link to="/">
				<img src={logo} alt="site logo" />
			</Link>
			<FaAlignRight className="toggle-icon" onClick={toggleNavbar} />
		</HeaderWrapper>
	)
}

const HeaderWrapper = styled.div`
	padding: 0.4rem 1rem;
	display: flex;
	align-items: center;
	justify-content: space-between;

	.toggle-icon {
		font-size: 1.75rem;
		color: ${styles.colors.mainYellow};
		cursor: pointer;
	}
	@media (min-width: 768px) {
		.toggle-icon {
			display: none;
		}
	}
`
