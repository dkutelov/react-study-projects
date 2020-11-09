import { takeLatest, call, put, all } from "redux-saga/effects"
import axios from "axios"

import { paymentSuccess, paymentFailure } from "./payment.actions.js"

import { paymentActionTypes } from "./payment.types"

export function* makePaymentAsync({ payload: { amount, token } }) {
  try {
    const { data } = yield axios.post("/payment", {
      amount,
      token
    })
    console.log("response ", data)

    yield put(paymentSuccess(data))
  } catch (err) {
    yield put(paymentFailure(err.message))
  }
}

export function* paymentStart() {
  yield takeLatest(paymentActionTypes.PAYMENT_START, makePaymentAsync)
}

export function* paymentSagas() {
  yield all([call(paymentStart)])
}
