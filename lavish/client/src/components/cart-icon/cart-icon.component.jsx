import React from "react"
import { connect } from "react-redux"

import { toggleCartHidden } from "../../redux/cart/cart.actions.js"
import { selectCartItemsCount } from "../../redux/cart/cart.selector.js"
import { createStructuredSelector } from "reselect"
// styles
import {
  CartIconContainer,
  ShoppingIconContainer,
  ItemCount
} from "./cart-icon.styles"

const CartIcon = ({ toggleCartHidden, itemCount }) => {
  return (
    <CartIconContainer onClick={toggleCartHidden}>
      <ShoppingIconContainer />
      <ItemCount>{itemCount}</ItemCount>
    </CartIconContainer>
  )
}

const mapStateToProps = state =>
  createStructuredSelector({
    itemCount: selectCartItemsCount
  })

const mapDispatchToProps = dispatch => ({
  toggleCartHidden: () => dispatch(toggleCartHidden())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartIcon)
