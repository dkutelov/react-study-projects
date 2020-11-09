const dotenv = require('dotenv')

if (process.env.NODE_ENV !== 'production') {
	dotenv.config()
}

module.exports = {
	siteMetadata : {
		title       : `The Coffee Shop Company`,
		description : `Our  website is about our coffee shop called The Coffee Shop Company.`,
		author      : `Dariy`
	},
	plugins      : [
		`gatsby-plugin-react-helmet`,
		{
			resolve : `gatsby-source-filesystem`,
			options : {
				name : `images`,
				path : `${__dirname}/src/images`
			}
		},
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
		{
			resolve : `gatsby-plugin-manifest`,
			options : {
				name             : `The Coffee Shop Company`,
				short_name       : `coffeeshop`,
				start_url        : `/`,
				background_color : `#663399`,
				theme_color      : `#663399`,
				display          : `minimal-ui`,
				icon             : `src/images/logo.svg` // This path is relative to the root of the site.
			}
		},
		`gatsby-plugin-offline`, // To learn more, visit: https://gatsby.dev/offline // this (optional) plugin enables Progressive Web App + Offline functionality
		{
			resolve : `gatsby-plugin-prefetch-google-fonts`,
			options : {
				fonts : [
					{
						family   : `Roboto`,
						subsets  : [
							`latin`,
							`cyrillic`
						],
						variants : [
							`300`,
							`400`,
							`900`
						]
					},
					{
						family   : `Lato`,
						variants : [
							`300`,
							`400`,
							`900`
						]
					}
				]
			}
		},
		{
			resolve : 'gatsby-source-contentful',
			options : {
				spaceId     : process.env.CONTENFUL_SPACE_ID,
				accessToken : process.env.CONTENFUL_ACCESS_TOKEN
			}
		},
		{
			resolve : 'gatsby-plugin-snipcart',
			options : {
				apiKey  : process.env.SNIPCART_KEY,
				autopop : true
			}
		}
	]
}
