import React from 'react'
import Img from 'gatsby-image'
import styled from 'styled-components'
import img from '../images/bcg/homeBcg.jpeg'

// banner with gatsby background image and overlay
const Parrent = styled.div`
	position: relative;
	background-color: ${({ bc }) => bc};
`
const BgImage = styled(Img)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${({ height }) => height};
  z-index: -1;

  & > img {
    object-fit: cover !important;
    object-position: 0% 0% !important;
    font-family: "object-fit: cover !important;0% 0% !important;";
  }

  @media (max-width: 768px) {
    height: ${({ mobileHeight }) => mobileHeight};
  }
`
const Content = styled.div`
	position: absolute;
	top: 0;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`

function BgImg ({ fluid, height, mobileHeight, overlayColor, children, className }) {
	return (
		<Parrent bc={overlayColor}>
			<BgImage fluid={fluid} height={height} mobileHeight={mobileHeight} fix={true} />
			<Content className={className}>{children}</Content>
		</Parrent>
	)
}

// Fixed banners with img element
function HomeHeader ({ img, children }) {
	return <HomeHeaderStyled img={img}>{children}</HomeHeaderStyled>
}

function PageHeader ({ img, children }) {
	return <PageHeaderStyled img={img}>{children}</PageHeaderStyled>
}

const HomeHeaderStyled = styled.div`
	min-height: 50vh;
	background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${(props) => props.img}) fixed no-repeat;
	display: flex;
	justify-content: center;
	align-items: center;
	@media (min-width: 768px) {
		min-height: calc(100vh - 55px);
		background-position: center;
		background-size: cover;
		background-attachment: fixed;
	}
`
const PageHeaderStyled = styled(HomeHeaderStyled)`
  @media (min-width: 768px) {
    min-height: 60vh;
  }
`

HomeHeader.defaultProps = {
	img
}
PageHeader.defaultProps = {
	img
}

export { HomeHeader, PageHeader, BgImg }
