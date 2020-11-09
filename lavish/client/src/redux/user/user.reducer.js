import { userActionTypes as types } from "./user.types"

const INITIAL_STATE = {
  currentUser: null,
  error: null,
  emailExists: null,
  isChecking: false
}

const userReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case types.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: payload,
        error: null
      }
    case types.SIGN_IN_FAILURE:
    case types.SIGN_UP_FAILURE:
    case types.SIGN_OUT_FAILURE:
    case types.CHECK_EMAIL_EXISTS_FAILURE:
      return {
        ...state,
        error: payload
      }
    case types.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null
      }
    case types.CHECK_EMAIL_EXISTS_START:
      return {
        ...state,
        isChecking: true
      }
    case types.CHECK_EMAIL_EXISTS_SUCCEESS:
      return {
        ...state,
        emailExists: true,
        isChecking: false
      }
    case types.CHECK_EMAIL_NOT_EXISTS_SUCCEESS:
      return {
        ...state,
        emailExists: false,
        isChecking: false
      }

    default:
      return state
  }
}

export { userReducer as default }
