import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import BgImage from '../components/globals/BgImage'
import Info from '../components/home/info'
import Menu from '../components/home/menu'
import Products from '../components/home/products'

const IndexPage = ({ data }) => (
	<Layout>
		<SEO
			title="Come here and have the best coffee in the world "
			keywords={[
				`coffee`,
				`Cafe`,
				`enjoy`
			]}
		/>
		<BgImage
			img={data.bgImage.childImageSharp.fluid}
			title="Taste our greate coffee"
			styleClass="default-background"
			description="Visit our store today and taste our great selection of coffees."
		/>
		<Info />
		<Menu coffeeItems={data.menu.edges} />
		<Products products={data.products.edges} />
	</Layout>
)

export const query = graphql`
	{
		bgImage: file(relativePath: { eq: "default-background.jpeg" }) {
			childImageSharp {
				fluid {
					...GatsbyImageSharpFluid_tracedSVG
				}
			}
		}
		menu: allContentfulCoffeeItem {
			edges {
				node {
					id
					title
					description {
						description
					}
					price
					category
					image {
						fixed(width: 50, height: 50) {
							...GatsbyContentfulFixed_tracedSVG
						}
					}
				}
			}
		}
		products: allContentfulCoffeeProduct {
			edges {
				node {
					id
					title
					price
					image {
						fluid(maxHeight: 426) {
							...GatsbyContentfulFluid_tracedSVG
							src
						}
					}
				}
			}
		}
	}
`

export default IndexPage
