import React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"

import SEO from "../components/seo"
import BookItem from "../components/BookItem"

const LinkButton = styled.div`
  text-align: right;
  a {
    padding: 8px;
    background: rebeccapurple;
    color: white;
    border-radius: 8px;
    text-decoration: none;

    &:hover {
      background: indigo;
    }
  }
`

const IndexPage = ({
  data: {
    myAllBooks: { edges: books },
  },
}) => {
  return (
    <section>
      <SEO title="Home" />
      {books.map(({ node: { id, title, author, summary, localImage } }) => (
        <BookItem
          key={id}
          bookTitle={title}
          bookSummary={summary}
          bookAuthor={author.name}
          bookCover={localImage.childImageSharp.fixed}
        >
          <LinkButton>
            <Link to={`/book/${id}`}>Join conversation</Link>
          </LinkButton>
        </BookItem>
      ))}
    </section>
  )
}

export const query = graphql`
  {
    myAllBooks: allBook {
      edges {
        node {
          id
          summary
          title
          localImage {
            childImageSharp {
              fixed(width: 200) {
                ...GatsbyImageSharpFixed
              }
            }
          }
          author {
            name
            id
          }
        }
      }
    }
  }
`

export default IndexPage
