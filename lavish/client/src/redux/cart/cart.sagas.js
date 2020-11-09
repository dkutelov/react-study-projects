import { takeLatest, put, all, call } from "redux-saga/effects"

import { userActionTypes } from "../user/user.types"

import { clearCart } from "./cart.actions"

export function* clearCartonSignOut() {
  yield put(clearCart())
}

export function* onSignOutSuccess() {
  yield takeLatest(userActionTypes.SIGN_OUT_SUCCESS, clearCartonSignOut)
}

export function* cartSagas() {
  yield all([call(onSignOutSuccess)])
}
