import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Input, Button } from "../common"

const CommentsForm = styled.form`
  display: flex;
  margin-top: 32px;

  ${Input} {
    margin: auto 8px auto 0;
  }

  ${Button} {
    margin: auto 0;
  }
`

const CommentListItem = styled.div`
  > strong {
    font-size: 80%;
    color: #666;
  }

  border-bottom: 1px solid #ddd;
  padding: 4px 0;
`

const BookComments = ({ bookId, firebase }) => {
  const [comments, setComments] = useState([])
  useEffect(() => {
    const unsubscribe = firebase.subscribeToBookComments({
      bookId,
      onSnapshot: snapshot => {
        const snapshotComments = []
        // forEach is not the js foreach but specific to firebase
        snapshot.forEach(doc => {
          snapshotComments.push({
            id: doc.id,
            ...doc.data(),
          })
        })

        setComments(snapshotComments)
      },
    })

    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [bookId, firebase])

  return (
    <div>
      <CommentsForm>
        <Input />
        <Button>Post comment</Button>
      </CommentsForm>
      {comments.map(comment => (
        <CommentListItem key={comment.id}>
          <strong>{comment.username}</strong>
          <div>{comment.text}</div>
        </CommentListItem>
      ))}
    </div>
  )
}

export default BookComments
