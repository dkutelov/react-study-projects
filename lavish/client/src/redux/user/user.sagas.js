import { takeLatest, put, all, call } from "redux-saga/effects"
import {
  auth,
  googleProvider,
  createUserProfileDocument,
  getCurrentUser,
  checkUserEmail
} from "../../firebase/firebase.utils"

import { userActionTypes } from "./user.types"

import {
  signInSuccess,
  signInFailure,
  userSignUpSuccess,
  userSignUpFailure,
  signOutSuccess,
  signOutFailure,
  userEmailExistsSuccess,
  userEmailDesNotExistsSuccess,
  checkIfEmailExistsFailure
} from "./user.actions"

const {
  GOOGLE_SIGN_IN_START,
  EMAIL_SIGN_IN_START,
  CHECK_USER_SESSION,
  SIGN_OUT_START,
  SIGN_UP_START,
  SIGN_UP_SUCCEESS,
  CHECK_EMAIL_EXISTS_START
} = userActionTypes

export function* getSnapshotFromUserAuth(userAuth, additionalData) {
  try {
    const userRef = yield call(
      createUserProfileDocument,
      userAuth,
      additionalData
    )
    const userSnapshot = yield userRef.get()

    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }))
  } catch (err) {
    yield put(signInFailure(err.message))
  }
}

// USER SIGN UP
export function* signUserUp({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password)

    yield put(userSignUpSuccess({ user, additionalData: { displayName } }))
  } catch (err) {
    yield put(userSignUpFailure(err.message))
  }
}

export function* onUserSignUpStart() {
  yield takeLatest(SIGN_UP_START, signUserUp)
}

// USER SUCCESSFULLY SIGNED UP
export function* signInAfterSignUp({ payload: { user, additionalData } }) {
  yield call(getSnapshotFromUserAuth, user, additionalData)
}

export function* onSignUpSuccess() {
  yield takeLatest(SIGN_UP_SUCCEESS, signInAfterSignUp)
}

// Google  sign in
export function* signInWithGoogle() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider)
    yield getSnapshotFromUserAuth(user)
  } catch (err) {
    yield put(signInFailure(err.message))
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(GOOGLE_SIGN_IN_START, signInWithGoogle)
}

// Email sign in
export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password)
    yield getSnapshotFromUserAuth(user)
  } catch (err) {
    yield put(signInFailure(err.message))
  }
}

export function* onEmailSignInStart() {
  yield takeLatest(EMAIL_SIGN_IN_START, signInWithEmail)
}

// sign out
export function* signOut() {
  try {
    yield auth.signOut()
    yield put(signOutSuccess())
  } catch (err) {
    yield put(signOutFailure(err.message))
  }
}

export function* onSignOutStart() {
  yield takeLatest(SIGN_OUT_START, signOut)
}

// check if user is authenticated
export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser()
    // if user never signed in
    if (!userAuth) return
    yield getSnapshotFromUserAuth(userAuth)
  } catch (err) {
    yield put(signInFailure(err.message))
  }
}

export function* onCheckUserSession() {
  yield takeLatest(CHECK_USER_SESSION, isUserAuthenticated)
}

// CHECK IF EMAIL ON SIGN UP EXISTS
// fix payload to be email
// action if emailExist is false set back to null in store
export function* checkEmailExists({ payload: { email } }) {
  try {
    // returns true or false
    const emailExists = yield checkUserEmail(email)

    if (emailExists) {
      yield put(userEmailExistsSuccess())
    } else {
      yield put(userEmailDesNotExistsSuccess())
    }
  } catch (err) {
    yield put(checkIfEmailExistsFailure(err.message))
  }
}

export function* onCheckIfEmailExistsStart() {
  yield takeLatest(CHECK_EMAIL_EXISTS_START, checkEmailExists)
}

export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onUserSignUpStart),
    call(onSignUpSuccess),
    call(onCheckIfEmailExistsStart)
  ])
}
