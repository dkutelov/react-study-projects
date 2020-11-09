import React from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { withRouter } from "react-router-dom"

import CartItem from "../cart-item/cart-item.component"
import { toggleCartHidden } from "../../redux/cart/cart.actions.js"
import { selectCartItems } from "../../redux/cart/cart.selector.js"
// styles
import {
  CartDropdownContainer,
  CartItems,
  CartDropdownButton,
  EmptyMessageContainer
} from "./cart-dropdown.styles"

const CartDropdown = ({ cartItems, history, dispatch }) => (
  <CartDropdownContainer>
    <CartItems>
      {cartItems.length ? (
        cartItems.map(cartItem => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))
      ) : (
        <EmptyMessageContainer>Your cart is empty</EmptyMessageContainer>
      )}
    </CartItems>
    <CartDropdownButton
      onClick={() => {
        dispatch(toggleCartHidden())
        history.push("/checkout")
      }}>
      GO TO CHECKOUT
    </CartDropdownButton>
  </CartDropdownContainer>
)

const mapStateToProps = state =>
  createStructuredSelector({
    cartItems: selectCartItems
  })

export default withRouter(connect(mapStateToProps)(CartDropdown))
