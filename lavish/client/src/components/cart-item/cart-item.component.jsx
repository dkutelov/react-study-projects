import React from "react"

import {
  CartItemContainer,
  CartItemDetails,
  ItemName,
  ItemPrice,
  CartItemImage
} from "./cart-item.styles.jsx"

const CartItem = ({ item: { imageUrl, price, name, quantity } }) => {
  return (
    <CartItemContainer>
      <CartItemImage src={imageUrl} alt="item" />
      <CartItemDetails>
        <ItemName>{name}</ItemName>
        <ItemPrice>
          {quantity}x ${price}
        </ItemPrice>
      </CartItemDetails>
    </CartItemContainer>
  )
}

export default CartItem
