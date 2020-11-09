import React from "react"
import styled from "styled-components"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import { styles, Section } from "../../utils"

// sort ?
// get file name
const imageText = {
  "img-1.jpeg": "awesome prizza",
  "img-2.jpeg": "awesome pork",
  "img-3.jpeg": "awesome steak",
}
const query = graphql`
  query {
    getImages: allFile(filter: { relativeDirectory: { eq: "homeGallery" } }) {
      edges {
        node {
          childImageSharp {
            fluid(maxWidth: 500) {
              originalName
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
      }
    }
  }
`

export default function Gallery() {
  return (
    <StaticQuery
      query={query}
      render={data => {
        const images = data.getImages.edges
        return (
          <Section>
            <GalleryWrapper>
              {images.map(({ node }, index) => {
                console.log(node)

                return (
                  <div className={`item item-${index + 1}`} key={index}>
                    <Img fluid={node.childImageSharp.fluid} />
                    <p className="info">
                      {imageText[node.childImageSharp.fluid.originalName]}
                    </p>
                  </div>
                )
              })}
            </GalleryWrapper>
          </Section>
        )
      }}
    />
  )
}

const GalleryWrapper = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-row-gap: 1rem;
  .item {
    position: relative;
  }
  .info {
    position: absolute;
    top: 0;
    left: 0;
    background: ${styles.colors.mainYellow};
    padding: 0.3rem 0.9rem;
    text-transform: capitalize;
    border-bottom-right-radius: 15px;
  }
  @media (min-width: 576px) {
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 1rem;
  }
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 1rem;
  }
  @media (min-width: 992px) {
    .gatsby-image-wrapper {
      height: 100%;
    }
    grid-template-areas:
      "one one two two"
      "one  one three three";
    .item-1 {
      grid-area: one;
    }
    .item-2 {
      grid-area: two;
    }
    .item-3 {
      grid-area: three;
    }
  }
`
