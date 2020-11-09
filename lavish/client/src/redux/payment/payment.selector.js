import { createSelector } from "reselect"

const selectPayment = state => state.payment

export const selectPaymentSuccess = createSelector(
  [selectPayment],
  payment => payment.paymentSuccess
)

export const selectPaymentError = createSelector(
  [selectPayment],
  payment => payment.errorMessage
)

export const selectPaymentFetching = createSelector(
  [selectPayment],
  payment => payment.isFetching
)
