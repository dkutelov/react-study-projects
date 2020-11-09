import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'
import { PageHeader, Banner } from '../utils'
import aboutImg from '../images/bcg/aboutBcg.jpeg'

const AboutPage = () => (
	<Layout>
		<SEO
			title="About my new restaurant"
			keywords={[
				`about`,
				`restaurant`,
				`open`
			]}
		/>
		<PageHeader img={aboutImg}>
			<Banner title="Our story" subtitle="Learn more about our chefs" />
		</PageHeader>
	</Layout>
)

export default AboutPage
