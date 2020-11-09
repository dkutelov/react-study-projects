import React from "react"
import { connect } from "react-redux"

import {
  removeItem,
  reduceItem,
  addItem
} from "../../redux/cart/cart.actions.js"
// styles
import {
  CheckoutItemContainer,
  TextContainer,
  CheckoutItemImageContainer,
  CheckoutItemImage,
  CheckoutItemQuantity,
  RemoveButtonContainer
} from "./checkout-item.styles"

const CheckoutItem = ({
  cartItem,
  removeItem,
  reduceItemQuantity,
  increaseItemQuantity
}) => {
  const { id, name, price, quantity, imageUrl } = cartItem
  return (
    <CheckoutItemContainer>
      <CheckoutItemImageContainer>
        <CheckoutItemImage src={imageUrl} alt={name} />
      </CheckoutItemImageContainer>
      <TextContainer>{name}</TextContainer>
      <CheckoutItemQuantity>
        <div className="arrow" onClick={() => reduceItemQuantity(cartItem)}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={() => increaseItemQuantity(cartItem)}>
          &#10095;
        </div>
      </CheckoutItemQuantity>
      <TextContainer>${price}</TextContainer>
      <RemoveButtonContainer onClick={() => removeItem(id)}>
        &#10005;
      </RemoveButtonContainer>
    </CheckoutItemContainer>
  )
}

const mapDispatchToProps = dispatch => ({
  removeItem: itemId => dispatch(removeItem(itemId)),
  reduceItemQuantity: item => dispatch(reduceItem(item)),
  increaseItemQuantity: item => dispatch(addItem(item))
})

export default connect(
  null,
  mapDispatchToProps
)(CheckoutItem)
