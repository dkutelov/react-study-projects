import styled from "styled-components"

export const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 380px;

  form {
    position: relative;
  }
`

export const SignUpTitle = styled.h2`
  margin: 10px 0;
`

export const SmallSpinner = styled.div`
  position: absolute;
  top: 145px;
  right: 0;
  width: 20px;
  height: 20px;
  border: 2px solid rgba(195, 195, 195, 0.6);
  border-radius: 50%;
  border-top-color: #636767;
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
  @keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
`

export const SuccessMark = styled.span`
  color: green;
  position: absolute;
  top: 145px;
  right: 0;
`

export const TakenMark = styled.span`
  color: red;
  position: absolute;
  top: 145px;
  right: 0;
`
