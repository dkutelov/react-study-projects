import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import { Section, Title, SectionButton } from '../../utils'
import { styles } from '../../utils'

export default function QuickInfo () {
	return (
		<Section>
			<Title title="our mission" subtitle="let us tell you" />
			<QuickInfoWrapper>
				<p className="text">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni doloribus enim at veniam omnis nihil
					vitae a voluptatum earum nisi, aliquid quo eos provident ullam ex rem, illum sunt quaerat. Lorem
					ipsum dolor sit amet consectetur adipisicing elit. Magni doloribus enim at veniam omnis nihil vitae
					a voluptatum earum nisi, aliquid quo eos provident ullam ex rem, illum sunt quaerat.
				</p>
			</QuickInfoWrapper>
			<Link to="/about/" style={{ textDecoration: 'none' }}>
				<SectionButton style={{ margin: '2rem auto' }}>About</SectionButton>
			</Link>
		</Section>
	)
}

const QuickInfoWrapper = styled.div`
	width: 90%;
	margin: 2rem auto;
	.text {
		line-height: 2rem;
		color: ${styles.colors.mainGrey};
		word-spacing: 0.2rem;
	}
	@media (min-width: 769px) {
		width: 70%;
	}
	@media (min-width: 992px) {
		width: 60%;
	}
`
