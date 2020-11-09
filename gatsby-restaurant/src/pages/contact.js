import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'

import { PageHeader, Banner } from '../utils'
import contactImg from '../images/bcg/contactBcg.jpeg'

const ContactPage = () => (
	<Layout>
		<SEO
			title="Contact our new restaurant"
			keywords={[
				`restaurant`
			]}
		/>
		<PageHeader img={contactImg}>
			<Banner title="Contact" subtitle="Get in touch" />
		</PageHeader>
	</Layout>
)

export default ContactPage
