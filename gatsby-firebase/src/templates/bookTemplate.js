import React, { useContext } from "react"
import { graphql } from "gatsby"

import BookItem from "../components/BookItem"
import { BookComments } from "../components/common"
import { FirebaseContext } from "../components/firebase"

const BookTemplate = ({
  data: {
    book: { title, summary, author, localImage, id },
  },
}) => {
  const { firebase } = useContext(FirebaseContext)
  return (
    <section>
      <BookItem
        bookTitle={title}
        bookSummary={summary}
        bookAuthor={author.name}
        bookCover={localImage.childImageSharp.fixed}
      />
      {!!firebase && <BookComments firebase={firebase} bookId={id} />}
    </section>
  )
}

export const query = graphql`
  query bookQuery($bookId: String!) {
    book(id: { eq: $bookId }) {
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
`

export default BookTemplate
