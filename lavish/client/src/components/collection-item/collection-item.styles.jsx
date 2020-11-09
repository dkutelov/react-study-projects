import styled from "styled-components"
import { Link } from "react-router-dom"

export const CollectionItemContainer = styled.div`
  width: 22vw;
  display: flex;
  flex-direction: column;
  height: 350px;
  align-items: center;
  position: relative;
`
export const BackgroundImage = styled.div`
  width: 100%;
  height: 95%;
  background-size: cover;
  background-position: center;
  margin-bottom: 5px;
  ${CollectionItemContainer}:hover & {
    opacity: 0.8;
  }
  background-image: ${props => `url(${props.imageUrl})`};
`
export const CollectionItemFooter = styled.div`
  width: 100%;
  height: 5%;
  display: flex;
  justify-content: space-between;
  font-size: 18px;
`
export const FooterName = styled.span`
  width: 90%;
  margin-bottom: 15px;
`

export const FooterPrice = styled.span`
  width: 10%;
`

export const ItemLink = styled(Link)`
  display: block;
  width: 100%;
  height: 100%;
`
