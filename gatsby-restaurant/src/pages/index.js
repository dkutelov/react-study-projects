import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Banner, BgImg, BannerButton } from "../utils"
import QuickInfo from "../components/home/QuickInfo"
import Gallery from "../components/home/Gallery"
//import img from '../images/bcg/homeBcg.jpeg'

const IndexPage = ({ data }) => (
  <Layout>
    <SEO
      title="My new restaurant just opened"
      keywords={[`restaurant`, `new`, `tasty food`]}
      description="Great new restaurant in town."
    />
    <BgImg
      fluid={data.bgImage.childImageSharp.fluid}
      height="calc(100vh - 55px)"
      mobileHeight="60vh"
      overlayColor="rgba(0, 0, 0, 0.3)"
    >
      <Banner title="eatery" subtitle="55 main street - Santa Monica, CA">
        <BannerButton style={{ margin: "2em auto" }}>Menu</BannerButton>
      </Banner>
    </BgImg>
    <QuickInfo />
    <Gallery />
  </Layout>
)

export const query = graphql`
  {
    bgImage: file(relativePath: { eq: "bcg/homeBcg.jpeg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
  }
`

export default IndexPage
