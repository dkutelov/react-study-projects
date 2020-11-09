import React from "react"
import StripeCheckout from "react-stripe-checkout"

const StripeButton = ({ price, currency, onToken }) => {
  const publishableKey = "pk_test_MDxNQI9pKFgcODiEl0SWjMUk"

  return (
    <StripeCheckout
      label="Pay by card"
      ComponentClass="div"
      name="Lavish"
      billingAddress
      shippingAddress
      currency={currency}
      locale="auto"
      //   image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={price}
      token={onToken}
      stripeKey={publishableKey}
    />
  )
}

export default StripeButton
