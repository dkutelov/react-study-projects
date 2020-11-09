import { paymentActionTypes } from "./payment.types"

export const paymentStart = paymentData => ({
  type: paymentActionTypes.PAYMENT_START,
  payload: paymentData
})

export const paymentSuccess = response => ({
  type: paymentActionTypes.PAYMENT_SUCCEESS,
  payload: response
})

export const paymentFailure = errorMessage => ({
  type: paymentActionTypes.PAYMENT_FAILURE,
  payload: errorMessage
})
