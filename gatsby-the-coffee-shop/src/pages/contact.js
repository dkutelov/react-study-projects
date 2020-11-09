import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import BgImage from '../components/globals/BgImage'
import Contact from '../components/contact'

const AboutPage = ({ data }) => (
	<Layout>
		<SEO
			title="Contact us"
			keywords={[
				`coffee`,
				`Cafe`,
				`enjoy`,
				`contact`
			]}
			description="Use this page to get in contact with us. Looking forward to your inquiries."
		/>
		<BgImage img={data.bgImage.childImageSharp.fluid} title="Contact us" styleClass="about-background" />
		<div className="contact">
			<Contact />
		</div>
	</Layout>
)

export const query = graphql`
	{
		bgImage: file(relativePath: { eq: "contact-background.jpg" }) {
			childImageSharp {
				fluid {
					...GatsbyImageSharpFluid_tracedSVG
				}
			}
		}
	}
`

export default AboutPage
