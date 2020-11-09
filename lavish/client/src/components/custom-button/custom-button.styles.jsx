import styled, { css } from "styled-components"
import { CollectionItemContainer } from "../collection-item/collection-item.styles"

const buttonStyles = css`
  background-color: black;
  color: white;
  border: none;
  &:hover {
    background-color: white;
    color: black;
    border: 1px solid black;
  }
`

const inverted = css`
  background-color: white;
  color: black;
  border: 1px solid black;
  &:hover {
    background-color: black;
    color: white;
    border: none;
  }
`

const googleSignInStyes = css`
  background-color: #4385f4;
  color: white;

  &:hover {
    background-color: #357ae8;
    border: none;
  }s
`
const productListingStyles = css`
  width: 80%;
  opacity: 0.7;
  position: absolute;
  top: 255px;
  display: none;
  ${CollectionItemContainer}:hover & {
    opacity: 0.85;
    display: flex;
  }
`

const getButttonStyles = props => {
  if (props.isGoogleSignIn) {
    return googleSignInStyes
  }
  return props.inverted ? inverted : buttonStyles
}

export const CustomButtonContainer = styled.button`
  min-width: 165px;
  width: auto;
  height: 50px;
  letter-spacing: 0.5px;
  line-height: 50px;
  padding: 0 35px 0 35px;
  font-size: 15px;
  text-transform: uppercase;
  font-family: "Open Sans Condensed";
  font-weight: bolder;

  cursor: pointer;
  display: flex;
  justify-content: center;
  ${getButttonStyles}
  ${props => props.isInProductListing && productListingStyles}
`
