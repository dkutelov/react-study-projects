import React from 'react'
import styled from 'styled-components'

import { styles } from '../utils'
const { colors, letterSpacing, textSlanted } = styles

export default function Title ({ title, subtitle }) {
	return (
		<TittleWrapper>
			<h3 className="subtitle">{subtitle}</h3>
			<h1 className="title">{title}</h1>
			<div className="underline" />
		</TittleWrapper>
	)
}

Title.defaultProps = {
	title    : 'Section Title',
	subtitle : 'Section Subtitle'
}

const TittleWrapper = styled.div`
	text-align: center;
	.subtitle {
		${textSlanted};
		${letterSpacing({ spacing: '0.3em' })};
		font-size: 2rem;
		color: ${colors.mainYellow};
	}
	.title {
		${letterSpacing({ spacing: '0.3em' })};
		font-size: 2rem;
		text-transform: uppercase;
	}
	.underline {
		width: 5em;
		height: 0.2em;
		background: ${colors.mainYellow};
		margin: 0.5em auto;
	}
`
