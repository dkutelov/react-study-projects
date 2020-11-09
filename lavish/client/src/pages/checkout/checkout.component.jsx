import React from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"

import "./checkout.styles.scss"

import {
  selectCartItems,
  selectCartTotal
} from "../../redux/cart/cart.selector.js"
import CheckoutItem from "../../components/checkout-item/checkout-item.component"
import CheckoutPayment from "../../components/checkout-payment/checkout-payment.component"

const headingTitles = ["Product", "Description", "Quantity", "Price", "Remove"]

const CheckoutPage = ({ cartItems, total }) => {
  return (
    <div className="checkout-page">
      <div className="checkout-header">
        {headingTitles.map(headingTitle => (
          <div className="header-block" key={headingTitle}>
            <span>{headingTitle}</span>
          </div>
        ))}
      </div>
      {cartItems.length ? (
        cartItems.map(cartItem => (
          <CheckoutItem cartItem={cartItem} key={cartItem.id} />
        ))
      ) : (
        <span>No items to show</span>
      )}
      <div className="total">
        <span>TOTAL: ${total}</span>
      </div>
      <CheckoutPayment price={total} currency="USD" />
    </div>
  )
}

const mapStateToProps = state =>
  createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal
  })

export default connect(mapStateToProps)(CheckoutPage)
