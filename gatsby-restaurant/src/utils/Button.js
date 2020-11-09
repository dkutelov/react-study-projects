import styled from 'styled-components'

import { styles } from '../utils'
const { colors, border, transition } = styles

const BannerButton = styled.button`
	display: block;
	color: ${colors.mainWhite};
	background: transparent;
	padding: 0.5em 1em;
	text-transform: uppercase;
	font-size: 1.5rem;
	letter-spacing: 0.5em;
	font-weight: 700;
	${border({ color: colors.mainWhite })};
	margin-bottom: 1em;
	${transition({})};
	&:hover {
		background: ${colors.mainWhite};
		color: ${colors.mainBlack};
		cursor: pointer;
	}
`
const SectionButton = styled(BannerButton)`
  color: ${colors.mainBlack};
  ${styles.border({ color: `${styles.colors.mainBlack}` })};
  &:hover {
    background: ${styles.colors.mainBlack};
	color: ${styles.colors.mainYellow};
  }
`

export { BannerButton, SectionButton }
