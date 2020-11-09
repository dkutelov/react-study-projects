import React, { useState } from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"

import StripeButton from "../stripe-button/stripe-button.component"
import NotificationPopUp from "../notification-pop-up/notification-pop-up.component"
import { paymentStart } from "../../redux/payment/payment.actions.js"
import {
  selectPaymentSuccess,
  selectPaymentError
} from "../../redux/payment/payment.selector.js"

//Styles
import {
  PaymentContainer,
  PaymentTitle,
  WarningText
} from "./checkout-payment.styles"

const CheckoutPayment = ({
  price,
  currency,
  paymentStart,
  paymentSuccess,
  paymentError
}) => {
  const [notifyUser, setNotifyUser] = useState(null)
  const priceForStripe = price * 100

  const onToken = async token => {
    try {
      await paymentStart({ amount: priceForStripe, token })
      setNotifyUser("success")
    } catch (error) {
      console.log("Payment error", JSON.parse(error))
      console.log(paymentError)
      setNotifyUser("error")
    }
  }
  return (
    <PaymentContainer>
      <PaymentTitle>Pay your oder*</PaymentTitle>
      <StripeButton
        price={priceForStripe}
        currency={currency}
        onToken={onToken}
      />
      <WarningText>
        *Please use the following test credit card for payments*
        <br />
        4242 4242 4242 4242 Exp. 01/20 CVC 123
      </WarningText>
      {notifyUser === "success" && paymentSuccess && (
        <NotificationPopUp
          type="success"
          title="Thank you for your order!"
          time={5000}>
          You successfully paid {paymentSuccess.currency.toUpperCase()}{" "}
          {paymentSuccess.amount / 100} for your oder! Thank you for shopping
          with us!
        </NotificationPopUp>
      )}
      {notifyUser === "error" && (
        <NotificationPopUp
          type="error"
          title="Oops, something went wrong!"
          time={5000}>
          There was an issue with your payment. Please, make sure you use the
          provided credit card!
        </NotificationPopUp>
      )}
    </PaymentContainer>
  )
}

const mapStateToProps = state =>
  createStructuredSelector({
    paymentSuccess: selectPaymentSuccess,
    paymentError: selectPaymentError
  })

const mapDispatchToProps = dispatch => ({
  paymentStart: paymentData => dispatch(paymentStart(paymentData))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckoutPayment)
