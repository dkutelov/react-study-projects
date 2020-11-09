import styled from "styled-components"

export const CheckoutItemContainer = styled.div`
  width: 100%;
  display: flex;
  min-height: 100px;
  border-bottom: 1px solid darkgrey;
  padding: 15px 0;
  font-size: 20px;
  align-items: center;
`
export const TextContainer = styled.span`
  width: 23%;
`

export const CheckoutItemImageContainer = styled.div`
  width: 23%;
  padding-right: 15px;
`
export const CheckoutItemImage = styled.img`
  width: 100%;
  height: 100%;
`
export const CheckoutItemQuantity = styled.span`
  width: 23%;
  display: flex;
  span {
    margin: 0 10px;
  }
  div {
    cursor: pointer;
  }
`

export const RemoveButtonContainer = styled.div`
  padding-left: 12px;
  cursor: pointer;
`
