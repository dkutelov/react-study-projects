import { paymentActionTypes } from "./payment.types"

const INITIAL_STATE = {
  paymentSuccess: null,
  isFetching: false,
  errorMessage: ""
}

const paymentReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case paymentActionTypes.PAYMENT_START:
      return {
        ...state,
        isFetching: true
      }
    case paymentActionTypes.PAYMENT_SUCCEESS:
      return {
        ...state,
        paymentSuccess: payload.success,
        isFetching: false
      }
    case paymentActionTypes.PAYMENT_FAILURE:
      return {
        ...state,
        errorMessage: payload,
        isFetching: false
      }
    default:
      return state
  }
}

export { paymentReducer as default }
