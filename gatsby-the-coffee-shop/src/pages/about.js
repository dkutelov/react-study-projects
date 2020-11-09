import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import BgImage from '../components/globals/BgImage'
import Content from '../components/about/content'

const AboutPage = ({ data }) => (
	<Layout>
		<SEO
			title="Learn more about our story "
			keywords={[
				`coffee`,
				`Cafe`,
				`enjoy`,
				`about us`
			]}
		/>
		<BgImage img={data.bgImage.childImageSharp.fluid} title="Our story" styleClass="about-background" />
		<Content />
	</Layout>
)

export const query = graphql`
	{
		bgImage: file(relativePath: { eq: "about-background.jpeg" }) {
			childImageSharp {
				fluid {
					...GatsbyImageSharpFluid_tracedSVG
				}
			}
		}
	}
`

export default AboutPage
