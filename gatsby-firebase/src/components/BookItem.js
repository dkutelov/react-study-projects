import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"
const BookItemImageContainer = styled.div`
  max-width: 200px;
  img {
    max-width: 200px;
  }
`
const BookItemContentContainer = styled.div`
  flex-grow: 1;
  padding-left: 8px;
`

const BookItemContainer = styled.section`
  border: 1px solid #ddd;
  padding: 8px;
  background: white;
  margin-bottom: 8px;
  display: flex;
  h2 {
    small {
      font-size: 14px;
      padding-left: 8px;
      font-weight: normal;
    }
  }
`

const BookItem = ({
  bookTitle,
  bookSummary,
  bookAuthor,
  children,
  bookCover,
}) => (
  <BookItemContainer>
    <BookItemImageContainer>
      <Img fixed={bookCover} alt={`book cover of ${bookTitle}`} />
    </BookItemImageContainer>
    <BookItemContentContainer>
      <h2>
        {bookTitle}
        <small>{bookAuthor}</small>
      </h2>
      <p>{bookSummary}</p>
      {children}
    </BookItemContentContainer>
  </BookItemContainer>
)

export default BookItem
