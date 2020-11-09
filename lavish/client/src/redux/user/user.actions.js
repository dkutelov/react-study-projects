import { userActionTypes as types } from "./user.types"

export const googleSignInStart = () => ({
  type: types.GOOGLE_SIGN_IN_START
})

export const signInSuccess = user => ({
  type: types.SIGN_IN_SUCCESS,
  payload: user
})

export const signInFailure = error => ({
  type: types.SIGN_IN_FAILURE,
  payload: error
})

export const emailSignInStart = emailAndPasword => ({
  type: types.EMAIL_SIGN_IN_START,
  payload: emailAndPasword
})

export const userSignOutStart = () => ({
  type: types.SIGN_OUT_START
})

export const signOutSuccess = () => ({
  type: types.SIGN_OUT_SUCCESS
})

export const signOutFailure = error => ({
  type: types.SIGN_OUT_FAILURE,
  payload: error
})

export const checkUserSession = () => ({
  type: types.CHECK_USER_SESSION
})

export const userSignUpStart = userCredentials => ({
  type: types.SIGN_UP_START,
  payload: userCredentials
})

export const userSignUpSuccess = ({ user, additionalData }) => ({
  type: types.SIGN_UP_SUCCEESS,
  payload: { user, additionalData }
})

export const userSignUpFailure = error => ({
  type: types.SIGN_OUT_FAILURE,
  payload: error
})

export const checkIfEmailExistsStart = email => ({
  type: types.CHECK_EMAIL_EXISTS_START,
  payload: { email }
})

export const userEmailExistsSuccess = () => ({
  type: types.CHECK_EMAIL_EXISTS_SUCCEESS
})

export const userEmailDesNotExistsSuccess = () => ({
  type: types.CHECK_EMAIL_NOT_EXISTS_SUCCEESS
})

export const checkIfEmailExistsFailure = error => ({
  type: types.CHECK_EMAIL_EXISTS_FAILURE,
  payload: error
})
