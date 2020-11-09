import styled from "styled-components"

const success = {
  color: "#155724",
  background: "#d4edda",
  border: "#c3e6cb"
}

const error = {
  color: "#721c24",
  background: "#f8d7da",
  border: "#f5c6cb"
}

const getColor = type =>
  type === "success" ? success.color : type === "error" ? error.color : `black`

const getBackgroundColor = type =>
  type === "success"
    ? success.background
    : type === "error"
    ? error.background
    : `black`

const getBorderColor = type =>
  type === "success"
    ? success.background
    : type === "error"
    ? error.background
    : `black`

export const NotificationContainer = styled.div`
  position: fixed;
  bottom: 50px;
  left: 16px;
  right: 16px;
  color: ${props => getColor(props.type)};
  background: ${props => getBackgroundColor(props.type)};
  padding: 0.75rem 1.25rem;
  border: 1px solid ${props => getBorderColor(props.type)};
  border-radius: 0.25rem;
  animation: ${({ show }) => (show ? `fadein` : `fadeout`)} 2s;
  animation-fill-mode: forwards;

  @media only screen and (min-width: 768px) {
    left: auto;
    right: 50px;
  }

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes fadeout {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`

export const NotificationTitle = styled.h4`
  color: inherit;
  text-align: center;
  font-size: 1.5rem;
  margin-top: 0;
  margin-bottom: 0.5rem;
  line-height: 1.2;
`
