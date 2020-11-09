import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'

import { PageHeader, Banner } from '../utils'
import menuImg from '../images/bcg/menuBcg.jpeg'

const MenuPage = () => (
	<Layout>
		<SEO
			title="Check out our delicious menu"
			keywords={[
				`restaurant`,
				`menu`,
				`delicious`
			]}
		/>
		<PageHeader img={menuImg}>
			<Banner title="Menu" subtitle="Taste our decious dishes" />
		</PageHeader>
	</Layout>
)

export default MenuPage
